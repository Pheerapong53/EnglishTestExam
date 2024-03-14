/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Paper, Button } from '@mui/material';
import { Grid, Select, MenuItem } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ViewListIcon from '@mui/icons-material/ViewList';
import IconButton from '@mui/material/IconButton';
import { grey, blue } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { fetchScoringCriteria } from '../store/TestScoringCriteriaMgmtSlice';
import {
    fetchTestResvInfobyUnitCode,
    fetchTestResvInfobyResvDate,
    addCandAtDueDate
} from '../store/TestReservationSlice';

import { countryarr, rtafunitarr } from '../components/functions/GlobalUseData';
/*------------------------ Date Picker : BuddhistEra --------------*/
import OwnDatePicker from './OwnDatePicker';
import { toast } from 'react-toastify';

/*------------------------ Theme ---------------------------------*/
const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'THSarabunNew',
            fontSize: 14
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: grey['100'],
                    border: '1px solid blue'
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                root: {
                    alignItems: 'center'
                }
            }
        }
    }
});

/*----------------------- TbSelectTestDateAndTime -------------------------------*/
function TbSelectTestDateAndTime(props) {
    /*----------------------- Redux --------------------------*/
    const scoringcriteria = useSelector((state) => state.scoringcriteriastate.scoringcriteria);
    //let _scoringcriteria = [{ 'scoringcriteriacode': 'INIT', 'mission': 'เลือกเหตุผล' }, ...scoringcriteria];
    let _scoringcriteria = [
        { 'scoringcriteriacode': 'INIT', 'mission': 'เลือกเหตุผล' }, ...Object.assign([], scoringcriteria)
    ];
    _scoringcriteria.splice(1, 1);
    const scoringcriteriadispatch = useDispatch();
    useEffect(() => {
        scoringcriteriadispatch(fetchScoringCriteria());
    }, [scoringcriteriadispatch]);

    /*----------------------- Creat Reservation Code ----------------------*/
    const testresvinfo = useSelector((state) => state.testresvinfostate.testresvarr);
    const testresvinfodispatch = useDispatch();

    /*---------------------- Reason/Country/DatePeriod -------------------*/
    const [newdate, setNewDate] = useState(props.date);
    const [selectscc, setSelectScc] = useState('เลือกเหตุผล'); //Reason changed
    const [selcountry, setSelCountry] = useState(0); //Country changed
    const [selresvperiod, setSelResvPeriod] = useState('0900 - 1000'); //Period changed

    /*---------------------- Create Memberlist ---------------------------*/
    const [detailslist, setDetailsList] = useState({});
    const { user } = useSelector((state) => ({ ...state }));
    const orgname = user.user.orgname;
    useEffect(() => {
        let initstate = {
            'resvcode': testresvinfo?.data,
            'date': newdate,
            'period': selresvperiod,
            'reason': selectscc,
            'country': countryarr[selcountry],
            'member': []
        }

        testresvinfodispatch(fetchTestResvInfobyUnitCode(rtafunitarr[orgname]))//changed code according to user 
        testresvinfodispatch(fetchTestResvInfobyResvDate(newdate)); //change date
        testresvinfodispatch(addCandAtDueDate(initstate));
        setDetailsList(initstate);
        props.hidecheckingpanelfunc(false);
    }, [newdate, selectscc, selcountry, selresvperiod, testresvinfo.data]);

    const updatememberlist = useSelector((state) => state.testresvinfostate.candAtDueDateArr);
    useMemo(() => {
        setDetailsList(updatememberlist);
    }, [updatememberlist['member']?.length])

    // console.log('DateTime -> updatememberlist ', updatememberlist, ' : detailslist -> ', detailslist)
    /*---------------------- add Member in the List ---------------------------*/
    const addMemberInDetailedList = () => {
        let newdetailslist = Object.assign({}, detailslist);
        if (props.meminfolist) {
            let found = detailslist['member'].some(mbr => {
                return Object.entries(mbr).toString() === Object.entries(props.meminfolist).toString();
            })

            if (!found) {
                toast(`เพิ่มรายชื่อผู้เข้าสอบเรียบร้อยแล้ว`, { position: toast.POSITION.TOP_CENTER });
                let tmparr = [...detailslist['member']];
                tmparr.push(Object.assign(Object.assign({}, props.meminfolist), { 'testlabroom': 'lab0' }));
                //tmparr.push(props.meminfolist);
                setDetailsList(Object.assign(newdetailslist, { 'member': tmparr }));
            } else {
                toast(`กรุณาตรวจสอบ ข้าราชการดังกล่าวมีข้อมูลอยู่ในรายชื่อผู้เข้าสอบเรียบร้อยแล้ว`, { position: toast.POSITION.TOP_CENTER });
            }
        } else {
            toast('กรุณากรอกข้อมูลเลขประจำตัวประชาชน และชื่อ-นามสกุลให้ครบถ้วน', { position: toast.POSITION.TOP_CENTER });
        }

        /********** under construction ----> change obj to obj array ********/
        //console.log('newdetailslist -------------> ', newdetailslist);
        return newdetailslist;
    };

    /*------------------------ Return ------------------------*/
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} sx={{ padding: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}
                        display={'flex'}
                        justifyContent={'center'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        เลือกวันและเวลาทดสอบ
                    </Grid>

                    <Grid item xs={3}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        เหตุผลรับการทดสอบ:
                    </Grid>
                    <Grid item xs={3}>
                        <Select id='scc_select'
                            value={selectscc}
                            fullWidth
                            onChange={(scc) => {
                                setSelectScc(scc.target.value);
                            }}
                        >
                            {
                                Object.values(_scoringcriteria).map((scc, i) => {
                                    return (<MenuItem key={i} value={scc.mission}>{scc.mission}</MenuItem>);
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={2}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        ประเทศปลายทาง:
                    </Grid>
                    <Grid item xs={4}
                        display={'flex'}
                        justifyContent={'flex-start'}
                    >
                        <Select value={selcountry} fullWidth onChange={(newCountry) => {
                            setSelCountry(newCountry.target.value);
                        }}>
                            {
                                countryarr.map((ctry, i) => {
                                    return (<MenuItem key={i} value={i}>{ctry}</MenuItem>)
                                })
                            }
                        </Select>
                    </Grid>

                    <Grid item xs={3}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        วันที่เข้ารับการทดสอบ:
                    </Grid>
                    <Grid item xs={9}>
                        <OwnDatePicker date={props.date} newdatefunc={props.newdatefunc} onDateChange={setNewDate} />
                    </Grid>

                    <Grid item xs={3}
                        display={'flex'}
                        justifyContent={'flex-end'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        ช่วงเวลา:
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            sx={{ minWidth: 150 }}
                            value={selresvperiod}
                            onChange={(period) => {
                                setSelResvPeriod(period.target.value);
                            }}
                        >
                            {
                                ['0900 - 1000', '1030 - 1130', '1330 - 1430'].map((item, i) =>
                                    <MenuItem key={i} value={item}>{item}</MenuItem>
                                )
                            }
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent={'center'}>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        if (selectscc !== 'เลือกเหตุผล' && selcountry !== 0) {
                                            props.hidecheckingpanelfunc(false);
                                            testresvinfodispatch(addCandAtDueDate(addMemberInDetailedList()))
                                            //------------ add and sub ----                                           
                                        } else {
                                            toast(
                                                'กรุณาเลือกเหตุผลรับการทดสอบและประเทศที่จะเดินทาง',
                                                { position: toast.POSITION.TOP_CENTER }
                                            );
                                        }
                                    }}
                                >
                                    เพิ่มรายชื่อผู้เข้าสอบ
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant='contained'
                                    onClick={() => {
                                        props.tabclosefunc();//func in pagebookdate.jsx
                                    }}
                                >
                                    ย้อนกลับ
                                </Button>
                            </Grid>
                            <Grid item>
                                <Tooltip title='ตรวจสอบรายชื่อผู้เข้าสอบ'>
                                    <IconButton
                                        sx={{ color: blue['A700'] }}
                                        onClick={() => {
                                            props.hidecheckingpanelfunc(!props.checkpanelstate);
                                        }}
                                    >
                                        <ViewListIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
}

export default TbSelectTestDateAndTime;