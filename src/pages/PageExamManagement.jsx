/* eslint-disable valid-typeof */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useMemo, useRef } from 'react';
import {
  DataGrid,
} from '@mui/x-data-grid';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Stack,
  Divider,
  Paper,
  TextField,
  Menu,
  MenuItem,
  Box,
  Button,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material";
import { toast } from "react-toastify";

import ToPrintPageExamManagement from '../components/ToPrintPageExamManagement';
/*------------------ Redux -----------------------*/
import { useSelector, useDispatch } from 'react-redux';
import { fetchSeatStatusInfoByDateAndTime } from '../store/SeatMgmtSlice';
import {
  updateIndvTestType,
  fetchAllTestResultByDateAndTime,
  updateInvigatorDateAndTime,
  updateLabroomByIndvTestResultCode, //added : 08-11-2023
  fetchAllTestForm, //added : 26-12-2023
  updateIndvTestForm, //added : 26-12-2023
  fetchTestFormByResvcodePersid, //added : 12-01-2024
  delTestFormByResvcodePersid //added : 13-01-2024
} from '../store/TestMgmtSlice';
import { convertToThaiDate } from '../components/functions/GlobalFunctions';
import { green } from '@mui/material/colors';

/*----------------- theme ------------------------*/
const theme = createTheme({
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

/*----------------------- Style ------------------*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontFamily: 'THSarabunNew',
  color: theme.palette.text.secondary
}));

/*--------------------- PageExamManagement ---------------------*/
function PageExamManagement() {
  const location = useLocation();
  const labroomarr = ['เลือกสถานที่สอบ', 'LAB1', 'LAB2', 'LAB3', 'LAB6'];

  /*-------------------------- added on 11-11-2023 -----------------------*/
  const [invenable, setInvEnable] = useState({ 'lab1': true, 'lab2': true, 'lab3': true, 'lab6': true });
  /*----------------------------------------------------------------------*/
  const [labroominvnamelist, setLabroomInvNameList] = useState({
    'lab0': '', 'lab1': '', 'lab2': '', 'lab3': '', 'lab6': '' //---> added on 14-11-2023
  });

  const [labroominvlist, setLabroomInvList] = useState({
    'lab0': '', 'lab1': '', 'lab2': '', 'lab3': '', 'lab6': '' //---> updated on 11-11-2023
  });//******setting of all initial vales equal to '' because of warning out-of-range of SELECT

  /*--------------- Select : Dropdown ---------------*/
  const [seltesttype, setSelTestType] = useState(
    Object.values(labroominvlist).some(e => e > 0) ?
      labroominvlist :
      location.state.rowdata.map(e => { return e.testtype !== null ? e.testtype : '' })
  );
  /*---------------------------------updated on 10-01-2024 -------------------------------------*/
  const [sellabroom, setSelLabRoom] = useState(
    location.state.rowdata.map(e => (
      labroomarr.indexOf(e.testlabroom !== 'lab0' ?
        e.testlabroom?.toUpperCase() : 'เลือกสถานที่สอบ'
      )))
  ); //---> updated on 11-11-2023

  /*------------------ Data To Print -------------------------*/
  const [datatoprint, setDataToPrint] = useState([]);

  /*---------------------------- added on 10-11-2023 -------------------------*/
  const [selNewInvigilator, setSelNewInvigilator] = useState(
    { 'lab1': false, 'lab2': false, 'lab3': false, 'lab6': false } //---> updated on 11-11-2023
  );
  const updateinvstate = useSelector((state) => state.testmgmtstate.updateinvigatorbydatetimearr);
  useMemo(() => {
    if (Object.values(selNewInvigilator).some(objval => objval === true)) {
      if (updateinvstate?.data?.completed) {
        toast.success('อัพเดทรายชื่อผู้คุมสอบเรียบร้อยแล้ว', {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        toast.error('ไม่สามารถอัพเดทรายชื่อผู้คุมสอบได้ กรุณาตตรวจสอบ', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  }, [selNewInvigilator, updateinvstate]);

  /*----------------- Event : Sort Menu Handle -------------*/
  const btnSortRef = useRef(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortPersIdClick, setSortPersIdClick] = useState(false);
  const [sortRankClick, setSortRankClick] = useState(false);
  const [sortLabroomClick, setSortLabroomClick] = useState(false);

  /*------------ Redux : useDispatch && useSelector ----------------*/
  /*---------------------------- added on 10-11-2023 & updated onสอบ 11-11-2023 -------------------------*/
  const [labroomupdated, setLabroomUpdated] = useState(false);
  const updatelabroom = useSelector((state) => state.testmgmtstate.updatelabroomarr);
  //console.log('updatelabroom -->', updatelabroom?.data?.completed, ' : ', labroomupdated);
  useEffect(() => {
    // console.log('updatelabroom -->', updatelabroom?.data.completed)
    if (updatelabroom?.data.completed) {
      if (labroomupdated) {
        toast.success('อัพเดทห้องสอบเรียบร้อยแล้ว', {
          position: toast.POSITION.TOP_CENTER
        });
        setLabroomUpdated(false);
      }
    } else {
      toast.error('ไม่สามารถอัพเดทห้องสอบได้ กรุณาตรวจสอบ', {
        position: toast.POSITION.TOP_CENTER
      });
    }

  }, [updatelabroom, labroomupdated, location.state.rowdata]);

  const updateInvDateAndTimeDispatch = useDispatch();
  const updateLabByIndvResultCodeDispatch = useDispatch();//added : 08-11-2023
  const updateIndvTestFormDispatch = useDispatch();//added : 26-12-2023
  const testtypeDispatch = useDispatch();
  const alltestresultlbDispatch = useDispatch();
  const seatdispatch = useDispatch();
  const alltestresultlist = useSelector((state) => state.testmgmtstate.alltestresultbydatetimearr);
  const seatstate = useSelector(state => state.seatstate.seatstatus);
  const meminfobyusrtype = useSelector((state) => state.memberinfostate.meminfobyusrtype);

  useEffect(() => {
    seatdispatch(
      fetchSeatStatusInfoByDateAndTime(
        {
          'resvcode': location.state.rowdata[0]['tbtestreservation.testresvcode'],
          'date': convertToThaiDate(location.state.rowdata[0]['tbtestreservation.testreqdate']),
          'time': location.state.rowdata[0]['tbtestreservation.testreqtime']
        }
      )
    );

    alltestresultlbDispatch(
      fetchAllTestResultByDateAndTime(
        {
          'date': location.state.rowdata[0]['tbtestreservation.testreqdate'],
          'time': location.state.rowdata[0]['tbtestreservation.testreqtime']
        }
      )
    );
  },
    [
      seatdispatch,
      alltestresultlbDispatch,
      location.state.rowdata,
      updatelabroom,
      selNewInvigilator
    ]); //---> updated on 11-11-2023

  /*---------------------- added on 26-12-2023 ------------------------*/
  const testformdispatch = useDispatch();
  useEffect(() => {
    testformdispatch(fetchAllTestForm());
  }, [testformdispatch]);

  //console.log('location.state.rowdata --> ', location.state.rowdata);

  const [seltestform, setSelTestForm] = useState([]); //---> under construction
  const [alltestform, setAllTestForm] = useState([]);
  const testformlist = useSelector((state) => state.testmgmtstate.questionform);
  useMemo(() => {
    let tmp = ['กรุณาเลือกฟอร์ม', ...Object.values({ ...testformlist })];
    setAllTestForm(tmp);
  }, [testformlist]);

  /*--------------------------------------------------------------------------*/

  const [invigilator, setInvigilator] = useState([]);
  const [invigilatorList, setInvigilatorList] = useState([]);
  useMemo(() => {
    if (meminfobyusrtype?.length !== 0) {
      let invigilatorlist = meminfobyusrtype?.map(e => ({
        'pers_id': e['tbmember.pers_id'],
        'name': e['tbmember.tbmemberinfos.mem_rank'] +
          e['tbmember.tbmemberinfos.mem_fname'] + ' ' +
          e['tbmember.tbmemberinfos.mem_lname']
      }));
      let invnamelist = invigilatorlist?.map(inv => { return inv.name });
      /*---------- added : 01-11-2023 and updated : 11-11-2023 ------------------*/
      setInvigilator(['เลือกผู้คุมสอบ', ...invnamelist || []]); //drop-down list
      /*----------------------------------------------------------------------*/
      setInvigilatorList(invigilatorlist); //pers_id + name
    }
  }, [meminfobyusrtype]);

  /*------------------------- FUNC : checkAndGetInvigatorFunc ----------------------*/
  const checkAndGetInvigatorFunc = (lbroom, data) => {
    if (data['tbtestresults.testlabroom'] === lbroom) {
      if (invigilatorList?.filter(e => e.pers_id === data['tbtestresults.invigilator']).length !== 0) {
        let invname = invigilatorList.filter(e => e.pers_id === data['tbtestresults.invigilator'])[0].name;
        return ({ 'index': invigilator.indexOf(invname), 'invname': invname });
      } else {
        return ({ 'index': 0, 'invname': '' });//0;
      }
    }
  };

  /*---------------------- Rows ---------------------------------*/
  const [rows, setRows] = useState([]);
  const [prevrows, setPrevRows] = useState([]);
  useEffect(() => {
    let tmprows = [];
    location.state.rowdata.map((r, i) => {
      tmprows.push(
        {
          'id': i + 1,
          'idnumber': r['tbmemberinfo.tbmember.pers_id'],
          'name': r['tbmemberinfo.mem_rank'] + ' ' + r['tbmemberinfo.mem_fname'] + '  ' + r['tbmemberinfo.mem_lname']
        });
    });

    setPrevRows(tmprows);
    setRows(tmprows);
  }, [location.state.rowdata]);

  /*----------------- AssignToPrintFunc ------------------------*/
  const AssignToPrintFunc = (eachrow, index) => {
    //console.log('AssignToPrintFunc seltestform ==>> ', index, ' : ', typeof seltesttype, ' : ', seltesttype);
    let printinfo = Object.assign(eachrow,
      {
        'testtype': (typeof seltesttype !== undefined && seltesttype !== undefined) ? seltesttype[index] : 0,
        'indvtfrm': seltestform[index],
        'labroom': labroomarr[sellabroom[index]],
        'unit': location.state.rowdata[0]['tbtestreservation.testrequnit'],
        'resvcode': location.state.rowdata[0]['tbtestreservation.testresvcode'],
        'testappvcode': location.state.rowdata[0]['tbtestreservation.testappvcode'],
        'date': convertToThaiDate(location.state.rowdata[0]['tbtestreservation.testreqdate']),
        'time': location.state.rowdata[0]['tbtestreservation.testreqtime'],
        'remainseat': ['LAB1', 'LAB2', 'LAB3', 'LAB6'].map(lb => { return switchCaseFunc(lb) }),
        'invigilator': labroominvnamelist
      }
    );

    return printinfo;
  }

  useEffect(() => {
    /*-------------------------- added && updated on 11-11-2023 ------------------------*/
    let tmplist = { 'lab0': 0, 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 };
    let tmpinvenablelist = { 'lab0': true, 'lab1': true, 'lab2': true, 'lab3': true, 'lab6': true };
    let tmpinvnamelist = { 'lab0': '', 'lab1': '', 'lab2': '', 'lab3': '', 'lab6': '' };

    /*----------------------------------------------------------------------*/
    let labinvarr = { 'lab0': [], 'lab1': [], 'lab2': [], 'lab3': [], 'lab6': [] }; //---> added on 01-12-2023
    let lab = null;
    alltestresultlist?.data?.map(el => { //---> updated on 11-11-2023
      switch (el['tbtestresults.testlabroom']) {
        case 'lab0': //---> added on 14-11-2023
          lab = checkAndGetInvigatorFunc('lab0', el);
          tmplist['lab0'] = lab['index'];
          tmpinvnamelist['lab0'] = lab['invname'];
          tmpinvenablelist['lab0'] = false;
          labinvarr['lab0'].push(lab); //---> added on 01-12-2023
          break;
        case 'lab1': //---> added on 14-11-2023
          lab = checkAndGetInvigatorFunc('lab1', el);
          tmplist['lab1'] = lab['index'];
          tmpinvnamelist['lab1'] = lab['invname'];
          tmpinvenablelist['lab1'] = false;
          labinvarr['lab1'].push(lab); //---> added on 01-12-2023
          break;
        case 'lab2': //---> added on 14-11-2023
          lab = checkAndGetInvigatorFunc('lab2', el);
          tmplist['lab2'] = lab['index'];
          tmpinvnamelist['lab2'] = lab['invname'];
          tmpinvenablelist['lab2'] = false;
          labinvarr['lab2'].push(lab); //---> added on 01-12-2023
          break;
        case 'lab3': //---> added on 14-11-2023
          lab = checkAndGetInvigatorFunc('lab3', el);
          tmplist['lab3'] = lab['index'];
          tmpinvnamelist['lab3'] = lab['invname'];
          tmpinvenablelist['lab3'] = false;
          labinvarr['lab3'].push(lab); //---> added on 01-12-2023
          break;
        case 'lab6': //---> added on 14-11-2023
          lab = checkAndGetInvigatorFunc('lab6', el);
          tmplist['lab6'] = lab['index'];
          tmpinvnamelist['lab6'] = lab['invname'];
          tmpinvenablelist['lab6'] = false;
          labinvarr['lab6'].push(lab); //---> added on 01-12-2023
          break;
        default: break;
      }
    });

    /*------------------------------------------------*/
    /*----------------- added on 01-12-2023 ----------*/
    /*------------------------------------------------*/
    let newlabinvarr = Object.values(labinvarr).map(elm => {
      if (elm.length > 1) {
        let _tmp = elm.filter(e => e.invname !== '');
        if (_tmp.length !== 0) {
          return _tmp;
        } else {
          return [{ 'index': 0, 'invname': '' }];
        }
      } else if (elm.length === 0) {
        return [{ 'index': 0, 'invname': '' }];
      } else {
        return elm;
      }
    });

    newlabinvarr.map((elm, i) => {
      tmplist['lab'.concat(i)] = elm[0].index;
    });
    /*------------------------------------------------*/

    setLabroomInvList(tmplist);
    setLabroomInvNameList(tmpinvnamelist); //---> added on 14-11-2023
    setInvEnable(tmpinvenablelist);  //---> added on 11-11-2023
    setSelTestType(alltestresultlist?.data?.map(e => { return { 'persid': e['tbtestresults.testresultcode'].split('-')[1], 'type': e['tbtestresults.testtype'] } }));

  }, [alltestresultlist?.data, location.state.rowdata, updatelabroom]); //---> updated on 11-11-2023

  //console.log('xxxxxxxxxxxxxx--->', alltestresultlist?.data);
  /*-------------------------- added on 11-11-2023 -----------------------*/
  /*--------------------------------- Func : uniqueElementObjArrFunc---------------------------*/
  const uniqueElementObjArrFunc = (labnr) => {
    let unique = [];
    sellabroom.map((e, i) => {
      unique.push(Object.assign({ 'lab': e }, invigilatorList[Object.keys(labroominvlist).some(ex => ex.includes(e.toString())) ? Object.values(labroominvlist)[e] - 1 : -1]))
    });

    unique = unique.filter((e, i) => unique[i].lab === e.lab).reduce((a, b) => {
      if (!a.find((item) => item.lab === b.lab)) {
        a.push(b);
      }
      return a;
    }, []);

    return unique.filter(e => e.lab === labnr);
  }
  //console.log("local: ", location.state.rowdata[0])
  const delTestFormByResvcodePersidDispatch = useDispatch();
  /*----------------------------- DataGrid Columns ------------------------*/
  const columns = [
    { field: "id", headerName: "ลำดับ", width: 100, align: 'center', headerAlign: 'center', },
    { field: "idnumber", headerName: "เลขประจำตัว", width: 200, align: 'center', headerAlign: 'center', },
    { field: "name", headerName: "ยศ ชื่อ นามสกุล", width: 200, align: 'center', headerAlign: 'center', },
    {
      field: "type", headerName: "แบบ", width: 250, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
              }}
              value={ ////////////////////////////////////////////////////////////////
                (typeof seltesttype !== undefined && seltesttype !== undefined) ?
                  seltesttype.filter(e => e.persid === params.row.idnumber)[0]?.type ?? 0 :
                  0
                //seltesttype.filter(e => e.persid === params.row.idnumber)[0]?.type ?? 0
              } //---> updated on 13-11-2023 ***********
              disabled={
                alltestresultlist?.data[params.id - 1] !== undefined &&
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'] !== null ?
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'].includes('DISAP') ?
                    true : false
                  : true
              }
              onChange={(evt) => {
                let newarr = [...seltesttype];
                newarr.filter(e => e.persid === params.row.idnumber)[0].type = evt.target.value;
                setSelTestType(newarr);
                /*----------------- Redux : Dispatch -----------------*/
                //---> updated on 13-11-2023
                testtypeDispatch(
                  updateIndvTestType({
                    'testresultcode': location.state.rowdata.map(
                      r => { if (r.testresultcode.includes(params.row.idnumber)) { return r } }
                    ).filter(e => e !== undefined)[0].testresultcode,
                    'testtype': evt.target.value
                  })
                ).then(res => {
                  if (res.payload.data.completed) {
                    toast.success('อัพเดทรูปแบบการสอบรายบุคคลเรียบร้อยแล้ว', { position: 'top-center' });
                  } else {
                    toast.error('เกิดข้อผิดพลาด ไม่สามารถอัพเดทรูปแบบการสอบรายบุคคลได้', { position: 'top-center' });
                  }
                })
              }}
            >
              {
                ['เลือกรูปแบบการสอบ', 'Random Test', 'Adaptive Test'].map((el, i) => {
                  return (
                    <MenuItem
                      key={i}
                      value={i}
                      style={{
                        fontSize: '14px',
                        fontFamily: 'THSarabunNew',
                      }}
                    >
                      {el}
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        )
      }//end return
    },
    {
      field: "form", headerName: "ฟอร์ม", width: 200, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
              }}
              value={seltestform[params.id - 1] ?? 0} /*==---> updated on 19-11-2023 */
              disabled={
                alltestresultlist?.data[params.id - 1] !== undefined &&
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'] !== null ?
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'].includes('DISAP') ?
                    true : false
                  : true ///////////////////////
              }
              onChange={(evt) => {
                delTestFormByResvcodePersidDispatch(delTestFormByResvcodePersid({
                  'resvcodepersid':
                    location.state.rowdata[0]['tbtestreservation.testresvcode'].concat(
                      '-',
                      params.row.idnumber,
                      '-',
                      alltestform[seltestform[params.id - 1]]
                    )
                })).then(res => {
                  if (res.payload.del_success) {
                    let newarr = [...seltestform];
                    newarr[params.id - 1] = evt.target.value;
                    setSelTestForm(newarr);

                    updateIndvTestFormDispatch(updateIndvTestForm({
                      'resvcode': location.state.rowdata[0]['tbtestreservation.testresvcode'],
                      'persid': params.row.idnumber,
                      'form': testformlist[parseInt(evt.target.value) - 1]
                    })).then(res => {
                      if (res.payload.completed) {
                        toast.success('สร้างแบบทดสอบรายบุคคลเรียบร้อยแล้ว', { position: 'top-center' });
                      } else {
                        toast.error('เกิดข้อผิดพลาด ไม่สามารถสร้างแบบทดสอบรายบุคคลได้', { position: 'top-center' });
                      }
                    });
                  }
                });

              }}//end of onChange
            >
              {
                alltestform.map((frm, i) => {
                  return (
                    <MenuItem value={i} key={i}>{frm}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        )
      }//end return
    },
    {
      field: "examlocation", headerName: "สถานที่สอบ", width: 200, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
              }}
              value={sellabroom[params.id - 1]} //---> updated on 11-11-2023
              disabled={
                alltestresultlist?.data[params.id - 1] !== undefined &&
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'] !== null ?
                  alltestresultlist?.data[params.id - 1]['tbtestresults.testindvappvcode'].includes('DISAP') ?
                    true : false
                  : true
              }
              onChange={(evt) => {
                let newarr = [...sellabroom];
                newarr[params.id - 1] = evt.target.value;
                setSelLabRoom(newarr);
                /*------------------- Dispatch : added on 08-11-2023 ----------------------------*/
                setLabroomUpdated(true);
                updateLabByIndvResultCodeDispatch(
                  updateLabroomByIndvTestResultCode({
                    'testresultcode': location.state.rowdata[0]['tbtestreservation.testresvcode'].concat('-', params.row.idnumber),
                    'labroom': ['lab0', 'lab1', 'lab2', 'lab3', 'lab6'][newarr[params.id - 1]],
                    'invigilator': uniqueElementObjArrFunc(
                      parseInt(['lab0', 'lab1', 'lab2', 'lab3', 'lab6'][newarr[params.id - 1]].slice(-1))
                    )[0]?.pers_id
                  })
                );
              }}
            >
              {
                labroomarr.map((el, i) => {
                  return (
                    <MenuItem
                      key={i}
                      value={i}
                      style={{
                        fontSize: '14px',
                        fontFamily: 'THSarabunNew',
                      }}
                    >
                      {el}
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        )
      }//end return
    },
    {
      field: "manage", headerName: "การจัดการ", width: 200, align: 'center', headerAlign: 'center',
      renderCell: (params) => {
        return (
          <strong>
            <Link to="/PageTestDate"
              state={{
                'pers_id': params.row.idnumber,
                'name': params.row.name,
                'testresvcode': location.state.rowdata[0]['tbtestreservation.testresvcode']
              }}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16, color: '#fff' }}
              >
                ดูวันเวลาการทดสอบ
              </Button>
            </Link>
          </strong>
        )
      },
    },
  ];

  /*--------------------- Func : Switch Case Function -------------------*/
  const switchCaseFunc = (lb) => {
    let remainseat = 0;
    if (typeof seatstate !== 'undefined') { //----> added on 26-12-2023 ******
      if (seatstate.length !== 0) {
        switch (lb) {
          case 'LAB1':
            remainseat = seatstate.data.totalseat?.lab1 - seatstate.data.seatcount?.lab1;
            break;
          case 'LAB2':
            remainseat = seatstate.data.totalseat?.lab2 - seatstate.data.seatcount?.lab2;
            break;
          case 'LAB3':
            remainseat = seatstate.data.totalseat?.lab3 - seatstate.data.seatcount?.lab3;
            break;
          case 'LAB6':
            remainseat = seatstate.data.totalseat?.lab6 - seatstate.data.seatcount?.lab6;
            break;
            default: break;
        }
      }
    }
    return (lb + ' '.repeat(3) + remainseat + ' '.repeat(3) + 'คน');
  }

  /*------------------ Event : TextField Changed -----------------*/
  /*------------------ added on 13-11-2023 -----------------------*/
  const handleTextChange = (evt) => {
    let tmprows = prevrows.map((e, i) => {
      return AssignToPrintFunc(e, i);
    });

    let data = tmprows.filter(r =>
      r['idnumber'].includes(evt.target.value) ||
      r['name'].includes(evt.target.value) ||
      r['labroom'].includes(evt.target.value)
    );

    if (data.length !== 0) {
      setRows(data);
    } else {
      let tmptesttype = [];
      let tmptestform = [];
      let tmplabroom = [];
      let tmp = [];
      tmprows.map((r, i) => {
        tmp.push({
          'id': i + 1,
          'idnumber': r['idnumber'],
          'name': r['name']
        });
        tmptesttype[i] = r['testtype'];
        tmptestform[i] = r['indvtfrm'];
        tmplabroom[i] = labroomarr.indexOf(r['labroom']); //---> updated on 01-12-2023
      });
      setSelTestType(tmptesttype);
      setSelTestForm(tmptestform);
      setSelLabRoom(tmplabroom);
      setRows(tmp);
    }
  }

  /*---------------------- sortByPersIdFunc -----------------------*/
  /*------------------ added on 13-11-2023 -----------------------*/
  const sortByPersIdFunc = () => {
    let tmprows = rows.map((e, i) => {
      return AssignToPrintFunc(e, i);
    });

    tmprows.sort((a, b) => {
      return (
        (a['idnumber'] === b['idnumber']) ? 0 :
          sortPersIdClick ? (a['idnumber'] < b['idnumber']) ? -1 : 1 :
            (a['idnumber'] > b['idnumber']) ? -1 : 1
      );
    });

    let tmptesttype = [];
    let tmptestform = [];
    let tmplabroom = [];
    let tmp = [];
    tmprows.map((r, i) => {
      tmp.push({
        'id': i + 1,
        'idnumber': r['idnumber'],
        'name': r['name']
      });
      tmptesttype[i] = r['testtype'];
      tmptestform[i] = r['indvtfrm'];
      tmplabroom[i] = labroomarr.indexOf(r['labroom']); //---> updated on 01-12-2023
    });
    setSelTestType(tmptesttype);
    setSelTestForm(tmptestform);
    setSelLabRoom(tmplabroom);
    setRows(tmp);
    setPrevRows(tmp);
  }// End of sortByPersIdFunc

  /*---------------------- sortByRankFunc --------------------*/
  /*------------------ added on 13-11-2023 -----------------------*/
  const sortByRankFunc = () => {
    let tmprows = rows.map((e, i) => {
      return AssignToPrintFunc(e, i);
    });

    tmprows.sort((a, b) => {
      return sortRankClick ? a['name'].localeCompare(b['name'], 'th') : b['name'].localeCompare(a['name'], 'th');
    });

    let tmp = [];
    let tmptesttype = [];
    let tmptestform = [];
    let tmplabroom = [];
    tmprows.map((r, i) => {
      tmp.push({
        'id': i + 1,
        'idnumber': r['idnumber'],
        'name': r['name']
      });
      tmptesttype[i] = r['testtype'];
      tmptestform[i] = r['indvtfrm'];
      tmplabroom[i] = labroomarr.indexOf(r['labroom']); //---> updated on 01-12-2023
    });
    setSelTestType(tmptesttype);
    setSelTestForm(tmptestform);
    setSelLabRoom(tmplabroom);
    setRows(tmp);
    setPrevRows(tmp);
  }//End of sortByRankFunc

  /*---------------------- sortByLabroomFunc --------------------*/
  /*------------------ added on 13-11-2023 -----------------------*/
  const sortByLabroomFunc = () => {
    let tmprows = rows.map((e, i) => {
      return AssignToPrintFunc(e, i);
    });

    tmprows.sort((a, b) => {
      return (
        sortLabroomClick ?
          ((a['labroom'] === b['labroom']) ? 0 : (a['labroom'] < b['labroom']) ? -1 : 1)
          :
          ((a['labroom'] === b['labroom']) ? 0 : (a['labroom'] > b['labroom']) ? -1 : 1)
      );
    });

    let tmp = [];
    let tmptesttype = [];
    let tmptestform = [];
    let tmplabroom = [];
    tmprows.map((r, i) => {
      tmp.push({
        'id': i + 1,
        'idnumber': r['idnumber'],
        'name': r['name']
      });
      tmptesttype[i] = r['testtype'];
      tmptestform[i] = r['indvtfrm'];
      tmplabroom[i] = labroomarr.indexOf(r['labroom']); //---> updated on 01-12-2023
    });
    setSelTestType(tmptesttype);
    setSelTestForm(tmptestform);
    setSelLabRoom(tmplabroom);
    setRows(tmp);
    setPrevRows(tmp);
  }//end of sortByLabroomFunc

  /*------------------ Handle Sort Menu Click ----------------*/
  /*------------------ added on 13-11-2023 -----------------------*/
  const handleSortMenuOnClick = (evt) => () => {
    switch (evt) {
      case 0: //sort by pers_id
        sortByPersIdFunc();
        setSortPersIdClick(!sortPersIdClick);
        break;
      case 1: //sort by rank
        sortByRankFunc();
        setSortRankClick(!sortRankClick);
        break;
      case 2: //sort by labroom
        sortByLabroomFunc();
        setSortLabroomClick(!sortLabroomClick);
        break;
      default: break;
    }
    setSortMenuOpen(false);
  }

  /*------------------------- data to print ----------------------*/
  /*--------------------- added on 15-11-2023 ----------------------*/
  useEffect(() => {
    let tmprows = rows.map((e, i) => {
      return AssignToPrintFunc(e, i);
    });
    setDataToPrint(tmprows);
  }, [selNewInvigilator, sellabroom, labroominvlist, labroominvnamelist]);

  /*--------------------- Testform Management :: added on 12-01-2024 ----------------------*/
  const testformByResvcodePersidDispatch = useDispatch();
  useEffect(() => {
    let newarr = [];
    rows.map(e => {
      testformByResvcodePersidDispatch(
        fetchTestFormByResvcodePersid(
          {
            'resvcodepersid': location.state.rowdata[0]['tbtestreservation.testresvcode'].concat('-', e.idnumber)
          }
        )
      ).then(res => {

        newarr.push(alltestform.length !== 0 ? alltestform.indexOf(res.payload.form) : 0);
      })
    });
    setSelTestForm(newarr);
  }, [testformByResvcodePersidDispatch, rows]);

  /*-------------------------------------------------------------*/
  /*-------------------------- Return ---------------------------*/
  /*-------------------------------------------------------------*/
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
          }}>
          การจัดการทดสอบ
        </Item>
        {/*-------------- TextField & Button on Page -----------------*/}
        <Item elevation={0}>
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {/*-------------- Page Print -----------------*/}
            <Item elevation={0}>
              <ToPrintPageExamManagement toprint={datatoprint} />
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
                  จัดเรียง
                </Button>
                <Menu
                  anchorEl={btnSortRef.current}
                  open={sortMenuOpen}
                  onClose={handleSortMenuOnClick}
                >
                  <MenuItem onClick={handleSortMenuOnClick(0)}>ตามเลขประจำตัว</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(1)}>ตามชั้นยศ</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(2)}>ตามสถานที่สอบ</MenuItem>
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
          การจอง &nbsp; วัน {convertToThaiDate(location.state.rowdata[0]['tbtestreservation.testreqdate'])} &nbsp;&nbsp; เวลา {location.state.rowdata[0]['tbtestreservation.testreqtime'].split(':')[0] + location.state.rowdata[0]['tbtestreservation.testreqtime'].split(':')[1]}
        </Item>
        {/*--------------- Reservation Info -------------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          หน่วย {location.state.rowdata[0]['tbtestreservation.testrequnit']} &nbsp;&nbsp; รหัสการจอง {location.state.rowdata[0]['tbtestreservation.testresvcode']} &nbsp;&nbsp; รหัสการสอบ {location.state.rowdata[0]['tbtestreservation.testappvcode']}
        </Item>

        {/*--------------- labroom info -------------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          <Paper
            component={Box}
            width={1}
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Table sx={{ width: 1200 }}>
              <TableBody>
                <TableRow>
                  <TableCell align='right' sx={{ fontWeight: 'bold', }}>ที่นั่งสอบคงเหลือ</TableCell>
                  {
                    ['LAB1', 'LAB2', 'LAB3', 'LAB6'].map((lb, i) => {
                      return (
                        <TableCell key={i} align='center' sx={{ fontWeight: 'bold', color: green['700'] }}>
                          {switchCaseFunc(lb)}
                        </TableCell>
                      )
                    })
                  }

                </TableRow>
                <TableRow>
                  <TableCell align='right' sx={{ fontWeight: 'bold', }}>ผู้คุมสอบ</TableCell>
                  <TableCell align='center' sx={{ width: '250px' }}>
                    {
                      < Select
                        value={labroominvlist['lab1']}
                        fullWidth
                        onChange={(evt) => {
                          setSelNewInvigilator({ 'lab1': true, 'lab2': false, 'lab3': false, 'lab6': false });
                          setLabroomInvList({
                            ...labroominvlist, 'lab1': evt.target.value
                          });
                          updateInvDateAndTimeDispatch(updateInvigatorDateAndTime({
                            'date': location.state.rowdata[0]['tbtestreservation.testreqdate'],
                            'time': location.state.rowdata[0]['tbtestreservation.testreqtime'],
                            'labroom': 'lab1',
                            'newinvigilator': evt.target.value !== 0 ? invigilatorList.filter(e => e.name === invigilator[evt.target.value])[0].pers_id : null
                          }));
                        }}
                        disabled={invenable['lab1']} //---> updated on 11-11-2023
                        sx={{
                          boxShadow: 'none',
                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                        }}
                      >
                        {
                          invigilator.map((e, i) => {
                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                          })
                        }
                      </Select>
                    }
                  </TableCell>
                  <TableCell align='center' sx={{ width: '250px' }}>
                    {
                      <Select
                        value={labroominvlist['lab2']}
                        fullWidth
                        onChange={(evt) => {
                          setSelNewInvigilator({ 'lab1': false, 'lab2': true, 'lab3': false, 'lab6': false });
                          setLabroomInvList({ ...labroominvlist, 'lab2': evt.target.value });
                          updateInvDateAndTimeDispatch(updateInvigatorDateAndTime({
                            'date': location.state.rowdata[0]['tbtestreservation.testreqdate'],
                            'time': location.state.rowdata[0]['tbtestreservation.testreqtime'],
                            'labroom': 'lab2',
                            'newinvigilator': evt.target.value !== 0 ? invigilatorList.filter(e => e.name === invigilator[evt.target.value])[0].pers_id : null
                          }));
                        }}
                        disabled={invenable['lab2']}  //---> updated on 11-11-2023
                        sx={{
                          boxShadow: 'none',
                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                        }}
                      >
                        {
                          invigilator.map((e, i) => {
                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                          })
                        }
                      </Select>
                    }
                  </TableCell>
                  <TableCell align='center' sx={{ width: '250px' }}>
                    {
                      <Select
                        value={labroominvlist['lab3']}
                        fullWidth
                        onChange={(evt) => {
                          setSelNewInvigilator({ 'lab1': false, 'lab2': false, 'lab3': true, 'lab6': false });
                          setLabroomInvList({ ...labroominvlist, 'lab3': evt.target.value });
                          updateInvDateAndTimeDispatch(updateInvigatorDateAndTime({
                            'date': location.state.rowdata[0]['tbtestreservation.testreqdate'],
                            'time': location.state.rowdata[0]['tbtestreservation.testreqtime'],
                            'labroom': 'lab3',
                            'newinvigilator': evt.target.value !== 0 ? invigilatorList.filter(e => e.name === invigilator[evt.target.value])[0].pers_id : null
                          }));
                        }}
                        disabled={invenable['lab3']}  //---> updated on 11-11-2023
                        sx={{
                          boxShadow: 'none',
                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                        }}
                      >
                        {
                          invigilator.map((e, i) => {
                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                          })
                        }
                      </Select>
                    }
                  </TableCell>
                  <TableCell align='center' sx={{ width: '250px' }}>
                    {
                      <Select
                        value={labroominvlist['lab6']}
                        fullWidth
                        onChange={(evt) => {
                          setSelNewInvigilator({ 'lab1': false, 'lab2': false, 'lab3': false, 'lab6': true });
                          setLabroomInvList({ ...labroominvlist, 'lab6': evt.target.value });
                          updateInvDateAndTimeDispatch(updateInvigatorDateAndTime({
                            'date': location.state.rowdata[0]['tbtestreservation.testreqdate'],
                            'time': location.state.rowdata[0]['tbtestreservation.testreqtime'],
                            'labroom': 'lab6',
                            'newinvigilator': evt.target.value !== 0 ? invigilatorList.filter(e => e.name === invigilator[evt.target.value])[0].pers_id : null
                          }));
                        }}
                        disabled={invenable['lab6']}  //---> updated on 11-11-2023
                        sx={{
                          boxShadow: 'none',
                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                        }}
                      >
                        {
                          invigilator.map((e, i) => {
                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                          })
                        }
                      </Select>
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
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
                }
              }}
            />
          </Paper>
        </Item>
        {/*-------------- Backward Button -----------------*/}
        <Item
          elevation={0}
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
          <Link to="/PageTestManagement"
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
  )
}

export default PageExamManagement;