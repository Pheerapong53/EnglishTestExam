/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect ,useState} from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { blue, red, yellow } from "@mui/material/colors";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from "moment";
import Axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { logout } from "../../src/store/userSilce";
import {useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
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

function ContentListDivisionScores() {
    const [company, setCompany] = React.useState('');
    const navigate = useNavigate();
    const [alerts, setAlerts] = React.useState(false)
    const [selectAllList,setSelectAllList] = React.useState([])
    const { user } = useSelector((state) => ({...state}))
    const token = user.user.token;
    const userRole = user.user.userRole;
    const USR01 = userRole[0].status
    const USR02 = userRole[1].status
    const USR03 = userRole[2].status
    const USR04 = userRole[3].status
    const USR05 = userRole[4].status
    const orgname = user.user.orgname;
    const dispatch = useDispatch();

    const resultMap = new Map();

    selectAllList.forEach(item => {
      const testresvcode = item.testresvcode;
      if (!resultMap.has(testresvcode)) {
        resultMap.set(testresvcode, item);
      }
    });
    
    const uniqueData = [...resultMap.values()];

    const handleChange = (event) => {
      // if(USR04 === "0" && USR05 === "0" && USR02 === "1" ){
      //   setCompany();
      // }
      setCompany(event.target.value);
    };
// console.log("orgname",orgname)
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));

    //   const Companys = [
    //     "กง.ทอ.",
    // "กบ.ทอ.",
    // "กพ.ทอ.",
    // "กร.ทอ.",
    // "ขว.ทอ.",
    // "ขส.ทอ.",
    // "คปอ.",
    // "จร.ทอ.",
    // "ชย.ทอ.",
    // "ชอ.ทอ.(ดอนเมือง)",
    // "ชอ.ทอ.(บางซื่อ)",
    // "ทสส.ทอ.",
    // "บก.ทอ.",
    // "พธ.ทอ.",
    // "พอ.",
    // "ยก.ทอ.",
    // "ยศ.ทอ.",
    // "รร.นนก.",
    // "ศวอ.ทอ.",
    // "สก.ทอ.",
    // "สตน.ทอ.",
    // "สธน.ทอ.",
    // "สน.ผบ.ดม",
    // "สนภ.ทอ.",
    // "สบ.ทอ.",
    // "สปช.ทอ.",
    // "สพ.ทอ.",
    // "สลก.ทอ.",
    // "สวบ.ทอ.",
    // "สอ.ทอ.",
    // "อย.",
    // "บน.1",
    // "บน.2",
    // "บน.3",
    // "บน.4",
    // "บน.5",
    // "บน.6",
    // "บน.7",
    // "บน.21",
    // "บน.23",
    // "บน.41",
    // "บน.46",
    // "บน.56",
    // "สถานีรายงาน",
    // "ศซว.ทอ.",
    // "ศซบ.ทอ.",
    // "รร.การบิน",
    // "สพร.ทอ.",
    // "ศปอว.ทอ.",
    // "สำนักงานการบิน ทอ.",
    // "สยล.ทอ.",
    // "สง.ปรมน.ทอ.",
    // "ศูนย์อำนวยการเครื่องบินพระราชพาหนะ",
    // "ศูนย์อำนวยการเฮลิคอปเตอร์พระราชพาหนะ",
    // "ศูนย์การสงครามทางอากาศ",
    // "สคม.ทอ."
    //   ];

    const Companys = [
      "ศบพ.",
      "ศฮพ.",
      "ศกอ.",
      "สพร.ทอ.",
      "สคม.ทอ.",
      "สลก.ทอ.",
      "สบ.ทอ.",
      "กพ.ทอ.",
      "ขว.ทอ.",
      "ยก.ทอ.",
      "กบ.ทอ.",
      "กร.ทอ.",
      "ทสส.ทอ.",
      "สปช.ทอ.",
      "กง.ทอ.",
      "จร.ทอ.",
      "สตน.ทอ.",
      "สนภ.ทอ.",
      "สธน.ทอ.",
      "ศซบ.ทอ.",
      "สบน.ทอ.",
      "คปอ.ทอ.",
      "อย.",
      "รร.การบิน",
      "บน.1",
      "บน.2",
      "บน.3",
      "บน.4",
      "บน.5",
      "บน.7",
      "บน.6",
      "บน.23",
      "บน.21",
      "บน.41",
      "บน.46",
      "บน.56",
      "ศปอว.ทอ.",
      "พธ.ทอ.",
      "ชอ.",
      "สอ.ทอ.",
      "สพ.ทอ.",
      "พอ.",
      "ขส.ทอ.",
      "ชย.ทอ.",
      "ศซว.ทอ.",
      "ยศ.ทอ.",
      "รร.นนก.",
      "ศวอ.ทอ.",
      "สก.ทอ.",
      "สน.ผบ.ดม.",
      "สวบ.ทอ.",
    ];
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
<Link to="/ContentPageListTestScoresDivision" style={{ textDecoration: "none" }}  state={{
                      testresultcode: params.row["testresultcode"],
                      testresvcode: params.row.testresvcode,
                      testreqdate: params.row["tbtestreservation.testreqdate"],
                      testreqtime: params.row["tbtestreservation.testreqtime"],
                      testrequnit : params.row["tbtestreservation.testrequnit"],
                    }}>
      <Button
        variant="outlined"
        color="third"
        size="small"
        style={{ marginLeft: 16 }}
      >
        เข้าดูรายชื่อ
      </Button>
      </Link>
      {/* {params.row.testresultapprv === null ?( <FiberNewIcon className="New_Tag"></FiberNewIcon> ) : ""}
      <FiberNewIcon className="New_Tag"  /> */}
      {params.row.testresultapprv === null ?( <FiberNewIcon className="New_Tag"></FiberNewIcon> ) : ""}
    </ThemeProvider>
    

      </strong>
            );
          },
         
        },
      ]; 
        // const rows = [
        //   { id: '1', agency: "ศซว.ทอ." ,testcode:'xxxxxxxxxx',bookingcode:'xxxxx',bookingdate:'1 ก.พ.65',bookingtime:'9.00 น.' },
          
        // ];
      //  console.log("orgname",orgname)
      //  console.log("company",company)
        useEffect(() => {
          if(company === ''){
            var configs = {
              method: 'GET',
              url:process.env.REACT_APP_API_URL +`/getalldataDivisionScores/${orgname}`,
              headers: { 
                'authtoken': 'bearer '+ token
              }
            };
            Axios(configs)
              .then((res) => {
                setSelectAllList(res.data);
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
            // toast.error("กรุณาเลือกหน่วยที่ต้องการดู");
          }else{
            var config = {
              method: 'GET',
              url:process.env.REACT_APP_API_URL +`/getalldataDivisionScores/${company}`,
              headers: { 
                'authtoken': 'bearer '+ token
              }
            };
            Axios(config)
              .then((res) => {
                setSelectAllList(res.data);
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
          }
         
        },[company,orgname]);


    //   const SubmitSelect = () => {
    //     if(company === ''){
    //       setAlerts(true)
    //       toast.error('กรุณาเลือก หน่วยที่ต้องการดู')
    //     } else {
    //       Axios.get(
    //         process.env.REACT_APP_API_URL +`/getalldataDivisionScores/${company}`,{
    //           headers : {
    //             'Content-Type': 'application/json',
    //             'authtoken': 'bearer ' + token ,
    //           }
    //         },
    //       )
    //         .then((res) => {
    //           setSelectAllList(res.data);
    //           // console.log("data :", res.data);
    //         })
    //         .catch((err) => {
    //           if(err.response.status === 401) {
    //             navigate('/notfound404', { state: {statusCode: "401", text: err.response.data.message} })
    //           }
    //           console.log(err.response)
    //         })
    //     }
    // }

  return (
    <>
       {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
<Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ข้อมูลผลคะแนนการทดสอบ
        </Box>
      </Typography>
      <br />
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          ดูผลคะแนนตามหน่วยงาน
        </Box>
      </Typography>
    <Box sx={{display: 'flex',justifyContent: 'center'}}>
{
  USR04 === "0" && USR05 === "0" && USR02 === "1" ?  <Box sx={{display: 'flex',justifyContent: 'center',margin:'10px'}}>
  <Typography component="subtitle1" sx={{fontSize:'20px'}}>
       
       {orgname}
      
    </Typography>
  {/* <FormControl sx={{ minWidth: 180 }}>
    <InputLabel id="demo-simple-select-label">หน่วยที่ต้องการดู</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="หน่วยที่ต้องการดู"
      onChange={handleChange}
    >
    
            <MenuItem value={orgname} key={orgname}>
              {orgname}
            </MenuItem>
       
    </Select>
  </FormControl> */}
</Box> :
<Box sx={{display: 'flex',justifyContent: 'center',margin:'10px'}}>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">หน่วยที่ต้องการดู</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="หน่วยที่ต้องการดู"
          onChange={handleChange}
          defaultValue={orgname}
        >
         {Companys.map((Company) => (
                <MenuItem value={Company} key={Company}>
                  {Company}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box>
}


      {/* <Box sx={{display: 'flex',justifyContent: 'center',margin:'10px'}}>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id="demo-simple-select-label">หน่วยที่ต้องการดู</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="หน่วยที่ต้องการดู"
          onChange={handleChange}
        >
         {Companys.map((Company) => (
                <MenuItem value={Company} key={Company}>
                  {Company}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Box> */}
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
          getRowId={(row) => row.testresvcode}
          rows={uniqueData}
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

export default ContentListDivisionScores