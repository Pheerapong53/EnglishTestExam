/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentViewTestScores from '../components/ContentViewTestScores';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { blue, red, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import Footer from "../components/Footer";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import { useSelector } from 'react-redux'
import Axios from "axios";
import moment from "moment";
import { logout } from "../../src/store/userSilce";
import {useDispatch } from 'react-redux'
require("moment/locale/th");

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[800],
    },
  },
});


function PageTestScores() {
  const location = useLocation();
 const test1 = location.state
 const { user } = useSelector((state) => ({...state}))
 const token = user.user.token;
 const userRole = user.user.userRole;
 const USR01 = userRole[0].status
 const USR02 = userRole[1].status
 const USR03 = userRole[2].status
 const USR04 = userRole[3].status
 const USR05 = userRole[4].status
 const orgname = user.user.orgname;


 const [currentMonth, setCurrentMonth] = useState(new Date());

 const previousMonth = () => {
   const newMonth = new Date(currentMonth);
   newMonth.setMonth(newMonth.getMonth() - 1);
   setCurrentMonth(newMonth);
 };

 const nextMonth = () => {
   const newMonth = new Date(currentMonth);
   newMonth.setMonth(newMonth.getMonth() + 1);
   setCurrentMonth(newMonth);
 };

 const monthsInThai = [
   'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
   'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
   'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
 ];

 const buddhistEra = currentMonth.getFullYear() + 543;
// console.log("monthsInThai",currentMonth.getMonth())
// console.log("buddhistEra",buddhistEra)
  var months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  const [allscores, setallscores] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PreviousMonthCount, setPreviousMonthCount] = useState(
    new Date().getMonth() - 1
  );
  const [NextMonthCount, setNextMonthCount] = useState(
    new Date().getMonth() + 1
  );
  const [currentMonthCount, setCurrentMonthCount] = useState(
    new Date().getMonth() 
  ); //monthcurrent
  const [currentYear, setcurrentYear] = useState(
    new Date().getFullYear() + 543
  ); //yearcurrent
  const [nextyear, setnextyear] = useState(
    months[NextMonthCount] === "มกราคม" ? currentYear + 1 : currentYear
  );
  const [Previousyear, setPreviousyear] = useState(
    months[PreviousMonthCount] === "ธันวาคม" ? currentYear - 1 : currentYear
  );
  // console.log("Previousyear",monthsInThai[currentMonth.getMonth() - 1] === undefined ? monthsInThai[0] : monthsInThai[currentMonth.getMonth() - 1])
  
  // console.log("nextyear",monthsInThai[currentMonth.getMonth() + 1] === undefined ? monthsInThai[0] : monthsInThai[currentMonth.getMonth() + 1])
// console.log("currentMonthCount",currentMonthCount,"currentYear",currentYear)
  //ถัดไป
  const handlePreviousMonthClick = () => {
    setPreviousMonthCount(
      PreviousMonthCount - 1 < 0 ? 11 : PreviousMonthCount - 1 
    );
    setNextMonthCount(NextMonthCount + 1 < 0 ? 11 : NextMonthCount - 1);
    setCurrentMonthCount(
      currentMonthCount - 1 < 0 ? 11 : currentMonthCount - 1
    );
    setPreviousyear(
      months[PreviousMonthCount] === "มกราคม" ? Previousyear - 1 : Previousyear
    );
    setnextyear(months[NextMonthCount] === "มกราคม" ? nextyear - 1 : nextyear);
    setcurrentYear(currentMonthCount - 1 < 0 ? currentYear - 1 : currentYear);
  };

  //ย้อนกลับ
  const handleNextMonthClick = () => {
    setNextMonthCount(NextMonthCount + 1 > 11 ? 0 : NextMonthCount + 1);
    setPreviousMonthCount(
      PreviousMonthCount + 1 > 11 ? 0 : PreviousMonthCount + 1
    );
    setCurrentMonthCount(
      currentMonthCount + 1 > 11 ? 0 : currentMonthCount + 1
    );
    setnextyear(months[NextMonthCount] === "ธันวาคม" ? nextyear + 1 : nextyear);
    setPreviousyear(
      months[PreviousMonthCount] === "ธันวาคม" ? Previousyear + 1 : Previousyear
    );
    setcurrentYear(currentMonthCount + 1 > 11 ? currentYear + 1 : currentYear);
  };
  
  useEffect(() => {
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL + `/getalldataTestscores/${currentMonth.getMonth()}/${buddhistEra}`,
      headers: { 
        'authtoken': 'bearer '+ token
      }
    };

    Axios(config)
      .then((res) => {
        setallscores(res.data);
        // console.log("data :", res.data);
      })
      .catch ((err) => {
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
        console.log("getPubrelContents: ",err)
      })
  }, [currentMonth.getMonth(), buddhistEra]);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  // console.log("PreviousMonthCount",PreviousMonthCount)
  // console.log("Previousyear",Previousyear)
