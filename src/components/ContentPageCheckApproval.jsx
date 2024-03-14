/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DataGrid
} from '@mui/x-data-grid';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  styled,
  createTheme,
  ThemeProvider
} from "@mui/material/styles";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red, green, yellow } from "@mui/material/colors";
import { useSelector, useDispatch } from 'react-redux';

import ToPrintPageCheckApproval from "./ToPrintPageCheckApproval";
import {
  fetchTestResultByResvCode,
  fetchLastestIndvTestResult,
  addOrUpdateIndvTestResAppv,
  updateTestResrvAprvState,
  //keepPrevIndvTestResAppv, 
  keepPrevDataGridTestResAppv,
  //updateRsrvAndResultAprv
} from '../store/TestResultSlice';

import { convertToEngDate } from './functions/GlobalFunctions';
const moment = require('moment');

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

/*------------------------ Approval Button -----------------*/
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[200]),
  //backgroundColor: yellow[200],
  borderColor: yellow[400],
  borderWidth: "2px",
  width: 250,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: yellow[500],
    borderColor: yellow[700],
    borderWidth: "2px",
  },
}));

const ColorButtonS = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[200]),
  //backgroundColor: red[200],
  borderColor: red[400],
  borderWidth: "2px",
  width: 250,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: red[500],
    borderColor: red[700],
    borderWidth: "2px",
  },
}));

