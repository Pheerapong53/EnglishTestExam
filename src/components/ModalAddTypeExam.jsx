/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { addCefrLevelHandler } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";

function ModalAddTypeExam() {
  //Component Declaration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const initialstate = {
    cerfcode: "",
    cerfdifficultylevel: "",
    cerfdifficultyleveldesc: "",
    cerfleveltype: "",
  };

  //Hook and Logics
  const formRef = useRef(null);
  const [values, setValues] = useState(initialstate);
  //open-close Dialog
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [openDialog, setOpenDialog] = useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //Event Handle
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValues(initialstate);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
    handleCloseDialog();
  };

  //handleSubmit to add tbcefrdifficultylevel
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.target);
    // eslint-disable-next-line no-console
    const addTypeExam = await {
      cerfcode: data.get("cerfcode"),
      cerfdifficultylevel: data.get("cerfdifficultylevel"),
      cerfdifficultyleveldesc: data.get("cerfdifficultyleveldesc"),
      cerfleveltype: data.get("cerfleveltype"),
    };

    try {
      const res = await addCefrLevelHandler(addTypeExam, token);
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

  //Render
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginLeft: "10px" }}
        startIcon={<Add />}
      >
        เพิ่มประเภทข้อสอบ
      </Button>

      {/* Dialog เพิ่มประเภทข้อสอบ */}
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
            <Box component="form" ref={formRef} onSubmit={handleSubmit}>
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
                เพิ่มประเภทข้อสอบ
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
                  fullWidth
                  value={values.cerfcode}
                  required
                  onChange={handleChange}
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ระดับความยากง่ายตามกรอบ CEFR"
                  name="cerfdifficultylevel"
                  value={values.cerfdifficultylevel}
                  required
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="คำอธิบายระดับความยากง่ายตามกรอบ CEFR"
                  name="cerfdifficultyleveldesc"
                  value={values.cerfdifficultyleveldesc}
                  required
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />

                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ประเภทการวัดข้อสอบ"
                  name="cerfleveltype"
                  value={values.cerfleveltype}
                  required
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
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
                    onClick={handleOpenDialog}
                    // type="submit"
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
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalAddTypeExam;
