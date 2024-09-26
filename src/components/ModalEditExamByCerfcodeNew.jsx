import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

function ModalEditExamByCerfcodeNew({ params, open, handleClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  //Hook and Logic
  const [choiceLists, setChoiceLists] = useState({});
  console.log(choiceLists);

  useEffect(() => {
    if (!params?.row?.questioncode) return;
    var configChoice = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/getchoicebyquestioncode/${params.row.questioncode}`,
      headers: { authtoken: "bearer " + token },
    };
    axios(configChoice)
      .then((res) => {
        const fetchChoices = res.data;
        const initialstate = {
          id: params.row.id,
          questioncode: params.row.questioncode,
          problem: params.row.problem,
          question: params.row.question,
          cerfcode: params.row.cerfcode,
          formcode: params.row.formcode,
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
  //Event Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted :", params.row);
  };
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
                <Typography>โจทย์: {params?.row.question}</Typography>
                <Typography>
                  ตัวเลือก (ถูก):{" "}
                  {choiceLists?.[`${params.row.questioncode}CH01`] || "N/A"}
                </Typography>
                <Typography>
                  ตัวเลือก (ถูก):{" "}
                  {choiceLists?.[`${params.row.questioncode}CH02`] || "N/A"}
                </Typography>
                <Typography>
                  ตัวเลือก (ถูก):{" "}
                  {choiceLists?.[`${params.row.questioncode}CH03`] || "N/A"}
                </Typography>
                <Typography>
                  ตัวเลือก (ถูก):{" "}
                  {choiceLists?.[`${params.row.questioncode}CH04`] || "N/A"}
                </Typography>
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
