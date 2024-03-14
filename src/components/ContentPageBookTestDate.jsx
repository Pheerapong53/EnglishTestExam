/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
import {
  DataGrid,
} from '@mui/x-data-grid';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
  Typography,
  IconButton,
  Badge
} from "@mui/material";

import moment from "moment";
import ToPrintPageBookTestDate from "./ToPrintPageBookTestDate";
/*------------------ External Function -----------*/
import { convertToThaiDate } from "./functions/GlobalFunctions";
/*------------------ Redux -----------------------*/
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookingInOnePeriod } from '../store/PgBookDateSlice';
import { fetchAllTestResvInfoInOnePeriod } from '../store/TestReservationSlice';

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

/*---------------------------- DataGrid : Column -> Link Button : RenderCheckApprovalButton ------------------------*/
const RenderCheckApprovalButton = (props) => {
  const { data } = props;
  // console.log("data: " + data);
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
          variant="outlined"
          color="primary"
          size="small"
          style={{
            fontFamily: 'THSarabunNew',
            marginLeft: 16
          }}

          onClick={() => {
            /*-------- under construction --------------------*/
            console.log('click');
          }}
        >
          เข้าดูรายชื่อ
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

/*----------------------------------- DataGrid : Column ----------------*/
const columns = [
  { field: "id", headerName: "ลำดับ", width: 100, align: 'center', headerAlign: 'center' },
  { field: "bookingcode", headerName: "รหัสการจอง", width: 250, align: 'center', headerAlign: 'center', flex: 1 },
  { field: "bookingdate", headerName: "วันที่จอง", width: 250, align: 'center', headerAlign: 'center', flex: 1 },
  { field: "bookingtime", headerName: "เวลาที่จอง", width: 250, align: 'center', headerAlign: 'center', flex: 1 },
  {
    field: "checkbookingdate", headerName: "ตรวจสอบอนุมัติวันที่จอง", width: 350, align: 'center', headerAlign: 'center', flex: 1,
    renderCell: (params) => {
      return (
        <RenderCheckApprovalButton data={{
          'resvcode': params.row.bookingcode,
          'resvdate': params.row.bookingdate,
          'resvtime': params.row.bookingtime
        }} />
      )
    },
  },
];// End of Column

/*----------------------- Style ------------------*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  fontFamily: 'THSarabunNew',
  color: theme.palette.text.secondary
}));

/*---------------------------------------- ContentPageBookTestDate : component ---------------------------*/
function ContentPageBookTestDate() {
  const { user } = useSelector((state) => ({ ...state }))
  const token = user.user.token

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
      default: break;
    }
  }, [m]);

  /*---------------------- Redux : Test Reservation -> booking period --------*/
  let fd_month = moment(new Date((curr_year - 543), m, 1)).format('YYYY-MM-DD');
  let ld_month = moment(new Date((curr_year - 543), m + 1, 0)).format('YYYY-MM-DD');

  const bookdatedispatch = useDispatch();
  useEffect(() => {
    // console.log("date: ", fd_month, "date id: ", ld_month);
    bookdatedispatch(fetchBookingInOnePeriod({ 's_date': fd_month, 'e_date': ld_month, 'token': token}));
  }, [bookdatedispatch, curr_year, m]);

  const bookdatelist = useSelector((state) => state.bookdate.bookdatearr);

  /*--------- Redux : fetching test reservation by date ----------------*/
  const testresvbydatedispatch = useDispatch();
  useEffect(() => {
    testresvbydatedispatch(fetchAllTestResvInfoInOnePeriod({ 's_date': fd_month, 'e_date': ld_month }));
  }, [testresvbydatedispatch, curr_year, m]);

  /*---------------------- FUNC : compareObjInArrFunc --------*/
  const compareObjInArrFunc = (arr) => {
    let res = [];
    for (let i = 0; i < arr.length - 1; i++) {
      if (i < 1) {
        if (arr[i].bookingcode === arr[i + 1].bookingcode) {
          res.push(arr[i]);
        } else {
          res.push(arr[i]);
          res.push(arr[i + 1]);
        }
      } else {
        if (arr[i].bookingcode !== arr[i + 1].bookingcode) {
          res.push(arr[i + 1]);
        }
      }
    }

    res = res.map((e, i) => ({
      id: i + 1,
      bookingcode: e.bookingcode,
      bookingdate: e.bookingdate,
      bookingtime: e.bookingtime
    }));
    return res;
  };

  /*------------------------- Rows Data --------------------*/
  const [rows, setRows] = useState([]);
  const [tmprows, setTmpRows] = useState([]);
  useEffect(() => {
    let tmp = [];
    bookdatelist?.map((el, i) => {
      tmp.push({
        id: i + 1,
        bookingcode: el.extendedProps.resvcode,
        bookingdate: convertToThaiDate(el.start.split('T')[0]),
        bookingtime: el.start.split('T')[1]
      });
    });

    tmp.sort((a, b) => {
      if (a.bookingdate === b.bookingdate) {
        return ((a.bookingtime === b.bookingtime) ? 0 : (a.bookingtime < b.bookingtime) ? -1 : 1);
      } else {
        return (a.bookingdate - b.bookingdate);
      }
    });

    setRows(tmp.length > 1 ? compareObjInArrFunc(tmp) : tmp);
    setTmpRows(tmp.length > 1 ? compareObjInArrFunc(tmp) : tmp);
  }, [bookdatelist]);

  /*------------------ Event : TextField Changed -----------------*/
  const handleTextChange = (evt) => {
    let data = tmprows.filter(r => r.bookingcode.includes(evt.target.value));

    if (data.length === 0) {
      data = tmprows.filter(r => r.bookingdate.includes(evt.target.value));
      data.sort((a, b) => {
        if (a.bookingdate === b.bookingdate) {
          return ((a.bookingtime === b.bookingtime) ? 0 : (a.bookingtime < b.bookingtime) ? -1 : 1);
        } else {
          return ((a.bookingdate < b.bookingdate) ? -1 : 1);
        }
      });
    }
    if (data.length === 0) {
      data = tmprows.filter(r => r.bookingtime.includes(evt.target.value));
    }

    if (evt.target.value === '') {
      tmprows.sort((a, b) => {
        if (a.bookingdate === b.bookingdate) {
          return ((a.bookingtime === b.bookingtime) ? 0 : (a.bookingtime < b.bookingtime) ? -1 : 1);
        } else {
          return (a.bookingdate - b.bookingdate);
        }
      });

      let _tmprows;
      if (tmprows.length !== 0) {
        _tmprows = tmprows.map((e, i) => ({
          id: i + 1,
          bookingcode: e.bookingcode,
          bookingdate: e.bookingdate,
          bookingtime: e.bookingtime
        }));
      } else {
        _tmprows = tmprows;
      }
      setRows(_tmprows);
    } else {
      data = data.map((e, i) => ({
        id: i + 1,
        bookingcode: e.bookingcode,
        bookingdate: e.bookingdate,
        bookingtime: e.bookingtime
      }));
      setRows(data);
    }
  }

  /*----------------- Event : Sort Menu Handle -------------*/
  const btnSortRef = useRef(null);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortDateClick, setSortDateClick] = useState(false);
  const [sortAppvClick, setSortAppvClick] = useState(false);
  const [sortResvCodeClick, setSortResvCodeClick] = useState(false);

  /*---------------------- sortByDateFunc -----------------------*/
  const sortByDateFunc = () => {
    let tmplist = Object.assign([], bookdatelist);
    if (sortDateClick) {
      tmplist.sort((a, b) => {
        return (new Date(a.start) - new Date(b.start));
      });
    } else {
      tmplist.sort((a, b) => {
        if (a.start.split('T')[0] === b.start.split('T')[0]) {
          return ((a.start.split('T')[1] === b.start.split('T')[1]) ? 0 : (a.start.split('T')[1] < b.start.split('T')[1]) ? -1 : 1);
        } else {
          return (new Date(b.start) - new Date(a.start));
        }
      });
    }

    let tmp = [];
    tmplist.map((el, i) => {
      tmp.push({
        id: i + 1,
        bookingcode: el.extendedProps.resvcode,
        bookingdate: convertToThaiDate(el.start.split('T')[0]),
        bookingtime: el.start.split('T')[1]
      });
    });
    setRows(tmp.length > 1 ? compareObjInArrFunc(tmp) : tmp);
  }// End of sortByDate

  /*---------------------- sortByDateFunc -----------------------*/
  const res_byresvcode = useSelector((state) => state.testresvinfostate.testresvbyperiod);
  const sortByAppvFunc = () => {
    let notappvarr = res_byresvcode.data.filter((el) => el.testappvcode === null);
    let appvarr = res_byresvcode.data.filter((el) => el.testappvcode !== null);
    let mergearr = sortAppvClick ? [...appvarr, ...notappvarr] : [...notappvarr, ...appvarr];
    let tmp = [];
    mergearr.map((el, i) => {
      tmp.push({
        id: i + 1,
        bookingcode: el.testresvcode,
        bookingdate: convertToThaiDate(el.testreqdate),
        bookingtime: el.testreqtime.slice(0, -3)
      });
    });
    setRows(tmp);
  }//End of sortByAppv

  /*---------------------- sortByResvCodeFunc --------------------*/
  const sortByResvCodeFunc = () => {
    let tmplist = Object.assign([], bookdatelist);
    if (sortResvCodeClick) {
      tmplist.sort((a, b) => {
        return (
          (a.extendedProps.resvcode === b.extendedProps.resvcode) ? 0 : (a.extendedProps.resvcode < b.extendedProps.resvcode) ? -1 : 1
        );
      });
    } else {
      tmplist.sort((a, b) => {
        return (
          (a.extendedProps.resvcode === b.extendedProps.resvcode) ? 0 : (a.extendedProps.resvcode > b.extendedProps.resvcode) ? -1 : 1
        );
      });
    }

    let tmp = [];
    tmplist.map((el, i) => {
      tmp.push({
        id: i + 1,
        bookingcode: el.extendedProps.resvcode,
        bookingdate: convertToThaiDate(el.start.split('T')[0]),
        bookingtime: el.start.split('T')[1]
      });
    });
    setRows(tmp.length > 1 ? compareObjInArrFunc(tmp) : tmp);
  }//End of sortByResvCodeFunc

  /*------------------ Handle Sort Menu Click ----------------*/
  const handleSortMenuOnClick = (evt) => () => {
    switch (evt) {
      case 0: //sort by date
        sortByDateFunc();
        setSortDateClick(!sortDateClick);
        break;
      case 1: //sort by approval
        sortByAppvFunc();
        setSortAppvClick(!sortAppvClick);
        break;
      case 2: //sort by resvcode
        sortByResvCodeFunc();
        setSortResvCodeClick(!sortResvCodeClick);
        break;
        default: break; 
    }
    setSortMenuOpen(false);
  }

  /*---------------------- Return --------------------------*/
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
           การจองวันทดสอบ
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
              <ToPrintPageBookTestDate toprint={rows} />
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
                  <MenuItem onClick={handleSortMenuOnClick(0)}>ตามวันที่จอง</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(1)}>ตามอนุมัติการจอง</MenuItem>
                  <MenuItem onClick={handleSortMenuOnClick(2)}>ตามรหัสการจอง</MenuItem>
                </Menu>
              </Fragment>
            </Item>
            {/*-------------- Add Reservation -----------------*/}
            <Item elevation={0}>
              <Button
                component={Link}
                to={'/PageBookDate'}
                variant={'contained'}
              >
                +จองวันทดสอบ
              </Button>
            </Item>
          </Stack>
        </Item>
        {/*-------------- DataGrid -----------------*/}
        <Item elevation={0}>
          <Paper component={Box} width={1} height={450} elevation={0} justifyContent={'center'}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 'bold !important',
                  //overflow: 'visible !important'
                }
              }}
            />
          </Paper>
        </Item>
        {/*-------------- Footer -----------------*/}
        <Item elevation={0}>
          <Footer />
        </Item>
      </Stack>
    </ThemeProvider>
  );
}

export default ContentPageBookTestDate;