// console.log("allscores",allscores)

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      headerAlign: "center",
      width: 100,
      align: "center",
      valueGetter: (params) =>
        params.api.getRowIndex(params.row.testresvcode) + 1,
    },
    {
      field: "tbtestreservation.testrequnit",
      headerName: "หน่วยงาน",
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "tbtestreservation.testappvcode",
      headerName: "รหัสการทดสอบ",
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "testresvcode",
      headerName: "รหัสการจอง",
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "tbtestreservation.testreqdate",
      headerName: "วันที่จอง",
      headerAlign: "center",
      width: 250,
      align: "center",
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {moment(params.value).add(543, "year").format("ll")}
          </div>
        );
      },
    },
    {
      field: "tbtestreservation.testreqtime",
      headerName: "เวลาที่จอง",
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "management",
      headerName: "การจัดการ",
      headerAlign: "center",
      width: 250,
      align: "center",
      renderCell: (params) => {
        // console.log("testresultapprvdate", params.row.testresultapprvdate);
  
        return (
          <strong>
            <ThemeProvider theme={theme}>
              <Link
                to="/ContentPageTestScores"
                style={{ textDecoration: "none" }}
                state={{
                  testresultcode: params.row["testresultcode"],
                  testresvcode: params.row.testresvcode,
                  testreqdate: params.row["tbtestreservation.testreqdate"],
                  testreqtime: params.row["tbtestreservation.testreqtime"],
                  currentMonthCount:currentMonthCount,
                  currentYear:currentYear,
                  PreviousMonthCount:PreviousMonthCount,
                  Previousyear:Previousyear,
                  NextMonthCount:NextMonthCount,
                  nextyear:nextyear
                }}
              >
                <Button
                  variant="outlined"
                  color="third"
                  size="small"
                  style={{ marginLeft: 16 }}
                  // currentMonthCount={currentMonthCount}
                  // currentYear={currentYear}
                >
                  เข้าดูรายชื่อ
                </Button>
              </Link>
              {params.row.testresultapprv === null ?( <FiberNewIcon className="New_Tag"></FiberNewIcon> ) : ""}
             
            </ThemeProvider>
          </strong>
        );
      },
     
    },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handlePreviousYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  return (
    <>
      <br></br>
      {/* {
        USR05 === '0' && USR04 === '0' && USR01 === '1' ? 

:

      } */}
       {/* <div>
       <button onClick={previousMonth}>ก่อนหน้า</button>
      <div>เดือนก่อนหน้า: {monthsInThai[currentMonth.getMonth() - 1] || 'ไม่มี'}</div>
      <button onClick={nextMonth}>ถัดไป</button>
      <div>เดือนปัจจุบัน: {monthsInThai[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
      <button onClick={nextMonth}>ถัดไป</button>
      <div>เดือนถัดไป: {monthsInThai[currentMonth.getMonth() + 1] || 'ไม่มี'}</div>
      <div>พ.ศ. ปัจจุบัน: {buddhistEra}</div>
  </div> */}
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 35, fontWeight: 500 }}>
          <b>ข้อมูลผลคะแนนการทดสอบ</b>
        </Box>
      </Typography>
      <DrawerHeader />
      {/* <p>{`${currentDate.getFullYear() + 543} - ${thaiMonths[currentDate.getMonth() - 1] === undefined ? 'ธันวาคม' : thaiMonths[currentDate.getMonth() - 1]}`}</p>
      <p>{`${currentDate.getFullYear() + 543} - ${thaiMonths[currentDate.getMonth()]}`}</p>
      <p>{`${currentDate.getFullYear() + 543} - ${thaiMonths[currentDate.getMonth() + 1] === undefined ? 'มกราคม' : thaiMonths[currentDate.getMonth() + 1]}`}</p>
      <button onClick={handlePreviousYear}>Previous Year</button>
      <button onClick={handlePreviousMonth}>Previous Month</button>
      <button onClick={handleNextYear}>Next Year</button>
      <button onClick={handleNextMonth}>Next Month</button> */}
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="delete"
            size="large"
            // onClick={handlePreviousMonthClick}
            onClick={previousMonth}
            // onClick={handlePreviousMonth}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="subtitle1" gutterBottom>
          {/* {`${currentDate.getFullYear() + 543}  ${thaiMonths[currentDate.getMonth() - 1] === undefined ? 'ธันวาคม' : thaiMonths[currentDate.getMonth() - 1]}`} */}
            {/* {months[PreviousMonthCount]} {Previousyear} */}
            {monthsInThai[currentMonth.getMonth() - 1] === undefined ? 'ธันวาคม' : monthsInThai[currentMonth.getMonth() - 1]} {buddhistEra}
            {/* {monthsInThai[currentMonth.getMonth() - 1]} {buddhistEra} */}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
          {/* {`${currentDate.getFullYear() + 543}  ${thaiMonths[currentDate.getMonth() + 1] === undefined ? 'มกราคม' : thaiMonths[currentDate.getMonth() + 1]}`} */}
            {/* {months[NextMonthCount]} {nextyear} */}
            {monthsInThai[currentMonth.getMonth() + 1] === undefined ? 'มกราคม' : monthsInThai[currentMonth.getMonth() + 1]} {buddhistEra}
            {/* {monthsInThai[currentMonth.getMonth() + 1]} {buddhistEra}  */}
          </Typography>
          <IconButton
            aria-label="delete"
            size="large"
            // onClick={handleNextMonthClick}
            onClick={nextMonth}
            // onClick={handleNextMonth}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
      <br></br>
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <Link
            to="/ContentListScores"
            style={{ textDecoration: "none", padding: "2px" }}
          >
            <Button variant="outlined" startIcon={<PersonIcon />}>
              ดูผลคะแนนตามรายการทดสอบ
            </Button>
          </Link>

          <Link
            to="/ContentListDivisionScores"
            style={{ textDecoration: "none", padding: "2px" }}
          >
            <Button variant="outlined" startIcon={<PersonIcon />}>
              ดูผลคะแนนตามหน่วยงาน
            </Button>
          </Link>
          <Link
            to="/ContentIndividualScores"
            style={{ textDecoration: "none", padding: "2px" }}
          >
            <Button variant="outlined" startIcon={<PersonIcon />}>
              ดูผลคะแนนรายบุคคล
            </Button>
          </Link>
        </Box>
        <br></br>

        <DataGrid
          getRowId={(row) => row.testresvcode}
          rows={allscores}
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
          // components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
      <DrawerHeader />
      {/* <Footer /> */}
    </>
  );
}

export default PageTestScores;
