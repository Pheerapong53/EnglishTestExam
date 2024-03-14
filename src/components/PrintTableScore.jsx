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
  date
}) {
  // console.log("dataprops", selectAllList);

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
      // height:'auto',
      // position:'fixed',
      // bottom:'20px',
      // right:'20px',
      // opacity:'0.5'
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

  const getPageMargin = () => {
    return `
      @page {
        size: A4;
        margin: 5mm 5mm 5mm 5mm;
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
// console.log("testttt" , Math.abs((new Date(selectAllList[0]["tbtestreservation.testreqdate"]) - new Date(selectAllList[0].realscoredate)) / 24 * 60 * 60 * 1000))
//   console.log("testreqdate", selectAllList[0]["tbtestreservation.testreqdate"])
// console.log("realscoredate", selectAllList[0].realscoredate )
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
        <AppBar sx={{ position: "sticky" }}>
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
        <Box sx={{ width: "100%", height: "100%" }}>
          <Box style={styles.paperContainer}></Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              zIndex: "3",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
            }}
            ref={componentRef}
          >
            <Box
              sx={{
                width: "750px",
                height: "100px",
                display: "flex",
                backgroundColor: " rgba(255, 255, 255, 0.8)",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <Box>
                <ImageList sx={{ width: 80, height: 50, padding: 2 }}>
                  <img src={logo} alt="logo" />
                </ImageList>
              </Box>
              <Box>
                <Box>
                  <Typography
                    variant="h6"
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
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "14px" }}
                  >
                    รายงานผลคะแนนการทดสอบภาษาอังกฤษ
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "14px" }}
                  >
                    แยกตามรายการทดสอบ และสังกัด
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Box>
                    <QRCodeCanvas
                      size={50}
                      bgColor={"#ffffff"}
                      fgColor={"#000000"}
                      level={"L"}
                      includeMargin={false}
                      imageSettings={{
                        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                        x: undefined,
                        y: undefined,
                        height: 10,
                        width: 10,
                        excavate: true,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "20px",
                      backgroundColor: "#000000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "#ffffff", fontSize: "10px" }}
                    >
                      Verify
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "750px",
                height: "360px",
                display: "flex",
                marginTop: "10px",
                borderWidth: "1px",
                borderColor: "#000000",
                borderStyle: "solid",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: " rgba(255, 255, 255, 0.9)" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            color: "#000000",
                            fontSize: "14px",
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
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          รายการทดสอบ
                          โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                          ทอ.ประจำปี {lastTwoChars} สังกัด ศซว.ทอ.
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row, i) => (
                      <StyledTableRow
                        key={row["tbmember.tbmemberinfos.meminfo_id"]}
                      >
                        <StyledTableCell align="center">
                          {i + 1}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row["tbmemberinfo.mem_rank"] +
                            " " +
                            row["tbmemberinfo.mem_fname"] +
                            " " +
                            row["tbmemberinfo.mem_lname"]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row["editscore"] === null || row["editscore"] === 0 ? row["realscore"] : row["editscore"]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                          
                          row["realscoredate"] === null   ?  "ยังไม่ได้ทำการทดสอบ"  : moment(row["realscoredate"]).add(543, "year").format("DD MMMYY")
                          
                          }
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {
                           Math.abs((new Date(row["tbtestreservation.testreqdate"]) - new Date(row["realscoredate"])) /  24 * 60 * 60 * 1000)   === 0   ? row["tbtestreservation.tbtestscoringcriterium.mission"] : "สอบวันสำรอง"


                            // row["tbtestreservation.testreqdate"] - row["realscoredate"] === 0 ? row["tbtestreservation.tbtestscoringcriterium.mission"] : "สอบวันสำรอง"

                            // row["tbtestreservation.testreqdate"]
                            // row[
                            //   "tbtestreservation.tbtestscoringcriterium.mission"
                            // ]
                          }
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                width: "750px",
                height: "420px",
                display: "flex",
                marginTop: "10px",
                borderWidth: "1px",
                borderColor: "#000000",
                borderStyle: "solid",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{ backgroundColor: " rgba(255, 255, 255, 0.9)" }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            color: "#000000",
                            fontSize: "14px",
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
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          รายการทดสอบ
                          โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                          ทอ.ประจำปี {lastTwoChars}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        ชั้นยศ
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        จำนวนผู้เข้ารับการทดสอบ
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        ค่าเฉลี่ย
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        คะแนนสูงสุด
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        คะแนนต่ำสุด
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        น.ต.-น.อ.
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole1}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {calculateMean1}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {max1}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {min1}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        ร.ต.-ร.อ.
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole2}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {calculateMean2}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {max2}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {min2}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        พ.อ.ต.-พ.อ.อ.
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole3}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {calculateMean3}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {max3}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {min3}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        จ.ต.-จ.อ.
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole4}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {calculateMean4}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {max4}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {min4}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        พนักงานราชการและลูกจ้าง
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole5}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {calculateMean5}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {max5}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {min5}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        รวม
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {countRole1 +
                          countRole2 +
                          countRole3 +
                          countRole4 +
                          countRole5}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
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
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {allScoresmax}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {allScoresmin}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                width: "750px",
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
                padding: "10px",
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "#2F5597", fontSize: "14px" }}
              >
                เอการนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "#2F5597", fontSize: "14px" }}
              >
                หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                โทร.02-534-2965
              </Typography>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default PrintTableScore;
