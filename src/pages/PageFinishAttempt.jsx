import React from "react";
import Navbar from "../components/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from "react-toastify";
import { finish } from "../store/TestInfoSlice";

//Functions
import { addTestResult } from "../components/functions/TestResult";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PageFinishAttempt() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { testinfo } = useSelector((state) => ({ ...state }));
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  const delTestInfo = () => {
    //ต้องลบออกจาก Redux
    dispatch(finish());
  };

  //from redux
  const testResvCode = testinfo.testresvcode;

  const dateTime = new Date();

  const QuestionFromState = location.state;
  const navigate = useNavigate();
  const rows = location.state?.data?.map((question, i) => ({
    no: ++i,
    status: question.onAnswer,
  }));

  const score = QuestionFromState?.data?.reduce(
    (total, question) => total + question.Score,
    0
  );
  const time = location.state?.time;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [open, setOpen] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenS = () => {
    setOpen((value) => !value);
    setOpenS(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseS = () => {
    setOpenS(false);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const [formValues, setFormValues] = useState({
    testresultcode: `${testResvCode}-${user.pers_id}`,
    testresvcode: testResvCode,
    meminfo_id: user.pers_id,
    realscore: score,
    testconductdate: dateTime,
    realscoredate: dateTime,
    realscorerecorder: user.pers_id,
    submittime: dateTime.toLocaleTimeString('it','THAI'),
  });

  const handleSubmit = async () => {
    // console.log(formValues);
    // delTestInfo();
    addTestResult(formValues, token)
      .then((res) => {
        toast.success(res.data.msg);
        delTestInfo();
        navigate("/PageDoTest");
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
      <Navbar />
      <Container>
        <DrawerHeader />
        <Typography component="div">
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Box
              sx={{ padding: "10px 0px ", display: "flex", marginLeft: "5px" }}
            >
              <Box
                component="span"
                sx={{
                  backgroundColor: "#eeeeee",
                  width: "100%",
                  height: "50px",
                }}
              >
                <span style={{ padding: "0px 10px " }}>
                  เลขประจำตัวข้าราชการ : {user.official_id}
                </span>
                <br />
                <span style={{ padding: "0px 10px " }}>
                  ชื่อ-นามสกุล : {user.rank}
                  {user.fname} {user.lname}
                </span>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
            ข้อสอบ เรื่อง{" "}
            {location.state?.testResvCode?.["tbtestscoringcriterium.mission"]}
          </Box>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>คำถาม</StyledTableCell>
                    <StyledTableCell align="right">สถานะ</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.no}>
                      <StyledTableCell component="th" scope="row">
                        {row.no}
                      </StyledTableCell>
                      {row.status !== null ? (
                        <StyledTableCell align="right" sx={{ color: "green" }}>
                          {"เลือกคำตอบแล้ว"}
                        </StyledTableCell>
                      ) : (
                        <StyledTableCell align="right" sx={{ color: "red" }}>
                          {"ยังไม่ได้เลือกคำตอบ"}
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              backgroundColor: "#eeeeee",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Link to="/PageTest" style={{ textDecoration: "none" }}> */}
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => {
                navigate("/PageTest", {
                  state: {
                    data: QuestionFromState,
                    realScore: location.state?.realScore,
                    time: location.state?.time,
                    url: "/PageFinishAttempt",
                    testresvcode: testResvCode,
                  },
                });
              }}
              disabled={time === 0 ? true : false}
            >
              ย้อนกลับเพื่อทำข้อสอบให้ครบ
            </Button>
            {/* </Link> */}
            <p style={{ marginTop: "10px" }}>
              ยืนยันคำตอบ ภายใน {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")} กดปุ่ม "ส่งคำตอบทั้งหมด"
              เพื่อส่งคำตอบ
            </p>

            <Button
              variant="contained"
              onClick={handleClickOpen}
              sx={{ marginTop: "10px" }}
            >
              ส่งคำตอบทั้งหมด
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
                {"ยืนยันคำตอบ"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{ textAlign: "center" }}
                  id="alert-dialog-description"
                >
                  หากกดปุ่ม "ยืนยัน" จะไม่สามารถเปลี่ยนแปลงคำตอบ
                  ระบบส่งคำตอบทั้งหมด และสิ้นสุดการทำแบบทดสอบทันที
                  <br />
                  ถ้าต้องการเปลี่ยนแปลงคำตอบให้กดปุ่ม "ยกเลิก"
                  เพื่อย้อนกลับไปเปลี่ยนคำตอบใหม่อีกครั้ง
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClickOpenS}>
                  ยืนยัน
                </Button>
                <Button color="error" onClick={handleClose} autoFocus>
                  ยกเลิก
                </Button>
              </DialogActions>
            </Dialog>
            {/* ซ้อน */}
            <Dialog
              open={openS}
              onClose={handleCloseS}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
                {"สิ้นสุดทำแบบทดสอบ"}
                <p style={{ fontSize: "14px" }}>หมดเวลาทำแบบทดสอบ</p>
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{ textAlign: "center" }}
                  id="alert-dialog-description"
                >
                  ส่งคำตอบเมื่อ {dateTime.toLocaleDateString()} เวลา{" "}
                  {dateTime.toLocaleTimeString()}
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Link to="/PageDoTest" style={{ textDecoration: "none" }}> */}
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                    handleCloseS();
                    localStorage.clear();
                    //toast.success("บันทึกข้อมูลผลสอบใน tbresult");
                  }}
                >
                  ตกลง
                </Button>
                {/* </Link> */}
              </DialogActions>
            </Dialog>
          </Box>
        </Typography>
        <DrawerHeader />
      </Container>
    </>
  );
}

export default PageFinishAttempt;
