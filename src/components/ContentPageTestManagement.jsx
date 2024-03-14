/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintIcon from '@mui/icons-material/Print';
import {
  Stack,
  Divider,
  Paper,
  TextField,
  Box,
  Button,
  Badge,
  Typography,
  IconButton,
  FormGroup,
  FormControl,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Select,
} from "@mui/material";

import moment from "moment";
import { lightBlue, red } from "@mui/material/colors";
import { toast } from "react-toastify";
import ToPrintPageTestManagement from "./ToPrintPageTestManagement";
import LabRoomSelection from "./LabRoomSelection";
//import TestFrmHardCopy from './TestFormHardCopy'; //---------> added on 21-01-2024

/*------------------ External Function -----------*/
import { convertToEngDate, convertToThaiDate } from "./functions/GlobalFunctions";

/*------------------ Redux -----------------------*/
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingInOnePeriod } from '../store/PgBookDateSlice';
import { fetchAllTestResvInfoInOnePeriod, fetchAllTestResvInfo } from '../store/TestReservationSlice';
import { fetchMemberInfoByUserType } from '../store/MemberInfoSlice';
import {
  setShowScoringCriteria,
  updateTestType,
  delAllTestFormByResvcode, //added : 15-02-2024
  updateIndvTestForm, //-----> added : 08-02-2024
  fetchAllTestResultByDateAndTime, //-----> added : 08-02-2024
  fetchTestFormByResvcode, //-----> added : 08-02-2024
  genHardCopyTestFormByResvcode
} from '../store/TestMgmtSlice';

/*----------------------- Style ------------------*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontFamily: 'THSarabunNew',
  color: theme.palette.text.secondary
}));

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

const muidatatabletheme = createTheme({
  components: {
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          backgroundColor: lightBlue['50'],
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'THSarabunNew',
        },
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: 'THSarabunNew',
        },
      }
    },
  }
});

/*------------------------ Blink Badge ------------------------*/
const blink = keyframes`
    from {
      opacity: 0; 
    }
    to { 
      opacity: 1;
    }
  `;

const BlinkBadge = styled(Badge)(({ theme }) => ({
  transform: 'translate(10px, -10px)',
  animation: `${blink} 1s infinite ease`
}));

/*---------------- DataGrid : Column -> Link Button : RenderCheckApprovalButton -----------*/
const RenderCheckApprovalButton = (props) => {
  const { data } = props;
  const [badgeVisible, setBadgeVisible] = useState(false);

  /*----------------------- Redux : useSelector -> fetchTestResvInfobyResvCode ------------------*/
  const res_byresvcode = useSelector((state) => state.testresvinfostate.testresvbyperiod);

  let res_tmp = res_byresvcode.data.filter((el) => el.testresvcode === data.resvcode);
  useEffect(() => {
    if (res_tmp[0]?.testappvcode === null) {
      setBadgeVisible(true);
    } else {
      setBadgeVisible(false);
    }
  }, [res_tmp[0]?.testappvcode, res_byresvcode, data]);

  return (
    <Link
      to={"/PageCheckApproval"}
      state={{
        'data': data
      }}
      style={{ textDecoration: "none" }}>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            fontFamily: 'THSarabunNew',
            marginLeft: 16
          }}
        >
          อนุมัติ
        </Button>
        {
          badgeVisible &&
          <BlinkBadge
            badgeContent={'NEW'}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            //color='warning'
            sx={{
              '& .MuiBadge-badge': {
                fontFamily: 'THSarabunNew',
                fontWeight: 'bold',
                fontSize: 10,
                color: 'whitesmoke',
                backgroundColor: '#FBC02D',
                borderRadius: '5%'
              }
            }}
          />
        }
      </Box>
    </Link>
  );
}//End of RenderCheckApprovalButton

