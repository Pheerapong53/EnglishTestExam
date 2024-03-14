import React from 'react'
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red , green } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Footer from '../components/Footer'

function PageTestScoreData() {
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));

      const theme = createTheme({
        palette: {
          primary: {
            main: red[500],
          },
          secondary: {
            main: green[500],
          },
        },
      });
      
      const columns = [
        { field: "id", headerName: "ลำดับ", width: 50 },
        { field: "idnumber", headerName: "เลขประจำตัว", width: 140 },
        { field: "name", headerName: "ยศ ชื่อ นามสกุล", width: 200 },
        { field: "reason", headerName: "เหตุผลขอรับการทดสอบ", width: 200 },
        { field: "location", headerName: "สถานที่", width: 100 },
        { field: "taketheexam", headerName: "เข้าสอบ/ไม่เข้าสอบ", width: 160 },
        { field: "criterion", headerName: "เกณฑ์", width: 100 },
        { field: "score", headerName: "คะแนน", width: 100 },
        {field: "level",headerName: "ผ่าน/ไม่ผ่าน",width: 100, renderCell: (params) => (
            <strong>
               <ThemeProvider theme={theme}>
              <Chip label="ผ่าน" color="secondary" />
              </ThemeProvider>
            </strong>
          ),},
        { field: "expire", headerName: "หมดอายุ/ไม่หมดอายุ", width: 150 },
        {field: "print",headerName: "พิมพ์",width: 120, renderCell: (params) => (
            <strong>
              <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 16 }}
            >
              PRINT
            </Button>
            </strong>
          ),},
          { field: "type", headerName: "แบบ", width: 100 },
        { field: "form", headerName: "ฟอร์ม", width: 100 },
      ];
      
      const rows = [
        { id: 1, idnumber: "0000000000", name: "จ.อ. อาทิตย์ แสนโคก",reason:"ศึกษา ตปท.",location:"Lab1",taketheexam:'เข้าสอบ',criterion:'80',score:'80',expire:'ไม่หมดอายุ',type:'สุ่ม',form:'ฟอร์ม1' },
        { id: 2, idnumber: "0000000000", name: "จ.อ. อาทิตย์ แสนโคก",reason:"ศึกษา ตปท.",location:"Lab1",taketheexam:'เข้าสอบ',criterion:'80',score:'80',expire:'ไม่หมดอายุ',type:'สุ่ม',form:'ฟอร์ม1' },
        { id: 3, idnumber: "0000000000", name: "จ.อ. อาทิตย์ แสนโคก",reason:"ศึกษา ตปท.",location:"Lab1",taketheexam:'เข้าสอบ',criterion:'80',score:'80',expire:'ไม่หมดอายุ',type:'สุ่ม',form:'ฟอร์ม1' },
        { id: 4, idnumber: "0000000000", name: "จ.อ. อาทิตย์ แสนโคก",reason:"ศึกษา ตปท.",location:"Lab1",taketheexam:'เข้าสอบ',criterion:'80',score:'80',expire:'ไม่หมดอายุ',type:'สุ่ม',form:'ฟอร์ม1' },
        { id: 5, idnumber: "0000000000", name: "จ.อ. อาทิตย์ แสนโคก",reason:"ศึกษา ตปท.",location:"Lab1",taketheexam:'เข้าสอบ',criterion:'80',score:'80',expire:'ไม่หมดอายุ',type:'สุ่ม',form:'ฟอร์ม1' },

       
      ];

      function QuickSearchToolbar() {
        return (
          <Box
            sx={{
              p: 0.5,
              pb: 0,
            }}
          >
            <GridToolbarQuickFilter
              quickFilterParser={(searchInput) =>
                searchInput
                  .split(',')
                  .map((value) => value.trim())
                  .filter((value) => value !== '')
              }
            />
          </Box>
        );
      }

  return (
    <>
 <Navbar />
 <DrawerHeader />
        <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ข้อมูลผลคะแนนการทดสอบ
        </Box>
        <br />
      </Typography>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          การจอง วันที่ 1 ก.พ.65 เวลา 9.00 น.
        </Box>
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
      <Link to="/PageTestScoreInformation" style={{ textDecoration: "none" }}>
      <Button variant="outlined"  startIcon={<ArrowBackIcon />}>
        BACK
      </Button>
      </Link>
      <Link to="#" style={{ textDecoration: "none" }}>
      <Button sx={{marginLeft:'10px'}} variant="contained"  startIcon={<CheckCircleOutlineIcon />}>
        อนุมัติผลคะแนนสอบ
      </Button>
      </Link>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or,
              },
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
      <Footer />
    </>
  )
}

export default PageTestScoreData

   
