/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-concat */
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
import moment from "moment";


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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
  createData(2, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
  createData(3, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
  createData(4, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
  createData(5, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
  createData(6, "น.ท.จิตรดี ศรีไล", "บน.6", 80, "16 ม.ค. 65"),
];

function PrintTableTestList(props) {
  const dataprops = props.data;
  // console.log("testprops", dataprops);
  const [open, setOpen] = React.useState(false);
 
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
  
  // console.log("dataprops",dataprops)
  // const date = moment(data.testreqdate).add(543, "year").format("DD MMMYY");

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
                height: "80px",
                display: "flex",
                backgroundColor: " rgba(255, 255, 255, 0.8)",
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
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "#2F5597", fontWeight: "bold" }}
                  >
                    ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "600px",
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
              <Box>
                <ImageList sx={{ width: 80, height: 50, padding: 2 }}>
                  <img src={qrcode} alt="logo" />
                </ImageList>
              </Box>
            </Box>
            <Box
              sx={{
                width: "750px",
                height: "410px",
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
                          {"โครงการ" + dataprops[0]?.["tbtestreservation.tbtestscoringcriterium.mission"]}
                          { "(" + dataprops[0]?.["tbmemberinfo.mem_affiliation"] + "หน่วยผู้ประสาน" + ")" }
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

                    {dataprops.map((dataprop,i) => (
                      <StyledTableRow
                        key={dataprop["tbmember.tbmemberinfos.meminfo_id"]}
                      >
                        <StyledTableCell align="center">
                          {i + 1}
                        </StyledTableCell>
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
                          { dataprop["editscore"] === null || dataprop["editscore"] === 0 ?dataprop["realscore"] : dataprop["editscore"]}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {moment(dataprop["realscoredate"]).add(543, "year").format("DD MMMYY")}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {dataprop["tbtestreservation.tbtestscoringcriterium.mission"]}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {/* {rows.map((row) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="center" >
                
                {row.name}
 
                </StyledTableCell>
              <StyledTableCell align="center"  >
               
                {row.calories}
 
                </StyledTableCell>
              <StyledTableCell align="center"  >
             
              {row.fat}

</StyledTableCell>
              <StyledTableCell align="center"   >
              
              {row.carbs}
  
                </StyledTableCell>
              <StyledTableCell align="center"  >
            
              {row.protein}
 
                </StyledTableCell>
                <StyledTableCell align="center"  >
            
            
 
                </StyledTableCell>
            </StyledTableRow>
          ))} */}
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
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{ color: "#2F5597", fontSize: "12px" }}
              >
                เอการนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย
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
        </Box>
      </Dialog>
    </div>
  );
}

export default PrintTableTestList;
