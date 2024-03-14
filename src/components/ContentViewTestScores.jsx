/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { blue, red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModalTestPass from "../components/ModalTestPass";
import Axios from "axios";
import moment from "moment";
import { useSelector } from 'react-redux'
import { logout } from "../../src/store/userSilce";
import {useDispatch } from 'react-redux'
import PrintTestScore from "../components/PrintTestScore";
require("moment/locale/th");


const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
    third: {
      main: blue[800],
    },
  },
});



const rows = [
  {
    id: "1",
    bookcode: "0000000000",
    testcode: "xxxxxxxxxx",
    bookdate: "1 ก.พ.65",
    reason: "ศึกษา ตปท.",
    test: "ไม่เข้าสอบ",
    score: "60",
  },
];
function QuickSearchToolbar() {



 
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

function ContentViewTestScores() {
  const location = useLocation();
// console.log("location",location)
  const [toscoreresvcode, settoscoreresvcode] = useState([]);
  const [testresultapprv, Settestresultapprv]= useState("")
  const navigate = useNavigate();
  const { pers_id, mem_rank, mem_fname, mem_lname ,testresvcode, testreqdate, testreqtime, testresultcode,mem_email,mem_affiliation,} = location.state;
  const [scoremember, setallscores] = useState([]);
  const [dateappove, setdatttappo] = useState("");
  const yearCurrent = parseInt(moment(new Date()).add(543, "year").format("YY"))
  const monthappov = parseInt(dateappove.substring(5, 7))
  const dateappov = parseInt(dateappove.substring(8, 10))
  const yearappov = parseInt(moment(dateappove).add(543, "year").format("YY"))
  const monthCurrent = parseInt(new Date().toISOString().substring(5, 7))
  const dateCurrent = parseInt(new Date().toISOString().substring(8, 10))
  let difmonth = Math.abs(monthCurrent - monthappov)
  let difday = Math.abs(dateCurrent - dateappov)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({...state}))
  const token = user.user.token;
  const userRole = user.user.userRole;
  const USR01 = userRole[0].status
  const USR02 = userRole[1].status
  const USR03 = userRole[2].status
  const USR04 = userRole[3].status
  const USR05 = userRole[4].status
  const orgname = user.user.orgname;
  const pers_idIndi = user.user.official_id;
  const rankIndi = user.user.rank;
  const fnameIndi = user.user.fname;
  const lnameIndi = user.user.lname;

  const [gettbtestresult, setgettbtestresult] = useState([]);
  const [gettbmemberinfo, setgettbmemberinfo] = useState([]);
  const [gettbtestreservation, setgettbtestreservation] = useState([]);
  const [gettbtestscoringcriteria, setgettbtestscoringcriteria] = useState([]);
// const sssss = user.user.pers_id

  // console.log("pers_id :", sssss.length);
  // console.log("gettbmemberinfo :", gettbmemberinfo);


// สร้าง Map เพื่อเก็บข้อมูลจาก data2 โดยใช้ meminfo_id เป็น key
const data2Map = new Map();
gettbmemberinfo.forEach(item => {
  data2Map.set(item.meminfo_id, item);
});

// วนลูปผ่าน data1 เพื่อ join ข้อมูล
const joinedData = gettbtestresult.map(item => {
  const meminfo_id = item.meminfo_id;
  if (data2Map.has(meminfo_id)) {
    return { ...item, ...data2Map.get(meminfo_id) };
  } else {
    return item;
  }
});


// สร้าง Map เพื่อเก็บข้อมูลจาก data2 โดยใช้ testresvcode เป็น key
const data2Maps = new Map();
gettbtestreservation.forEach(item => {
  data2Map.set(item.testresvcode, item);
});

// วนลูปผ่าน data1 เพื่อ join ข้อมูล
const joinedDatas = joinedData.map(item => {
  const testresvcode = item.testresvcode;
  if (data2Map.has(testresvcode)) {
    return { ...item, ...data2Map.get(testresvcode) };
  } else {
    return item;
  }
});

// สร้าง Map เพื่อเก็บข้อมูลจาก array2 โดยใช้ scoringcriteriacode เป็น key
const array2Mapss = new Map();
gettbtestscoringcriteria.forEach(item => {
  array2Mapss.set(item.scoringcriteriacode, item);
});

// Join ข้อมูล
const joinedDatass = joinedDatas.map(item => {
  const testscoringcriteria = item.testscoringcriteria;
  if (array2Mapss.has(testscoringcriteria)) {
    return { ...item, ...array2Mapss.get(testscoringcriteria) };
  } else {
    return item;
  }
});

const filteredData = joinedDatass.filter(item => item.pers_id === pers_id || item.pers_id === user.user.pers_id);

// console.log("filteredData",filteredData);

// console.log("joinedDatas",joinedDatas);
// console.log("gettbtestscoringcriteria",gettbtestscoringcriteria);

// console.log("joinedData",joinedData);
// console.log("gettbtestreservation",gettbtestreservation);

  // console.log("gettbtestreservation :", gettbtestreservation);
  // console.log("gettbtestscoringcriteria :", gettbtestscoringcriteria);

  useEffect(() => {
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL + `/gettbtestresult`,
      headers: { 
        'authtoken': 'bearer '+ token
      }
    };

    Axios(config)
      .then((res) => {
        setgettbtestresult(res.data);
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
  }, []);

  useEffect(() => {
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL + `/gettbmemberinfo`,
      headers: { 
        'authtoken': 'bearer '+ token
      }
    };

    Axios(config)
      .then((res) => {
        setgettbmemberinfo(res.data);
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
  }, []);

  useEffect(() => {
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL + `/gettbtestreservation`,
      headers: { 
        'authtoken': 'bearer '+ token
      }
    };

    Axios(config)
      .then((res) => {
        setgettbtestreservation(res.data);
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
  }, []);


  useEffect(() => {
    var config = {
      method: 'GET',
      url: process.env.REACT_APP_API_URL + `/gettbtestscoringcriteria`,
      headers: { 
        'authtoken': 'bearer '+ token
      }
    };

    Axios(config)
      .then((res) => {
        setgettbtestscoringcriteria(res.data);
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
  }, []);


  
  


  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      width: 50,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) =>
      params.api.getRowIndex(params.row.testresultcode) + 1,
    },
    {
      field: "testresvcode",
      headerName: "รหัสการจอง",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "testappvcode",
      headerName: "รหัสการทดสอบ",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bookdate",
      headerName: "วันที่จอง",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {moment(params.row.testreqdate).add(543, "year").format("ll")}
          </div>
        );
      },
    },
    {
      field: "mission",
      headerName: "เหตุผลขอรับการทดสอบ",
      width: 220,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "test",
      headerName: "เข้าสอบ/ไม่เข้าสอบ",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
        {/* {params.row["tbtestreservation.testreqdate"] ===
        params.row["testconductdate"] ? ( */}
         {
        params.row["testconductdate"] === null ? (
          <div style={{ color: "#A50000", fontWeight: "bold" }}>
          ไม่เข้าสอบ
        </div>
          
        ) : (
          <div style={{ color: "#018822", fontWeight: "bold" }}>เข้าสอบ</div>
        )}
      </>
      ),
    },
    {
      field: "realscore",
      headerName: "คะแนน",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "editscore",
      headerName: "แก้ไขคะแนน",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <FormControl fullWidth>
           <Typography variant="body2" gutterBottom>
       {params.row.editscore}
      </Typography>
          {/* <TextField id="outlined-basic" variant="outlined" value={params.row.editscore} /> */}
        </FormControl>
      ),
    },
    {
      field: "pass",
      headerName: "ผ่าน/ไม่ผ่าน",
      align: "center",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => (
        <strong>
          <ModalTestPass
            sx={{ cursor: "pointer" }}
            minscore={
              params.row.minscore

            }
            realscore={params.row.realscore}
            testconductdate={params.row.testconductdate}
            submittime={params.row.submittime}
            editscore={params.row.editscore}
            realscoredate={params.row.realscoredate}
          />
        </strong>
      ),
    },
    {
      field: "exp",
      headerName: "หมดอายุ/ไม่หมดอายุ",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        // console.log(params.row)
        const resultyear =  parseInt(params.row.testreqdate.substring(0, 4), 10) + 543;
        const numberAsStringresultyear = resultyear.toString();
        const yearappovs = parseInt(numberAsStringresultyear.slice(-2), 10);

        const resultmonth =  parseInt(params.row.testreqdate.substring(5, 7), 10);
        // const numberAsStringresultmonth = resultmonth.toString();
        // const monthppovs = parseInt(numberAsStringresultmonth.slice(-2), 10);

        const resultday =  parseInt(params.row.testreqdate.substring(8, 10), 10);
        // const numberAsStringresultday = resultday.toString();
        // const dayppovs = parseInt(numberAsStringresultday.slice(-2), 10);
        // console.log(yearCurrent - yearappovs)

        return (
<strong>
  
  <ThemeProvider theme={theme}>
     {yearCurrent - yearappovs >= 1  && monthCurrent - resultmonth >= 0 && dateCurrent - resultday >= 0 ?
     <Chip label="หมดอายุ" color="primary" /> : dateappove === "0000-00-00" ?
     <Chip label="รอการอนุมัติผลคะแนน" color="secondary" /> : 
     <Chip label="ไม่หมดอายุ" color="secondary" />
     }
 </ThemeProvider>
</strong>
        )
        
      },
    },
    {
      field: "print",
      headerName: "พิมพ์",
      align: "center",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        // console.log("params" ,params.row)
        // console.log('testreqdate',params.row["tbtestreservation.testreqdate"])
        return (
<strong> 
          {/* <PrintIcon /> */}
          <PrintTestScore
              pers_id={pers_id.length !== 13 ? user.user.pers_id : pers_id}
              // mem_rank={params.row["mem_rank"]}
              // mem_fname={params.row["mem_fname"]}
              // mem_lname={params.row["mem_lname"]}
               mem_rank={mem_rank}
              mem_fname={mem_fname}
              mem_lname={mem_lname}
              testconductdate={params.row["testconductdate"]}
              mem_affiliation={params.row["mem_affiliation"]}
              mission={
                params.row["mission"]
              }
              testresultapprvdate={params.row["testresultapprvdate"]}
              minscore={
                params.row["tbtestreservation.tbtestscoringcriterium.minscore"]
              }
              realscore={params.row["realscore"]}
              editscore={params.row["editscore"]}
              testresultapprv={params.row["testresultapprv"]}
              mem_email={params.row["mem_email"]}
              testappvcode={params.row["tbtestreservation.testappvcode"]}
              dateappove={params.row['testindvappvdate']}
              testreqdate={params.row['testreqdate']}
            />
        </strong>
        )

      }
       
        
      ,
    },
  ];



  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <>
      <br></br>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 35, fontWeight: 500 }}>
          <b>ข้อมูลผลคะแนนการทดสอบ </b>
        </Box>
      </Typography>
     
      <br></br>
      <Box sx={{ textAlign: "center", fontSize: 18 }}>
        <b>
          เลขประจำตัวประชาชน {pers_id.length !== 13 ? user.user.pers_id : pers_id} ชื่อ {mem_rank}
          {mem_fname} {mem_lname}
        </b>
      </Box>
      <br></br>
      <div style={{ height: 400, width: "100%" }}>
        {USR05 === '0' && USR04 === '0' && USR01 === '1' ? "" : <Box sx={{ display: "flex" }}>
          <Link
            to="/ContentIndividualScores"
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              BACK
            </Button>
          </Link>
        </Box>}
        {/* <Box sx={{ display: "flex" }}>
          <Link
            to="/ContentIndividualScores"
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              BACK
            </Button>
          </Link>
        </Box> */}
        <br></br>
        <DataGrid
        getRowId={(row) => row.testresultcode}
          rows={filteredData}
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
       
        />
      </div>
    </>
  );
}

export default ContentViewTestScores;
