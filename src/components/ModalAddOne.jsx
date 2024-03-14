/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { addExamOneHandler } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
//import Dropzone from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import axios from "axios";
import { toast } from "react-toastify";

function ModalAddOne(dropdown) {
  const [isCorrect, setIsCorrect] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;

  const [formValues, setFormValues] = useState({
    cerfcode: {
      value: "",
      error: false,
      errorMessage: "You must enter Cerf Code",
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

  const navigate = useNavigate();

  //console.log(dropdown);
  //open-close Dialog
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setValues([]);
    setOpen(false);
    //navigate(0);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //กำหนดค่าเริ่มต้น for เพิ่มโจทย์ข้อสอบ
  //หากเพิ่มโจทย์ใน PageExamLookUp cerfcode auto add
  // const initialstate = {
  //   cerfcode: " ",
  //   questionnumber: "",
  //   question: "",
  //   problem: "",
  //   formcode: "",
  //   ch01: "",
  //   ch02: "",
  //   ch03: "",
  //   ch04: "",
  // };

  //กำหนดค่า DropDown ให้กับ FormCode
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

  const [values, setValues] = useState([]);

  //file txt Upload
  const [fileProblem, setFileProblem] = useState();
  //console.log(fileProblem);

  //ยังไม่ได้ใช้
  // const [status, setStatus] = useState();

  //handleChange in text TextField
  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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

  //handleFileChange for ไฟล์โจทย์
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0].name;
    if (selectedFile) {
      const fileExtension = selectedFile.split(".").pop();
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
      } else {
        toast.error("accept only File .txt or .mp3 ");
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
      //toast.success('Validate Ok');
      //console.log(addExamOne);

      const formData = await new FormData();
      formData.append("file", fileProblem);
      //console.log("questionAndAnswer: ", addExamOne);
      //console.log("FileProblem: ", formData.get("file"));

      // var extendName = values.problem.split(".")[1];
      // if (extendName.toString() === "txt") {
      //   axios
      //     .post(process.env.REACT_APP_API_URL + "/upload", formData,{
      //       headers: {
      //         authtoken: "bearer " + token,
      //       }
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     });
      // } else if (extendName.toString() === "mp3") {
      //   axios
      //     .post(process.env.REACT_APP_API_URL + "/uploadsound", formData,{
      //       headers: {
      //         authtoken: "bearer " + token,
      //       }
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     });
      // }

      addExamOneHandler(addExamOne,token).then((res) => {
        toast.success(res.data.msg);
        var extendName = values.problem.split(".")[1];
      if (extendName.toString() === "txt") {
        axios
          .post(process.env.REACT_APP_API_URL + "/upload", formData,{
            headers: {
              authtoken: "bearer " + token,
            }
          })
          .then((res) => {
            toast.success(res.data.msg);
            navigate(0);
            handleClose();
          });
      } else if (extendName.toString() === "mp3") {
        axios
          .post(process.env.REACT_APP_API_URL + "/uploadsound", formData,{
            headers: {
              authtoken: "bearer " + token,
            }
          })
          .then((res) => {
            toast.success(res.data.msg);
            navigate(0);
            handleClose();
          });
      }
        //navigate(0);
        
      })
      .catch((error) => {
        if(error.response.status === 401 || error.response.status === 404){
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
        }else{
        toast.error(error.response.data.message);
        }
      }); 
    }
    
  };

  //handleSubmit to add tbquestion, tbchoice
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Upload File Before
    const data = await new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
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

    const formData = await new FormData();
    formData.append("file", fileProblem);
    //console.log("questionAndAnswer: ", addExamOne);
    console.log("FileProblem: ", formData.get("file"));

    var extendName = values.problem.split(".")[1];
    if (extendName.toString() === "txt") {
      axios
        .post(process.env.REACT_APP_API_URL + "/upload", formData)
        .then((res) => {
          console.log(res);
        });
    } else if (extendName.toString() === "mp3") {
      axios
        .post(process.env.REACT_APP_API_URL + "/uploadsound", formData)
        .then((res) => {
          console.log(res);
        });
    }

    addExamOneHandler(addExamOne).then((res) => {
      console.log(res.data);
    });

    navigate(0);
    handleClose();
  };

  return (
    <>
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        onClick={handleClickOpen("paper")}
        startIcon={<ControlPointIcon />}
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
                {/* <TextField
                    sx={{ margin: "10px" }}
                    id="outlined-basic"
                    label="รหัสความสามารถทางภาษาอังกฤษสากล"
                    variant="outlined"
                    fullWidth
                  /> */}

{dropdown?.dropdown.length === 1?(
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
                    onChange={(e) => {
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
):(
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
                {/* <FormControl sx={{ margin: "10px" }} fullWidth>
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
                </FormControl> */}

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ระดับความยากง่ายตามกรอบ CEFR"
                  name="cerfdifficultylevel"
                  value="เพิ่มโจทย์ข้อสอบใน tbquestion จำเป็นต้องกรอกฟิลด์ไหม?"
                  variant="outlined"
                  error
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="คำอธิบายระดับความยากง่ายตามกรอบ CEFR"
                  name="cerfdifficultyleveldesc"
                  value="เพิ่มโจทย์ข้อสอบใน tbquestion จำเป็นต้องกรอกฟิลด์ไหม?"
                  variant="outlined"
                  error
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ลักษณะข้อสอบ"
                  variant="outlined"
                  value="ไม่มีการเก็บค่าใน tbcefrdifficultylevel"
                  error
                  fullWidth
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ประเภทการวัดข้อสอบ"
                  variant="outlined"
                  value="ไม่มีการเก็บค่าใน tbcefrdifficultylevel"
                  error
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

                <input
                  accept={".txt" || ".mp3"}
                  id="contained-button-file"
                  label="ไฟล์โจทย์ (นามสกุล .txt, .mp3)"
                  // style={{ display: 'none' }}
                  component="span"
                  //value={fileProblem}
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

