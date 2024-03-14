/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,
{
    forwardRef,
    useEffect,
    useState,
    useImperativeHandle,
    useMemo
} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { convertToThaiDate } from "./functions/GlobalFunctions";
import { toast, ToastContainer } from 'react-toastify';

/*------------------ Redux -----------------------*/
import { useSelector, useDispatch } from 'react-redux';
import { fetchSeatStatusInfoByDateAndTime } from '../store/SeatMgmtSlice';
import { fetchMemberInfoByUserType } from '../store/MemberInfoSlice';
import { updateTestLocationAndInvigilator, fetchTestResultByDateAndTime } from '../store/TestMgmtSlice';
import { blue } from '@mui/material/colors';

/*---------------------------- Item Styled -----------------------------*/
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    boxShadow: 'none',
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
        MuiDialog: {
            styleOverrides: {
                root: {
                    fontFamily: 'THSarabunNew',
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: blue['500'],
                    padding: 20,
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    fontSize: '16px',
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '20px',
                }
            }
        },
    }

});


/*------------------------- LabRoomSelection --------------------*/
const LabRoomSelection = forwardRef((props, ref) => {
    const [opendlg, setOpenDlg] = useState(false);
    const [datetime, setDateTime] = useState({ 'resvcode': '', 'date': '', 'time': '' });
    const [spinvalue, setSpinValue] = useState({ 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 });
    const [labroominv, setLabroomInv] = useState({
        'lab1': { 'resvcode': datetime.resvcode, 'reqnum': 0, 'invigilatorid': null },
        'lab2': { 'resvcode': datetime.resvcode, 'reqnum': 0, 'invigilatorid': null },
        'lab3': { 'resvcode': datetime.resvcode, 'reqnum': 0, 'invigilatorid': null },
        'lab6': { 'resvcode': datetime.resvcode, 'reqnum': 0, 'invigilatorid': null },
    });
    const [reqNumSeat, setReqNumSeat] = useState(0);
    const [sumlabseat, setSumLabSeat] = useState(0);

    //console.log('datetime ----> ', datetime);

    useImperativeHandle(ref, () => ({
        handleClickOpenDlg: (resvcode, date, time) => {
            setDateTime({ 'resvcode': resvcode, 'date': convertToThaiDate(date), 'time': time });
            setOpenDlg(true);
            props.setLabRoomDlgState(true);
        },
        handleClickCloseDlg: () => {
            setOpenDlg(false);
        },
    }));

    /*------------------------ seatstatus & request seat------------------------*/
    const seatstatusdispatch = useDispatch();
    const testresultdispatch = useDispatch();
    const bookdatelist = useSelector((state) => state.bookdate.bookdatearr);
    const seatstatus = useSelector((state) => state.seatstate.seatstatus);

    useEffect(() => {
        if (Object.values(datetime).every((e) => e !== '')) {
            seatstatusdispatch(fetchSeatStatusInfoByDateAndTime(datetime));
        }
    }, [seatstatusdispatch, datetime]);

    // console.log("seatstatus: ", typeof(seatstatus));

    useEffect(() => {
        let totalrsrvseats = 0;
        if (seatstatus !== undefined) {
            // seatstatus.map(seat =>{
            Object.keys(seatstatus?.data?.seatcount).map(seat => {
                switch (seat) {
                    case 'lab1':
                        totalrsrvseats += seatstatus?.data?.seatcount['lab1'];
                        break;
                    case 'lab2':
                        totalrsrvseats += seatstatus?.data?.seatcount['lab2'];
                        break;
                    case 'lab3':
                        totalrsrvseats += seatstatus?.data?.seatcount['lab3'];
                        break;
                    case 'lab6':
                        totalrsrvseats += seatstatus?.data?.seatcount['lab6'];
                        break;
                    default: break;
                }
            });
        };

        let sum = bookdatelist?.filter(e => (
            e.extendedProps.resvcode === datetime.resvcode
        )).reduce((num, el) => {
            return num + parseInt(el.extendedProps.seatcount)
        }, 0);

        setReqNumSeat(parseInt(sum) - totalrsrvseats);
    }, [seatstatus, bookdatelist, opendlg, spinvalue]);

    const testresultbydatetime = useSelector((state) => state.testmgmtstate.testresultarr);
    useEffect(() => {
        if (Object.values(datetime).every(e => e !== '')) {
            testresultdispatch(fetchTestResultByDateAndTime(datetime));
            setLabroomInv({
                'lab1': {
                    'resvcode': datetime.resvcode, 'reqnum': testresultbydatetime.data[1]['lab1'], 'invigilatorid': testresultbydatetime.data[1]['inivigator']
                },
                'lab2': {
                    'resvcode': datetime.resvcode, 'reqnum': testresultbydatetime.data[2]['lab2'], 'invigilatorid': testresultbydatetime.data[2]['inivigator']
                },
                'lab3': {
                    'resvcode': datetime.resvcode, 'reqnum': testresultbydatetime.data[3]['lab3'], 'invigilatorid': testresultbydatetime.data[3]['inivigator']
                },
                'lab6': {
                    'resvcode': datetime.resvcode, 'reqnum': testresultbydatetime.data[4]['lab4'], 'invigilatorid': testresultbydatetime.data[4]['inivigator']
                },
            });
        }
    }, [testresultdispatch, datetime, setLabroomInv]);

    useEffect(() => {
        let sum = 0;
        Object.values(spinvalue).forEach(x => {
            sum += parseInt(x);
        });
        setSumLabSeat(sum);
        if (sum === parseInt(reqNumSeat) && sum !== 0) {
            toast.warn("จัดสรรที่นั่งครบตามจำนวนที่นั่งที่จอง !", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }, [spinvalue]);

    /*------------------------ Redux -------------------------------------------*/
    const updateInvLocDispatch = useDispatch();
    /*------------------- invigilator ---------------------*/
    const meminfodispatch = useDispatch();
    useEffect(() => {
        meminfodispatch(fetchMemberInfoByUserType('USR03'));
    }, [meminfodispatch]);
    const meminfobyusrtype = useSelector((state) => state.memberinfostate.meminfobyusrtype);

    const [invigilator, setInvigilator] = useState([]);
    const [invigilatorList, setInvigilatorList] = useState([]);
    useEffect(() => {
        if (meminfobyusrtype?.length !== 0) {
            let invigilatorlist = meminfobyusrtype?.map(e => ({
                'pers_id': e['tbmember.pers_id'],
                'name': e['tbmember.tbmemberinfos.mem_rank'] +
                    e['tbmember.tbmemberinfos.mem_fname'] + ' ' +
                    e['tbmember.tbmemberinfos.mem_lname']
            }));
            let invnamelist = invigilatorlist?.map(inv => { return inv.name });
            //console.log('invnamelist ->> ', invnamelist, ' : invigilatorlist -> ', invigilatorlist)
            setInvigilator(['เลือกผู้คุมสอบ', ...invnamelist]); //drop-down list
            setInvigilatorList(invigilatorlist); //pers_id + name
        }
    }, [meminfobyusrtype, datetime]);

    //console.log('testresultbydatetime ---> ', testresultbydatetime, ' : ', datetime, ' : ', invigilatorList);
    /*------------------------ manage invigilator spin ---------*/
    const indexInvigilatorListFunc = (index) => {
        if (testresultbydatetime !== null) {
            return invigilator.indexOf(
                invigilatorList.filter(
                    inv => inv.pers_id === testresultbydatetime.data[index].inivigator
                )[0]?.name
            );
        } else {
            return -1;
        }
    };

    // console.log("invigilatorList: ", invigilatorList)
    // console.log("indexInvigilatorListFunc: ", indexInvigilatorListFunc(1))

    const [invigilatorLab, setInvigilatorLab] = useState({ 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0, });
    useEffect(() => {
        setInvigilatorLab({
            'lab1': indexInvigilatorListFunc(1) === -1 ? 0 : indexInvigilatorListFunc(1),
            'lab2': indexInvigilatorListFunc(2) === -1 ? 0 : indexInvigilatorListFunc(2),
            'lab3': indexInvigilatorListFunc(3) === -1 ? 0 : indexInvigilatorListFunc(3),
            'lab6': indexInvigilatorListFunc(4) === -1 ? 0 : indexInvigilatorListFunc(4),
        });
    }, [setInvigilatorLab, testresultbydatetime]);

    /*------------------------ manage test location ---------*/
    useEffect(() => {
        setLabroomInv({
            'lab1': {
                'resvcode': datetime.resvcode, 'reqnum': Number(spinvalue['lab1']),
                'invigilatorid': invigilatorLab['lab1'] === 0 ? null : invigilatorList[invigilatorLab['lab1'] - 1]?.pers_id
            },
            'lab2': {
                'resvcode': datetime.resvcode, 'reqnum': Number(spinvalue['lab2']),
                'invigilatorid': invigilatorLab['lab2'] === 0 ? null : invigilatorList[invigilatorLab['lab2'] - 1]?.pers_id
            },
            'lab3': {
                'resvcode': datetime.resvcode, 'reqnum': Number(spinvalue['lab3']),
                'invigilatorid': invigilatorLab['lab3'] === 0 ? null : invigilatorList[invigilatorLab['lab3'] - 1]?.pers_id
            },
            'lab6': {
                'resvcode': datetime.resvcode, 'reqnum': Number(spinvalue['lab6']),
                'invigilatorid': invigilatorLab['lab6'] === 0 ? null : invigilatorList[invigilatorLab['lab6'] - 1]?.pers_id
            },
        });
    }, [spinvalue, invigilatorLab, setLabroomInv, opendlg]);

    const [seatallocation, setSeatAllocation] = useState({ 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0, });
    useMemo(() => {
        setSeatAllocation({ 
            'lab1': Number(seatstatus?.data?.seatcount['lab1']) + Number(spinvalue['lab1']), 
            'lab2': Number(seatstatus?.data?.seatcount['lab2']) + Number(spinvalue['lab2']), 
            'lab3': Number(seatstatus?.data?.seatcount['lab3']) + Number(spinvalue['lab3']), 
            'lab6': Number(seatstatus?.data?.seatcount['lab6']) + Number(spinvalue['lab6']), 
        });
    },[spinvalue]);

    // console.log('seatallocation ---> ', seatallocation);
    // console.log('invigilatorLab ---> ', invigilatorLab);
    /*-------------------------- Return ---------------------*/
    return (
        <ThemeProvider theme={theme}>
            <Dialog
                maxWidth={'md'}
                open={opendlg}
            >
                <DialogTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Item sx={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color: 'whitesmoke',
                                backgroundColor: blue['500']
                            }}>
                                ที่นั่งสอบจัดสรรตามห้องสอบ
                            </Item>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} >
                        <Grid item xs={12} style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Item sx={{
                                fontWeight: 'bold',
                                //color: 'whitesmoke',
                                //backgroundColor: blue['500']
                            }}>
                                รหัสการจอง: {datetime.resvcode} วันที่สอบ: {datetime.date} เวลา: {datetime.time}
                            </Item>
                        </Grid>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Item sx={{
                                fontWeight: 'bold',
                                //color: 'whitesmoke',
                                //backgroundColor: blue['500']
                            }}>
                                จำนวนที่นั่งสอบที่ต้องการ: {reqNumSeat}
                            </Item>
                        </Grid>
                        {/*---------- title -----------*/}
                        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Item sx={{ fontWeight: 'bold' }}>ห้องสอบ</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={{ fontWeight: 'bold' }}>
                                LAB 1 ({seatstatus?.data?.totalseat['lab1']})
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={{ fontWeight: 'bold' }}>
                                LAB 2 ({seatstatus?.data?.totalseat['lab2']})
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={{ fontWeight: 'bold' }}>
                                LAB 3 ({seatstatus?.data?.totalseat['lab3']})
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item sx={{ fontWeight: 'bold' }}>
                                LAB 6 ({seatstatus?.data?.totalseat['lab6']})
                            </Item>
                        </Grid>
                        {/*---------- ที่นั่งทั้งหมด -----------*/}
                        <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Item sx={{ fontWeight: 'bold' }}>ที่นั่งสอบที่จองแล้ว</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {Number(seatstatus?.data?.seatcount['lab1']) + Number(spinvalue['lab1'])}
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {Number(seatstatus?.data?.seatcount['lab2']) + Number(spinvalue['lab2'])}
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {Number(seatstatus?.data?.seatcount['lab3']) + Number(spinvalue['lab3'])}
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {Number(seatstatus?.data?.seatcount['lab6']) + Number(spinvalue['lab6'])}
                            </Item>
                        </Grid>
                        {/*---------- จำนวนคงเหลือ -----------*/}
                        <Grid item xs={3} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <Item sx={{ fontWeight: 'bold' }}>ที่นั่งสอบคงเหลือ</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {
                                    seatstatus?.data?.totalseat['lab1'] - seatstatus?.data?.seatcount['lab1'] - spinvalue['lab1']
                                }
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {
                                    seatstatus?.data?.totalseat['lab2'] - seatstatus?.data?.seatcount['lab2'] - spinvalue['lab2']
                                }
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {
                                    seatstatus?.data?.totalseat['lab3'] - seatstatus?.data?.seatcount['lab3'] - spinvalue['lab3']
                                }
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                {
                                    seatstatus?.data?.totalseat['lab6'] - seatstatus?.data?.seatcount['lab6'] - spinvalue['lab6']
                                }
                            </Item>
                        </Grid>
                        {/*---------- จำนวนที่ต้องการ -----------*/}
                        <Grid item xs={3} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Item sx={{ fontWeight: 'bold' }}>ที่นั่งสอบที่ต้องการ</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <TextField
                                    type='number'
                                    value={spinvalue['lab1']}
                                    onChange={(e) => {
                                        if (sumlabseat !== reqNumSeat) {
                                            setSpinValue({ ...spinvalue, 'lab1': e.target.value });
                                        } else if (e.target.value < spinvalue['lab1']) {
                                            setSpinValue({ ...spinvalue, 'lab1': e.target.value });
                                        }
                                    }}
                                    InputProps={{
                                        sx: { height: 40, },
                                        inputProps: {
                                            min: 0,
                                            max: seatstatus?.data?.totalseat['lab1'],
                                            style: { textAlign: 'center' }
                                        }
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <TextField
                                    type='number'
                                    value={spinvalue['lab2']}
                                    onChange={(e) => {
                                        if (sumlabseat !== reqNumSeat) {
                                            setSpinValue({ ...spinvalue, 'lab2': e.target.value });
                                        } else if (e.target.value < spinvalue['lab2']) {
                                            setSpinValue({ ...spinvalue, 'lab2': e.target.value });
                                        }
                                    }}
                                    InputProps={{
                                        sx: { height: 40 },
                                        inputProps: {
                                            min: 0,
                                            max: seatstatus?.data?.totalseat['lab2'],
                                            style: { textAlign: 'center' }
                                        }
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <TextField
                                    type='number'
                                    value={spinvalue['lab3']}
                                    onChange={(e) => {
                                        if (sumlabseat !== reqNumSeat) {
                                            setSpinValue({ ...spinvalue, 'lab3': e.target.value });
                                        } else if (e.target.value < spinvalue['lab3']) {
                                            setSpinValue({ ...spinvalue, 'lab3': e.target.value });
                                        }
                                    }}
                                    InputProps={{
                                        sx: { height: 40 },
                                        inputProps: {
                                            min: 0,
                                            max: seatstatus?.data?.totalseat['lab3'],
                                            style: { textAlign: 'center' }
                                        }
                                    }}
                                />
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <TextField
                                    type='number'
                                    value={spinvalue['lab6']}
                                    onChange={(e) => {
                                        if (sumlabseat !== reqNumSeat) {
                                            setSpinValue({ ...spinvalue, 'lab6': e.target.value });
                                        } else if (e.target.value < spinvalue['lab6']) {
                                            setSpinValue({ ...spinvalue, 'lab6': e.target.value });
                                        }
                                    }}
                                    InputProps={{
                                        sx: { height: 40 },
                                        inputProps: {
                                            min: 0,
                                            max: seatstatus?.data?.totalseat['lab6'],
                                            style: { textAlign: 'center' }
                                        }
                                    }}
                                />
                            </Item>
                        </Grid>

                        {/*---------- ผู้คุมสอบ -----------*/}
                        <Grid item xs={3} style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Item sx={{ fontWeight: 'bold' }}>ผู้คุมสอบ</Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <Select
                                    value={invigilatorLab['lab1']}
                                    fullWidth
                                    onChange={(evt) => {
                                        setInvigilatorLab({ ...invigilatorLab, 'lab1': evt.target.value });
                                    }}
                                    disabled={
                                        invigilatorLab['lab1'] > 0 ? true : false
                                    }
                                >
                                    {
                                        invigilator.map((e, i) => {
                                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <Select
                                    value={invigilatorLab['lab2']}
                                    fullWidth
                                    onChange={(evt) => {
                                        setInvigilatorLab({ ...invigilatorLab, 'lab2': evt.target.value });
                                    }}
                                    disabled={
                                        invigilatorLab['lab2'] > 0 ? true : false
                                    }
                                >
                                    {
                                        invigilator.map((e, i) => {
                                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <Select
                                    value={invigilatorLab['lab3']}
                                    fullWidth
                                    onChange={(evt) => {
                                        setInvigilatorLab({ ...invigilatorLab, 'lab3': evt.target.value });
                                    }}
                                    disabled={
                                        invigilatorLab['lab3'] > 0 ? true : false
                                    }
                                >
                                    {
                                        invigilator.map((e, i) => {
                                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </Item>
                        </Grid>
                        <Grid item xs={2}>
                            <Item>
                                <Select
                                    value={invigilatorLab['lab6']}
                                    fullWidth
                                    onChange={(evt) => {
                                        setInvigilatorLab({ ...invigilatorLab, 'lab6': evt.target.value });
                                    }}
                                    disabled={
                                        invigilatorLab['lab6'] > 0 ? true : false
                                    }
                                >
                                    {
                                        invigilator.map((e, i) => {
                                            return (<MenuItem key={i} value={i}>{e}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Stack direction={'row'}>
                        <Item>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    let list = Object.values(seatallocation).filter((el, i) => 
                                        {return el !== 0 ? i : -1} 
                                    )
                                    // console.log(Object.values(seatallocation), ' : ', Object.values(invigilatorLab), ' : ', list);
                                    /*if (reqNumSeat > 0) {
                                        toast.warning(
                                            'กรุณาเลือกสถานที่สอบตามจำนวนที่นั่งที่หน่วยต้องการ',
                                            { position: toast.POSITION.TOP_CENTER }
                                        );
                                    }else{*/

                                    //}
                                    updateInvLocDispatch(
                                        updateTestLocationAndInvigilator(labroominv)
                                    );
                                    setSpinValue({ 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 });
                                    setOpenDlg(false);
                                    props.setLabRoomDlgState(false);
                                }}
                            >
                                ตกลง
                            </Button>
                        </Item>
                        <Item>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setSpinValue({ 'lab1': 0, 'lab2': 0, 'lab3': 0, 'lab6': 0 });
                                    setOpenDlg(false);
                                    props.setLabRoomDlgState(false);
                                }}
                            >
                                ปิด
                            </Button>
                        </Item>
                    </Stack>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
});

export default LabRoomSelection;