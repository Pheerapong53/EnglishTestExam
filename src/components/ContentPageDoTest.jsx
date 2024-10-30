/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { start } from "../store/TestInfoSlice";
import { logout } from "../../src/store/userSilce";

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
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[800],
    },
  },
});

function ContentPageDoTest() {
  //Component Declaration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const pers_id = user?.pers_id;
  const generateConfig = (method, endpoint) => {
    return {
      method: `${method}`,
      url: process.env.REACT_APP_API_URL + `${endpoint}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };
  };

  //handle Error 401,404 from server
  const handleError401and404 = (error) => {
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
  };

  //Hooks and Logic
  //State for video intro
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    var config = generateConfig("GET", "/testmgmt/introvideofiles");
    axios(config)
      .then((response) => {
        setVideoUrl(response.data);
      })
      .catch((error) => {
        handleError401and404(error);
      });
  }, []);
  console.log("Video Intro URL: ", videoUrl);

  // const pers_id = "1111111111111";

  //State for fetches test reservation data based on 'pers_id' from 'testresult' and associates it with 'testresvcode'
  const [testResultInfo, setTestResultInfo] = useState([]);
  console.log("testResultInfo : ", testResultInfo);

  //server/routes/test_info/test.js -> gettestresult
  useEffect(() => {
    var config = generateConfig("GET", `/gettestresult?pers_id=${pers_id}`);
    axios(config)
      .then((response) => {
        setTestResultInfo(response.data);
      })
      .catch((error) => {
        handleError401and404(error);
      });
  }, []);

  //State for testreservation data
  const [testReservationInfo, setTestReservationInfo] = useState([]);
  console.log("TestReservationInfo : ", testReservationInfo);

  //server/routes/test_info/test.js -> gettestreservationinfo
  useEffect(() => {
    var config = generateConfig("GET", "/gettestreservationinfo");
    axios(config)
      .then((response) => {
        setTestReservationInfo(response.data);
      })
      .catch((error) => {
        handleError401and404(error);
      });
  }, []);
  //console.log(testReservationInfo);

  //State for testreservation data when a valid reservation code is entered
  const [testInfo, setTestInfo] = useState([]);
  console.log("Test Info : ", testInfo);

  //State for entered code used for test admission
  const [appvCode, setAppvCode] = useState([]);

  const handlePasswordChange = (event) => {
    setAppvCode(event.target.value);
  };

  //function ตรวจสอบรหัสการสอบที่ผู้ใช้กรอก appvCode กับ realscoredate
  const handleCheckPassword = () => {
    const isValid = testResultInfo?.some(
      (obj) =>
        obj["tbtestreservation.testappvcode"] === appvCode &&
        obj["realscoredate"] === null
    );
    const isTest = testResultInfo?.some(
      (obj) =>
        obj["tbtestreservation.testappvcode"] === appvCode &&
        obj["realscoredate"] !== null
    );
    if (isValid || appvCode === "test") {
      toast.success("รหัสถูกต้อง");
      for (let i = 0; i < testReservationInfo.length; i++) {
        if (testReservationInfo[i]["testappvcode"] === appvCode) {
          setTestInfo(testReservationInfo[i]);
        }
        handleOpenDialog();
      }
    } else if (isTest) {
      toast.error("รหัสนี้ได้ดำเนินการทดสอบแล้ว");
    } else {
      toast.error("รหัสไม่ถูกต้อง");
    }
  };

  const updateTestInfo = () => {
    //ต้องลบออกจาก Redux
    dispatch(start(testInfo?.testresvcode));
    handleCloseDialog();
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  // เปิด-ปิด หน้ากรอกรหัสเข้าทดสอบ
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    testResultInfo.length !== 0
      ? setOpen(true)
      : toast.error("คุณยังไม่ได้จองการทดสอบ");
  };
  const handleClose = () => setOpen(false);

  //เปิด-ปิด Dialog แสดงข้อมูลการสอบ ภารกิจ + คะแนนขั้นต่ำ
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        elevation={6}
      >
        {/* เนื้อหาคำอธิบาย+วีดีโอ */}
        <CardContent>
          <Typography
            sx={{ fontSize: 26, textAlign: "center", fontWeight: "bold" }}
            color="#000"
            gutterBottom
          >
            ชุดข้อสอบภาษาอังกฤษ
          </Typography>

          <Typography
            sx={{ fontSize: 14, textAlign: "center", fontWeight: 600 }}
            color="text.secondary"
            gutterBottom
          >
            คลิปวีดีโอแนะนำการทดสอบ
          </Typography>

          <>
            {videoUrl?.length !== 0 ? (
              // <ReactPlayer url={videoUrl} />
              <CardMedia
                component={"video"}
                sx={{ height: 280 }}
                src={
                  // `${process.env.REACT_APP_API_URL}/testmgmt/singleintrovideofile/VDO-2576-435511.mp4`
                  `${process.env.REACT_APP_API_URL}/introvideo`
                }
                autoPlay
                controls
              />
            ) : (
              <p>No Video available</p>
            )}
          </>

          <Typography
            sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}
            color="text.secondary"
            gutterBottom
          >
            คุณต้องมีรหัสในการทำแบบทดสอบนี้
          </Typography>

          <Typography
            sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}
            color="text.secondary"
            gutterBottom
          >
            คุณมีเวลา 90 นาที
          </Typography>
        </CardContent>

        <CardActions sx={{ width: "25%" }}>
          {/* Button เริ่มทำแบบทดสอบ เพื่อเข้าสู่หน้ากรอกรหัสทดสอบ */}
          <Button
            sx={{ marginTop: "-30px" }}
            size="large"
            variant="contained"
            fullWidth
            onClick={handleOpen}
          >
            พร้อมทำแบบทดสอบ คลิก
          </Button>

          {/* Modal ใส่รหัสเข้าทดสอบ appvCode */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Password
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center" }}
              >
                คุณต้องมีรหัสในการทำแบบทดสอบนี้
              </Typography>
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  onChange={handlePasswordChange}
                />
              </Box>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "left", fontSize: 14 }}
                component={"span"}
              >
                <ul>
                  <li style={{ cursor: "pointer" }}>
                    ระยะเวลาการทดสอบ 90 นาที
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    เมื่อกดปุ่ม "เริ่มต้นทำแบบทดสอบ" เวลาจะเริ่มนับถอยหลัง
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    ระบบจะปิดอัตโนมัติเมื่อครบ 90 นาที
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    สามารถกด Submit เพิ่อส่งคำตอบ หากทำเสร็จก่อนหมดเวลา
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    สามารถย้อนกลับเพื่อแก้ไขคำตอบได้
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    สามารถฟังเสียงได้เพียงครั้งเดียว
                  </li>
                </ul>
              </Typography>
              <br />
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
                    onClick={() => {
                      handleCheckPassword();
                    }}
                  >
                    เริ่มต้นทำแบบทดสอบ
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>

          {/* Dialog แสดงข้อมูลการสอบ ภารกิจ + คะแนนขั้นต่ำ */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography
                sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}
                color="text.primary"
                gutterBottom
              >
                {`คุณต้องการจะเข้าสอบภารกิจ "${testInfo["tbtestscoringcriterium.mission"]}" ประเทศ "${testInfo["country"]}" `}
              </Typography>
              {testInfo["tbtestscoringcriterium.tbcefrlevel.minscore"] > 0 && (
                <Typography
                  sx={{ fontSize: 18, textAlign: "center", fontWeight: 600 }}
                  color="text.primary"
                  gutterBottom
                >
                  {`โดยมีระดับคะแนนขั้นต่ำต้องผ่าน ${testInfo["tbtestscoringcriterium.tbcefrlevel.minscore"]} คะแนน `}
                </Typography>
              )}
              <ThemeProvider theme={theme}>
                <Typography
                  sx={{ fontSize: 20, textAlign: "center", fontWeight: 600 }}
                  color="primary"
                  gutterBottom
                >
                  ระบบจะเริ่มสอบทันที ที่คุณกด "Start Test"
                </Typography>
              </ThemeProvider>
              <Typography
                sx={{ fontSize: 16, textAlign: "center", fontWeight: 600 }}
                color="text.secondary"
                gutterBottom
              >
                ***โปรดตรวจสอบชื่อภารกิจให้ถูกต้อง
              </Typography>
              <Typography
                sx={{ fontSize: 16, textAlign: "center", fontWeight: 600 }}
                color="text.secondary"
                gutterBottom
              >
                ***หากชื่อภารกิจการสอบไม่ถูกต้องกรุณากรอกรหัสเข้าทดสอบใหม่
                หรือติดต่อเจ้าหน้าที่เกี่ยวข้อง
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateTestInfo();
                  //handleCloseDialog();
                  navigate("/PageTest", {
                    state: testInfo,
                  });
                  localStorage.clear();
                }}
              >
                Start Test
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </>
  );
}

export default ContentPageDoTest;