/*----------------------- Style for Stack ------------------*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  fontFamily: 'THSarabunNew',
  color: theme.palette.text.secondary
}));

/**************************************************************************/
/*-------------------- ContentPageCheckApproval Component ----------------*/
/**************************************************************************/
function ContentPageCheckApproval() {
  const location = useLocation();
  /*---------------- Sort --------------------------*/
  const btnSortRef = useRef(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortByTestAppvClick, setSortByTestAppvClick] = useState(false);
  const [sortByNotTestAppvClick, setSortByNotTestAppvClick] = useState(false);
  const [sortByAllTestStatusClick, setSortByAllTestStatusClick] = useState(false);

  /*------------------------------------------------*/
  const [eachReason, setEachReason] = useState([]); //reason text
  const [dlgOpened, setDlgOpened] = useState(false); //state of dialog box
  const [notAppvRowBtnId, setNotAppvRowBtnId] = useState(-3); // not approval button in datagrid onclick
  const [appvRowBtnId, setAppvRowBtnId] = useState(-3); // approval button in datagrid onclick
  const [btnCancelPopupDlg, setBtnCancelPopupDlg] = useState(false); //cancel btn in dialog box
  const [btnEntireCancel, setBtnEntireCancel] = useState(false); //whole cancel button on click
  const [btnAprvEntireClicked, setBtnAprvEntireClicked] = useState(false);
  const [btnNotAprvEntireClicked, setBtnNotAprvEntireClicked] = useState(false);

  /*--------------- Data Grid -----------------------*/
  const [btnDisable, setBtnDisable] = useState({ 'aprv': false, 'notAprv': false });// disable in case that the test is already done 
  const [rows, setRows] = useState([]);
  const [tmprows, setTmpRows] = useState([]);
  const reasonRef = useRef();

  /*---------------- test & approve check : noteStatusFunc ----------------*/
  const noteStatusFunc = (submittime, appvcode, reasons) => {
    /*------------------ waiting for approvement -------------*/
    if ((submittime === null) && (appvcode === null)) {
      setBtnDisable({ 'aprv': false, 'notAprv': false });
      return 'รออนุมัติ';
    }
    /*------------------ not performed the test -------------*/
    if ((submittime === null) && (appvcode !== null)) {
      setBtnDisable({ 'aprv': false, 'notAprv': false });
      if (appvcode.includes('APRV')) {
        return 'อนุมัติแล้ว';
      } else {
        return reasons;
      }
    }
    /*------------------ already performed the test --------------*/
    if ((submittime !== null) && (appvcode !== null)) {
      setBtnDisable({ 'aprv': true, 'notAprv': true });
      return 'อนุมัติแล้ว';
    }
  }// End of noteStatusFunc

  /*------------------------- Redux -------------------------*/
  /*------------------ Previous Database --------------------*/
  const keepPrevTestResultDispatch = useDispatch();
  const prevDataGridTestResult = useSelector((state) => state.testresultstate.prevDataGridTestResult);
  const testresultlist = useSelector((state) => state.testresultstate.testresultarr);
  /*----------------------------------------------------------------------*/
  const prevTestResult = useRef(null); //===========----> added on 19-11-2023 ************
  useMemo(() => {
    prevTestResult.current = testresultlist?.data;
  }, [btnAprvEntireClicked, btnNotAprvEntireClicked]);//===========----> added on 20-11-2023 ************

  /*------------------- Check Lastest Score ------------------*/
  const [lastscorestate, setLastScoreState] = useState([]);
  const indvtestresultdispatch = useDispatch();

  useEffect(() => {
    const allpromise = testresultlist?.data?.map(e => {
      return indvtestresultdispatch(fetchLastestIndvTestResult(e['tbmemberinfo.pers_id']));
    });

    Promise.all(allpromise).then(res => {
      //console.log('fetchLastestIndvTestResult allpromise --> ', res);
      let tmparr = [];
      res.map(r => {
        /*----------------------------------------------------------------------*/
        /*--------------------------- updated on 17-11-2023 --------------------*/
        /*----------------------------------------------------------------------*/
        if (r['payload']['data'].length !== 0 && r['payload']['data']['latestdate'] !== null) {
          let num_of_days = 0;
          let retest = false; //check whether pass or fail last test
          switch (r['payload']['data']['mission']) {
            case 'SCC1': case 'SCC2': case 'SCC6':
              num_of_days = moment(convertToEngDate(location.state.data.resvdate))
                .diff(moment(r['payload']['data']['latestdate']), 'days');
              retest = (
                r['payload']['data']['score'] !== null &&
                r['payload']['data']['score'] >= r['payload']['data']['minscore']
              ) ? false : true;
              break;
            default: break;
          }
          if (num_of_days <= 365 && !retest) {
            tmparr.push({ 'pers_id': r['payload']['data']['persid'], 'scorestate': 'คะแนนยังไม่หมดอายุ' });
          } else {
            tmparr.push({ 'pers_id': r['payload']['data']['persid'], 'scorestate': 'ทดสอบใหม่' });
          }
          //console.log('tmparr -> ', tmparr, ' : ', num_of_days, ' : ', retest);
        }
      });//end map

      setLastScoreState(tmparr);
    });
  }, [indvtestresultdispatch, location.state.data.resvcode, lastscorestate.length]);

  //console.log('lastscorestate ---> ', lastscorestate);
  //console.log('button in rows ', appvRowBtnId, ' : ', notAppvRowBtnId);

  /*-------------- Datagrid :: Test Result by Reservation Code -----------*/
  const testresultdispatch = useDispatch();
  useEffect(() => {
    setBtnEntireCancel(false);
    testresultdispatch(fetchTestResultByResvCode(location.state.data.resvcode))
      .then((res) => {
        let list = res.payload.data.map((e, i) => (
          lastscorestate[i]?.scorestate === "คะแนนยังไม่หมดอายุ" && appvRowBtnId < -2 && notAppvRowBtnId < -2 ?
            {
              id: i + 1,
              idnumber: e['tbmemberinfo.pers_id'],
              name: e['tbmemberinfo.mem_rank'] + e['tbmemberinfo.mem_fname'] + ' ' + e['tbmemberinfo.mem_lname'],
              reason: e['tbtestreservation.tbtestscoringcriterium.mission'],
              location: e['testlabroom'] === 'lab0' ?
                ((e['testindvappvcode'] !== null && e['testindvappvcode'].includes('APRV')) ?
                  'รอกำหนดห้องสอบ' : '-')
                : e['tblabroom.labroomcode'].toUpperCase(),
              note: e['testindvappvcode'] !== null ?
                e['testindvappvcode'].includes('APRV') ?
                  'อนุมัติแล้ว' :
                  e['testindvappvresult']
                : lastscorestate[i]?.scorestate//"คะแนนยังไม่หมดอายุ",
            } : {
              id: i + 1,
              idnumber: e['tbmemberinfo.pers_id'],
              name: e['tbmemberinfo.mem_rank'] + e['tbmemberinfo.mem_fname'] + ' ' + e['tbmemberinfo.mem_lname'],
              reason: e['tbtestreservation.tbtestscoringcriterium.mission'],
              location: e['testlabroom'] === 'lab0' ?
                ((e['testindvappvcode'] !== null && e['testindvappvcode'].includes('APRV')) ?
                  'รอกำหนดห้องสอบ' : '-')
                : e['tblabroom.labroomcode'].toUpperCase(),
              note: rows[i]?.note !== 'คะแนนยังไม่หมดอายุ' ?
                noteStatusFunc(e['submittime'], e['testindvappvcode'], e['testindvappvresult']) :
                'คะแนนยังไม่หมดอายุ',
            }
        ));
        setTmpRows(list);
      });
  }, [
    testresultdispatch,
    location.state.data.resvcode,
    notAppvRowBtnId,
    appvRowBtnId,
    dlgOpened,
    lastscorestate.length,
  ]);

  /*--------------------- update rows -----------------------*/
  useEffect(() => {
    setRows(tmprows);
  }, [testresultlist, tmprows, rows[notAppvRowBtnId]?.note, notAppvRowBtnId, appvRowBtnId]);

  /*---------------------- Btn : /approve - not approve state --------------------*/
  const aprvStateDispatch = useDispatch(); //btn apprv/notapprv onclick
  /*------------- Update Test Reservation Table with Approve/Not Approve Code ----*/
  useEffect(() => {
    if (notAppvRowBtnId !== -3 || appvRowBtnId !== -3) {
      let updatedata = {
        'testresvcode': location.state.data.resvcode,
        'testappvcode': (tmprows.filter(r => r.note === 'รออนุมัติ').length !== 0) ? null :
          (tmprows.filter(r => r.note === 'อนุมัติแล้ว').length !== 0) ?
            'APRV'.concat(location.state.data.resvcode) :
            'DISAP'.concat(location.state.data.resvcode),
        'testappvresult': (tmprows.filter(r => r.note === 'รออนุมัติ').length !== 0) ? null :
          (tmprows.filter(r => r.note === 'อนุมัติแล้ว').length !== 0) ?
            'APRV' : 'DISAP',
        'testappvdate': (tmprows.filter(r => r.note === 'รออนุมัติ').length !== 0) ? null :
          moment(new Date()).format('YYYY-MM-DD'),
        'testappvtime': (tmprows.filter(r => r.note === 'รออนุมัติ').length !== 0) ? null :
          [new Date().getHours(), new Date().getMinutes(), '00'].join(':'),
        'testapprover': (tmprows.filter(r => r.note === 'รออนุมัติ').length !== 0) ? null :
          '2321321654684' /* to get id from login **********/,
      };

      //console.log('updateTestResrvAprvState ---->', updatedata);
      console.log('====> apprv or not apprv in table activated');
      aprvStateDispatch(updateTestResrvAprvState(updatedata));
    } else {
      console.log('----> not appv -> ', notAppvRowBtnId, ' : appv -> ', appvRowBtnId);
      console.log('----> entired apprv or not entired apprv activated');
      /*---------------------------------------------------------------------*/
      /*------------------------- UPDATED on 21-11-2023 ---------------------*/
      //console.log('+++++++++++++++++',btnAprvEntireClicked, ' :: ', btnNotAprvEntireClicked)
      if (btnEntireCancel) {
        let prevtmp = {};
        prevtmp.testresvcode = location.state.data.resvcode;
        prevTestResult.current?.map(e => {
          if (e.testindvappvcode?.includes('APRV')) {
            prevtmp.testappvcode = e.testindvappvcode.split('-')[0];
            prevtmp.testappvresult = e.testindvappvresult;
            prevtmp.testappvdate = e.testindvappvdate;
            prevtmp.testappvtime = e.testindvappvtime;
            prevtmp.testapprover = e.testindvapprover;
            return;
          }
        });

        if (Object.keys(prevtmp).length === 1) {
          prevTestResult.current?.map(e => {
            if (e.testindvappvcode?.includes('DISAP')) {
              prevtmp.testappvcode = e.testindvappvcode.split('-')[0];
              prevtmp.testappvresult = 'DISAP';
              prevtmp.testappvdate = e.testindvappvdate;
              prevtmp.testappvtime = e.testindvappvtime;
              prevtmp.testapprover = e.testindvapprover;
              return;
            }
          });
        }

        /*------------------------- End -> added :: 22-09-2023 ---------------------*/
        if (prevTestResult.current?.length === 0) {
          aprvStateDispatch(updateTestResrvAprvState({
            'testresvcode': location.state.data.resvcode,
            'testappvcode': testresultlist.data['tbtestreservation.testappvcode'],
            'testappvresult': testresultlist.data['tbtestreservation.testappvresult'],
            'testappvdate': testresultlist.data['tbtestreservation.testappvdate'],
            'testappvtime': testresultlist.data['tbtestreservation.testappvtime'],
            'testapprover': testresultlist.data['tbtestreservation.testapprover'],
          }));
        } else {
          aprvStateDispatch(updateTestResrvAprvState(prevtmp)); //changed on 22-09-2023
        }
      }
    }


  }, [aprvStateDispatch, tmprows, rows, dlgOpened, notAppvRowBtnId, appvRowBtnId, btnEntireCancel]);

  /*------------------------------------ DataGrid -> Column ----------------------*/
  const columns = [
    { field: "id", headerName: "ลำดับ", width: 100, align: 'center', headerAlign: 'center' },
    { field: "idnumber", headerName: "เลขประจำตัว", width: 160, align: 'center', headerAlign: 'center' },
    { field: "name", headerName: "ยศ ชื่อ นามสกุล", width: 200, align: 'center', headerAlign: 'center' },
    { field: "reason", headerName: "เหตุผลขอรับการทดสอบ", width: 200, align: 'center', headerAlign: 'center' },
    { field: "location", headerName: "สถานที่", width: 200, align: 'center', headerAlign: 'center' },
    {
      field: "approval",
      headerName: "การอนุมัติ",
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Fragment>
          {
            rows[params.row.id - 1]['note'] === 'อนุมัติแล้ว' ?
              <Chip label="สามารถเข้าทดสอบได้" color='success' sx={{ width: 200 }} /> :
              <Chip label="ไม่สามารถเข้าทดสอบได้" color='error' sx={{ width: 200 }} />
          }
        </Fragment>
      )
    },
    {
      field: "note",
      headerName: "หมายเหตุ",
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Fragment>
          {
            rows[params.row.id - 1]['note']
          }
        </Fragment>
      )
    },
    {
      field: "manage",
      headerName: "การจัดการ",
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Fragment>
          {/*-------------- Button - Approve--------*/}
          <Button
            variant="contained"
            size="small"
            disabled={btnDisable['aprv']}
            style={{
              marginLeft: 16,
              backgroundColor: !btnDisable['aprv'] ? green[700] : 'gray',
            }}
            onClick={() => {
              setAppvRowBtnId(params.row.id - 1);
              let newarr = rows.map(r => {
                if (r.id === params.row.id) {
                  return { ...r, 'location': 'รอกำหนดห้องสอบ', 'note': 'อนุมัติแล้ว' }
                } else {
                  return { ...r }
                }
              });
              setRows(newarr);
              setTmpRows(newarr);
              let rescode = testresultlist.data.filter(
                e => e.testresultcode.includes(params.row.idnumber)
              )[0]['testresultcode'];

              aprvStateDispatch(
                addOrUpdateIndvTestResAppv({
                  'testresultcode': rescode,
                  'testindvappvcode': 'APRV'.concat(rescode),
                  'testindvappvresult': 'APRV',
                  'testindvappvdate': moment(new Date()).format('YYYY-MM-DD'),
                  'testindvappvtime': [new Date().getHours(), new Date().getMinutes(), '00'].join(':'),
                  'testindvapprover': '2321321654684' // to get id from login **********
                })
              );
            }}//end of onClick
          >
            อนุมัติ
          </Button>
          {/*-------------- Button - Not Approve--------*/}
          < Button
            variant="contained"
            size="small"
            disabled={btnDisable['notAprv']}
            style={{
              marginLeft: 16,
              backgroundColor: !btnDisable['notAprv'] ? red[700] : 'gray',
            }}
            onClick={() => {
              setNotAppvRowBtnId(params.row.id - 1);
              setDlgOpened(true);
              let newarr = rows.map(r => {
                if (r.id === params.row.id) {
                  return {
                    ...r,
                    'location': '-',
                    'note': (!btnCancelPopupDlg) ? rows[params.row.id - 1]['note'] : eachReason[params.row.id - 1]
                  }
                } else {
                  return { ...r }
                }
              });

              if (!btnCancelPopupDlg) {
                setRows(newarr);
                setTmpRows(newarr);
              }
            }}
          >
            ไม่อนุมัติ
          </Button >
        </Fragment >
      ),
    },
  ]; //End of Column

  /*------------------------- EVENT ------------------------------*/
  /*------------------ Event : TextField Changed -----------------*/
  const handleTextChange = (evt) => { //=====---> updated on 19-11-2023
    let data = tmprows.filter(
      r => r.idnumber.includes(evt.target.value) || r.name.includes(evt.target.value) || r.location.includes(evt.target.value) || r.reason.includes(evt.target.value)
    );

    if (evt.target.value === '') {
      let _tmprows;
      if (tmprows.length !== 0) {
        _tmprows = tmprows.map((e, i) => ({
          id: i + 1,
          idnumber: e.idnumber,
          name: e.name,
          location: e.location,
          note: e.note,
          reason: e.reason,
        }));
      } else {
        _tmprows = tmprows;
      }
      setRows(_tmprows);
    } else {
      data = data.map((e, i) => ({
        id: i + 1,
        idnumber: e.idnumber,
        name: e.name,
        location: e.location,
        note: e.note,
        reason: e.reason,
      }));
      setRows(data);
    }
  }
  /*------------------ SortByTestAppvFunc ------------------------*/
  const sortByTestAppvFunc = () => {
    let tmp = tmprows.filter(e => e.note === 'อนุมัติแล้ว');
    if (tmp.length !== 0) {
      tmp = tmp.map((el, i) => ({ ...el, id: i + 1 }));
    }
    setRows(tmp);
  }

  /*------------------ SortByNotTestAppvFunc ------------------------*/
  const sortByNotTestAppvFunc = () => {
    let tmp = tmprows.filter(e => e.note !== 'อนุมัติแล้ว');
    if (tmp.length !== 0) {
      tmp = tmp.map((el, i) => ({ ...el, id: i + 1 }));
    }
    setRows(tmp);
  }

  /*------------------ SortByAllTestAppvFunc ------------------------*/
  const sortByAllTestAppvFunc = () => {
    setRows(tmprows);
  }

  /*------------------ Handle Sort Menu Click ----------------*/
  const handleSortMenuOnClick = (evt) => () => {
    switch (evt) {
      case 0: //sort by approval
        sortByTestAppvFunc();
        setSortByTestAppvClick(!sortByTestAppvClick);
        break;
      case 1: //sort by not approval
        sortByNotTestAppvFunc();
        setSortByNotTestAppvClick(!sortByNotTestAppvClick);
        break;
      case 2: // all test status
        sortByAllTestAppvFunc();
        setSortByAllTestStatusClick(!sortByAllTestStatusClick);
        break;
      default: break;
    }
    setSortMenuOpen(false);
  }

  /*------------------ Handle Approve ----------------------*/
  const handleCloseDlg = () => {
    if (eachReason[notAppvRowBtnId] === undefined) {
      setBtnCancelPopupDlg(false);
    }
    setDlgOpened(false);
  }

  /*--------------------------------------------- Return --------------------------------------*/
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
          ตรวจสอบการอนุมัติวันทดสอบ
        </Item>

        {/*-------------- Print, Search Bar, filter ---------------*/}
        <Item elevation={0}>
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {/*-------------- Page Print -----------------*/}
            <Item elevation={0}>
              <ToPrintPageCheckApproval toprint={{ r: rows, resvinfo: location.state.data }} />
            </Item>

            {/*-------------- Search -----------------*/}
            <Item elevation={0}>
              <TextField
                variant="outlined"
                sx={{ width: 500 }}
                InputProps={{
                  style: {
                    height: '38px'
                  }
                }}
                onChange={handleTextChange}
              />
            </Item>

            {/*-------------- Sort -----------------*/}
            <Item elevation={0}>
              <Fragment>
                <Button
                  ref={btnSortRef}
                  aria-controls={'basic-menu'}
                  aria-haspopup='true'
                  aria-expanded={sortMenuOpen ? 'true' : undefined}
                  variant={'contained'}
                  endIcon={<ExpandMoreIcon />}
                  onClick={() => {
                    setSortMenuOpen(!sortMenuOpen);
                  }}
                >
                  กรอง
                </Button>
                <Menu
                  anchorEl={btnSortRef.current}
                  open={sortMenuOpen}
                  onClose={handleSortMenuOnClick}
                >
                  <MenuItem onClick={handleSortMenuOnClick(0)}>ทดสอบได้</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(1)}>ทดสอบไม่ได้</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(2)}>ทั้งหมด</MenuItem>
                </Menu>
              </Fragment>
            </Item>
          </Stack>
        </Item>
        {/*--------------- Reservation -> Date & Time -------------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          การจอง วัน {location.state.data.resvdate} เวลา {location.state.data.resvtime}
        </Item>

        {/*--------------- DataGrid -------------------*/}
        <Item elevation={0}>
          <Paper component={Box} width={1} height={450} elevation={0}>
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
                '& .MuiDataGrid-renderingZone': {//===---> added on 18-11-2023 ****
                  maxHeight: 'none !important'
                },
                '& .MuiDataGrid-cell': {//===---> added on 18-11-2023 ****
                  lineHeight: 'unset !important',
                  maxHeight: 'none !important',
                  whiteSpace: 'normal !important',
                  wordWrap: 'break-word !important'
                },
                '& .MuiDataGrid-row': {//===---> added on 18-11-2023 ****
                  maxHeight: 'none !important'
                }
              }}
            />
          </Paper>
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
                  กรุณาเปลี่ยนวันจองเป็นวันอื่นภายในวันที่ เดือน ปี
                </span>
              </Box>
            </Grid>
          </Grid>
        </Item>

        {/*--------------- Button -> Approve All & Not Approve All-------------------*/}
        <Item elevation={0}>
          <Stack direction={'row'} justifyContent={'center'}>
            {
              !btnNotAprvEntireClicked &&
              <Item elevation={0}>
                {
                  !btnAprvEntireClicked ?
                    <ColorButton
                      variant="outlined"
                      sx={{
                        marginLeft: '10px',
                        backgroundColor: !btnDisable['aprv'] ? yellow[200] : 'gray'
                      }}
                      disabled={btnDisable['aprv']}
                      onClick={() => {
                        //prevTestResult.current = testresultlist.data; //====-----> added on 19-11-2023 ******
                        keepPrevTestResultDispatch(keepPrevDataGridTestResAppv(Object.assign([], rows)));
                        let _rows = rows.map((el, i) => (
                          { ...el, id: i + 1, location: 'รอกำหนดห้องสอบ', note: 'อนุมัติแล้ว' }
                        ));
                        setRows(_rows);
                        setTmpRows(_rows)
                        setBtnAprvEntireClicked(true);
                        setBtnNotAprvEntireClicked(false);
                        setNotAppvRowBtnId(-2); // -2 : กดอนุมัติทั้งหมด
                        setAppvRowBtnId(-2); // -2 : กดอนุมัติทั้งหมด
                        setBtnEntireCancel(false);
                        _rows.map(el => {
                          let rescode = testresultlist.data.filter(
                            e => e.testresultcode.includes(el.idnumber)
                          )[0]['testresultcode'];

                          aprvStateDispatch(
                            addOrUpdateIndvTestResAppv({
                              'testresultcode': rescode,
                              'testindvappvcode': 'APRV'.concat(rescode),
                              'testindvappvresult': 'APRV',
                              'testindvappvdate': moment(new Date()).format('YYYY-MM-DD'),
                              'testindvappvtime': [new Date().getHours(), new Date().getMinutes(), '00'].join(':'),
                              'testindvapprover': '2321321654684' // to get id from login **********
                            })
                          );

                        });
                      }} //end of click
                    //className="BtnApprove"
                    >
                      อนุมัติการจองวันทดสอบทั้งหมด
                    </ColorButton>
                    :
                    <ColorButton
                      variant="outlined"
                      sx={{
                        marginLeft: '10px',
                        backgroundColor: !btnDisable['aprv'] ? yellow[200] : 'gray'
                      }}
                      disabled={btnDisable['aprv']}
                      onClick={() => {
                        setNotAppvRowBtnId(-3);
                        setAppvRowBtnId(-3);
                        setBtnEntireCancel(true);

                        const allPromises = prevTestResult.current.map(el => {
                          return (
                            aprvStateDispatch(
                              addOrUpdateIndvTestResAppv(
                                {
                                  'testresultcode': el.testresultcode,
                                  'testindvappvcode': el.testindvappvcode,
                                  'testindvappvresult': el.testindvappvresult,
                                  'testindvappvdate': el.testindvappvdate,
                                  'testindvappvtime': el.testindvappvtime,
                                  'testindvapprover': el.testindvapprover
                                }
                              )
                            ));
                        });
                        Promise.all(allPromises)?.then((res) => {
                          setTmpRows([...prevDataGridTestResult]);
                          setRows([...prevDataGridTestResult]);
                          setBtnAprvEntireClicked(false);
                          setBtnNotAprvEntireClicked(false);
                        });
                      }} //end of onClick
                    //className="BtnApprove"
                    >
                      ยกเลิกการอนุมัติการจองวันทดสอบ
                    </ColorButton>
                }
              </Item>
            }
            {
              !btnAprvEntireClicked &&
              <Item elevation={0}>
                {
                  !btnNotAprvEntireClicked ?
                    <ColorButtonS
                      variant="outlined"
                      sx={{
                        marginLeft: '10px',
                        backgroundColor: !btnDisable['notAprv'] ? red[200] : 'gray',
                      }}
                      disabled={btnDisable['notAprv']}
                      //className="BtnApprove"
                      onClick={() => {
                        //prevTestResult.current = testresultlist.data; //====-----> added on 19-11-2023 ******
                        /*keepPrevTestResultDispatch(
                          keepPrevIndvTestResAppv({ 'resvcode': location.state.data.resvcode, 'active': 1 })
                        );*/
                        keepPrevTestResultDispatch(keepPrevDataGridTestResAppv(Object.assign([], rows)));
                        setDlgOpened(true);
                        setBtnAprvEntireClicked(false);
                        setBtnNotAprvEntireClicked(true);
                        setNotAppvRowBtnId(-1);
                        setAppvRowBtnId(-1);
                        setBtnEntireCancel(false);
                      }}
                    >
                      ไม่อนุมัติการจองวันทดสอบทั้งหมด
                    </ColorButtonS>
                    :
                    <ColorButton
                      variant="outlined"
                      sx={{
                        marginLeft: '10px',
                        backgroundColor: !btnDisable['aprv'] ? yellow[200] : 'gray'
                      }}
                      disabled={btnDisable['aprv']}
                      onClick={() => {
                        setNotAppvRowBtnId(-3);
                        setAppvRowBtnId(-3);
                        setBtnEntireCancel(true);

                        const allPromises = prevTestResult.current.map(el => {
                          return (
                            aprvStateDispatch(
                              addOrUpdateIndvTestResAppv(
                                {
                                  'testresultcode': el.testresultcode,
                                  'testindvappvcode': el.testindvappvcode,
                                  'testindvappvresult': el.testindvappvresult,
                                  'testindvappvdate': el.testindvappvdate,
                                  'testindvappvtime': el.testindvappvtime,
                                  'testindvapprover': el.testindvapprover
                                }
                              )
                            ));
                        });
                        Promise.all(allPromises)?.then((res) => {
                          setTmpRows([...prevDataGridTestResult]);
                          setRows([...prevDataGridTestResult]);
                          setBtnAprvEntireClicked(false);
                          setBtnNotAprvEntireClicked(false);
                        });
                      }}
                    //className="BtnApprove"
                    >
                      ยกเลิกการอนุมัติการจองวันทดสอบ
                    </ColorButton>
                }
              </Item>
            }
            <Dialog open={dlgOpened} onClose={handleCloseDlg} fullWidth>
              <DialogTitle sx={{
                textAlign: 'center',
              }}>
                <Typography sx={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>
                  ระบุเหตุผลไม่อนุมัติการจอง
                </Typography>
              </DialogTitle>
              <DialogContent>
                <TextField
                  id="filled-multiline-flexible"
                  label="เหตุผลไม่อนุมัติการจอง"
                  multiline
                  maxRows={4}
                  variant="filled"
                  fullWidth
                  defaultValue={
                    rows[notAppvRowBtnId]?.note === 'คะแนนยังไม่หมดอายุ' ?
                      'คะแนนยังไม่หมดอายุ' : ''
                  }
                  inputRef={reasonRef}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (notAppvRowBtnId === -1) { //not aprv button for whole rows 
                      setEachReason(new Array(rows.length).fill(reasonRef.current.value));
                      let _rows = rows.map((el, i) => (
                        { ...el, id: i + 1, location: '-', note: reasonRef.current.value }
                      ));
                      _rows.map(el => {
                        let rescode = testresultlist.data.filter(
                          e => e.testresultcode.includes(el.idnumber)
                        )[0]['testresultcode'];

                        aprvStateDispatch(addOrUpdateIndvTestResAppv({
                          'testresultcode': rescode,
                          'testindvappvcode': 'DISAP'.concat(rescode),
                          'testindvappvresult': reasonRef.current.value,
                          'testindvappvdate': moment(new Date()).format('YYYY-MM-DD'),
                          'testindvappvtime': [new Date().getHours(), new Date().getMinutes(), '00'].join(':'),
                          'testindvapprover': '2321321654684' // to get id from login **********
                        }));
                      }); // end of _row
                      setTmpRows(_rows);
                      setRows(_rows);
                    } else {//not aprv button in datagrid
                      let newarr = [...tmprows]; //change to tmprows
                      newarr[notAppvRowBtnId]['note'] = reasonRef.current.value;
                      setTmpRows(newarr);
                      setRows(newarr);

                      let rescode = testresultlist.data[notAppvRowBtnId]['testresultcode'];
                      aprvStateDispatch(addOrUpdateIndvTestResAppv({
                        'testlabroom': 'lab0',
                        'testresultcode': rescode,
                        'testindvappvcode': 'DISAP'.concat(rescode),
                        'testindvappvresult': reasonRef.current.value,
                        'testindvappvdate': moment(new Date()).format('YYYY-MM-DD'),
                        'testindvappvtime': [new Date().getHours(), new Date().getMinutes(), '00'].join(':'),
                        'testindvapprover': '2321321654684' // to get id from login **********
                      }));
                    }//end if

                    handleCloseDlg();
                  }}
                >
                  บันทึก
                </Button>
                <Button onClick={() => {
                  if (notAppvRowBtnId !== -1) {
                    rows[notAppvRowBtnId]['note'] = reasonRef.current.value === 'คะแนนยังไม่หมดอายุ' ? 'คะแนนยังไม่หมดอายุ' : '';
                  }
                  setBtnAprvEntireClicked(false);
                  setBtnNotAprvEntireClicked(false);
                  setBtnCancelPopupDlg(true);
                  handleCloseDlg();
                }}
                  variant="contained"
                >
                  ยกเลิก
                </Button>
              </DialogActions>
            </Dialog>
            {/*</Item>}*/}
          </Stack>
        </Item>
        {/*--------------- Button -> Back -------------------*/}
        <Item
          elevation={0}
          sx={{ textAlign: 'center' }}
        >
          <Button
            component={Link}
            to={'/PageTestManagement'/*'/PageBookTestDate'*/} /*=====----> updated on 19-11-2023*/
            variant='contained'
            sx={{
              width: 200,
              fontWeight: 'bold',
            }}
          >
            ย้อนกลับ
          </Button>
        </Item>
      </Stack >
    </ThemeProvider >
  );
}

export default ContentPageCheckApproval;