import React, { useRef, forwardRef } from "react";
import { useState, useEffect } from "react";
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
import ImageList from "@mui/material/ImageListItem";
import qrcode from "../img/qrcode.jpg";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { QRCodeCanvas } from "qrcode.react";
import moment from "moment";
import { useLocation } from "react-router-dom";
require("moment/locale/th");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " rgba(255, 255, 255, 0.8)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type": {
    backgroundColor: " rgba(255, 255, 255, 0.8)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData(1,'น.ท.จิตรดี ศรีไล', 95, "16 มี.ค.65"),
//   createData(2,'น.ท.จิตรดี ศรีไล', 95, "16 มี.ค.65"),
//   createData(3,'น.ท.จิตรดี ศรีไล', 95, "16 มี.ค.65"),
//   createData(4,'น.ท.จิตรดี ศรีไล', 95, "16 มี.ค.65"),
//   createData(5,'น.ท.จิตรดี ศรีไล', 95, "16 มี.ค.65"),
// ];

// function createDataS(nameS, caloriesS, fatS, carbsS, proteinS) {
//   return { nameS, caloriesS, fatS, carbsS, proteinS };
// }

// const rowsS = [
//   createDataS("น.ต. - น.อ.",2, 87.50,90,85),
//   createDataS("ร.ต. - ร.อ.",2, 85.00, 95,75),
//   createDataS("พ.อ.ต. - พ.อ.อ.",1, 70, 70,"-"),
//   createDataS("จ.ต. - จ.อ.",1, 70, 70,"-"),
//   createDataS("พนักงานราชการและลูกจ้าง",'-', '-', "-","-"),
//   createDataS("รวม",6, 77.50, 90,70),
// ];

function PrintTableScore({
  countRole1,
  countRole2,
  countRole3,
  countRole4,
  countRole5,
  calculateMean1,
  calculateMean2,
  calculateMean3,
  calculateMean4,
  calculateMean5,
  max1,
  max2,
  max3,
  max4,
  max5,
  min1,
  min2,
  min3,
  min4,
  min5,
  allScoresmax,
  allScoresmin,
  selectAllList,
  testreqdate,
  realscoredate,
  filteredData,
  date,
  data,
  token,
}) {
  // console.log("data", data);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const lastTwoChars = date.slice(-2);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    // paperContainer: {
    //   backgroundImage: `url(${logo})`,
    //   height: "100%",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   filter: "blur(8px)",
    // },

    // textblur: {
    //   backgroundColor: "rgba(255, 255, 255,0.9)",
    //   position: "absolute",
    //   width: "100%",
    // },
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
  
        ::-webkit-scrollbar {
          width: 0 !important;
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

        .page-break {
          page-break-before: always;
        }
       
      }
  
      @media screen and (max-width: 600px) {
        
        @page {
          margin: 10mm 5mm 5mm 5mm; /* Adjust the margin values as needed */
        }
  
        @media print {
          body {
            padding: 5mm 2.5mm 2.5mm 0mm;
          }
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

  const yourObject = {
    countRole1: countRole1,
    countRole2: countRole2,
    countRole3: countRole3,
    countRole4: countRole4,
    countRole5: countRole5,
    calculateMean1: calculateMean1,
    calculateMean2: calculateMean2,
    calculateMean3: calculateMean3,
    calculateMean4: calculateMean4,
    calculateMean5: calculateMean5,
    max1: max1,
    max2: max2,
    max3: max3,
    max4: max4,
    max5: max5,
    min1: min1,
    min2: min2,
    min3: min3,
    min4: min4,
    min5: min5,
    allScoresmax: allScoresmax,
    allScoresmin: allScoresmin,
    selectAllList: selectAllList,
    testreqdate: testreqdate,
    realscoredate: realscoredate,
    filteredData: filteredData,
    date: date,
    lastTwoChars: lastTwoChars,
  };

  const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // lg
  const isMediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1199px)"
  ); // md
  const isSmallScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  ); // sm
  const isExtraSmallScreen = useMediaQuery("(max-width: 599px)"); // xs
  // const [url, setUrl] = useState(``);
  // const [values, setValues] = useState({});
  // useEffect(() => {
  //   // สร้าง query parameters
  //   const queryParams = new URLSearchParams();

  //   // เพิ่มข้อมูลลงใน query parameters
  //   Object.entries(yourObject).forEach(([key, value]) => {
  //     queryParams.append(key, value);
  //   });
  //   setUrl(`https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?${queryParams.toString()}`)
  //   // สร้าง URL ที่มี query parameters
  //   // const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?${queryParams.toString()}`;

  //   // ทำการส่ง request หรือใช้ URL ตามที่คุณต้องการ
  //   // ตัวอย่างเช่น fetch(urlWithParams)
  // }, [yourObject]);
  // const queryParams = new URLSearchParams(url.search);
  //   for (const [key, value] of queryParams.entries()) {
  //     setValues[key] = value;
  // }
  // const response = fetch(url)
  // const jsonData =  response.json();
  // console.log('url:', url);
  // console.log('Received Data:', jsonData);
  // const jsonString = JSON.stringify(yourObject);
  // const encodedString = encodeURIComponent(jsonString);

  // const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?data=${encodedString}`;
  //  const testxxx =  `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile/${countRole1}/${countRole2}/${countRole3}/${countRole4}/${countRole5}/${calculateMean1}/${calculateMean2}/${calculateMean3}/${calculateMean4}/${calculateMean5}/${max1}/${max2}/${max3}/${max4}/${max5}/${min1}/${min2}/${min3}/${min4}/${min5}/${allScoresmax}/${allScoresmin}/${selectAllList}/${testreqdate}/${realscoredate}/${filteredData}/${date}/${lastTwoChars}/`;
  const mergedObject = { data, token };
  const jsonString = JSON.stringify(mergedObject);
  const encodedString = encodeURIComponent(jsonString);
  const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?data=${encodedString}`;
  // console.log('data:', data);
  // console.log('token:', token);

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
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
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
                        }}
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
                              แยกตามรายการทดสอบ และสังกัด
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
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize: { lg: "12px" },
                              }}
                            >
                              Verify
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={6}
                      sx={{
                        borderLeft: "2px solid #000000",
                        borderRight: "2px solid #000000",
                        borderBottom: "2px solid #000000",
                      }}
                    >
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
                        รายการทดสอบ
                        โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                        ทอ.ประจำปี {lastTwoChars} สังกัด{" "}
                        {filteredData[0]?.["tbmemberinfo.mem_affiliation"]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                        borderLeft: "2px solid #000000",
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
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "10px",
                        borderRight: "2px solid #000000",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, i) => (
                    <StyledTableRow
                      key={row["tbmember.tbmemberinfos.meminfo_id"]}
                      sx={{ border: "2px solid black" }}
                    >
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Box sx={{ color: "#000000", fontWeight: "bold" }}>
                          {" "}
                          {i + 1}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Box sx={{ color: "#000000", fontWeight: "bold" }}>
                          {row["tbmemberinfo.mem_rank"] +
                            " " +
                            row["tbmemberinfo.mem_fname"] +
                            " " +
                            row["tbmemberinfo.mem_lname"]}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Box sx={{ color: "#000000", fontWeight: "bold" }}>
                          {row["editscore"] === null || row["editscore"] === 0
                            ? row["realscore"]
                            : row["editscore"]}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Box sx={{ color: "#000000", fontWeight: "bold" }}>
                          {row["realscoredate"] === null
                            ? "ยังไม่ได้ทำการทดสอบ"
                            : moment(row["realscoredate"])
                                .add(543, "year")
                                .format("DD MMMYY")}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        <Box sx={{ color: "#000000", fontWeight: "bold" }}>
                          {Math.abs(
                            ((new Date(row["tbtestreservation.testreqdate"]) -
                              new Date(row["realscoredate"])) /
                              24) *
                              60 *
                              60 *
                              1000
                          ) === 0
                            ? row[
                                "tbtestreservation.tbtestscoringcriterium.mission"
                              ]
                            : "สอบวันสำรอง"}
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableRow
                  sx={{
                    borderLeft: "2px solid #000000",
                    borderRight: "2px solid #000000",
                  }}
                >
                  {/* <TableCell align="center" colSpan={6}  className="page-break"> */}
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
                      ค่าเฉลี่ยผลการทดสอบภาษาอังกฤษ
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
                      รายการทดสอบ
                      โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                      ทอ.ประจำปี {lastTwoChars}
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
                    ชั้นยศ
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    จำนวนผู้เข้ารับการทดสอบ
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    ค่าเฉลี่ย
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    คะแนนสูงสุด
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                  >
                    คะแนนต่ำสุด
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
                <TableBody>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      น.ต.-น.อ.
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {calculateMean1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {max1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {min1}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      ร.ต.-ร.อ.
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole2}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {calculateMean2}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {max2}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {min2}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      พ.อ.ต.-พ.อ.อ.
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole3}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {calculateMean3}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {max3}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {min3}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      จ.ต.-จ.อ.
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole4}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {calculateMean4}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {max4}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {min4}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      พนักงานราชการและลูกจ้าง
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole5}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {calculateMean5}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {max5}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {min5}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow sx={{ border: "2px solid black" }}>
                    <StyledTableCell component="th" scope="row" align="center">
                      รวม
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {countRole1 +
                        countRole2 +
                        countRole3 +
                        countRole4 +
                        countRole5}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {(calculateMean1 +
                        calculateMean2 +
                        calculateMean3 +
                        calculateMean4 +
                        calculateMean5) /
                        (countRole1 +
                          countRole2 +
                          countRole3 +
                          countRole4 +
                          countRole5)}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {allScoresmax}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align="center">
                      {allScoresmin}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                </TableBody>
                <TableRow
                  sx={{
                    borderLeft: "2px solid #000000",
                    borderRight: "2px solid #000000",
                    borderBottom: "2px solid #000000",
                  }}
                >
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        width: "750px",

                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "#2F5597", fontSize: "10px" }}
                      >
                        เอการนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                        มีโทษตามกฏหมาย
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{ color: "#2F5597", fontSize: "10px" }}
                      >
                        หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                        โทร.02-534-2965
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default PrintTableScore;
