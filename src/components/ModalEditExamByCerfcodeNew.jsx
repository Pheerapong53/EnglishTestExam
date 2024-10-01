import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { editChoice } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ModalEditExamByCerfcodeNew({ params, open, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  console.log("params.row : ", params?.row);

  //Hook and Logic
  const [choiceLists, setChoiceLists] = useState({});
  //console.log(choiceLists);
  //old file problem
  const [fileUrl, setFileUrl] = useState("");
  //filePreview
  const [filePreview, setFilePreview] = useState("");
  const [newFile, setNewFile] = useState("");

  useEffect(() => {
    let isMounted = true;
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
    let isMounted = true;
    const fetchFileUrl = async () => {
      if (!params?.row.problem) return;

      try {
        const fileExtension = params["row"]["problem"].split(".").pop();
        const isMP3 = fileExtension === "mp3";
        const isTXT = fileExtension === "txt";

        const configFile = {
          method: "GET",
          url: isMP3
            ? `${process.env.REACT_APP_API_URL}/getfilesound/${params.row.formcode}/${params.row.problem}`
            : `${process.env.REACT_APP_API_URL}/getfiletext/${params.row.formcode}/${params.row.problem}`,
          headers: { authtoken: "bearer " + token },
        };

        const response = await axios(configFile);
        setFileUrl(response.data);
      } catch (error) {
        console.error("Error fetching fileUrl data:", error);
      }
    };

    fetchFileUrl();

    return () => {
      isMounted = false;
      setFileUrl("");
      setFilePreview("");
    };
  }, [params]);

  //Event Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    //sendfile to backend
    if (newFile !== "") {
      const renamedFile = new File([newFile], `${params.row.problem}`, {
        type: newFile.type,
      });
      const formData = new FormData();
      formData.append("file", renamedFile);
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      var extendName = params.row.problem.split(".")[1];
      console.log(extendName);
      if (extendName.toString() === "txt") {
        try {
          const res = await axios.post(
            process.env.REACT_APP_API_URL + "/upload",
            formData,
            {
              headers: {
                authtoken: "bearer " + token,
              },
            }
          );
          console.log("Success Text:", res.data);
        } catch (error) {
          console.error("Error uploading text file:", error);
        }
      } else if (extendName.toString() === "mp3") {
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
          console.log("Success Sound:", res.data);
        } catch (error) {
          console.error("Error uploading sound file:", error);
        }
      }
    }
    //editChoice
    // editChoice(choiceLists, token)
    //   .then((res) => {
    //     toast.success(res.data.msg, { onClose: () => navigate(0) });
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 401 || error.response.status === 404) {
    //       dispatch(logout());
    //       navigate("/notfound404", {
    //         state: {
    //           statusCode: error.response.status,
    //           txt: error.response.data,
    //         },
    //       });
    //     } else {
    //       toast.error(error.response.data.message);
    //     }
    //   });
    // console.log("Form Submitted :", choiceLists);
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
    console.log("selectedFile:", selectedFile);

    setFilePreview(""); // Clear the previous file preview

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase(); // Extract the file extension

      console.log("fileExtension:", fileExtension);

      if (fileExtension === "mp3" || fileExtension === "txt") {
        setNewFile(e.target.files[0]);
        const reader = new FileReader();

        reader.onerror = () => {
          toast.error("Error reading file");
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
        toast.error("Accept only .txt or .mp3 files");
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
                <Typography>ไฟล์โจทย์: {params?.row.problem}</Typography>
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
                            border: "1px solid #ccc", // Adds a light gray border
                            padding: "10px", // Adds padding for better spacing
                            backgroundColor: "#f9f9f9", // Light gray background for better contrast
                            borderRadius: "5px", // Rounded corners
                            overflow: "auto", // Allows scrolling if content overflows
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
                          border: "1px solid #ccc", // Adds a light gray border
                          padding: "10px", // Adds padding for better spacing
                          backgroundColor: "#f9f9f9", // Light gray background for better contrast
                          borderRadius: "5px", // Rounded corners
                          overflow: "auto", // Allows scrolling if content overflows
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

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ไฟล์โจทย์"
                  name="problem"
                  value={choiceLists?.problem || ""}
                  required
                  //onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <input
                  accept={
                    ["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      params?.row.cerfcode
                    )
                      ? ".txt"
                      : ".mp3"
                  }
                  id="contained-button-file"
                  label="ไฟล์โจทย์ (นามสกุล .txt, .mp3)"
                  component="span"
                  multiple
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                  <Button component="span" variant="outlined" fullWidth>
                    อัพโหลดไฟล์โจทย์ (นามสกุล .txt, .mp3)
                  </Button>
                </label>

                <Typography>โจทย์: {params?.row.question}</Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="โจทย์"
                  name="question"
                  value={choiceLists?.question || ""}
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  multiline
                />
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
                  <Button type="submit" variant="contained">
                    บันทึก
                  </Button>
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEditExamByCerfcodeNew;
