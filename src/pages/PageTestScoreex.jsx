/* eslint-disable no-unused-vars */
import React, { useRef, forwardRef } from "react";
import { useState, useEffect } from "react";
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
import bas from "../img/bas.jpg";
import ImageList from "@mui/material/ImageListItem";
// import qrcode from '../img/qrcode.jpg'

import ContentShowScoreStudent from "../components/ContentShowScoreStudent";
import { useParams } from "react-router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const data = [
  {
    name : "จ.อ.ทดสอบ 555",
    no : "1234567890",
    datetimetest : "13 ก.พ.65",
    rtaf : "ยศ.ทอ.",
    order: "โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล ทอ.ประจำปี 65 (สังกัด ยศ.ทอ.)",
    score: 75,
    datetimeexp: "19 ธ.ค.65"
  },
  {
    name : "จ.อ.ทดสอบ 666",
    no : "9564151352",
    datetimetest : "20 ก.พ.67",
    rtaf : "ยศ.ทอ.",
    order: "test56",
    score: 90,
    datetimeexp: "20 ธ.ค.68"
  }
]

// console.log("data: ", data)


const PageTestScoreex = () => {
  const { id } = useParams();
    // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const styles = {
    paperContainer: {
        backgroundImage: `url(${logo})`,
        height: '100%',
     backgroundRepeat: 'no-repeat',
     backgroundSize: 'cover',
     backgroundPosition: 'center',
     filter:'blur(8px)',
     
    },

    textblur:{
        backgroundColor:'rgba(255, 255, 255,0.9)',
        position: 'absolute',
  width:'100vw'

    },
};

// const marginTop="10px"
// const marginRight="5px"
// const marginBottom="10px"
// const marginLeft="5px"

const getPageMargin = () => {
  return (`
  @page {
    size: A4;
  }
  @media print {
    body {
      -webkit-print-color-adjust: exact;
    }

    }
  `);
};

const componentRef = useRef();
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
    pageStyle: getPageMargin(), 
    onAfterPrint: ()=> alert('Print success')
})
  return (
    <>
      {/* <IconButton color="primary" onClick={handleClickOpen}>
        <PrintIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      > */}
        {/* <AppBar sx={{ position: "relative" }}>
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
        </AppBar> */}

        {/* <Box style={styles.paperContainer}  >

          </Box> */}
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
                  <img src={bas} alt="logo" />
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
                  {data[id].name}
                  {/* จ.อ.สุทธิภัทร์ หัวนา */}
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
                  {data[id].no}
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
                      {data[id].datetimetest}
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
                      {data[id].rtaf}
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
                  {data[id].order}
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
                    {data[id].score}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "105px" }}>
                <Box sx={{ width: "105px", height: "40%" }}>
                  <ContentShowScoreStudent />
                  {/* <ImageList  sx={{ width:'105px'}}>
        <img src={qrcode} alt="logo" />
        </ImageList> */}
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
                    {data[id].datetimeexp}
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
              เอการนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย{" "}
              <br />
              หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
              โทร.02-534-2965
            </Typography>
          </Box>
        </Box>
      {/* </Dialog> */}
    </>
  );
};

export default PageTestScoreex;
