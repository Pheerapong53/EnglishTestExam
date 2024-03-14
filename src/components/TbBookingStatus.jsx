/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useMemo, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey, blue } from '@mui/material/colors';
import moment from 'moment';

/*------------------------- Individual Register Redux ---------------*/
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingInOnePeriod } from '../store/PgBookDateSlice';
import { fetchSeatState } from '../store/SeatMgmtSlice';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'THSarabunNew',
            fontSize: 12
        }
    },
    components: {
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: blue['100']
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: grey['100'],
                    //border: '1px solid blue'
                }
            }
        }
    }
});

const periodArr = ['09:00 - 10:00', '10:30 - 11:30', '13:30 - 14:30'];
const th_month = [
    'ม.ค.', 'ก.พ', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

/*-------------------------------------- TbBookingStatus ----------------------------*/
function TbBookingStatus(props) {
    const { user } = useSelector((state) => ({ ...state }))
    const token = user.user.token
    /*--------------------- Redux : updated 170366-----------------------*/
    let fd_month = moment(
        new Date(new Date(props.date).getFullYear(), new Date(props.date).getMonth(), 1)
    ).format('YYYY-MM-DD');
    let ld_month = moment(
        new Date(new Date(props.date).getFullYear(), new Date(props.date).getMonth() + 1, 0)
    ).format('YYYY-MM-DD');
    /*----------------------- Redux : useEffect --------------------------*/
    const reqNumSeat = useSelector((state) => state.testresvinfostate.candAtDueDateArr);

    /*------------------------- Total Seat --------------------------*/
    const totalseatdispatch = useDispatch();
    useEffect(() => {
        totalseatdispatch(fetchSeatState());
    }, [totalseatdispatch]);
    const totalseat = useSelector((state) => state.seatstate.totalseat);

    /*------------------------- Booking in a period -----------------*/
    const bookdatedispatch = useDispatch();
    useEffect(() => {
        bookdatedispatch(fetchBookingInOnePeriod({ 's_date': fd_month, 'e_date': ld_month, 'token': token }));
    }, [bookdatedispatch, props.date]);
    const bookdatelist = useSelector((state) => state.bookdate.bookdatearr);
    let seldatelist = bookdatelist.filter(date => { return (date.start.split('T')[0] === props.date) });

    /*----------------------------- booking state : updated 170366 ---------------------*/
    const [bookingstaterows, setBookingStateRows] = useState([]);

    /*---------------------- FUNC : compareObjInArrFunc --------*/
    const compareObjInArrFunc = (arr) => {
        let res = [];
        for (let i = 0; i < arr.length - 1; i++) {
            if (i < 1) {
                if (arr[i].period === arr[i + 1].period) {
                    res.push(arr[i]);
                } else {
                    res.push(arr[i]);
                    res.push(arr[i + 1]);
                }
            } else {
                if (arr[i].period !== arr[i + 1].period) {
                    res.push(arr[i + 1]);
                }
            }
        }
        return res;
    };

    /*---------------------- FUNC : convertToThDate -----------------------*/
    const convertToThaiDate = (date) => {
        let d = date.split('-');
        d[0] = (Number(d[0]) + 543).toString();
        d[1] = th_month[Number(d[1]) - 1];
        return (d.reverse().join(' '));
    };

    /*---------------------- FUNC : bookingStateFormatFunc --------*/
    const bookingStateFormatFunc = (arr, total) => {
        let tmplist = []
        periodArr.map((p, i) => {
            tmplist.push({
                'no': i + 1,
                'date': convertToThaiDate(props.date),
                'period': p,
                'register': 0,
                'remain': total
            })
        });

        let uniqueResultOne = tmplist.filter((obj) => {
            return !arr.some((obj2) => {
                return obj.period === obj2.period;
            });
        });
        let res = arr.length !== 0 ? [...arr, ...uniqueResultOne] : tmplist;
        res.sort((a, b) => (a.period > b.period) ? 1 : ((b.period > a.period) ? -1 : 0));
        res.forEach((el, i) => {
            el.no = i + 1;
        });

        //console.log('bookingStateFormatFunc --> res : ', res);
        return res;
    };

    /*--------------------- useEffect : setBookingStateRows ---------------*/
    useEffect(() => {
        let bookingstatelist = [];
        seldatelist.map((seldate, i) => {
            let total = Object.values(seldate.extendedProps.totalseat).reduce((a, b) => { return (a + b) });
            let remain = Object.values(seldate.extendedProps.remainseat).reduce((a, b) => { return (a + b) });

            bookingstatelist.push({
                'no': i + 1,
                'date': convertToThaiDate(seldate.start.split('T')[0]),
                'period': periodArr[periodArr.findIndex(el => el.includes(seldate.start.split('T')[1]))],
                'register': total - remain,
                'remain': remain
            });
        });

        if (bookingstatelist.length > 1) {
            bookingstatelist = compareObjInArrFunc(bookingstatelist);
        }
        setBookingStateRows(bookingStateFormatFunc(bookingstatelist, totalseat));

    }, [props.date, seldatelist.length, reqNumSeat['member']?.length, bookdatelist]);

    /*------------------------ update num of remaining seat and register seat -----------------*/
    //console.log('length ---> ', seldatelist, ' : ', seldatelist.filter(e => e['start'].includes('09:00'))[0].extendedProps.seatcount);
    useEffect(() => {
        let tmp = bookingstaterows.map(row => {
            let seatcount = seldatelist.filter(
                e => e['start'].includes(row['period'].substring(0, 5))
            )?.reduce((a, b) => a + Number(b.extendedProps.seatcount), 0);

            if (row['period'].replaceAll(':', '') === reqNumSeat['period']) {
                row['register'] = seatcount + reqNumSeat['member'].length;
                //row['register'] = row['register'] + reqNumSeat['member'].length;
                row['remain'] = totalseat - row['register'];
            }
            return row;
        });

        setBookingStateRows(bookingStateFormatFunc(tmp, totalseat));
    }, [props.date, reqNumSeat['member']?.length]);

    /*----------------------------------- Return --------------------------*/
    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} sx={{ padding: 0.5 }}>
                <TableContainer sx={{ minWidth: 450 }}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' colSpan={4} sx={{ fontWeight: 'bold' }}>
                                    สถานะการจอง
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>วันที่</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>ช่วงเวลา</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>ลงทะเบียนแล้ว</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 'bold' }}>คงเหลือ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                bookingstaterows.map((row) => (
                                    <TableRow key={row.no}>
                                        <TableCell align='center' >{row.date}</TableCell>
                                        <TableCell align='center'>{row.period}</TableCell>
                                        <TableCell align='center'>{row.register}</TableCell>
                                        <TableCell align='center'>{row.remain}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </ThemeProvider>
    );
}


export default TbBookingStatus;//React.memo(TbBookingStatus);