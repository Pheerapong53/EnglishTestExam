/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Link,useLocation  } from "react-router-dom";
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { blue, red, yellow } from "@mui/material/colors";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify'
import moment from "moment";
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  
  // const rows = [
  //   { id: '1', agency: "ศซว.ทอ." ,testcode:'xxxxxxxxxx',bookingcode:'xxxxx',bookingdate:'1 ก.พ.65',bookingtime:'9.00 น.' },
    
  // ];

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

function ContentListScores({ history }) {
    // const [age, setAge] = React.useState('');
    const [data, setData] = useState('');
    const location = useLocation();
    // const { testscoringcriteria} = location.state;
    const navigate = useNavigate();
    const {user} = useSelector((state) => ({...state}))
    const token = user.user.token;
    const [alerts, setAlerts] = useState(false)
    const [mission, setMission] = React.useState([]);
    const [selectMission,setselectMission] = React.useState("")
    const [selectAllList,setSelectAllList] = React.useState([])
    const selectMissions = selectMission === "ราชการต่างประเทศ (ด้านการบิน)" ? "SCC1" : selectMission === "ราชการต่างประเทศกรณีอื่นๆ" ? "SCC2" : selectMission === "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ." ? "SCC3" : selectMission === "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ" ? "SCC4" : selectMission === "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ." ? "SCC5": selectMission === "ทดสอบภาษาอังกฤษประจำปี" ? "SCC6" : ''
    const dispatch = useDispatch();


const resultMap = new Map();

selectAllList.forEach(item => {
  const testresvcode = item.testresvcode;
  if (!resultMap.has(testresvcode)) {
    resultMap.set(testresvcode, item);
  }
});

const uniqueData = [...resultMap.values()];
// console.log("uniqueData",uniqueData)
    useEffect(() => {
    // const selectMissions = selectMission === "ราชการต่างประเทศ (ด้านการบิน)" ? "SCC1" : selectMission === "ราชการต่างประเทศกรณีอื่นๆ" ? "SCC2" : selectMission === "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ." ? "SCC3" : selectMission === "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ" ? "SCC4" : selectMission === "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ." ? "SCC5": selectMission === "ทดสอบภาษาอังกฤษประจำปี" ? "SCC6" : ''
if(selectMissions === ''){
  toast.error("กรุณาเลือกภารกิจ");
}else{
  var config = {
    method: 'GET',
    url: process.env.REACT_APP_API_URL +`/getalldataTestscoresall/${selectMissions}`,
    headers: { 
      'authtoken': 'bearer '+ token
    }
  };

  // console.log("URL: ", config.url);
  // console.log("selectMissions: ", selectMissions);
  Axios(config)
    .then((res) => {
      setSelectAllList(res.data);
      // console.log("data :", res.data);
    })
    .catch ((err) => {
      if(err.response.status === 401) {
        dispatch(logout());
        navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
      } 
      else if(err.response.status === 404) {
        dispatch(logout());
        navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
      }
      console.log("getPubrelContents: ",err)
    })
}
    }, [selectMissions]);

    // console.log("data :", selectAllList);
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));

      
//  console.log("selectAllListsss :", selectAllList.length === 0 ? selectAllList : location.pathname === '/ContentListScores' ? location.state?.selectAllListsss : selectAllList);
//  console.log("selectAllList :", selectAllList);
// console.log("selectAllList", selectAllList  )

 
      
      useEffect(() => {
        var config = {
          method: 'GET',
          url: process.env.REACT_APP_API_URL +`/getTbtestscoringcriteria`,
          headers: { 
            'authtoken': 'bearer '+ token
          }
        };

        Axios(config)
          .then((res) => {
            setMission(res.data);
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
        {field: "id", headerName: "ลำดับ", width: 50 ,
        valueGetter: (params) => params.api.getRowIndex(params.row.testresultcode) + 1, align: "center", headerAlign: "center",},
        { field: "tbtestreservation.testrequnit", headerName: "หน่วยงาน", width: 200 ,
        align: "center",headerAlign: "center",},
        { field: "tbtestreservation.testappvcode", headerName: "รหัสการทดสอบ", width: 220 ,
        align: "center",headerAlign: "center",},
        { field: "testresvcode", headerName: "รหัสการจอง", width: 220 ,
        align: "center",headerAlign: "center",},
        { field: "tbtestreservation.testreqdate", headerName: "วันที่จอง", width: 220 ,
        align: "center",headerAlign: "center",
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
        },},
        { field: "tbtestreservation.testreqtime", headerName: "เวลาที่จอง", width: 220 ,
        align: "center",headerAlign: "center",},
        {field: "management",headerName: "การจัดการ",width: 220, align: "center",headerAlign: "center",renderCell: (params) => (
          <strong>
    
    <ThemeProvider theme={theme}>
    <Link to="/ContentPageListTestScores" state={{ 
                      testresultcode: params.row["testresultcode"],
                      testresvcode: params.row.testresvcode,
                      testreqdate: params.row["tbtestreservation.testreqdate"],
                      testreqtime: params.row["tbtestreservation.testreqtime"],
                      testscoringcriteria:params.row["tbtestreservation.testscoringcriteria"],
                      selectAllListsss:selectAllList
                    }}  
                      
    
                      style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="third"
            size="small"
            style={{ marginLeft: 16 }}
          >
            เข้าดูรายชื่อ
          </Button>
          </Link>
          {/* <FiberNewIcon className="New_Tag"  /> */}
          {params.row.testresultapprv === null ?( <FiberNewIcon className="New_Tag"></FiberNewIcon> ) : ""}
        </ThemeProvider>
        
    
          </strong>
          
        ),},
      ];


  return (
    <>
     {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
      
     <br></br>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 35, fontWeight: 500 }}>
        <b>ข้อมูลผลคะแนนการทดสอบ</b>
        </Box>
      </Typography>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          ดูผลคะแนนตามรายการทดสอบ
        </Box>
      </Typography>
    
      <Box sx={{display: 'flex',justifyContent: 'center'}}>
        <Box sx={{margin:'10px'}}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="demo-simple-select-label">ชื่อรายการทดสอบ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={selectMission}
              // defaultValue={location.state?.testscoringcriteria === "SCC1" ? "ราชการต่างประเทศ (ด้านการบิน)" : location.state?.testscoringcriteria === "SCC2" ? "ราชการต่างประเทศกรณีอื่นๆ" : location.state?.testscoringcriteria === "SCC3" ? "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ." : location.state?.testscoringcriteria === "SCC4" ? "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ" : location.state?.testscoringcriteria === "SCC5" ? "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ.": location.state?.testscoringcriteria === "SCC6" ? "ทดสอบภาษาอังกฤษประจำปี" : ''}
              label="ชื่อรายการทดสอบ"
              onChange={(e) => setselectMission(e.target.value)}
            >
              {
                mission.map((missions) => (
                  <MenuItem value={missions.mission} key={missions.mission}>{missions.mission}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
        {/* <Box sx={{margin:'10px'}}>
          <Button variant="contained"  sx={{
                minWidth: 100,
                minHeight: 55,
                fontSize: 16,
              }}
              onClick={() => SubmitSelect()}
              >
            ตกลง
          </Button>
        </Box> */}
    </Box>
    <br />
      <Link to="/PageTestScores" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
        </Link>
      <div style={{ height: 400, width: "100%" }}>
        
        <DataGrid
         getRowId={(row) => row.testresultcode}
          rows={uniqueData}
          // rows={selectAllList.length >= 0 ? selectAllList : location.state?.selectAllListsss}
          // rows={location.pathname === '/ContentListScores' ? location.state?.selectAllListsss : selectAllList.length === 0 ? selectAllList : ''}
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
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
    </>
  )
}

export default ContentListScores