/*--------------------------- ContentPageTestManagement -----------------------*/
function ContentPageTestManagement() {
  const labRoomSelectionRef = useRef();
  const [rows, setRows] = useState([]);
  const [tmprows, setTmpRows] = useState([]);
  const [scoringshowed, setShowScoring] = useState([]);
  const [openLabRoomdlg, setOpenLabRoomDlg] = useState(false);

  const setLabRoomDlgState = (state) => {
    setOpenLabRoomDlg(state);
  };

  /*----------------- Event : Sort Menu Handle -------------*/
  const btnSortRef = useRef(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortDateClick, setSortDateClick] = useState(false);
  const [sortResvCodeClick, setSortResvCodeClick] = useState(false);

  /*--------------- Event : Select Labroom Handle ----------*/
  const btnSelLabroomRef = useRef(null);
  const [selLabroomMenuOpen, setSelLabroomMenuOpen] = useState(false);

  /*------------------------ Redux : MemberInfo ----------------*/
  const meminfodispatch = useDispatch();
  useEffect(() => {
    meminfodispatch(fetchMemberInfoByUserType('USR03'));
  }, [meminfodispatch]);

  const meminfobyusrtype = useSelector((state) => state.memberinfostate.meminfobyusrtype);
  const [invigilatorList, setInvigilatorList] = useState([]);
  useEffect(() => {
    if (meminfobyusrtype?.length !== 0) {
      let invigilatorlist = meminfobyusrtype?.map(e => ({
        'pers_id': e['tbmember.pers_id'],
        'name': e['tbmember.tbmemberinfos.mem_rank'] +
          e['tbmember.tbmemberinfos.mem_fname'] + ' ' +
          e['tbmember.tbmemberinfos.mem_lname']
      }));

      setInvigilatorList(invigilatorlist);
    }
  }, [meminfobyusrtype]);

  /*---------------------- Dispatch ----------------------------*/
  const [childrows, setChildRows] = useState([]);
  const [showscoringchanged, setShowScoringChanged] = useState(false);
  const [testtypechanged, setTestTypeChanged] = useState(false);
  const testtypeDispatch = useDispatch();
  const scoringshowDispatch = useDispatch();
  const alltestresvdispatch = useDispatch();
  useEffect(() => {
    alltestresvdispatch(fetchAllTestResvInfo());
  },
    [
      alltestresvdispatch,
      openLabRoomdlg,
      testtypechanged,
      showscoringchanged,
      sortDateClick,
      sortResvCodeClick
    ]);
  const alltestresvlist = useSelector((state) => state.testresvinfostate.alltestresvarr);

  //console.log('alltestresvlist ))))) ', alltestresvlist.data);

  useEffect(() => {
    let childrows_tmp = [];
    let alllist_tmp = [];
    alltestresvlist?.data?.map(e => {
      alllist_tmp.push({
        'resvcode': e['tbtestreservation.testresvcode'],
        'testappcode': e['tbtestreservation.testappvcode'],
        'reqdate': e['tbtestreservation.testreqdate'],
        'reqtime': e['tbtestreservation.testreqtime'],
        'scoringshowed': Boolean(e['showscoringcriteria']), //----> updated on 17-11-2023
        'invigilatorid': e['invigilator'],
        'testtype': e['testtype'],
      });
      childrows_tmp.push({
        'resvcode': e['tbtestreservation.testresvcode'],
        'labroom': e['tblabroom.labroomcode'],
        'invigilatorid': e['invigilator'],
      });
    });

    //console.log('alllist_tmp ---> ', alllist_tmp);

    let child_rows = childrows_tmp.reduce((a, b) => {
      if (!a.find(el => el.resvcode === b.resvcode && el.labroom === b.labroom)) {
        a.push(b);
      };
      return a;
    }, []);
    setChildRows(child_rows);

    let res = alllist_tmp.reduce((a, b) => {
      if (!a.find((item) => item.resvcode === b.resvcode)) {
        a.push(b);
      }
      return a;
    }, []);

    setShowScoring(res);
  }, [alltestresvlist]);

  /*-------------------- Form Select -------------------------------*/
  const alltestresultlbDispatch = useDispatch();
  const [seltestform, setSelTestForm] = useState([]);
  const [alltestform, setAllTestForm] = useState([]);
  const testformlist = useSelector((state) => state.testmgmtstate.questionform);

  useMemo(() => {
    let tmp = ['กรุณาเลือกฟอร์ม', ...Object.values({ ...testformlist }), 'คละฟอร์ม'];
    setAllTestForm(tmp);
  }, [testformlist, setAllTestForm]);

  /*--------------------- Testform Management :: added on 12-02-2024 ----------------------*/
  const formbyresvcode = useSelector((state) => state.testmgmtstate.indvquestionform);
  const testformByResvcodeDispatch = useDispatch();
  useEffect(() => {
    let newarr = [];
    let tmpfrm = rows.map(e => {
        return testformByResvcodeDispatch(fetchTestFormByResvcode({ 'resvcode': e[1] }))
      });
      Promise.all(tmpfrm).then((res) => {
        if(res.length !== 0){
          res.map(e => {
            newarr.push(alltestform.length !== 0 ? alltestform.indexOf(e.payload.form) : 0);
          });
          setSelTestForm(newarr);
        }else{
          setSelTestForm([]);
        }
      });
  }, [testformByResvcodeDispatch, rows.length, setSelTestForm]);

  /*----------------- Form Dispatch --------------------------*/
  const delTestFormByResvcodePersidDispatch = useDispatch();
  const updateIndvTestFormDispatch = useDispatch();//-----> added : 08-02-2024

  /*------------------------ MuiDataTables : Columns ----------------*/
  const hardCopyTestFrmDispatch = useDispatch();
  const [seltypearr, setSelTypeArr] = useState([]);
  const columns = [
    {
      name: "ลำดับ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '50px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '50px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        })
      }
    },
    {
      name: "รหัสการจอง",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        })
      }
    },
    {
      name: "วันที่จอง",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        })
      }
    },
    {
      name: "เวลาที่จอง",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '120px',
            textAlign: 'center',
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '120px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
      },
    },
    {
      name: "สถานที่สอบ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log('tableMeta ', tableMeta.rowData);
          return (
            <Button id={value}
              variant="contained"
              disabled={tableMeta.rowData[5].includes('DISAP') ?? false} //----> updated on 11-12-2023
              onClick={
                () =>
                  labRoomSelectionRef.current.handleClickOpenDlg(
                    tableMeta.rowData[1],
                    convertToEngDate(tableMeta.rowData[2]),
                    tableMeta.rowData[3]
                  )
              }
            >
              เลือกสถานที่สอบ
            </Button>
          )
        }
      }
    },
    {
      name: "รหัสการสอบ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '120px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '120px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
      },
    },
    {
      name: "แบบ",
      options: {
        filter: true,
        sort: false,
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            //width: '200px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          /*----------------------------------------------------------------------*/
          /*------------------------- added on 13-11-2023 ------------------------*/
          /*----------------------------------------------------------------------*/
          let _list = alltestresvlist?.data?.filter(e => e['tbtestreservation.testresvcode'] === tableMeta.rowData[1]);
          let selectedtype = 0;
          if (_list?.length > 1) {
            let samechk = _list.every(
              e => e.testtype === _list[0]['testtype'] ? true : false
            );
            selectedtype = samechk ? scoringshowed?.filter(
              e => e.resvcode === tableMeta.rowData[1]
            )[0]?.testtype : 3;
          } else {
            selectedtype = scoringshowed.filter(
              e => e.resvcode === tableMeta.rowData[1]
            )[0]?.testtype
          }
          /*----------------------------------------------------------------------*/
          return ( //===============> updated 02-02-2024
            <Select
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                fontSize: '14px',
                fontFamily: 'THSarabunNew',
                width: '100%',
              }}
              value={
                !tableMeta.rowData[5].includes('DISAP') ?
                  seltypearr[tableMeta.rowData[0] - 1] || (selectedtype ?? 0) :
                  0
              } //===============> updated on 13-11-2023
              disabled={tableMeta.rowData[5].includes('DISAP') ? true : false} //====----> added on 19-11-2023
              onChange={(evt) => {
                let newarr = [...seltypearr];
                newarr[tableMeta.rowData[0] - 1] = evt.target.value;
                setSelTypeArr(newarr);
                /*------------------- update database --------------*/
                if (evt.target.value !== 3) {
                  testtypeDispatch(
                    updateTestType({
                      'rsrvcode': tableMeta.rowData[1],
                      'testtype': evt.target.value
                    })
                  ).then(res => {
                    if (res.payload.data.completed) {
                      setTestTypeChanged(!testtypechanged);
                      toast.success('อัพเดทรูปแบบการสอบเรียบร้อยแล้ว', { position: 'top-center' });
                    } else {
                      toast.error('เกิดข้อผิดพลาด ไม่สามารถอัพเดทรูปแบบการสอบได้', { position: 'top-center' });
                    }
                  });
                } else { //===>>> added on 13-11-2023
                  toast.warning(
                    'ท่านไม่สามารถเลือกคละรูปแบบการสอบได้ กรุณาเลือกรูปแบบการสอบที่ต้องการ',
                    { position: 'top-center' }
                  );
                }//end if
              }}
            >
              {
                ['เลือกรูปแบบการสอบ', 'Random Test', 'Adaptive Test', 'คละรูปแบบการสอบ'].map((el, i) => {
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
          )
        }
      }
    },
    {
      name: "ฟอร์ม",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            //width: '150px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            //width: '150px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log('rowwww --> ', tableMeta.rowIndex, ' : ', seltestform[tableMeta.rowIndex] ?? 0)
          return (
            <FormControl fullWidth>
              <Select
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                  fontSize: '14px'
                }}
                value={seltestform[tableMeta.rowIndex] ?? 0} /*==---> updated on 19-11-2023 */
                disabled={false}
                onChange={(evt) => {
                  alltestresultlbDispatch(
                    fetchAllTestResultByDateAndTime(
                      {
                        'date': convertToEngDate(tableMeta.rowData[2]),
                        'time': tableMeta.rowData[3]
                      }
                    )
                  ).then(async res_1 => {
                    if (res_1.payload.data.length !== 0) {
                      let count = 0;
                      let success = await Promise.all(res_1.payload.data.map(d => {
                        delTestFormByResvcodePersidDispatch(delAllTestFormByResvcode({
                          'allfrmresvcode': d['testresvcode'].concat('-', d['tbtestresults.meminfo_id'].split('-')[0])
                        })).then(res_2 => {
                          if (res_2.payload.del_success) {
                            let newarr = [...seltestform];
                            newarr[tableMeta.rowIndex] = evt.target.value;
                            setSelTestForm(newarr);

                            updateIndvTestFormDispatch(updateIndvTestForm({
                              'resvcode': d['testresvcode'],
                              'persid': d['tbtestresults.meminfo_id'].split('-')[0],
                              'form': testformlist[parseInt(evt.target.value) - 1]
                            })).then(res_3 => {
                              if (res_3.payload.completed) {
                                return ++count;
                              }
                            });
                          }
                        }); //end then 
                      }));//end -> Promise.all

                      if (success.length === res_1.payload.data.length) {
                        toast.success('สร้างแบบทดสอบรายบุคคลเรียบร้อยแล้ว', { position: 'top-center' });
                      } else {
                        toast.error('เกิดข้อผิดพลาด ไม่สามารถสร้างแบบทดสอบรายบุคคลได้', { position: 'top-center' });
                      }
                    }//end if after then

                  }) //end_alltestresultlbDispatch
                }}//end of onChange
              >
                {
                  ['กรุณาเลือกฟอร์ม', ...Object.values({ ...testformlist }), 'คละฟอร์ม'].map((frm, i) => {
                    return (
                      <MenuItem
                        sx={{
                          fontFamily: 'THSarabunNew', fontSize: 14
                        }}
                        value={i}
                        key={i}
                      >
                        {frm}
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          )//--> end of return 
        }
      },
    },
    {
      name: "ไฟล์ข้อสอบ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box>
              <IconButton color="primary" onClick={() => {
                //return (<TestFrmHardCopy />)
                /*console.log('tableMeta ---> ', tableMeta.rowData[1]);
                hardCopyTestFrmDispatch(genHardCopyTestFormByResvcode(
                  { 'resvcode': tableMeta.rowData[1] }
                ));*/
              }}>
                <PrintIcon sx={{ color: '#1976D2' }} />
              </IconButton>
            </Box>
          )
        }
      },
    },
    {
      name: "ดูรายชื่อ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '150px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          //console.log('tableMeta ===> ', tableMeta, ' : ', value)
          return (
            <strong>
              <Link to="/PageExamManagement"
                state={{
                  'rowdata': alltestresvlist?.data.filter(
                    elm => elm['tbtestreservation.testresvcode'] === tableMeta.rowData[1]
                  )
                }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                >
                  เข้าดูรายชื่อ
                </Button>
              </Link>
            </strong>
          )
        }
      },
    },
    {
      name: "แสดงเกณฑ์การผ่าน",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            textAlign: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            textAlign: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormGroup>
              <FormControlLabel
                style={{ justifyContent: 'center' }}
                control={
                  <Switch
                    id={`${tableMeta.rowData[0] - 1}`}
                    checked={
                      Boolean(scoringshowed?.filter(elem => elem.resvcode === tableMeta.rowData[1])[0]?.scoringshowed)
                    } //===>>> updated on 17-11-2023
                    onChange={(e, c) => {
                      let newarr = scoringshowed?.map(elem => (
                        elem.resvcode === tableMeta.rowData[1] ?
                          { ...elem, scoringshowed: c } :
                          elem
                      )); //===>>> updated on 17-11-2023
                      setShowScoring(newarr);
                      scoringshowDispatch(setShowScoringCriteria({
                        rsrvcode: tableMeta.rowData[1],
                        scoringshowed: c
                      })).then(res => {
                        if (res.payload.data.completed) {
                          setShowScoringChanged(!showscoringchanged);
                          toast.success('อัพเดทการแสดงเกณฑ์คะแนนเรียบร้อยแล้ว', { position: 'top-center' });
                        } else {
                          toast.error('เกิดข้อผิดพลาด ไม่สามารถอัพเดทการแสดงเกณฑ์คะแนนได้', { position: 'top-center' });
                        }
                      });
                    }}
                  />
                } />
            </FormGroup>
          )
        }
      },
    },
    {
      name: "อนุมัติการจองวันทดสอบ",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            justifyContent: 'center'
          }
        }),
        setCellHeaderProps: () => ({
          style: {
            whiteSpace: 'nowrap',
            position: 'sticky',
            width: '200px',
            justifyContent: 'center',
            fontWeight: 'bold'
          }
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <RenderCheckApprovalButton
              data={{
                'resvcode': tableMeta.rowData[1],
                'resvdate': tableMeta.rowData[2],
                'resvtime': tableMeta.rowData[3]
              }}
            />
          )
        }
      },
    }
  ];

  /*------------------------ MuiDataTables --> options -------------------*/
  const options = {
    filter: false,
    selectableRows: 'none',
    //filterType: 'dropdown',
    //fixedHeader: false,
    elevation: 0,
    print: false,
    search: false,
    viewColumns: false,
    download: false,
    responsive: 'simple',
    rowsPerPage: 10,
    expandableRows: true,
    textLabels: {
      body: {
        noMatch: "ไม่พบข้อมูลที่ต้องการ",
      },
      pagination: {
        next: "หน้าถัดไป",
        previous: "หน้าก่อนหน้า",
        rowsPerPage: "จำนวนแถวต่อหน้า:",
        displayRows: "ของ",
      },
    },
    renderExpandableRow: (rowData, rowMeta) => {
      let tmpchildrows = childrows.filter(e => e.resvcode === rowData[1]);
      if (tmpchildrows[0].labroom !== 'lab0') {
        return (
          <tr>
            <td colSpan={5}>
              <Table>
                <TableHead>
                  <TableRow>
                    {
                      ['ห้องสอบ', 'ชื่อผู้คุมสอบ'].map((elm, i) => {
                        return (
                          <TableCell
                            style={{
                              fontSize: '14px',
                              fontFamily: 'THSarabunNew',
                              fontWeight: 'bold'
                            }}
                            align="center"
                            key={i}
                          >
                            {elm}
                          </TableCell>
                        )
                      })
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    tmpchildrows.filter(e => e.labroom !== 'lab0').map((chrow, ind) => (
                      <TableRow key={ind}>
                        <TableCell
                          style={{
                            fontSize: '14px',
                            fontFamily: 'THSarabunNew',
                          }}
                          align='center'
                          key={0}
                        >
                          {chrow.labroom.toUpperCase()}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: '14px',
                            fontFamily: 'THSarabunNew',
                          }}
                          align='center'
                          key={1}
                        >
                          {
                            invigilatorList.filter(e => e.pers_id === chrow.invigilatorid)[0]?.name
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </td>
          </tr>
        );// end return
      } else {//if else
        return (
          <tr>
            <td colSpan={6}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: '14px',
                        fontFamily: 'THSarabunNew',
                        fontWeight: 'bold',
                        color: red['500']
                      }}
                    >
                      {`ท่านยังไม่ได้กำหนดสถานที่สอบให้กับรหัสการจอง ${rowData[1]} กรุณาเลือกสถานที่สอบ`}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </td>
          </tr>
        )
      }//end else
    }
  }


  /*-------------------------------------------------------------*/
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const [curr_month, setCurrMonth] = useState(new Date().getMonth());
  const [curr_year, setCurrYear] = useState(new Date().getFullYear() + 543);
  const [movedirection, setMoveDirection] = useState(0);

  /*---------------------- Function : Month Selection -----------------------*/
  const handlePrevMonth = () => {
    setCurrMonth(curr_month - 1);
    setMoveDirection(-1);
  }

  const handleNextMonth = () => {
    setCurrMonth(curr_month + 1);
    setMoveDirection(1);
  }

  let m = ((curr_month % months.length) + months.length) % months.length;
  useEffect(() => {
    switch (movedirection) {
      case 1:
        if (m === 0) {
          setCurrYear(curr_year + 1);
        }
        break;
      case -1:
        if (m === 11) {
          setCurrYear(curr_year - 1);
        }
        break;
      default:
    }
  }, [m]);

  /*---------------------- Redux : Test Reservation -> booking period --------*/
  let fd_month = moment(new Date((curr_year - 543), m, 1)).format('YYYY-MM-DD');
  let ld_month = moment(new Date((curr_year - 543), m + 1, 0)).format('YYYY-MM-DD');

  /*--------- Redux : fetching test reservation by date ----------------*/
  const testresvbydatedispatch = useDispatch();
  useEffect(() => {
    testresvbydatedispatch(fetchAllTestResvInfoInOnePeriod({ 's_date': fd_month, 'e_date': ld_month }));
  }, [testresvbydatedispatch, curr_year, m]);
  const res_byresvcode = useSelector((state) => state.testresvinfostate.testresvbyperiod);

  //console.log('res_byresvcode ----> ', res_byresvcode?.data);
  /*--------------------- Redux to help LabRoomSelection to get reqNumSeat -----*/
  const bookdatedispatch = useDispatch();
  useEffect(() => {
    bookdatedispatch(fetchBookingInOnePeriod({ 's_date': fd_month, 'e_date': ld_month }));
  }, [bookdatedispatch, curr_year, m]);

  /*------------------------- Rows Data --------------------*/
  useEffect(() => {
    let tmp = [];
    res_byresvcode?.data?.map((el, i) => {
      tmp.push([
        i + 1,
        el.testresvcode,
        convertToThaiDate(el.testreqdate),
        el.testreqtime,
        i + 1,
        el.testappvcode !== null ? el.testappvcode : 'รออนุมัติการจอง',
      ]);
    });
    setRows(tmp);
    setTmpRows(tmp)
  }, [res_byresvcode]);

  /*------------------ Event : TextField Changed -----------------*/
  const handleTextChange = (evt) => {
    let data = tmprows.filter(r => r.includes(evt.target.value));

    if (data.length !== 0) {
      setRows(data);
    } else {
      setRows(tmprows);
    }
  }

  /*---------------------- sortByDateFunc -----------------------*/
  const sortByDateFunc = () => {
    let dateInCurrMonth = scoringshowed.filter(
      el => {
        return Date.parse(el.reqdate) >= Date.parse(fd_month) && Date.parse(el.reqdate) <= Date.parse(ld_month)
      }
    );
    //setSortResult(dateInCurrMonth);

    if (sortDateClick) {
      dateInCurrMonth.sort((a, b) => {
        return (
          new Date(a['reqdate']) - new Date(b['reqdate'])
        );
      });
    } else {
      dateInCurrMonth.sort((a, b) => {
        return (
          new Date(b['reqdate']) - new Date(a['reqdate'])
        );
      });
    }

    let tmp = [];
    dateInCurrMonth.map((el, i) => {
      tmp.push([
        i + 1,
        el.resvcode,
        convertToThaiDate(el['reqdate']),
        el['reqtime'],
        i + 1,
        el['testappcode'] !== null ? el['testappcode'] : 'รออนุมัติการจอง',
      ]);
    });

    setRows(tmp);
  }// End of sortByDate

  /*---------------------- sortByResvCodeFunc --------------------*/
  const sortByResvCodeFunc = () => {
    let dateInCurrMonth = scoringshowed.filter(
      el => {
        return Date.parse(el.reqdate) >= Date.parse(fd_month) && Date.parse(el.reqdate) <= Date.parse(ld_month)
      }
    );

    //setSortResult(dateInCurrMonth);
    if (sortResvCodeClick) {
      dateInCurrMonth.sort((a, b) => {
        return (
          (a['resvcode'] === b['resvcode']) ? 0 : (a['resvcode'] < b['resvcode']) ? -1 : 1
        );
      });
    } else {
      dateInCurrMonth.sort((a, b) => {
        return (
          (a['resvcode'] === b['resvcode']) ? 0 : (a['resvcode'] > b['resvcode']) ? -1 : 1
        );
      });
    }

    let tmp = [];
    dateInCurrMonth.map((el, i) => {
      tmp.push([
        i + 1,
        el.resvcode,
        convertToThaiDate(el['reqdate']),
        el['reqtime'],
        i + 1,
        el['testappcode'] !== null ? el['testappcode'] : 'รออนุมัติการจอง',
      ]);
    });

    setRows(tmp);
  }//End of sortByResvCodeFunc

  /*------------------ Handle Sort Menu Click && Labroom Selection ----------------*/
  const handleSortMenuOnClick = (evt) => () => {
    switch (evt) {
      case 0: //sort by date
        sortByDateFunc();
        setSortDateClick(!sortDateClick);
        break;
      case 1: //sort by resvcode
        sortByResvCodeFunc();
        setSortResvCodeClick(!sortResvCodeClick);
        break;
      default:
    }
    setSortMenuOpen(false);
  }

  const handleSelLabroomMenuOnClick = (evt) => () => {
    if (selLabroomMenuOpen) {
      setSelLabroomMenuOpen(false);
    }

  }

  /*---------------------------------------------------*/
  /*------------------ return -------------------------*/
  /*---------------------------------------------------*/
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
        {/*-------------- Month & Year -----------------*/}
        <Item elevation={0}>
          <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <IconButton onClick={handlePrevMonth}>
                <ChevronLeftIcon />
              </IconButton>
              <Typography variant="prev_month" gutterBottom>
                {months[m === 0 ? 11 : m - 1]} {m === 0 ? curr_year - 1 : curr_year}
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
            }}>
              {months[m]} {curr_year}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="next_month" gutterBottom>
                {months[(m + 1) % 12]} {m === 11 ? curr_year + 1 : curr_year}
              </Typography>
              <IconButton onClick={handleNextMonth}>
                <NavigateNextIcon />
              </IconButton>
            </Box>
          </Box>
        </Item>
        {/*-------------- TextField & Button on Page -----------------*/}
        <Item elevation={0}>
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {/*-------------- Page Print -----------------*/}
            <Item elevation={0}>
              <ToPrintPageTestManagement
                toprint={{
                  'tbrows': rows,
                  'subtbrows': childrows,
                  'testtype': scoringshowed,
                  'invigilator': invigilatorList
                }}
              />
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
                  onClose={() => btnSortRef.current = null}
                >
                  <MenuItem onClick={handleSortMenuOnClick(0)}>ตามวันที่จอง</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(1)}>ตามรหัสการจอง</MenuItem>
                </Menu>
              </Fragment>
            </Item>
            <Item elevation={0}>
              <Fragment>
                <Button
                  ref={btnSelLabroomRef}
                  aria-controls={'basic-menu'}
                  aria-haspopup='true'
                  aria-expanded={selLabroomMenuOpen ? 'true' : undefined}
                  variant='contained'
                  endIcon={<ExpandMoreIcon />}
                  onClick={() => {
                    setSelLabroomMenuOpen(!selLabroomMenuOpen);
                  }}
                >
                  การจัดการห้องสอบ
                </Button>
                <Menu
                  anchorEl={btnSelLabroomRef.current}
                  open={selLabroomMenuOpen}
                  onClose={handleSelLabroomMenuOnClick}
                >
                  <MenuItem
                    component={Link}
                    to="/PageLabroomManagement"
                    state={{ 'labroom': 'lab1' }}
                    onClick={handleSelLabroomMenuOnClick(1)}
                  >LAB1</MenuItem>
                  <MenuItem
                    component={Link}
                    to="/PageLabroomManagement"
                    state={{ 'labroom': 'lab2' }}
                    onClick={handleSelLabroomMenuOnClick(2)}
                  >LAB2</MenuItem>
                  <MenuItem
                    component={Link}
                    to="/PageLabroomManagement"
                    state={{ 'labroom': 'lab3' }}
                    onClick={handleSelLabroomMenuOnClick(3)}
                  >LAB3</MenuItem>
                  <MenuItem
                    component={Link}
                    to="/PageLabroomManagement"
                    state={{ 'labroom': 'lab6' }}
                    onClick={handleSelLabroomMenuOnClick(6)}
                  >LAB6</MenuItem>
                </Menu>
              </Fragment>
            </Item>
            <Item elevation={0}>
              <Button variant="contained">อัพโหลดวีดิโอแนะนำ</Button>
            </Item>
          </Stack>
        </Item>

        {/*-------------- DataGrid -----------------*/}
        <Item elevation={0}>
          <ThemeProvider theme={muidatatabletheme}>
            <MUIDataTable
              data={rows}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </Item>
        <LabRoomSelection ref={labRoomSelectionRef} setLabRoomDlgState={setLabRoomDlgState} />
      </Stack>
    </ThemeProvider>
  );
}

export default ContentPageTestManagement;

