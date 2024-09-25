import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import { useNavigate, Link } from "react-router-dom";
import { editQuestionAndChoice } from "./functions/cefrLevel";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";
import axios from "axios";

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[500],
    },
  },
});

function ModalEditExamByCerfcode(params) {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();
  const initialstate = {
    id: params.params.row.id,
    questioncode: params.params.row.questioncode,
    problem: params.params.row.problem,
    question: params.params.row.question,
    cerfcode: params.params.row.cerfcode,
    formcode: params.params.row.formcode,
  };

  //Hook and Logic
  //Get Choice From tbchoice by questioncode
  const [choiceLists, setChoiceLists] = useState();
  console.log(choiceLists);

  useEffect(() => {
    if (!params?.params?.row?.questioncode) return;
    var configChoice = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/getchoicebyquestioncode/${params.params.row.questioncode}`,
      headers: { authtoken: "bearer " + token },
    };
    axios(configChoice)
      .then((res) => {
        const fetchChoices = res.data;
        const initialstate = {
          id: params.params.row.id,
          questioncode: params.params.row.questioncode,
          problem: params.params.row.problem,
          question: params.params.row.question,
          cerfcode: params.params.row.cerfcode,
          formcode: params.params.row.formcode,
        };
        fetchChoices.forEach((choice) => {
          initialstate[choice.choicecode] = choice.choicetext;
        });

        setChoiceLists(initialstate);
      })
      .catch((error) => {
        console.error("Error fetching choice data:", error);
      });
  }, [params]);
  //open-close Dialog & set scroll type paper
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [values, setValues] = useState(initialstate);
  //console.log(values);

  const [fileProblem, setFileProblem] = useState("");
  //wait for change
  const [formValues, setFormValues] = useState({
    id: {
      value: params.params.row.id,
    },
    questioncode: {
      value: params.params.row.questioncode,
    },
    problem: {
      value: params.params.row.problem,
      error: false,
      errorMessage: "You must Upload file or enter file name",
    },
    question: {
      value: params.params.row.question,
      error: false,
      errorMessage: "You must enter a Question",
    },
    cerfcode: {
      value: params.params.row.cerfcode,
    },
    formcode: {
      value: params.params.row.formcode,
    },
  });

  //Event Handler
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValues(initialstate);
  };

  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setChoiceLists({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

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
      } else {
        toast.error("accept only File .txt or .mp3 ");
        return;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const questionAndChoice = await {
      questioncode: params.params.row.questioncode,
      problem: data.get("problem"),
      question: data.get("question"),
      cerfcode: params.params.row.cerfcode,
      formcode: params.params.row.formcode,
    };

    if (fileProblem !== "") {
      const formData = await new FormData();
      formData.append("file", fileProblem);

      var extendName = values.problem.split(".")[1];
      if (extendName.toString() === "txt") {
        axios
          .post(process.env.REACT_APP_API_URL + "/upload", formData, {
            headers: {
              authtoken: "bearer " + token,
            },
          })
          .then((res) => {
            toast.success(res.data.msg);
          });
      } else if (extendName.toString() === "mp3") {
        axios
          .post(process.env.REACT_APP_API_URL + "/uploadsound", formData, {
            headers: {
              authtoken: "bearer " + token,
            },
          })
          .then((res) => {
            toast.success(res.data.msg);
          });
      }
    }

    editQuestionAndChoice(questionAndChoice, token)
      .then((res) => {
        toast.success(res.data.msg, { onClose: () => navigate(0) });
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
    //navigate(0);
    //handleClose();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          startIcon={<Edit />}
          onClick={() => {
            handleClickOpen();
          }}
        >
          EDIT
        </Button>
      </ThemeProvider>

      {/* Dialog Edit โจทย์ข้อสอบรายบรรทัด */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === "paper"} sx={{ width: "600px" }}>
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
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ลำดับ"
                  name="id"
                  value={values?.id || ""}
                  required
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสโจทย์"
                  name="questioncode"
                  value={values?.questioncode || ""}
                  required
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ไฟล์โจทย์"
                  name="problem"
                  value={values?.problem || ""}
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <input
                  accept={
                    values?.cerfcode === "R1A1" ||
                    values?.cerfcode === "R1A2" ||
                    values?.cerfcode === "R1B1" ||
                    values?.cerfcode === "R1B2" ||
                    values?.cerfcode === "R1C1"
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

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="โจทย์"
                  name="question"
                  value={values?.question || ""}
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                {values?.cerfcode === "L2C1" && (
                  <>
                    <input
                      accept=".mp3"
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
                        อัพโหลดไฟล์โจทย์ (นามสกุล .mp3)
                      </Button>
                    </label>
                  </>
                )}

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก (ถูก)"
                  name={`${params.params.row.questioncode}CH01`}
                  value={
                    choiceLists?.[`${params.params.row.questioncode}CH01`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params.params.row.questioncode}CH02`}
                  value={
                    choiceLists?.[`${params.params.row.questioncode}CH02`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params.params.row.questioncode}CH03`}
                  value={
                    choiceLists?.[`${params.params.row.questioncode}CH03`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params.params.row.questioncode}CH04`}
                  value={
                    choiceLists?.[`${params.params.row.questioncode}CH04`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสความสามารถ"
                  name="cerfcode"
                  value={values?.cerfcode || ""}
                  required
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสฟอร์มข้อสอบ"
                  name="formcode"
                  value={values?.formcode || ""}
                  required
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

export default ModalEditExamByCerfcode;
