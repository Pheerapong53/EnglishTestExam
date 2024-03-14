/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../index.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import Container from '@mui/material/Container';
import listPlugin from '@fullcalendar/list';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import thLocale from '@fullcalendar/core/locales/th';
import ContentTapOne from '../components/ContentTapOne';
import ContentTapTwo from '../components/ContentTapTwo';
import ContentTapThree from '../components/ContentTapThree';
import EventOnPgBookDate from "../components/EventOnPgBookDate";
import moment from "moment";
/*------------------ Redux ---------------------*/
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingInOnePeriod } from '../store/PgBookDateSlice';
//import { fetchSeatState } from '../ReduxSlice/SeatMgmtSlice';

/*----------------------------------------------*/
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/*------------------------- TabPanel ------------------*/
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>
        <Typography component={'span'}>{children}</Typography>
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/*------------------------- PageBookDate ------------------------*/
function PageBookDate() {

  const [openRegisBookDate, setOpenRegisBookDate] = useState(false);
  const { user } = useSelector((state) => ({ ...state }))
  const token = user.user.token
  /*----------------------- Tab Management ----------------------*/
  const [value, setValue] = useState(0); //Tab index
  const handleTabChange = (event, newValue) => {
    //console.log('handleTabChange -> event : ', event, ' newValue -> ', newValue)
    setValue(newValue);
  };

  /*----------------- Activities in Calendar -------------------*/
  let fd_month = moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format('YYYY-MM-DD');
  let ld_month = moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format('YYYY-MM-DD');
  const [activities, setActivities] = useState([]);
  const [period, setPeriod] = useState({
    's_date': fd_month,
    'e_date': ld_month
  });

  /*----------------------- Redux : useEffect --------------------------*/
  const bookdatedispatch = useDispatch(); 
  useEffect(() => {
    bookdatedispatch(fetchBookingInOnePeriod({ 's_date': period.s_date, 'e_date': period.e_date, 'token': token }));
  }, [bookdatedispatch, period, openRegisBookDate]);

  /*------------------ extract data from the redux store state -----------*/
  const bookdatelist = useSelector((state) => state.bookdate.bookdatearr);
  const isLoading = useSelector((state) => state.bookdate.isLoading);
  const error = useSelector((state) => state.bookdate.error);

  useEffect(() => {
    try {
      if (!isLoading) {
        setActivities(bookdatelist);
      }
    } catch (err) {
      console.log('PageBookDate Redux failed ->> error : ', error);
    }
  }, [isLoading, bookdatelist]);

  /*-------------- Register on the day of booking --------------*/
  //const [openRegisBookDate, setOpenRegisBookDate] = useState(false);
  const [seldate, setSelDate] = useState('');

  const handleClickOpenRegisBookDate = (info) => {
    setSelDate(info.startStr);
    setOpenRegisBookDate(true);
  };

  const handleCloseRegisBookDate = () => {
    setOpenRegisBookDate(false);
  };

  //console.log('openRegisBookDate ----------> ', openRegisBookDate);
  /*-------------- Event Dialog --------------------*/
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventInfoOnClick, setEventInfoOnClick] = useState();

  /*------------------ PageBookDate -> Return ---------------*/
  return (
    <Fragment>
      <Typography component={"div"}>
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          จองวันทดสอบ
        </Box>
      </Typography>

      <Container>
        <FullCalendar
          locale={thLocale}
          headerToolbar={{ start: 'title', end: 'dayGridMonth dayGridWeek timeGridDay listWeek prev,next', }} contentHeight='30rem'
          weekends={true}
          selectable={true}
          initialView={'dayGridMonth'}
          select={handleClickOpenRegisBookDate}
          plugins={[listPlugin, dayGridPlugin, timeGridPlugin, daygridPlugin, interactionPlugin]}
          navLinks={true}
          navLinkDayClick={(date, jsEvent) => {
            setSelDate(moment(date).format('YYYY-MM-DD'));
            setOpenRegisBookDate(true);
          }}
          events={activities}
          eventClick={(info) => {
            setEventInfoOnClick(info);
            setOpenEventDialog(true);
          }}
          datesSet={(dateInfo) => {
            let d_start = moment(dateInfo.view.activeStart).format('YYYY-MM-DD');//first date of period
            let d_end = moment(dateInfo.view.activeEnd).format('YYYY-MM-DD');//last date of period
            switch (dateInfo.view.type) {
              case 'dayGridMonth': case 'dayGridWeek': case 'timeGridDay':
              case 'listWeek':
                setPeriod({ 's_date': d_start, 'e_date': d_end });
                break;
                default: break;
            }
          }}
        />
        <Dialog
          fullScreen
          open={openRegisBookDate}
          onClose={handleCloseRegisBookDate}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseRegisBookDate}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography component="span">
                <Box sx={{ textAlign: "center", fontSize: 18, fontWeight: 500 }}>
                  ลงทะเบียนจองวันทดสอบ
                </Box>
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <Container >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    aria-label="basic tabs example"
                    value={value}
                    onChange={handleTabChange}
                  >
                    <Tab label="ลงทะเบียนรายบุคคล" {...a11yProps(0)} />
                    <Tab label="ลงทะเบียนแบบกลุ่ม" {...a11yProps(1)} />
                    <Tab label=" ล็อควันทดสอบ" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                {/*--------- Individual Register : updated 160366--------------*/}
                <TabPanel value={value} index={0}>
                  <ContentTapOne date={seldate} tabclosefunc={handleCloseRegisBookDate}/>
                </TabPanel>

                {/*-------------- Group Register --------------*/}
                <TabPanel value={value} index={1}>
                  {/*<ContentTapTwo date={seldate} />*/}
                </TabPanel>

                {/*----------- Whole Day Booking --------------*/}
                <TabPanel value={value} index={2}>
                  {/*<ContentTapThree date={seldate} />*/}
                </TabPanel>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  กรณีที่ต้องยกเลิกการจองวันทดสอบ ให้กรอกข้อมูลตามที่ได้ลงทะเบียนไว้และกดปุ่มลงทะเบียนอีกครั้ง จากนั้นให้กดปุ่ม "ยกเลิกการลงทะเบียน" ที่แสดงขึ้นมา
                </p>
              </Box>
            </Container>
          </List>
        </Dialog>
        <br />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link to="/PageBookTestDate" style={{ textDecoration: "none" }}>
            <Button variant="contained" startIcon={<ArrowBackIcon />}>
              ย้อนกลับ
            </Button>
          </Link>
        </Box>
      </Container>
      {
        openEventDialog &&
        <EventOnPgBookDate state={{ openEventDialog, setOpenEventDialog, eventInfoOnClick }} />
      }
    </Fragment>
  )
}

export default PageBookDate