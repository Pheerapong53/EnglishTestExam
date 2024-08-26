/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import { addCefrLevelHandler } from "./functions/cefrLevel";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ModalAddTypeExam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  //open-close Dialog
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValues(initialstate);
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

  //กำหนดค่าเริ่มต้น for เพิ่มประเภทข้อสอบ
  const initialstate = {
    cerfcode: "",
    cerfdifficultylevel: "",
    cerfdifficultyleveldesc: "",
    cerfleveltype: "",
  };

  const [values, setValues] = useState(initialstate);

  //handleChange in text TextField
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  //handleSubmit to add tbcefrdifficultylevel
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const addTypeExam = await {
      cerfcode: data.get("cerfcode"),
      cerfdifficultylevel: data.get("cerfdifficultylevel"),
      cerfdifficultyleveldesc: data.get("cerfdifficultyleveldesc"),
      cerfleveltype: data.get("cerfleveltype"),
    };
    handleClose();

    confirmAlert({
      title: "ยืนยันการบันทึก",
      message: `คุณต้องการที่เพิ่มระดับความยากง่าย ${addTypeExam.cerfcode} จะแก้ไขข้อมูลใช่หรือไม่`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addCefrLevelHandler(addTypeExam, token)
              .then((res) => {
                toast.success(res.data.msg, { onClose: () => navigate(0) });
              })
              .catch((error) => {
                if (
                  error.response.status === 401 ||
                  error.response.status === 404
                ) {
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
          },
        },
        {
          label: "No",
          onClick: () => {
            navigate(0);
          },
        },
      ],
    });

  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ marginLeft: "10px" }}
        startIcon={<AddIcon />}
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

export default ModalAddTypeExam;
