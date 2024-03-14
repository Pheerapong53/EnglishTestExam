/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { logout } from "../../src/store/userSilce";
import {useDispatch } from 'react-redux'
function getFullName(params) {
  return `${params.row.mem_rank || ""} ${
    params.row.mem_fname|| ""
  } ${params.row.mem_lname || ""}`;
}
const columns = [
    {field: "id", headerName: "ลำดับ", width: 100 ,headerAlign: "center",align: "center",valueGetter: (params) => params.api.getRowIndex(params.row.testresultcode) + 1},
    { field: "pers_id", headerName: "เลขประจำตัว",headerAlign: "center", width: 300 ,align: "center"},
    { field: "mem_affiliation", headerName: "หน่วยงาน",headerAlign: "center", width: 300,align: "center" },
    { field: "Fullname", headerName: "ยศ ชื่อ นามสกุล",headerAlign: "center", width: 450,align: "center", valueGetter: getFullName },
    { field: "management", headerName: "การจัดการ",headerAlign: "center", width: 250 ,align: "center", renderCell: (params) => {
        // console.log("testresultapprvdate", params.row.testresultapprvdate);
        // console.log("params",params.row)
        return (
          <>
          <Link to="/ContentViewTestScores" style={{ textDecoration: "none" }}
          state={{
            pers_id: params.row.pers_id,
            mem_rank: params.row.mem_rank,
            mem_fname: params.row.mem_fname,
            mem_lname: params.row.mem_lname,
            // official_id : params.row.official_id
            // mem_email : params.row["mem_email"],
            // mem_affiliation :params.row["mem_affiliation"]
          }}
          
          
          >
          <Button variant="contained">
         ดูผลคะแนนการทดสอบ
       </Button>
          </Link>
         </>
        );
      },},
   
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
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    );
  }

function ContentIndividualScores() {
  const [gettbtestresult, setgettbtestresult] = useState([]);
  const [gettbmemberinfo, setgettbmemberinfo] = useState([]);
  const [gettbtestreservation, setgettbtestreservation] = useState([]);
  const { user } = useSelector((state) => ({...state}))
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = user.user.token;
  const userRole = user.user.userRole;
  const USR01 = userRole[0].status
  const USR02 = userRole[1].status
  const USR03 = userRole[2].status
  const USR04 = userRole[3].status
  const USR05 = userRole[4].status
  const orgname = user.user.orgname;

  // console.log("user",user.user.orgname)
  // console.log("gettbmemberinfo",gettbmemberinfo)
  // console.log("gettbtestreservation",gettbtestreservation)

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

// console.log("scoremember",scoremember)
// console.log("uniqueDataArray",uniqueDataArray)
// const searchWord = 'ศซว.ทอ.';
// const filteredArray = scoremember.filter(obj => obj["tbmember.tbmemberinfos.mem_affiliation"]?.includes(orgname));
// console.log("filteredArray",filteredArray);
// console.log("filteredArray",filteredArray);


let joinedData = [];

// สร้าง Map เพื่อเก็บข้อมูลจาก objectgettbmemberinfo โดยใช้ meminfo_id เป็น key
let memberInfoMap = new Map();
gettbmemberinfo.forEach(memberInfo => {
  memberInfoMap.set(memberInfo.meminfo_id, memberInfo);
});

// วนลูปผ่าน objectgettbtestresult เพื่อ join ข้อมูล
gettbtestresult.forEach(testResult => {
  let meminfo_id = testResult.meminfo_id;
  
  // ตรวจสอบว่ามีข้อมูลของ meminfo_id นี้ใน objectgettbmemberinfo หรือไม่
  if (memberInfoMap.has(meminfo_id)) {
    // ถ้ามี ให้รวมข้อมูลจากทั้งสองออบเจกต์
    let joinedItem = {
      ...testResult,
      ...memberInfoMap.get(meminfo_id)
    };
    joinedData.push(joinedItem);
  }
});

// console.log("joinedData",joinedData);


const uniqueDataMap = new Map();
joinedData.forEach(item => {
  const pers_id = item.pers_id;
  if (!uniqueDataMap.has(pers_id)) {
    uniqueDataMap.set(pers_id, item);
  }
});

// แปลงข้อมูลใน Map กลับเป็น array
const uniqueDataArray = Array.from(uniqueDataMap.values());

// console.log("uniqueDataArray",uniqueDataArray);
const filteredData = uniqueDataArray.filter(item => item.mem_affiliation === user.user.orgname);
// console.log("filteredData",filteredData);




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
      {/* <DrawerHeader /> */}
      <br></br>
     
        
      <div style={{ height: 600, width: "100%" }}>
      <Box sx={{ display: "flex" }}>
      <Link to="/PageTestScores" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
         
        </Link>
        </Box>
          <br></br>
        <DataGrid 
         getRowId={(row) => row.testresultcode}
        //  rows={uniqueDataArray}
        // filteredData
        // rows={uniqueDataArray}
        // rows={USR02 === '1' ? uniqueDataArray : uniqueArray}
          rows={USR02 === '1' ? filteredData : uniqueDataArray}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterLogicOperator: GridLinkOperator.Or,
              },
            },
          }}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
    </>
  )
}

export default ContentIndividualScores