import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import Box from "@mui/material/Box";
import logo from "../img/logo.png";
import qrcode from "../img/qrcode.jpg";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Slide from "@mui/material/Slide";
import ImageList from "@mui/material/ImageListItem";
import { QRCodeCanvas } from "qrcode.react";
import Grid from "@mui/material/Grid";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PrintTableTestList(props) {
  const { data,token ,selectMissions,testreqdate,testreqtime} = props;
  // console.log("data",data);
  const [open, setOpen] = React.useState(false);
  const componentRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPageMargin = () => {
    return `
      @page {
        size: A4;
        margin: 20mm 10mm 10mm 10mm; /* Adjust the margin values as needed */
        height: 100%;
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
        ::-webkit-scrollbar {
          width: 0 !important;
        }
  
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          display: flex;
          background-color: rgba(255, 255, 255, 0.8);
        }
      }
  

      }
    `;
  };

  // const styles = {
  //   paperContainer: {
  //     backgroundImage: `url(${logo})`,
  //     height: "200%",
  //     width: "100%",
  //     top: 0,
  //     left: 0,
  //     position: "absolute",
  //     backgroundSize: "cover",
  //     PointerEvent: "none",
  //     filter: "blur(9px)",
  //   },
  // };

  const styles = {
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
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    pageStyle: getPageMargin(),
    onAfterPrint: () => alert("Print success"),
  });
  // console.log("dataprops",dataprops)
  // const date = moment(data.testreqdate).add(543, "year").format("DD MMMYY");
  const filteredData = data.map((item) => ({
    mission: item?.["tbtestreservation.tbtestscoringcriterium.mission"],
    memAffiliation: item?.["tbmemberinfo.mem_affiliation"],
    memInfoId: item?.["tbmember.tbmemberinfos.meminfo_id"],
    memRank: item?.["tbmemberinfo.mem_rank"],
    memFirstName: item?.["tbmemberinfo.mem_fname"],
    memLastName: item?.["tbmemberinfo.mem_lname"],
    editScore: item?.["editscore"],
    realScore: item?.["realscore"],
    realScoreDate: item?.["realscoredate"],
  }));

  // console.log("filteredData",filteredData)
  // const jsonString = JSON.stringify(filteredData);
  // const encodedString = encodeURIComponent(jsonString);
  // const decodedString = decodeURIComponent(encodedString);
  const mergedObject = {  token,selectMissions,testreqdate,testreqtime };
  const jsonString = JSON.stringify(mergedObject);
  const encodedString = encodeURIComponent(jsonString);
  const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableTestListScoreMobile?data=${encodedString}`;
  // const testxxx = "555"
  // const decodedArray = JSON.parse(decodedString);
  // console.log("decodedArray",decodedArray)
  const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // lg
  const isMediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1199px)"
  ); // md
  const isSmallScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  ); // sm
  const isExtraSmallScreen = useMediaQuery("(max-width: 599px)"); // xs
  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <PrintIcon />
      </IconButton>
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
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                fontSize: "20px",
              }}
              component="div"
            >
              พิมพ์รายงานผลคะแนนการทดสอบภาษาอังกฤษ
            </Typography>
            <Button autoFocus color="inherit" onClick={handlePrint}>
              PRINT
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "800px", height: "100%" }}>
          <Box
            style={{
              backgroundImage: `url(${logo})`,
              ...styles.paperContainer,
            }}
          />
          <Box
            sx={{
              width: "100%",
              // height: "100%",
              zIndex: "3",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
              minHeight: "100vh",
            }}
            // className="header"
            // ref={componentRef}
          >
            <TableContainer
              sx={{
                backgroundColor: " rgba(255, 255, 255, 0.9)",
                width: "800px",
                height: "100%",
                display: "flex",
                borderWidth: "1px",
                borderColor: "#000000",
              }}
              ref={componentRef}
              // className="table-container"
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell align="center" colSpan={6}>
                      <Box
                        sx={{
                          width: "750px",
                          height: "150px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // backgroundColor: " rgba(255, 255, 255)",
                          // marginTop:'10px',
                        }}
                        // className="header"
                      >
                        <Box>
                          <ImageList
                            sx={{ width: 100, height: 100, padding: 2 }}
                          >
                            <img src={logo} alt="logo" />
                          </ImageList>
                        </Box>
                        <Box>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              component="div"
                              sx={{ color: "#2F5597", fontWeight: "bold" }}
                            >
                              ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "500px",
                              height: "40px",
                              backgroundColor: "#2F5597",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{ color: "#ffffff", fontSize: "12px" }}
                            >
                              รายงานผลคะแนนการทดสอบภาษาอังกฤษ
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{ color: "#ffffff", fontSize: "12px" }}
                            >
                              แยกตามรายการทดสอบ
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ paddingLeft: "20px" }}>
                          <QRCodeCanvas
                            value={testxxx}
                            size={140}
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
                          <Box
                            sx={{
                              width: { lg: "140px" },
                              height: { lg: "20px" },
                              backgroundColor: "#000000",
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              // variant="body2"
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize: { lg: "12px" },
                              }}
                            >
                              Verify
                            </Typography>
                          </Box>
                          {/* <ImageList sx={{ width: 80, height: 50, padding: 2 }}>
                  <img src={qrcode} alt="logo" />
                </ImageList> */}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell align="center" colSpan={6}>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        ผลการทดสอบวัดระดับความเข้าใจภาษาอังกฤษ
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {"โครงการ" +
                          data[0]?.[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]}
                        {"(" +
                          data[0]?.["tbmemberinfo.mem_affiliation"] +
                          "หน่วยผู้ประสาน" +
                          ")"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ลำดับ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ยศ-ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      สังกัด
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      สอบได้
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ทดสอบเมื่อ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      หมายเหตุ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((dataprop, i) => (
                    <StyledTableRow
                      key={dataprop["tbmember.tbmemberinfos.meminfo_id"]}
                      sx={{ border: "2px solid black" }}
                    >
                      <StyledTableCell align="center">{i + 1}</StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["tbmemberinfo.mem_rank"] +
                          " " +
                          dataprop["tbmemberinfo.mem_fname"] +
                          " " +
                          dataprop["tbmemberinfo.mem_lname"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["tbmemberinfo.mem_affiliation"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["editscore"] === null ||
                        dataprop["editscore"] === 0
                          ? dataprop["realscore"]
                          : dataprop["editscore"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(dataprop["realscoredate"])
                          .add(543, "year")
                          .format("DD MMMYY") === "Invalid date" ? "ไม่ได้เข้าสอบ" : moment(dataprop["realscoredate"])
                          .add(543, "year")
                          .format("DD MMMYY")} 
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {
                          dataprop[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        width: "750px",
                        height: "80px",
                        display: "flex",
                        // backgroundColor: " rgba(255, 255, 255)",
                        // marginTop:'10px',
                      }}
                    >
                      <Box
                        sx={{
                          width: "750px",
                          // height: "50px",
                          // backgroundColor: " rgba(255, 255, 255, 0.9)",
                          // marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          // borderWidth: "1px",
                          // borderColor: "#2F5597",
                          // borderStyle: "solid",
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px" }}
                        >
                          เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                          มีโทษตามกฏหมาย
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px" }}
                        >
                          หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                          โทร.02-534-2965
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            {/* </Box> */}

            {/* <Box
              sx={{
                width: "800px",
                height: "50px",
                backgroundColor: " rgba(255, 255, 255, 0.9)",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                borderWidth: "1px",
                borderColor: "#2F5597",
                borderStyle: "solid",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "#2F5597", fontSize: "12px" }}
              >
                เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "#2F5597", fontSize: "12px" }}
              >
                หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                โทร.02-534-2965
              </Typography>
            </Box> */}
          </Box>
        </Box>
        {/* <Box style={styles.paperContainer}></Box> */}
        {/* <Box
          style={styles.textblur}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "fixed",
            // width: "740px"
          }}
          // ref={componentRef}
          ref={componentRef}
        >
          <Box
            sx={{
              width: "100%",
              zIndex: "3",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // marginTop: "15px",
              height: "100vh",
            }}
          >
            <TableContainer
              sx={{
                // backgroundColor: " #000000",
                width: "800px",
                // height: "100%",
                display: "flex",
                borderWidth: "1px",
                borderColor: "#000000",
                marginTop: "100px",
                justifyContent:'center',
                alignItems:'center'
             
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ border: "2px solid black"}}>
                    <TableCell align="center" colSpan={6}>
                      <Box
                        sx={{
                          width: 
                             "750px",
                           
                          height: 
                            "150px",
                           
                          display: "flex",
                          justifyContent:'space-between',
                          alignItems: 'center',
                         
                        }}
                      >
                        <Box>
                          <ImageList
                            sx={{
                              width: 
                                 "120px",
                              
                              height: 
                                "120px",
                               
                              paddingRight:'0px',
                              display:'flex',
                              justifyContent:'center',
                              alignItems: 'center',
                            }}
                          >
                            <img src={logo} alt="logo" />
                          </ImageList>
                        </Box>
                        <Box>
                          <Box>
                            <Typography
                              // variant="subtitle1"
                              component="div"
                              sx={{
                                color: "#2F5597",
                                fontWeight: "bold",
                                fontSize: 
                                  "16px",
                                
                              }}
                            >
                              ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 
                               "400px",
                               
                              height: 
                                 "50px",
                               
                              backgroundColor: "#2F5597",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize: 
                                  "12px",
                               
                              }}
                            >
                              รายงานผลคะแนนการทดสอบภาษาอังกฤษ
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize:  "12px",
                                 
                              }}
                            >
                              แยกตามรายการทดสอบ
                            </Typography>
                          </Box>
                        </Box>
                              <Box
                 sx={{
                  width: "160px",
                  
                  height:  "160px",
                   
                  display:'flex',
                  flexDirection:'column',
                  paddingLeft:"0px",
                   
                  paddingTop: "0px",
                  
                  // padding: 2,
                }}
                >
                {
                  isSmallScreen   || isExtraSmallScreen   ?<>
                  <QRCodeCanvas
                  value={testxxx}
                  size={40}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                    x: undefined,
                    y: undefined,
                    height: 8,
                    width: 8,
                    excavate: true,
                  }}
                /> 
                <Box
                  sx={{
                    width: "160px",
                    height: "160px",
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "12px"}}
                  >
                    Verify
                  </Typography>
                </Box>
                  </> 
                
                : 
                <>
                <QRCodeCanvas
                    value={testxxx}
                    size={140}
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
                   <Box
                  sx={{
                    width: "140px",
                    height: "60px",
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                   
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize:"12px"}}
                  >
                    Verify
                  </Typography>
                </Box>
                </>
               
                }
                 
                </Box>
                      </Box>
                    </TableCell>
                  </TableRow> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                  <Typography
                        // variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "12px",
                           
                          fontWeight: "bold",
                        }}
                      >
                        ผลการทดสอบวัดระดับความเข้าใจภาษาอังกฤษ
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "12px",
                           
                          fontWeight: "bold",
                        }}
                      >
                        {"โครงการ" +
                          data[0]?.[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]}
                        {"(" +
                          data[0]?.["tbmemberinfo.mem_affiliation"] +
                          "หน่วยผู้ประสาน" +
                          ")"}
                      </Typography>
                  </TableCell>
                  </TableRow> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "12px",
                         
                      }}
                    >
                      ลำดับ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "12px",
                         
                      }}
                    >
                      ยศ-ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize:  "12px",
                        
                      }}
                    >
                      สังกัด
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "12px",
                         
                      }}
                    >
                      สอบได้
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "12px",
                          
                      }}
                    >
                      ทดสอบเมื่อ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "12px",
                         
                      }}
                    >
                      หมายเหตุ
                    </TableCell>
                  </TableRow> */}
        {/* </TableHead> */}
        {/* <TableBody >
                {data.map((dataprop, i) => (
                    <StyledTableRow
                      key={dataprop["tbmember.tbmemberinfos.meminfo_id"]}
                      sx={{ border: "2px solid black", }}
                    >
                      <StyledTableCell align="center" ><Box sx={{fontSize:"12px"
                         ,color: "#000000",fontWeight: "bold",}}>{i + 1}</Box></StyledTableCell>
                      <StyledTableCell align="center"><Box sx={{fontSize: "12px",
                        color: "#000000",fontWeight: "bold",}}>
                        {dataprop["tbmemberinfo.mem_rank"] +
                          " " +
                          dataprop["tbmemberinfo.mem_fname"] +
                          " " +
                          dataprop["tbmemberinfo.mem_lname"]}</Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: "12px"
                         ,color: "#000000",fontWeight: "bold",}}>{dataprop["tbmemberinfo.mem_affiliation"]}</Box>  
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize:  "12px"
                         ,color: "#000000",fontWeight: "bold",}}>
                           {dataprop["editscore"] === null ||
                        dataprop["editscore"] === 0
                          ? dataprop["realscore"]
                          : dataprop["editscore"]} </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: "12px",
                         color: "#000000",fontWeight: "bold",}}>  {moment(dataprop["realscoredate"])
                          .add(543, "year")
                          .format("DD MMMYY")} </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize:  "12px",
                         
                        color: "#000000",fontWeight: "bold",}}>    {
                          dataprop[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]
                        }</Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        width:"1200px",
                        
                        height: "80px",
                         
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          width:  "1200px",
                           
                         
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          // variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px",
                           }}
                        >
                          เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                          มีโทษตามกฏหมาย
                        </Typography>
                        <Typography
                          // variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px",
                            }}
                        >
                          หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                          โทร.02-534-2965
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow> */}
        {/* </Table>
            </TableContainer> */}
        {/* </Box>
        </Box> */}
        {/* <Box sx={{ width: { lg: "740px", md: "740px", sm: "250px", xs: "250px" }, height: "100%" }}>
          <Box
            style={{
              backgroundImage: `url(${logo})`,
              ...styles.paperContainer,
            }}
          />
          <Box
            sx={{
              width: "100%",
              zIndex: "3",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "15px",
              minHeight: "100vh",
            }}
            // className="header"
            // ref={componentRef}
          >
            <TableContainer
              sx={{
                backgroundColor: " rgba(255, 255, 255, 0.9)",
                width: { lg: "800px", md: "800px", sm: "250px", xs: "250px"  },
                height: "50%",
                display: "flex",
                borderWidth: "1px",
                borderColor: "#000000",
              }}
              ref={componentRef}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell align="center" colSpan={6}>
                      <Box
                        sx={{
                          width: { lg: "740px", md: "740px", sm: "200px", xs: "200px" },
                          height: { lg: "80px", md: "80px", sm: "35px", xs: "35px" },
                          display: "flex",
                        }}
                        // className="header"
                      >
                        <Box>
                          <ImageList sx={{ width: { lg: "80px", md: "80px", sm: "25px", xs: "25px" }, height: { lg: "80px", md: "80px", sm: "25px", xs: "25px" }, padding: 2 }}>
                            <img src={logo} alt="logo" />
                          </ImageList>
                        </Box>
                        <Box>
                          <Box>
                            <Typography
                              // variant="subtitle1"
                              component="div"
                              sx={{ color: "#2F5597", fontWeight: "bold" ,fontSize: { lg: "12px", md: "12px", sm: "6px", xs: "6px" } }}
                            >
                              ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: { lg: "600px", md: "600px", sm: "25px", xs: "25px" },
                              height: { lg: "40px", md: "40px", sm: "20px", xs: "20px" },
                              backgroundColor: "#2F5597",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{ color: "#ffffff", fontSize: { lg: "12px", md: "12px", sm: "6px", xs: "6px" } }}
                            >
                              รายงานผลคะแนนการทดสอบภาษาอังกฤษ
                            </Typography>
                            <Typography
                              variant="body2"
                              component="div"
                              sx={{ color: "#ffffff", fontSize: { lg: "12px", md: "12px", sm: "6px", xs: "6px" } }}
                            >
                              แยกตามรายการทดสอบ
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <ImageList sx={{ width: { lg: "80px", md: "80px", sm: "25px", xs: "25px" }, height: { lg: "80px", md: "80px", sm: "25px", xs: "25px" }, padding: 2 }}>
                            <img src={qrcode} alt="logo" />
                          </ImageList>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell align="center" colSpan={6}>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        ผลการทดสอบวัดระดับความเข้าใจภาษาอังกฤษ
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        {"โครงการ" +
                          data[0]?.[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]}
                        {"(" +
                          data[0]?.["tbmemberinfo.mem_affiliation"] +
                          "หน่วยผู้ประสาน" +
                          ")"}
                      </Typography>
                    </TableCell>
                  </TableRow> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ลำดับ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ยศ-ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      สังกัด
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      สอบได้
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      ทดสอบเมื่อ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                      }}
                    >
                      หมายเหตุ
                    </TableCell>
                  </TableRow> */}
        {/* </TableHead> */}
        {/* <TableBody>
                  {data.map((dataprop, i) => (
                    <StyledTableRow
                      key={dataprop["tbmember.tbmemberinfos.meminfo_id"]}
                      sx={{ border: "2px solid black" }}
                    >
                      <StyledTableCell align="center">{i + 1}</StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["tbmemberinfo.mem_rank"] +
                          " " +
                          dataprop["tbmemberinfo.mem_fname"] +
                          " " +
                          dataprop["tbmemberinfo.mem_lname"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["tbmemberinfo.mem_affiliation"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {dataprop["editscore"] === null ||
                        dataprop["editscore"] === 0
                          ? dataprop["realscore"]
                          : dataprop["editscore"]}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(dataprop["realscoredate"])
                          .add(543, "year")
                          .format("DD MMMYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {
                          dataprop[
                            "tbtestreservation.tbtestscoringcriterium.mission"
                          ]
                        }
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody> */}
        {/* <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        width: "750px",
                        height: "80px",
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          width: "750px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px" }}
                        >
                          เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                          มีโทษตามกฏหมาย
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: "12px" }}
                        >
                          หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                          โทร.02-534-2965
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow> */}
        {/* </Table>
            </TableContainer>
          </Box> */}
        {/* </Box> */}
      </Dialog>
    </div>
  );
}

export default PrintTableTestList;
