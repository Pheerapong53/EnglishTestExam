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
  //Hook and Logic
  const [choiceLists, setChoiceLists] = useState({});
  console.log(choiceLists);

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
  //Event Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //editChoice
    editChoice(choiceLists, token)
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
    console.log("Form Submitted :", choiceLists);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setChoiceLists((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
                <Typography>ลำดับ:{params?.row.id}</Typography>
                <Typography>รหัสโจทย์: {params?.row.questioncode}</Typography>
                <Typography>ไฟล์โจทย์: {params?.row.problem}</Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ไฟล์โจทย์"
                  name="problem"
                  value={choiceLists?.problem || ""}
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
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
                />
                <Typography>
                  ตัวเลือก (ถูก): {`${params?.row?.questioncode}CH01` || "N/A"}
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก (ถูก)"
                  name={`${params?.row?.questioncode}CH01`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH01`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <Typography>
                  ตัวเลือก2: {`${params?.row?.questioncode}CH02` || "N/A"}
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params?.row?.questioncode}CH02`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH02`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <Typography>
                  ตัวเลือก3: {`${params?.row?.questioncode}CH03` || "N/A"}
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params?.row?.questioncode}CH03`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH03`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <Typography>
                  ตัวเลือก4: {`${params?.row?.questioncode}CH04` || "N/A"}
                </Typography>
                <TextField
                  sx={{ margin: "10px" }}
                  id="outlined-basic"
                  label="ตัวเลือก"
                  name={`${params?.row?.questioncode}CH04`}
                  value={
                    choiceLists?.[`${params?.row?.questioncode}CH04`] || ""
                  }
                  required
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <Typography>รหัสความสามารถ: {params?.row.cerfcode}</Typography>
                <Typography>รหัสฟอร์มข้อสอบ: {params?.row.formcode}</Typography>
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
