/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, forwardRef } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material/Box";
import logo from "../img/logo.png";
import command from "../img/command.jpg";
import ImageList from "@mui/material/ImageListItem";
import qrcode from "../img/qrcode.jpg";
import moment from "moment";
import Axios from 'axios'
import PagePrintTestScore from '../components/PagePrintTestScore'
import { QRCode } from 'react-qrcode-logo';
// import {QrReader} from 'react-qr-reader';
import {QRCodeCanvas} from 'qrcode.react';
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
  testreqdate
}) {
  const [open, setOpen] = React.useState(false);
  const [getImage, setgetImage] = React.useState([])
  //  console.log("mem_email",mem_email)
  // const myData = {
  //   pers_id: pers_id,
  //   mem_rank: mem_rank,
  //   mem_fname:mem_fname,
  //   mem_lname:mem_lname,
  //   testconductdate:testconductdate,
  //   mem_affiliation:mem_affiliation,
  //   mission:mission,
  //   testresultapprvdate:testresultapprvdate,
  //   minscore:minscore,
  //   realscore:realscore,
  //   editscore:editscore,
  //   testresultapprv:testresultapprv,
  //   mem_email:mem_email,
  // }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const styles = {
    paperContainer: {
      backgroundImage: `url(${logo})`,
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(8px)",
    },

    textblur: {
      backgroundColor: "rgba(255, 255, 255,0.9)",
      position: "absolute",
      width: "100vw",
    },
  };
// console.log("getImage",getImage)
  // const marginTop="10px"
  // const marginRight="5px"
  // const marginBottom="10px"
  // const marginLeft="5px"

  const getPageMargin = () => {
    return `
  @page {
    size: A4;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
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

const AppDate = date.split(' ')[0]
const AppMouht = date.split(' ')[1].substring(0, date.split(' ')[1].length - 2);
const AppYeay = date.split('.')[2]
const numbereay = parseInt(AppYeay, 10) + 1;
  // const apprvdate = moment(AppDate).add(543, "year").format("DD MMM");
  const apprvyear = parseInt(moment(AppYeay).add(543, "year").format("YY")) + 1;
  // console.log("AppMouht",AppMouht)
  // console.log("AppYeay",numbereay)
  // console.log("AppYeay",apprvyear)
  const getImageApi = async () => {
    // console.log("realscore",realscore)
    await Axios.get(
      `https://otp.rtaf.mi.th/api/gateway/VnJOSTl5ZldBQVBkWnlKc2ZkN3NGhGbnhtNFJTVHUzS3BfWlRvd2/personalPicture/${mem_email}/base64`,
    )
      .then((res) => {
        setgetImage(res.data)
        // console.log("res.data: ",res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getImageApi()
  }, [])

const testxxx =  `http://localhost:3000/PagePrintTestScore/${pers_id}/${testappvcode}` 

// console.log("testxxx: ",testxxx)
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
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              พิมพ์ผลสอบ
            </Typography>
            <Button autoFocus color="inherit" onClick={handlePrint}>
              print
            </Button>
          </Toolbar>
        </AppBar>

        <Box style={styles.paperContainer}></Box>
        <Box
          style={styles.textblur}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          ref={componentRef}
        >
          <Box sx={{ width: "700px", height: "100px", display: "flex" }}>
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
                  width: "600px",
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
              width: "700px",
              height: "350px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "150px", height: "350px" }}>
              <Box>
                <ImageList sx={{ width: "120px", margin: "10px" }}>
                  <img src={ getImage.result === "Process-Complete" ? `data:image/jpeg;base64,${getImage.picture_base64}` : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="logo" />
                </ImageList>
              </Box>
            </Box>
            <Box
              sx={{
                width: "275px",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
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
                      {date === 'Invalid date' ? "-" : date}
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
            <Box sx={{ width: "275px", height: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "170px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "170px",
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
                    sx={{ color: "#ffffff", fontSize: "24px" }}
                  >
                    ผลคะแนน <br />
                    การทดสอบ
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "170px",
                    height: "50%",
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
                    {editscore === null || editscore === 0 ? realscore : editscore}
                    {/* {editscore !== null || editscore !== 0 ? editscore : realscore} */}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "105px" }}>
                <Box sx={{ width: "105px", height: "40%" ,display:'flex' ,flexDirection: 'column'}}>
                 
                  <Box>
                  <QRCodeCanvas
  value={testxxx}
  size={105}
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
<Box sx={{width:'100%',height:'50px',backgroundColor:'#000000',textAlign:'center'}}>
<Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "16px" }}
                  >
                    Verify 
                  </Typography>
</Box>
                </Box>
                <Box
                  sx={{
                    width: "105px",
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
                    {AppDate} {AppMouht}{numbereay}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "700px",
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
       
        </Box>
      </Dialog>
    </>
  );
}

export default PrintTestScore;
