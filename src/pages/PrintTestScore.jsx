import React, { useRef, forwardRef } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material/Box";
import logo from "../img/logo.png";
import bas from "../img/bas.jpg";
import ImageList from "@mui/material/ImageListItem";
import qrcode from "../img/qrcode.jpg";
import moment from "moment";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
require("moment/locale/th");
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PrintTestScore({
  pers_id,
  mem_rank,
  mem_fname,
  mem_lname,
  testconductdate,
  mem_affiliation,
  mission,
  testresultapprvdate,
  minscore,
  realscore,
  editscore,
  testresultapprv,
  mem_email,
  testappvcode,
  dateappove,
  testreqdate,
}) {
  const [open, setOpen] = React.useState(false);
  const [getImage, setgetImage] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    // paperContainer: {
    //   backgroundImage: `url(${logo})`,
    //   height: "100%",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   filter: "blur(8px)",
    // },
    paperContainer: {
      backgroundImage: `url(${logo})`,
      height: "200%",
      width: "100%",
      top: 0,
      left: 0,
      position: "absolute",
      backgroundSize: "cover",
      PointerEvent: "none",
      filter: "blur(9px)",
    },
    textblur: {
      backgroundColor: "rgba(255, 255, 255,0.9)",
      position: "absolute",
      width: "100vw",
    },
  };

  const getPageMargin = () => {
    return `
  @page {
    size: A4;
    margin: 0mm 0mm 0mm 0mm; /* Adjust the margin values as needed */
    height: 100%;
    width:100%;
    
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
      margin: 10mm 5mm 5mm 0mm;
      
    }
    ::after {
      content: "";
      background-image: url('${logo}'); /* Set your logo image path */
      background-repeat: no-repeat;
      background-size: contain; /* Adjust as needed */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.008; /* Adjust the opacity of the watermark */
      width: 100%; /* Set the width of the watermark image */
      height: 100%; /* Set the height of the watermark image */
      z-index: -20;
      // filter: blur(9px)
     
    }
   
    }
  `;
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    pageStyle: getPageMargin(),
    onAfterPrint: () => alert("Print success"),
  });

  const date = moment(testreqdate).add(543, "year").format("DD MMMYY");
  const year = date.substring(7, 9);
  const navigate = useNavigate();
  const AppDate = date.split(" ")[0];
  const AppMouht = date
    .split(" ")[1]
    .substring(0, date.split(" ")[1].length - 2);
  const AppYeay = date.split(".")[2];
  const numbereay = parseInt(AppYeay, 10) + 1;
  const apprvyear = parseInt(moment(AppYeay).add(543, "year").format("YY")) + 1;

  const getImageApi = async () => {
    // console.log("realscore",realscore)
    await Axios.get(
      `https://otp.rtaf.mi.th/api/gateway/VnJOSTl5ZldBQVBkWnlKc2ZkN3NGhGbnhtNFJTVHUzS3BfWlRvd2/personalPicture/${mem_email}/base64`
    )
      .then((res) => {
        setgetImage(res.data);
        // console.log("res.data: ",res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getImageApi();
  }, []);
  const checkScore =
    editscore === null || editscore === 0 ? realscore : editscore;
  const myObjects = {
    mem_email: mem_email,
    getImageResult: getImage.result,
    // getImagePicture_base64: getImage.picture_base64,
    mem_rank: mem_rank,
    mem_fname: mem_fname,
    mem_lname: mem_lname,
    pers_id: pers_id,
    date: date,
    mem_affiliation: mem_affiliation,
    mission: mission,
    editscore: editscore,
    realscore: realscore,
    AppDate: AppDate,
    AppMouht: AppMouht,
    numbereay: numbereay,
    checkScore: checkScore,
  };
  // console.log("myObjects",myObjects);

  const serializedData = JSON.stringify(myObjects);
  // console.log("serializedData",serializedData);
  const encodedData = encodeURIComponent(serializedData);
  // console.log("encodedData",encodedData);
  const handleQRCodeScan = (data) => {
    // Redirect to the QR code page with the scanned ID
    navigate(`/PagePrintTestScoreMobile/${data}`);
  };

  // const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTestScoreMobile/${encodedData}`;
  const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTestScoreMobile?data=${encodedData}`;
  // const testxxx =
  // console.log("testxxx: ",testxxx)

  const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // lg
  const isMediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1199px)"
  ); // md
  const isSmallScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  ); // sm
  const isExtraSmallScreen = useMediaQuery("(max-width: 599px)"); // xs

  return (
    <>
      {testresultapprv === null ? (
        <IconButton>
          <PrintIcon />
        </IconButton>
      ) : (
        <IconButton color="primary" onClick={handleClickOpen}>
          <PrintIcon />
        </IconButton>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon sx={{ color: "#000000" }} />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, color: "#000000" }}
              variant="h6"
              component="div"
            >
              พิมพ์ผลสอบ
            </Typography>
            <Button
              autoFocus
              variant="contained"
              className="blob"
              onClick={handlePrint}
            >
              print
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "800px", height: "100%" }} >
        <Box
            style={{
              backgroundImage: `url(${logo})`,
              ...styles.paperContainer,
            }}
          />
<Box sx={{
              width: "100%",
              height: "100%",
              zIndex: "20",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "0px",
              minHeight: "100vh",
              backgroundColor: "rgba(255, 255, 255,0.7)",
             
            }}
            ref={componentRef}
            >
 <Box sx={{ width: "740px", height: "100px", display: "flex" }}  >
            <Box>
              <ImageList sx={{ width: 100, height: 100, padding: 2 }}>
                <img src={logo} alt="logo" />
              </ImageList>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2F5597", fontWeight: "bold" }}
                >
                  ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "640px",
                  height: "50px",
                  backgroundColor: "#2F5597",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#ffffff", fontSize: "16px" }}
                >
                  รายงานผลคะแนนการทดสอบภาษาอังกฤษ (รายบุคคล)
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "740px",
              height: "440px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
          
            <Box sx={{ width: "150px", height: "350px" }}>
              <Box>
                <ImageList sx={{ width: "150px", margin: "10px" }}>
                  <img
                    src={
                      getImage.result === "Process-Complete"
                        ? `data:image/jpeg;base64,${getImage.picture_base64}`
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    alt="logo"
                  />
                </ImageList>
              </Box>
            </Box>

            <Box
              sx={{
                width: "295px",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                marginLeft: "30px",
              }}
            >
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ยศ-ชื่อ-นามสกุล
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mem_rank + mem_fname + " " + mem_lname}
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  หมายเลขประจำตัวประชาชน
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {pers_id}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ทดสอบเมื่อ
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "red", fontSize: "16px" }}
                    >
                      {date === "Invalid date" ? "-" : date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "60px" }}>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      สังกัด
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "#2F5597", fontSize: "16px" }}
                    >
                      {mem_affiliation}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  รายการทดสอบ
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mission === "ทดสอบภาษาอังกฤษประจำปี"
                    ? "โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล ทอ.ประจำปี " +
                      year +
                      " (สังกัด " +
                      mem_affiliation +
                      ")"
                    : mission}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "295px", height: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "148px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "148px",
                    height: "20%",
                    backgroundColor: "#2F5597",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    ผลคะแนน <br />
                    การทดสอบ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "148px",
                    height: "53.8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                  }}
                >
                  <Box sx={{ position: "absolute", filter: "blur(2px)" }}>
                    <ImageList sx={{ width: 80, height: 80 }}>
                      <img src={logo} alt="logo" />
                    </ImageList>
                  </Box>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: "red",
                      fontSize: "60px",
                      fontWeight: "bold",
                      zIndex: "9999",
                    }}
                  >
                    {editscore === null || editscore === 0
                      ? realscore
                      : editscore}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width: "148px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    CEFR <br />
                    Level
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "147px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "147px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <QRCodeCanvas
                    value={testxxx}
                    size={147}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    imageSettings={{
                      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                 
                  />
                </Box>
                <Box
                  sx={{
                    width: "147px",
                    height: "10%",
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "60px",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "16px" }}
                  >
                    Verify
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "147px",
                    height: "30%",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#000000", fontSize: "14px" }}
                  >
                    ผลคะแนน <br />
                    ใช้ได้ถึง <br />
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "red", fontSize: "14px" }}
                  >
                    {AppDate} {AppMouht}
                    {numbereay}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width: "147px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    {checkScore >= 10 && checkScore <= 26
                      ? "A1"
                      : checkScore >= 27 && checkScore <= 47
                      ? "A2"
                      : checkScore >= 48 && checkScore <= 77
                      ? "B1"
                      : checkScore >= 78 && checkScore <= 89
                      ? "B2"
                      : checkScore >= 90 && checkScore <= 100
                      ? "C1"
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "740px",
              height: "50px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize: "12px" }}
            >
              เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย{" "}
              <br />
              หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
              โทร.02-534-2965
            </Typography>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize: "12px" }}
            >
              ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            </Typography>
          </Box>
</Box>
        </Box>
        {/* <Box
         
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "fixed",
            "::after": {
              content: '""',
              backgroundImage: `url(${logo})`,
           
              backgroundSize: "cover", // or 'contain', adjust as needed
              backgroundPosition: "center",
              position: "absolute",
              opacity: 0.1, // Adjust the opacity of the watermark
              width: "100%", // Set the width of the watermark image
              height: "100%", // Set the height of the watermark image
              zIndex: "-20",
            },
          }}
       
          ref={componentRef}
        >
          <Box sx={{ width: "740px", height: "100px", display: "flex" }}>
            <Box>
              <ImageList sx={{ width: 100, height: 100, padding: 2 }}>
                <img src={logo} alt="logo" />
              </ImageList>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2F5597", fontWeight: "bold" }}
                >
                  ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "640px",
                  height: "50px",
                  backgroundColor: "#2F5597",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#ffffff", fontSize: "16px" }}
                >
                  รายงานผลคะแนนการทดสอบภาษาอังกฤษ (รายบุคคล)
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "740px",
              height: "440px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
          
            <Box sx={{ width: "150px", height: "350px" }}>
              <Box>
                <ImageList sx={{ width: "150px", margin: "10px" }}>
                  <img
                    src={
                      getImage.result === "Process-Complete"
                        ? `data:image/jpeg;base64,${getImage.picture_base64}`
                        : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    }
                    alt="logo"
                  />
                </ImageList>
              </Box>
            </Box>

            <Box
              sx={{
                width: "295px",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                marginLeft: "30px",
              }}
            >
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ยศ-ชื่อ-นามสกุล
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mem_rank + mem_fname + " " + mem_lname}
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  หมายเลขประจำตัวประชาชน
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {pers_id}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ทดสอบเมื่อ
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "red", fontSize: "16px" }}
                    >
                      {date === "Invalid date" ? "-" : date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "60px" }}>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      สังกัด
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "#2F5597", fontSize: "16px" }}
                    >
                      {mem_affiliation}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  รายการทดสอบ
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mission === "ทดสอบภาษาอังกฤษประจำปี"
                    ? "โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล ทอ.ประจำปี " +
                      year +
                      " (สังกัด " +
                      mem_affiliation +
                      ")"
                    : mission}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "295px", height: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "148px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "148px",
                    height: "20%",
                    backgroundColor: "#2F5597",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    ผลคะแนน <br />
                    การทดสอบ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "148px",
                    height: "53.8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                  }}
                >
                  <Box sx={{ position: "absolute", filter: "blur(2px)" }}>
                    <ImageList sx={{ width: 80, height: 80 }}>
                      <img src={logo} alt="logo" />
                    </ImageList>
                  </Box>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: "red",
                      fontSize: "60px",
                      fontWeight: "bold",
                      zIndex: "9999",
                    }}
                  >
                    {editscore === null || editscore === 0
                      ? realscore
                      : editscore}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width: "148px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    CEFR <br />
                    Level
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: "147px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "147px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <QRCodeCanvas
                    value={testxxx}
                    size={147}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    imageSettings={{
                      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                      x: undefined,
                      y: undefined,
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                 
                  />
                </Box>
                <Box
                  sx={{
                    width: "147px",
                    height: "10%",
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "60px",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "16px" }}
                  >
                    Verify
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "147px",
                    height: "30%",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#000000", fontSize: "14px" }}
                  >
                    ผลคะแนน <br />
                    ใช้ได้ถึง <br />
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "red", fontSize: "14px" }}
                  >
                    {AppDate} {AppMouht}
                    {numbereay}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width: "147px",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "20px" }}
                  >
                    {checkScore >= 10 && checkScore <= 26
                      ? "A1"
                      : checkScore >= 27 && checkScore <= 47
                      ? "A2"
                      : checkScore >= 48 && checkScore <= 77
                      ? "B1"
                      : checkScore >= 78 && checkScore <= 89
                      ? "B2"
                      : checkScore >= 90 && checkScore <= 100
                      ? "C1"
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "740px",
              height: "50px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize: "12px" }}
            >
              เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย{" "}
              <br />
              หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
              โทร.02-534-2965
            </Typography>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize: "12px" }}
            >
              ------------------------------------------------------------------------------------------------------------------------------------------------------------------
            </Typography>
          </Box>
        </Box> */}
      </Dialog>
    </>
  );
}

export default PrintTestScore;
