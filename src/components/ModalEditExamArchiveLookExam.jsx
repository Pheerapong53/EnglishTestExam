import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[500],
    },
  },
});

function ModalEditExamArchiveLookExam(params) {
  //open-close Dialog & set scroll type paper
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
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

  //initialstate from Datagrid
  const initialstate = {
    id: params.params.row.id,
    questioncode: params.params.row.questioncode,
    problem: params.params.row.problem,
    question: params.params.row.question,
    choicecodeT: params.params.row.choicecodeT,
    choiceTextT: params.params.row.choiceTextT,
    choicecodeF1: params.params.row.choicecodeF1,
    choiceTextF1: params.params.row.choiceTextF1,
    choicecodeF2: params.params.row.choicecodeF2,
    choiceTextF2: params.params.row.choiceTextF2,
    choicecodeF3: params.params.row.choicecodeF3,
    choiceTextF3: params.params.row.choiceTextF3,
    cerfcode: params.params.row.cerfcode,
    formcode: params.params.row.formcode,
  };

  const [values, setValues] = useState(initialstate);
  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    params.onRowValueChange(values);
    handleClose();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          startIcon={<EditIcon />}
          onClick={handleClickOpen("paper")}
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
          <DialogContentText
            id="scroll-dialog-description"
            //ref={descriptionElementRef}
            tabIndex={-1}
          >
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
                  value={values.id || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสโจทย์"
                  name="questioncode"
                  value={values.questioncode || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ไฟล์โจทย์"
                  name="problem"
                  value={values.problem || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="โจทย์"
                  name="question"
                  value={values.question || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก(ถูก)"
                  name="choiceTextT"
                  value={values.choiceTextT || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="choiceTextF1"
                  value={values.choiceTextF1 || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="choiceTextF2"
                  value={values.choiceTextF2 || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name="choiceTextF3"
                  value={values.choiceTextF3 || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสความสามารถ"
                  name="cerfcode"
                  value={values.cerfcode || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
                  fullWidth
                  variant="outlined"
                  disabled
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="รหัสฟอร์มข้อสอบ"
                  name="formcode"
                  value={values.formcode || ""}
                  required
                  onChange={handleChange}
                  //error={values.problem === undefined ? true : false}
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
                  {/* <Link to="#" style={{ textDecoration: "none" }}> */}
                  <Button type="submit" variant="contained">
                    บันทึก
                  </Button>
                  {/* </Link> */}
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalEditExamArchiveLookExam;
