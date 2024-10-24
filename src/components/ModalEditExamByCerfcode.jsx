import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Typography,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSilce";
import { editQuestionAndChoice } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ModalEditExamByCerfcode({ params, open, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  //console.log("params.row : ", params?.row);

  //Hook and Logic
  //State for storing the list of choices
  const [choiceLists, setChoiceLists] = useState({});
  //State for holding the existing file URLs for problem and question
  const [fileUrl, setFileUrl] = useState("");
  const [fileQuestion, setFileQuestion] = useState("");
  //State for holding the preview content of the currently selected files (before submission)
  const [filePreview, setFilePreview] = useState("");
  const [fileQuestionPreview, setFileQuestionPreview] = useState("");
  //State for holding the new files (problem and question) selected by the user
  const [newFile, setNewFile] = useState("");
  const [newFileQuestion, setNewFileQuestion] = useState("");
  //State for openning dialog confirmation
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state if component unmounts
    // Function to fetch choices based on the question code
    const fetchChoices = async () => {
      if (!params?.row?.questioncode) return;
      try {
        var configChoice = {
          method: "GET",
          url:
            process.env.REACT_APP_API_URL +
            `/getchoicebyquestioncode/${params.row.questioncode}`,
          headers: { authtoken: "bearer " + token },
        };
        const { data } = await axios(configChoice);
        if (isMounted) {
          const initialstate = {
            id: params.row.id,
            questioncode: params.row.questioncode,
            problem: params.row.problem,
            question: params.row.question,
            cerfcode: params.row.cerfcode,
            formcode: params.row.formcode,
          };

          data.forEach((choice) => {
            initialstate[choice.choicecode] = choice.choicetext;
          });

          setChoiceLists(initialstate);
        }
      } catch (error) {
        console.error("Error fetching choice data:", error);
      }
    };
    fetchChoices();

    return () => {
      isMounted = false;
    };
  }, [params]);

  useEffect(() => {
    let isMounted = true; // Flag to prevent setting state if component unmounts

    // Function to fetch the question's file URL (e.g., audio file for the question)
    const fetchQuestionUrl = async () => {
      if (!params?.row.problem) return;

      try {
        const configFile = {
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}/getfilesound/${params.row.formcode}/${params.row.question}`,
          headers: { authtoken: "bearer " + token },
        };

        const response = await axios(configFile);
        if (isMounted) {
          setFileQuestion(response.data);
        }
      } catch (error) {
        console.error("Error fetching fileUrl data:", error);
      }
    };

    // Function to fetch the problem's file URL (could be sound or text)
    const fetchFileUrl = async () => {
      if (!params?.row.problem) return;

      try {
        // Extract file extension to determine if the file is .mp3 or .txt
        const fileExtension = params["row"]["problem"].split(".").pop();
        const isMP3 = fileExtension === "mp3";
        const isTXT = fileExtension === "txt";

        // API config based on the file type (sound or text)
        const configFile = {
          method: "GET",
          url: isMP3
            ? `${process.env.REACT_APP_API_URL}/getfilesound/${params.row.formcode}/${params.row.problem}`
            : `${process.env.REACT_APP_API_URL}/getfiletext/${params.row.formcode}/${params.row.problem}`,
          headers: { authtoken: "bearer " + token },
        };

        const response = await axios(configFile);
        if (isMounted) {
          setFileUrl(response.data);
        }
      } catch (error) {
        console.error("Error fetching fileUrl data:", error);
      }
    };

    // Fetch the file URL when the component mounts or when `params` change
    fetchFileUrl();

    // Conditionally fetch the question file URL if the cerfcode matches
    if (["L2B2", "L2C1"].includes(params?.row.cerfcode)) {
      fetchQuestionUrl();
    }

    // Cleanup function to reset states and prevent memory leaks
    return () => {
      isMounted = false;
      setFileUrl(""); // Clear file URL state
      setFilePreview(""); // Clear file preview state
      setFileQuestion(""); // Clear question file URL state
      setFileQuestionPreview(""); // Clear question file preview state
    };
  }, [params]);

  //Event Handler
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenDialog(false); //Close the dialog before proceeding
    // Handle the file upload for "problem" (can be text or mp3)
    if (newFile !== "") {
      // Rename the uploaded file
      const renamedFile = new File([newFile], `${choiceLists.problem}`, {
        type: newFile.type,
      });
      const formData = new FormData(); // Create a FormData object for the file upload
      formData.append("file", renamedFile);

      var extendName = params.row.problem.split(".")[1];
      // Handle text file upload
      if (extendName.toString() === "txt") {
        try {
          const res = await axios.post(
            process.env.REACT_APP_API_URL +
              `/uploadtextfile/${params.row.formcode}`,
            formData,
            {
              headers: {
                authtoken: "bearer " + token,
              },
            }
          );
          //toast.success(res.data.message); // Show success toast notification
        } catch (error) {
          console.error("Error uploading text file:", error);
        }
      }
      // Handle mp3 file upload
      else if (extendName.toString() === "mp3") {
        try {
          const res = await axios.post(
            process.env.REACT_APP_API_URL +
              `/uploadsoundfile/${params.row.formcode}`,
            formData,
            {
              headers: {
                authtoken: "bearer " + token,
              },
            }
          );
          //toast.success(res.data.message); // Show success toast notification
        } catch (error) {
          console.error("Error uploading sound file:", error);
        }
      }
    }

    // Handle the file upload for "question" (only mp3 allowed)
    if (newFileQuestion !== "") {
      // Rename the uploaded file
      const renamedFile = new File(
        [newFileQuestion],
        `${choiceLists?.question}`,
        {
          type: newFile.type,
        }
      );
      const formData = new FormData(); // Create a FormData object for the file upload
      formData.append("file", renamedFile);
      try {
        const res = await axios.post(
          process.env.REACT_APP_API_URL +
            `/uploadsoundfile/${params.row.formcode}`,
          formData,
          {
            headers: {
              authtoken: "bearer " + token,
            },
          }
        );
        //toast.success(res.data.message);
      } catch (error) {
        console.error("Error uploading sound file:", error);
      }
    }

    // Edit the choice list after file uploads
    try {
      const res = await editQuestionAndChoice(choiceLists, token);
      toast.success(res.data.msg, { onClose: () => navigate(0) });
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 404) {
        dispatch(logout());
        navigate("/notfound404", {
          state: {
            statusCode: error.response.status,
            txt: error.response.data,
          },
        });
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setChoiceLists((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    //console.log("selectedFile:", selectedFile);

    setFilePreview(""); // Clear the previous file preview

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase(); // Extract the file extension

      //console.log("fileExtension:", fileExtension);

      if (fileExtension === "mp3" || fileExtension === "txt") {
        setNewFile(e.target.files[0]);
        const reader = new FileReader();

        reader.onerror = () => {
          toast.error("เกิดข้อผิดพลาดในการอ่านไฟล์");
        };

        // Handle text files
        if (fileExtension === "txt") {
          reader.onloadend = () => {
            setFilePreview(reader.result); // Set the file preview directly to the text content
          };
          reader.readAsText(selectedFile); // Read the file as text
        }

        // Handle mp3 files
        if (fileExtension === "mp3") {
          reader.onloadend = () => {
            setFilePreview(reader.result.split(",")[1]); // Set the base64 data (removing the data URL prefix)
          };
          reader.readAsDataURL(selectedFile); // Read the file as a base64-encoded data URL
        }
      } else {
        toast.error("เฉพาะไฟล์นามสกุล .txt หรือ .mp3");
        return;
      }
    }
  };

  const handleQuestionChange = (e) => {
    const selectedFile = e.target.files[0];
    //console.log("selectedFile:", selectedFile);

    setFileQuestionPreview(""); // Clear the previous file preview

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase(); // Extract the file extension
      if (fileExtension === "mp3") {
        setNewFileQuestion(e.target.files[0]);
        const reader = new FileReader();

        reader.onerror = () => {
          toast.error("เกิดข้อผิดพลาดในการอ่านไฟล์");
        };
        reader.onloadend = () => {
          setFileQuestionPreview(reader.result.split(",")[1]); // Set the base64 data (removing the data URL prefix)
        };
        reader.readAsDataURL(selectedFile); // Read the file as a base64-encoded data URL
      } else {
        toast.error("เฉพาะไฟล์นามสกุล .mp3");
        return;
      }
    }
  };

  //Render
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true} sx={{ width: "600px" }}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                id="modal-modal-title"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
                variant="h6"
                component="h2"
              >
                แก้ไขโจทย์ข้อสอบ
              </Typography>

              <Typography
                id="modal-modal-title"
                sx={{ textAlign: "start", fontWeight: "bold" }}
                variant="h6"
                component="h2"
              >
                ประเภทข้อสอบ
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <TextField
                  label="ลำดับ"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="id"
                  value={params?.row.id || ""}
                  fullWidth
                  variant="outlined"
                  disabled
                />
                <TextField
                  label="รหัสโจทย์"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="questioncode"
                  value={params?.row.questioncode || ""}
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  label="ไฟล์โจทย์"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="problem"
                  value={choiceLists?.problem || ""}
                  required
                  fullWidth
                  variant="outlined"
                  onChange={handleChange}
                />
                {filePreview ? (
                  <>
                    {["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      params?.row.cerfcode
                    ) ? (
                      <>
                        <p>Text Preview</p>
                        <pre
                          style={{
                            whiteSpace: "pre-wrap",
                            border: "1px solid #ccc",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "5px",
                            overflow: "auto",
                          }}
                        >
                          {filePreview}
                        </pre>
                      </>
                    ) : (
                      <>
                        <p>Sound Preview</p>
                        <audio controls>
                          <source
                            src={`data:audio/mp3;base64,${filePreview}`}
                            type="audio/mp3"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </>
                    )}
                  </>
                ) : fileUrl ? (
                  <>
                    {["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      params?.row.cerfcode
                    ) ? (
                      <pre
                        style={{
                          whiteSpace: "pre-wrap",
                          border: "1px solid #ccc",
                          padding: "10px",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "5px",
                          overflow: "auto",
                        }}
                      >
                        {fileUrl}
                      </pre>
                    ) : (
                      <audio controls>
                        <source
                          src={`data:audio/mp3;base64,${fileUrl}`}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </>
                ) : (
                  <>No File</>
                )}

                <input
                  label="ไฟล์โจทย์ (นามสกุล .txt, .mp3)"
                  accept={
                    ["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      params?.row.cerfcode
                    )
                      ? ".txt"
                      : ".mp3"
                  }
                  id="file-problem"
                  component="span"
                  multiple
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-problem">
                  <Button
                    sx={{ margin: "10px" }}
                    component="span"
                    variant="outlined"
                    fullWidth
                  >
                    อัพโหลดไฟล์โจทย์ (นามสกุล .txt, .mp3)
                  </Button>
                </label>

                <TextField
                  label="โจทย์"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="question"
                  value={choiceLists?.question || ""}
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  multiline
                />
                {fileQuestionPreview ? (
                  // If a new file is uploaded, show the sound preview of the newly uploaded file
                  <>
                    <p>Sound Preview</p>
                    <audio controls>
                      <source
                        src={`data:audio/mp3;base64,${fileQuestionPreview}`}
                        type="audio/mp3"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                ) : fileQuestion ? (
                  // If there's no new file but an existing file, show the existing file preview
                  <>
                    <audio controls>
                      <source
                        src={`data:audio/mp3;base64,${fileQuestion}`}
                        type="audio/mp3"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </>
                ) : (
                  // If no file is available and the cerfcode matches specific conditions
                  ["L2B2", "L2C1"].includes(params?.row.cerfcode) && (
                    <p>No File</p>
                  )
                )}

                {/* Show the input for file upload if cerfcode matches specific conditions */}
                {["L2B2", "L2C1"].includes(params?.row.cerfcode) && (
                  <>
                    <input
                      accept={".mp3"}
                      id="file-question"
                      label="ไฟล์คำถาม (นามสกุล .mp3)"
                      component="span"
                      multiple
                      name="file-question"
                      type="file"
                      onChange={handleQuestionChange}
                    />
                    <label htmlFor="file-question">
                      <Button
                        sx={{ margin: "10px" }}
                        component="span"
                        variant="outlined"
                        fullWidth
                      >
                        อัพโหลดไฟล์โจทย์ (นามสกุล .mp3)
                      </Button>
                    </label>
                  </>
                )}

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label={`ตัวเลือก (ถูก): ${
                    params?.row?.questioncode
                      ? `${params.row.questioncode}CH01`
                      : "N/A"
                  }`}
                  name={`${params?.row?.questioncode}CH01`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH01`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label={`ตัวเลือก2 : ${
                    params?.row?.questioncode
                      ? `${params.row.questioncode}CH02`
                      : "N/A"
                  }`}
                  name={`${params?.row?.questioncode}CH02`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH02`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label={`ตัวเลือก3 : ${
                    params?.row?.questioncode
                      ? `${params.row.questioncode}CH03`
                      : "N/A"
                  }`}
                  name={`${params?.row?.questioncode}CH03`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH03`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label={`ตัวเลือก4 : ${
                    params?.row?.questioncode
                      ? `${params.row.questioncode}CH04`
                      : "N/A"
                  }`}
                  name={`${params?.row?.questioncode}CH04`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH04`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="รหัสความสามารถ"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="cerfcode"
                  value={params?.row.cerfcode || ""}
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  label="รหัสฟอร์มข้อสอบ"
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  name="formcode"
                  value={params?.row.formcode || ""}
                  fullWidth
                  variant="outlined"
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ paddingRight: "20px" }}>
                  <Button
                    //type="submit"
                    variant="contained"
                    onClick={handleOpenDialog}
                  >
                    บันทึก
                  </Button>
                </Box>
              </Box>

              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>ยืนยันการแก้ไข</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    ยืนยันการแก้ไข กรุณาตรวจสอบความถูกต้องก่อนการดำเนินการ
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleCloseDialog}
                    color="error"
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    color="primary"
                  >
                    ยืนยัน
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEditExamByCerfcode;
