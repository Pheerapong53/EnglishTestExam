/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* Update 2/5/67 */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  InputLabel,
} from "@mui/material";
import { ControlPoint } from "@mui/icons-material";
import { addExamOneHandler } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import axios from "axios";
import { toast } from "react-toastify";

function ModalAddOne(dropdown) {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();

  //Dropdown options for FormCode
  const formCodeDropDown = [
    { key: "FORM1", value: "F0001" },
    { key: "FORM2", value: "F0002" },
    { key: "FORM3", value: "F0003" },
    { key: "FORM4", value: "F0004" },
    { key: "FORM5", value: "F0005" },
    { key: "FORM6", value: "F0006" },
    { key: "FORM7", value: "F0007" },
    { key: "FORM8", value: "F0008" },
    { key: "FORM9", value: "F0009" },
    { key: "FORM10", value: "F0010" },
  ];

  //Hook and Logic
  //State for selecting cerfcode
  const [selectedCerfCode, setSelectedCerfCode] = useState(
    dropdown?.dropdown.length === 1 ? dropdown.dropdown[0] : ""
  );
  //State for storing the data of cerfcode
  const [autoFilledData, setAutoFilledData] = useState({});
  //console.log(autoFilledData);
  //State for validate data in form
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (selectedCerfCode === "") return;

    // Function to fetch cerfcode data based on the cerfcode
    const fetchData = async () => {
      var config = {
        method: "GET",
        url:
          process.env.REACT_APP_API_URL + `/getcefrlevel/${selectedCerfCode}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };

      try {
        const response = await axios(config);
        setAutoFilledData(response.data);
      } catch (error) {
        const { response } = error;

        if (response.status === 401 || response.status === 404) {
          dispatch(logout());
          navigate("/notfound404", {
            state: {
              statusCode: response.status,
              txt: response.data,
            },
          });
        } else {
          toast.error(response.data.message);
        }
      }
    };
    fetchData();

    return () => {
      setAutoFilledData({}); // Clear data of cerfcode
    };
  }, [selectedCerfCode]);

  //Initial form values before sending to the backend
  const [formValues, setFormValues] = useState({
    cerfcode: {
      value: "",
      error: false,
      errorMessage: "You must enter Cerfcode",
    },
    questionnumber: {
      value: "",
      error: false,
      errorMessage: "You must enter at least 3 digits. Ex. 001, 010, 023",
    },
    question: {
      value: "",
      error: false,
      errorMessage: "You must enter a Question",
    },
    problem: {
      value: "",
      error: false,
      errorMessage: "You must Upload file or enter file name",
    },
    formcode: {
      value: "",
      error: false,
      errorMessage: "You must enter form",
    },
    ch01: {
      value: "",
      error: false,
      errorMessage: "You must enter a choice",
    },
    ch02: {
      value: "",
      error: false,
      errorMessage: "You must enter a choice",
    },
    ch03: {
      value: "",
      error: false,
      errorMessage: "You must enter a choice",
    },
    ch04: {
      value: "",
      error: false,
      errorMessage: "You must enter a choice",
    },
  });

  // State for managing the visibility of the "เพิ่มข้อสอบรายข้อ" dialog
  const [open, setOpen] = React.useState(false);
  // State to manage the scroll behavior of the dialog
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setValues([]);
    setSelectedCerfCode("");
    setAutoFilledData("");
    setFileProblem("");
    setFileProblemPreview("");
    setFileQuestion("");
    setFileQuestionPreview("");
    setOpen(false);
  };

  const handleCerfCodeChange = (e) => {
    setSelectedCerfCode(e.target.value);
  };

  const handleChangeWithValidate = async (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value: value,
      },
    });
  };

  // Ref for the description element to manage focus
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    // Focus the description element when the dialog opens
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //State to hold the data
  const [values, setValues] = useState([]);

  //State for holding the new files (problem and question) selected by the user
  const [fileProblem, setFileProblem] = useState("");
  const [fileQuestion, setFileQuestion] = useState("");
  //State for holding the preview content of the currently selected files (before submission)
  const [fileProblemPreview, setFileProblemPreview] = useState("");
  const [fileQuestionPreview, setFileQuestionPreview] = useState("");

  //handleFileChange for ไฟล์โจทย์
  const handleQuestionChange = (e) => {
    const selectedFile = e.target.files[0];
    //console.log("selectedFile:", selectedFile);

    setFileQuestionPreview(""); // Clear the previous file preview

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase(); // Extract the file extension
      if (fileExtension === "mp3") {
        setFileQuestion(e.target.files[0]);
        setValues({
          ...values,
          question: e.target.files[0].name,
        });
        setFormValues({
          ...formValues,
          question: {
            ...formValues,
            value: e.target.files[0].name,
          },
        });
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileProblemPreview(""); // Clear the previous file preview
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop();
      if (fileExtension === "mp3" || fileExtension === "txt") {
        setFileProblem(e.target.files[0]);
        setValues({
          ...values,
          problem: e.target.files[0].name,
        });
        setFormValues({
          ...formValues,
          problem: {
            ...formValues,
            value: e.target.files[0].name,
          },
        });

        const reader = new FileReader();

        reader.onerror = () => {
          toast.error("เกิดข้อผิดพลาดในการอ่านไฟล์");
        };

        // Handle text files
        if (fileExtension === "txt") {
          reader.onloadend = () => {
            setFileProblemPreview(reader.result); // Set the file preview directly to the text content
          };
          reader.readAsText(selectedFile); // Read the file as text
        }

        // Handle mp3 files
        if (fileExtension === "mp3") {
          reader.onloadend = () => {
            setFileProblemPreview(reader.result.split(",")[1]); // Set the base64 data (removing the data URL prefix)
          };
          reader.readAsDataURL(selectedFile); // Read the file as a base64-encoded data URL
        }
      } else {
        toast.error("เฉพาะไฟล์นามสกุล .txt หรือ .mp3");
        return;
      }
    }
  };

  const handleSubmitWithValidate = async (event) => {
    event.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    const {
      cerfcode,
      questionnumber,
      question,
      problem,
      formcode,
      ch01,
      ch02,
      ch03,
      ch04,
    } = formValues;

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (!currentValue) {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
        setFormValues(newFormValues);
      } else if (questionnumber.value.length < 3) {
        setFormValues((prevState) => ({
          ...prevState,
          questionnumber: {
            ...prevState.questionnumber,
            error: true,
          },
        }));
        return;
      } else {
        setIsCorrect(true);
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: false,
          },
        };
        setFormValues(newFormValues);
      }
    }

    if (isCorrect) {
      const data = await new FormData(event.currentTarget);
      const addExamOne = await {
        cerfcode: data.get("cerfcode"),
        questionnumber: data.get("questionnumber"),
        question: data.get("question"),
        problem: data.get("problem"),
        formcode: data.get("formcode"),
        ch01: data.get("ch01"),
        ch02: data.get("ch02"),
        ch03: data.get("ch03"),
        ch04: data.get("ch04"),
      };

      addExamOneHandler(addExamOne, token)
        .then(async (res) => {
          toast.success(res.data.msg);
          if (fileProblem !== "") {
            const formData = new FormData(); // Create a FormData object for the file upload
            formData.append("file", fileProblem);

            var extendName = values.problem.split(".")[1];
            // Handle text file upload
            if (extendName.toString() === "txt") {
              try {
                const res = await axios.post(
                  process.env.REACT_APP_API_URL +
                    `/uploadtextfile/${values.formcode}`,
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
                    `/uploadsoundfile/${values.formcode}`,
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
          if (fileQuestion !== "") {
            const formData = new FormData(); // Create a FormData object for the file upload
            formData.append("file", fileQuestion);
            try {
              const res = await axios.post(
                process.env.REACT_APP_API_URL +
                  `/uploadsoundfile/${values.formcode}`,
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

          navigate(0);
        })
        .catch((error) => {
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
        });
    }
  };

  return (
    <>
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        onClick={handleClickOpen("paper")}
        startIcon={<ControlPoint />}
      >
        เพิ่มรายข้อ
      </Button>

      {/* Dialog เพิ่มโจทย์ข้อสอบ */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === "paper"} sx={{ width: "600px" }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box component="form" onSubmit={handleSubmitWithValidate}>
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
                เพิ่มโจทย์ข้อสอบ
              </Typography>
              <Box>
                <Typography
                  id="modal-modal-title"
                  sx={{ textAlign: "start", fontWeight: "bold" }}
                  variant="h6"
                  component="h2"
                >
                  ประเภทข้อสอบ
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                {dropdown?.dropdown.length === 1 ? (
                  <FormControl sx={{ margin: "10px" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      รหัสความสามารถทางภาษาอังกฤษสากล
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="รหัสความสามารถทางภาษาอังกฤษสากล"
                      name="cerfcode"
                      value={dropdown["dropdown"] || ""}
                      required
                      // onChange={(e) => {
                      //   handleCerfCodeChange(e);
                      //   handleChangeWithValidate(e);
                      //   setIsCorrect(true);
                      //   if ([formValues.cerfcode] != "") {
                      //     setFormValues((prevState) => ({
                      //       ...prevState,
                      //       cerfcode: {
                      //         ...prevState.cerfcode,
                      //         error: false,
                      //       },
                      //     }));
                      //   }
                      // }}
                      error={formValues.cerfcode.error}
                      helperText={
                        formValues.cerfcode.error &&
                        formValues.cerfcode.errorMessage
                      }
                      //error={values.rank === undefined ? true : false}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dropdown["dropdown"].map((cerfcode, i) => (
                        <MenuItem value={cerfcode} key={i}>
                          {cerfcode}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl sx={{ margin: "10px" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      รหัสความสามารถทางภาษาอังกฤษสากล
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="รหัสความสามารถทางภาษาอังกฤษสากล"
                      name="cerfcode"
                      value={values.cerfcode || ""}
                      required
                      onChange={(e) => {
                        handleCerfCodeChange(e);
                        handleChangeWithValidate(e);
                        setIsCorrect(true);
                        if ([formValues.cerfcode] != "") {
                          setFormValues((prevState) => ({
                            ...prevState,
                            cerfcode: {
                              ...prevState.cerfcode,
                              error: false,
                            },
                          }));
                        }
                      }}
                      error={formValues.cerfcode.error}
                      helperText={
                        formValues.cerfcode.error &&
                        formValues.cerfcode.errorMessage
                      }
                      //error={values.rank === undefined ? true : false}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {dropdown["dropdown"].map((cerfcode, i) => (
                        <MenuItem value={cerfcode} key={i}>
                          {cerfcode}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ระดับความยากง่ายตามกรอบ CERF"
                  name="cerfdifficultylevel"
                  value={autoFilledData.cerfdifficultylevel || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="คำอธิบายระดับความยากง่ายตามกรอบ CERF"
                  name="cerfdifficultyleveldesc"
                  value={autoFilledData.cerfdifficultyleveldesc || ""}
                  variant="outlined"
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ลักษณะข้อสอบ"
                  variant="outlined"
                  value={
                    selectedCerfCode?.startsWith("L") ? "Listening" : "Reading"
                  }
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ประเภทการวัดข้อสอบ"
                  variant="outlined"
                  value={autoFilledData.cerfleveltype || ""}
                  fullWidth
                  disabled
                />
              </Box>

              <Box>
                <Typography
                  id="modal-modal-title"
                  sx={{ textAlign: "start", fontWeight: "bold" }}
                  variant="h6"
                  component="h2"
                >
                  โจทย์ข้อสอบ
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <FormControl sx={{ margin: "10px" }} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ฟอร์มข้อสอบ
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="ฟอร์มข้อสอบ"
                    name="formcode"
                    value={values.formcode || ""}
                    required
                    onChange={(e) => {
                      handleChangeWithValidate(e);
                      setIsCorrect(true);
                      if ([formValues.formcode] != "") {
                        setFormValues((prevState) => ({
                          ...prevState,
                          formcode: {
                            ...prevState.formcode,
                            error: false,
                          },
                        }));
                      }
                    }}
                    error={formValues.formcode.error}
                    helperText={
                      formValues.formcode.error &&
                      formValues.formcode.errorMessage
                    }
                    //error={values.rank === undefined ? true : false}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {formCodeDropDown.map(({ key, value }, index) => (
                      <MenuItem value={value} key={index}>
                        {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ไฟล์โจทย์ (นามสกุล .txt, .mp3)"
                  name="problem"
                  value={values.problem || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.problem] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        problem: {
                          ...prevState.problem,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.problem.error}
                  helperText={
                    formValues.problem.error && formValues.problem.errorMessage
                  }
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />
                {fileProblemPreview && (
                  <>
                    {["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      selectedCerfCode
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
                          {fileProblemPreview}
                        </pre>
                      </>
                    ) : (
                      <>
                        <p>Sound Preview</p>
                        <audio controls>
                          <source
                            src={`data:audio/mp3;base64,${fileProblemPreview}`}
                            type="audio/mp3"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </>
                    )}
                  </>
                )}

                <input
                  accept={
                    ["R1A1", "R1A2", "R1B1", "R1B2", "R1C1"].includes(
                      selectedCerfCode
                    )
                      ? ".txt"
                      : ".mp3"
                  }
                  id="file-problem"
                  label="ไฟล์โจทย์ (นามสกุล .txt, .mp3)"
                  // style={{ display: 'none' }}
                  component="span"
                  //value={fileProblem}
                  multiple
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-problem">
                  <Button component="span" variant="outlined" fullWidth>
                    อัพโหลดไฟล์โจทย์ (นามสกุล .txt, .mp3)
                  </Button>
                </label>

                <TextField
                  sx={{ margin: "10px" }}
                  type="number"
                  id="outlined-basic"
                  label="ลำดับข้อสอบ 001 - 100"
                  name="questionnumber"
                  value={values.questionnumber || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.questionnumber] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        questionnumber: {
                          ...prevState.questionnumber,
                          error: false,
                        },
                      }));
                    }
                  }}
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 1,
                    },
                  }}
                  error={formValues.questionnumber.error}
                  helperText={
                    formValues.questionnumber.error &&
                    formValues.questionnumber.errorMessage
                  }
                  //error={values.questionnumber === undefined ? true : false}
                  onInput={(e) => {
                    e.target.value = e.target.value.toString().slice(0, 3);
                  }}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="คำถาม"
                  name="question"
                  value={values.question || ""}
                  //required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.question] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        question: {
                          ...prevState.question,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.question.error}
                  helperText={
                    formValues.question.error &&
                    formValues.question.errorMessage
                  }
                  //error={values.question === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                {fileQuestionPreview && (
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
                )}

                {["L2B2", "L2C1"].includes(selectedCerfCode) && (
                  <>
                    <input
                      accept=".mp3"
                      id="file-question"
                      label="ไฟล์คำถาม (นามสกุล .mp3)"
                      component="span"
                      multiple
                      name="file"
                      type="file"
                      onChange={handleQuestionChange}
                    />
                    <label htmlFor="file-question">
                      <Button component="span" variant="outlined" fullWidth>
                        อัพโหลดไฟล์คำถาม (นามสกุล .mp3)
                      </Button>
                    </label>
                  </>
                )}

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก(ถูก)"
                  name="ch01"
                  value={values.ch01 || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.ch01] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        ch01: {
                          ...prevState.ch01,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.ch01.error}
                  helperText={
                    formValues.ch01.error && formValues.ch01.errorMessage
                  }
                  //error={values.ch01 === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="ch02"
                  value={values.ch02 || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.ch02] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        ch02: {
                          ...prevState.ch02,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.ch02.error}
                  helperText={
                    formValues.ch02.error && formValues.ch02.errorMessage
                  }
                  //error={values.ch02 === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="ch03"
                  value={values.ch03 || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.ch03] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        ch03: {
                          ...prevState.ch03,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.ch03.error}
                  helperText={
                    formValues.ch03.error && formValues.ch03.errorMessage
                  }
                  //error={values.ch03 === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="ch04"
                  value={values.ch04 || ""}
                  required
                  onChange={(e) => {
                    handleChangeWithValidate(e);
                    setIsCorrect(true);
                    if ([formValues.ch04] != "") {
                      setFormValues((prevState) => ({
                        ...prevState,
                        ch04: {
                          ...prevState.ch04,
                          error: false,
                        },
                      }));
                    }
                  }}
                  error={formValues.ch04.error}
                  helperText={
                    formValues.ch04.error && formValues.ch04.errorMessage
                  }
                  //error={values.ch04 === undefined ? true : false}
                  fullWidth
                  variant="outlined"
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

export default ModalAddOne;
