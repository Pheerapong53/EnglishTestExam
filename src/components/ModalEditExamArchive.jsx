/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";
import { editCefrLevelHandler } from "./functions/cefrLevel";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    secondary: {
      main: yellow[500],
    },
  },
});

function ModalEditExamArchive(props) {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();
  //initialstate from ContentPageExamArchive
  const initialstate = {
    cerfcode: props.cerfcode,
    cerfdifficultylevel: props.cerfdifficultylevel,
    cerfdifficultyleveldesc: props.cerfdifficultyleveldesc,
    cerfleveltype: props.cerfleveltype,
  };

  //Hook and Logic
  const formRef = useRef(null);
  //open-close Modal
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [values, setValues] = useState(initialstate);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleConfirmSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    handleCloseDialog();
  };

  //handleSubmit to edit tbcefrdifficultylevel
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const cefrLevel = await {
      cerfcode: props.cerfcode,
      cerfdifficultylevel: data.get("cerfdifficultylevel"),
      cerfdifficultyleveldesc: data.get("cerfdifficultyleveldesc"),
      cerfleveltype: data.get("cerfleveltype"),
    };
    editCefrLevelHandler(cefrLevel, token)
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
            handleOpen();
          }}
        >
          EDIT
        </Button>
      </ThemeProvider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" ref={formRef} onSubmit={handleSubmit}>
          <Typography
            id="modal-modal-title"
            sx={{ textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            แก้ไขประเภทข้อสอบ
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
              sx={{ margin: "10px" }}
              id="outlined-basic"
              label="รหัสความสามารถทางภาษาอังกฤษสากล"
              variant="outlined"
              name="cerfcode"
              value={values.cerfcode || ""}
              fullWidth
              onChange={handleChange}
              disabled
            />

            <TextField
              sx={{ margin: "10px" }}
              id="outlined-basic"
              label="ระดับความยากง่ายตามกรอบ CEFR"
              variant="outlined"
              name="cerfdifficultylevel"
              value={values.cerfdifficultylevel || ""}
              fullWidth
              onChange={handleChange}
            />

            <TextField
              sx={{ margin: "10px" }}
              id="outlined-basic"
              label="คำอธิบายระดับความยากง่ายตามกรอบ CEFR"
              value={values.cerfdifficultyleveldesc || ""}
              variant="outlined"
              name="cerfdifficultyleveldesc"
              fullWidth
              onChange={handleChange}
            />

            <TextField
              sx={{ margin: "10px" }}
              id="outlined-basic"
              label="ประเภทของการวัดทักษะ"
              value={values.cerfleveltype || ""}
              variant="outlined"
              name="cerfleveltype"
              fullWidth
              onChange={handleChange}
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
                variant="contained"
                style={{
                  textDecoration: "none",
                }}
                onClick={handleOpenDialog}
              >
                บันทึก
              </Button>
            </Box>
          </Box>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>ยืนยันการบันทึก</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ยืนยันการบันทึก กรุณาตรวจสอบความถูกต้องก่อนการดำเนินการ
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
                color="primary"
                onClick={handleConfirmSubmit}
              >
                ยืนยัน
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Modal>
    </>
  );
}

export default ModalEditExamArchive;
