/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../src/store/userSilce";
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
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state}));
  const token = user.user.token;
  
  const navigate = useNavigate();

  //open-close Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    //setValues(initialstate);
    setOpen(false);
  }
  
  //initialstate from ContentPageExamArchive
  const initialstate = {
    cerfcode: props.cerfcode,
    cerfdifficultylevel: props.cerfdifficultylevel,
    cerfdifficultyleveldesc: props.cerfdifficultyleveldesc
  };

  const [values, setValues] = useState(initialstate);

  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
    };
    handleClose();
    
    confirmAlert({
      title: "ยืนยันการบันทึก",
      message: "คุณต้องการที่จะแก้ไขข้อมูลใช่หรือไม่",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            editCefrLevelHandler(cefrLevel, token)
              .then((res) => {
                toast.success(res.data.msg);
                navigate(0);
              })
              .catch((error) => {
                if(error.response.status === 401 || error.response.status === 404){
                  dispatch(logout());
                  navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
                }else{
                  toast.error(error.response.data.message);
                } 
              });
          },
        },
        {
          label: "No",
          onClick: () => {navigate(0)},
        },
      ],
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
          startIcon={<EditIcon />}
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
        <Box 
          sx={style}
          component="form"
          onSubmit={handleSubmit}
          >
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
              label="ลักษณะข้อสอบ"
              variant="outlined"
              value="ไม่มีการเก็บค่าใน tbcefrdifficultylevel"
              fullWidth
              disabled
            />

            <TextField
              sx={{ margin: "10px" }}
              id="outlined-basic"
              label="ประเภทการวัดข้อสอบ"
              variant="outlined"
              value="ไม่มีการเก็บค่าใน tbcefrdifficultylevel"
              fullWidth
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
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    textDecoration: "none",
                  }}
                  >
                    บันทึก
                </Button>
              {/* </Link> */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalEditExamArchive;


