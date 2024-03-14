/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
} from '@mui/x-data-grid';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Footer from '../components/Footer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green, yellow } from '@mui/material/colors';
// import Container from '@mui/material/Container';

import { fetchAllTestResvInfo } from '../store/TestReservationSlice';
import { convertToFullThaiDate } from '../components/functions/GlobalFunctions';

/*------------------------ PageTestDate ----------------------*/
function PageTestDate() {
  const location = useLocation();
  console.log('location : ', location.state);
  /*----------------------- Style for Stack ------------------*/
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    //textAlign: 'center',
    fontFamily: 'THSarabunNew',
    color: theme.palette.text.secondary
  }));

  /*--------------------- Theme ----------------------------*/
  const theme = createTheme({
    /*palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: green[500],
      },
    },*/

    typography: {
      allVariants: {
        fontFamily: 'THSarabunNew',
        fontSize: 14
      }
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'THSarabunNew',
          },
        }
      },
    }
  });


  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  /*---------------- Initial State --------------------*/
  const [rows, setRows] = useState([]);

  /*-------------------------------- Columns -----------------------*/
  const columns = [
    { field: "id", headerName: "ลำดับ", width: 100, align: 'center', headerAlign: 'center', },
    { field: "testdate", headerName: "วันที่สอบ", width: 200, align: 'center', headerAlign: 'center', },
    { field: "testtime", headerName: "เวลา", width: 200, align: 'center', headerAlign: 'center', },
    { field: "reason", headerName: "เหตุผลขอรับการทดสอบ", width: 200, align: 'center', headerAlign: 'center', },
    { field: "location", headerName: "สถานที่สอบ", width: 200, align: 'center', headerAlign: 'center', },
    {
      field: "status", headerName: "สถานะ", width: 200, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        let lb = '';
        let bgcolor = null;
        switch (params.row.status) {
          case 1:
            lb = 'สามารถเข้าทดสอบได้';
            bgcolor = green['700'];
            break;
          case 0:
            lb = 'ไม่สามารถเข้าทดสอบได้';
            bgcolor = red['700'];
            break;
          case -1:
            lb = 'รอการอนุมัติ';
            bgcolor = yellow['800'];
            break;
          default: break;
        }
        return (
          <Chip sx={{ color: 'whitesmoke', backgroundColor: `${bgcolor}`, width: 200 }} label={`${lb}`} />
        );
      },
    },
  ];

  /*------------------- Redux ---------------------------------*/
  const alltestresvdispatch = useDispatch();
  useEffect(() => {
    alltestresvdispatch(fetchAllTestResvInfo());
  }, [alltestresvdispatch,]);
  const alltestresvlist = useSelector((state) => state.testresvinfostate.alltestresvarr);

  console.log('alltestresvlist ))))) ', alltestresvlist.data);

  /*------------------------ FUNC --------------------*/
  const checkStatusFunc = (status) => {
    switch (true) {
      case (status?.includes('APRV')):
        return 1;
      case (status?.includes('DISAP')):
        return 0;
      case (status === null):
        return -1;
      default: break;
    }
  }

  const locationStatusFunc = (location, appvstate) => {
    switch (true) {
      case (appvstate?.includes('APRV')):
        return location !== 'lab0' ? location.toUpperCase() : 'รอกำหนดสถานที่สอบ';
      case (appvstate?.includes('DISAP')):
        return '-';
      case (appvstate === null):
        return 'รอกำหนดสถานที่สอบ';
      default: break;
    }

  }

  /*----------------------------------------------------*/
  useEffect(() => {
    let tmp = [];
    let count = 0;
    alltestresvlist.data.map((row, i) => {
      if (row['testresultcode'].includes(location.state.pers_id)) {
        tmp.push({
          'id': ++count,
          'testdate': convertToFullThaiDate(row['tbtestreservation.testreqdate']),
          'testtime': row['tbtestreservation.testreqtime'].split(':')[0] + row['tbtestreservation.testreqtime'].split(':')[1],
          'reason': row['tbtestreservation.tbtestscoringcriterium.mission'] + ' (' + row['tbtestreservation.country'] + ')',
          'location': locationStatusFunc(row['testlabroom'], row['testindvappvcode']),
          //row['testlabroom'] !== 'lab0' ? row['testlabroom'].toUpperCase() : 'รอกำหนดสถานที่สอบ',
          'status': checkStatusFunc(row['testindvappvcode']),
        })
      }
    });
    setRows(tmp);
  }, [location.state, alltestresvlist]);

  /*----------------------------------- return -------------------------------*/
  return (
    <ThemeProvider theme={theme}>
      <Stack
        divider={<Divider flexItem />}
        spacing={1}
      >
        {/*-------------- Title -----------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
          วันและเวลาในการทดสอบ
        </Item>
        {/*-------------- Subtitle : Id, Name -----------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
          เลขประจำตัว {location.state.pers_id}&emsp;&emsp;ยศ ชื่อ นามสกุล {location.state.name}
        </Item>

        {/*-------------- DataGrid -----------------------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            justifyContent: 'center'
          }}

        >
          <Box width={1150} height={450} marginLeft={10}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold !important',
                  textAlign: 'center',
                  //overflow: 'visible !important'
                },
                '& .MuiDataGrid-renderingZone': {
                  maxHeight: 'none !important'
                },
                '& .MuiDataGrid-cell': {
                  lineHeight: 'unset !important',
                  maxHeight: 'none !important',
                  whiteSpace: 'normal !important',
                  wordWrap: 'break-word !important'
                },
                '& .MuiDataGrid-row': {
                  maxHeight: 'none !important'
                }
              }}
            />
          </Box>
        </Item>
        {/*--------------- Label -------------------*/}
        <Item elevation={0}>
          <Grid
            container
            direction={'column'}
            spacing={2}
          >
            <Grid item>
              <Chip label="สามารถเข้าทดสอบได้" color='success' sx={{ width: 200 }} />
              <Box component="span" sx={{ p: 1 }}>
                <span style={{ padding: '0px 10px ', fontWeight: 'bold' }}>โปรดเข้ามาทดสอบตามวันเวลาที่กำหนด</span>
              </Box>
            </Grid>
            <Grid item>
              <Chip label="ไม่สามารถเข้าทดสอบได้" color='error' sx={{ width: 200 }} />
              <Box component="span" sx={{ p: 1 }}>
                <span style={{ padding: '0px 10px ', fontWeight: 'bold' }}>
                  กรุณาประสานผู้ประสานในการเปลี่ยนวันจองเป็นวันอื่นภายในวันที่ เดือน ปี
                </span>
              </Box>
            </Grid>
          </Grid>
        </Item>
        {/*-------------- Backward Button -----------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
          <Link to="/PageExamManagement"
            state={{
              'rowdata': alltestresvlist?.data.filter(
                elm => elm['tbtestreservation.testresvcode'] === location.state.testresvcode
              )
            }}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant='contained'
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                width: 200, padding: 1, margin: 2
              }}
            >
              ย้อนกลับ
            </Button>
          </Link>
        </Item>
      </Stack>
    </ThemeProvider >
  );
}

export default PageTestDate;