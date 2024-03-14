/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { blue, red, green, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import PrintIcon from "@mui/icons-material/Print";
import ModalTestPass from "../components/ModalTestPass";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PrintTestScore from "../components/PrintTestScore";
import PrintTableTestList from "../components/PrintTableTestList";
import { useSelector } from "react-redux";
import moment from "moment";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
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

// const rows = [
//   {
//     id: "1",
//     idnumber: "0000000000",
//     testcode: "xxxxxxxxxx",
//     name: "จ.อ. อาทิตย์  แสนโคก",
//     reason: "ศึกษา ตปท.",
//     location: "Lab 1",
//     test: "ไม่เข้าสอบ",
//     criterion: "80",
//     score: "60",
//     type: "สุ่ม",
//     form: "ฟอร์ม 1",
//   },
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
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[200]),
  backgroundColor: yellow[200],
  borderColor: yellow[400],
  borderWidth: "2px",
  "&:hover": {
    backgroundColor: yellow[500],
    borderColor: yellow[700],
    borderWidth: "2px",
  },
}));
const ColorButtonun = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[200]),
  backgroundColor: red[200],
  borderColor: red[400],
  borderWidth: "2px",
  "&:hover": {
    backgroundColor: red[500],
    borderColor: red[700],
    borderWidth: "2px",
  },
}));
function ContentPageListTestScores() {
  function getFullName(params) {
    return `${params.row["tbmemberinfo.mem_rank"] || ""} ${
      params.row["tbmemberinfo.mem_fname"] || ""
    } ${params.row["tbmemberinfo.mem_lname"] || ""}`;
  }
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectAllList, setSelectAllList] = React.useState([]);
  const [alerts, setAlerts] = useState(false);
  const [Approve, SetApprove] = React.useState(false);
  const [selectMission, setselectMission] = React.useState("");
  const [mission, setMission] = React.useState([]);
  const location = useLocation();
  const savedData = location.state?.savedData || "";
  const [dateappove, setdatttappo] = useState("");
  const data = location.state;
  const yearCurrent = parseInt(
    moment(new Date()).add(543, "year").format("YY")
  );
  const monthCurrent = parseInt(new Date().toISOString().substring(5, 7));
  const dateCurrent = parseInt(new Date().toISOString().substring(8, 10));
  const [testresultapprv, Settestresultapprv] = useState("");
  const yearappov = parseInt(moment(dateappove).add(543, "year").format("YY"));
  const monthappov = parseInt(dateappove.substring(5, 7));
  const dateappov = parseInt(dateappove.substring(8, 10));
  const [toscoreresvcode, settoscoreresvcode] = useState([]);
  const {
    testresvcode,
    testreqdate,
    testreqtime,
    testresultcode,
    testscoringcriteria,
    selectAllListsss,
  } = location.state;
  let difmonth = Math.abs(monthCurrent - monthappov);
  let difday = Math.abs(dateCurrent - dateappov);

  const userLogin = user.user;
  console.log('selectAllList',selectAllList )
  const pers_id = userLogin.pers_id;
  // console.log(data.testresvcode === "SCC1" ? "ราชการต่างประเทศ (ด้านการบิน)" : data.testresvcode === "SCC2" ? "ราชการต่างประเทศกรณีอื่นๆ" : data.testresvcode === "SCC3" ? "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ." : data.testresvcode === "SCC4" ? "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ" : data.testresvcode === "SCC5" ? "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ.": data.testresvcode === "SCC6" ? "ทดสอบภาษาอังกฤษประจำปี" : '');
  const selectMissions =
    selectMission === "ราชการต่างประเทศ (ด้านการบิน)"
      ? "SCC1"
      : selectMission === "ราชการต่างประเทศกรณีอื่นๆ"
      ? "SCC2"
      : selectMission === "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ."
      ? "SCC3"
      : selectMission === "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ"
      ? "SCC4"
      : selectMission === "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ."
      ? "SCC5"
      : selectMission === "ทดสอบภาษาอังกฤษประจำปี"
      ? "SCC6"
      : selectMission === ""
      ? data.testscoringcriteria
      : "test";
  const date = moment(data.testreqdate).add(543, "year").format("DD MMMYY");
  const reqtime = moment(data.testreqtime, "HH:mm:ss").format("HH.mm");
  const userRole = user.user.userRole;
  const USR01 = userRole[0].status;
  const USR02 = userRole[1].status;
  const USR03 = userRole[2].status;
  const USR04 = userRole[3].status;
  const USR05 = userRole[4].status;
  const refreshPage = () => {
    navigate(0);
  };
  const handleBlur = (e, resultcode) => {
    const edit = e.target.value;
    refreshPage();
    if(edit === ''){
      
      var configs = {
        method: "POST",
        url:
          process.env.REACT_APP_API_URL +
          `/Inserteditscore/${resultcode}/${null}/${pers_id}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };
      Axios(configs)
      .then((res) => {
        // console.log(res.data)
        // navigate(0);
        // toast.success("แก้ไขคะแนนเรียบร้อย");
      })
      .catch((err) => {
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
        console.log("getPubrelContents: ", err);
      });
    }else{
      var config = {
        method: "POST",
        url:
          process.env.REACT_APP_API_URL +
          `/Inserteditscore/${resultcode}/${edit}/${pers_id}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };
      Axios(config)
      .then((res) => {
        // console.log(res.data)
        // navigate(0);
        // toast.success("แก้ไขคะแนนเรียบร้อย");
      })
      .catch((err) => {
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
        console.log("getPubrelContents: ", err);
      });
    }
   
  };
  // console.log("selectMission",selectMission);
  // console.log("xxx",testresvcode, testreqdate, testreqtime, testresultcode,testscoringcriteria);
  // console.log(data);
  // console.log(selectMissions);
  const filteredArrayIncludes = selectAllList.filter((item) =>
    item.testindvappvcode?.includes("APR")
  );
  const handleChangeAppove = (e, testresvcode) => {
    // console.log('token',token);

    var config = {
      method: "POST",
      url:
        process.env.REACT_APP_API_URL +
        `/appovescore/${testresvcode}/${pers_id}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((res) => {
        settoscoreresvcode(res.data);
        navigate(0);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        } else if (err.response.status === 404) {
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        }
        console.log("getPubrelContents: ", err);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      width: 100,
      valueGetter: (params) =>
        params.api.getRowIndex(params.row["testresultcode"]) + 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tbmemberinfo.pers_id",
      headerName: "เลขประจำตัว",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "tbtestreservation.testappvcode",
      headerName: "รหัสการทดสอบ",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "FullName",
      headerName: "ยศ ชื่อ นามสกุล",
      width: 220,
      align: "center",
      valueGetter: getFullName,
      headerAlign: "center",
    },
    {
      field: "tbtestreservation.tbtestscoringcriterium.mission",
      headerName: "เหตุผลขอรับการทดสอบ",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "testlabroom",
      headerName: "สถานที่",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "take/untake",
      headerName: "เข้าสอบ/ไม่เข้าสอบ",
      headerAlign: "center",
      width: 150,
      align: "center",
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
      field: "tbtestreservation.tbtestscoringcriterium.minscore",
      headerName: "เกณฑ์",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "realscore",
      headerName: "คะแนน",
      width: 220,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "editscore",
      headerName: "แก้ไขคะแนน",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return USR05 === "1" && testresultapprv === 1 ? (
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="แก้ไขคะแนน"
              defaultValue={params.row.editscore}
              type="number"
              // value= {params.row.editscore === null ? 0 : params.row.editscore}
              // value= {params.row.editscore}
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                },
              }}
              // onChange={(e) =>
              //   handleChangeeditscore(e, params.row.testresultcode)
              // }
              onBlur={(e) => handleBlur(e, params.row.testresultcode)}
            />
          </FormControl>
        ) : testresultapprv === 0 || testresultapprv === null ? (
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="แก้ไขคะแนน"
              defaultValue={params.row.editscore}
              type="number"
              // value= {params.row.editscore === null ? 0 : params.row.editscore}
              // value= {params.row.editscore}
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                },
              }}
              // onChange={(e) =>
              //   handleChangeeditscore(e, params.row.testresultcode)
              // }
              onBlur={(e) => handleBlur(e, params.row.testresultcode)}
            />
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <TextField
              disabled
              id="outlined-basic"
              variant="outlined"
              name="แก้ไขคะแนน"
              defaultValue={params.row.editscore}
              type="number"
              // value= {params.row.editscore === null ? 0 : params.row.editscore}
              // value= {params.row.editscore}
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                },
              }}
              // onChange={(e) =>
              //   handleChangeeditscore(e, params.row.testresultcode)
              // }
              onBlur={(e) => handleBlur(e, params.row.testresultcode)}
            />
          </FormControl>
        );
      },
    },
    {
      field: "pass/unpass",
      headerName: "ผ่าน/ไม่ผ่าน",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <strong>
          <ModalTestPass
            sx={{ cursor: "pointer" }}
            minscore={
              params.row["tbtestreservation.tbtestscoringcriterium.minscore"]
            }
            realscore={params.row["realscore"]}
            testconductdate={params.row["testconductdate"]}
            submittime={params.row["submittime"]}
            editscore={params.row["editscore"]}
            realscoredate={params.row["realscoredate"]}
          />
        </strong>
      ),
    },
    {
      field: "exp",
      headerName: "หมดอายุ/ไม่หมดอายุ",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => (
        <strong>
          <ThemeProvider theme={theme}>
            {yearCurrent - yearappov >= 1 && difmonth >= 0 && difday >= 0 ? (
              <Chip label="หมดอายุ" color="primary" />
            ) : dateappove === "0000-00-00" ? (
              <Chip label="รอการอนุมัติผลคะแนน" color="secondary" />
            ) : (
              <Chip label="ไม่หมดอายุ" color="secondary" />
            )}
          </ThemeProvider>
        </strong>
      ),
    },
    {
      field: "print",
      headerName: "พิมพ์",
      width: 220,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // console.log('testappvcode',params.row["tbtestreservation.testappvcode"]);
        return testresultapprv === 1 ? (
          <strong>
            <PrintTestScore
              pers_id={params.row["tbmemberinfo.pers_id"]}
              mem_rank={params.row["tbmemberinfo.mem_rank"]}
              mem_fname={params.row["tbmemberinfo.mem_fname"]}
              mem_lname={params.row["tbmemberinfo.mem_lname"]}
              testconductdate={params.row["testconductdate"]}
              mem_affiliation={params.row["tbmemberinfo.mem_affiliation"]}
              mission={
                params.row["tbtestreservation.tbtestscoringcriterium.mission"]
              }
              testresultapprvdate={params.row["testresultapprvdate"]}
              minscore={
                params.row["tbtestreservation.tbtestscoringcriterium.minscore"]
              }
              realscore={params.row["realscore"]}
              editscore={params.row["editscore"]}
              testresultapprv={params.row["testresultapprv"]}
              mem_email={params.row["tbmemberinfo.mem_email"]}
              testappvcode={params.row["tbtestreservation.testappvcode"]}
              dateappove={dateappove}
              testreqdate={params.row["tbtestreservation.testreqdate"]}
            />
          </strong>
        ) : (
          <strong>
            <PrintTestScore
              disabled={true}
              pers_id={params.row["tbmemberinfo.pers_id"]}
              mem_rank={params.row["tbmemberinfo.mem_rank"]}
              mem_fname={params.row["tbmemberinfo.mem_fname"]}
              mem_lname={params.row["tbmemberinfo.mem_lname"]}
              testconductdate={params.row["testconductdate"]}
              mem_affiliation={params.row["tbmemberinfo.mem_affiliation"]}
              mission={
                params.row["tbtestreservation.tbtestscoringcriterium.mission"]
              }
              testresultapprvdate={params.row["testresultapprvdate"]}
              minscore={
                params.row["tbtestreservation.tbtestscoringcriterium.minscore"]
              }
              realscore={params.row["realscore"]}
              editscore={params.row["editscore"]}
              testresultapprv={params.row["testresultapprv"]}
              mem_email={params.row["tbmemberinfo.mem_email"]}
              testappvcode={params.row["tbtestreservation.testappvcode"]}
              dateappove={dateappove}
              testreqdate={params.row["tbtestreservation.testreqdate"]}
            />
          </strong>
        );
      },
    },
    {
      field: "type",
      headerName: "แบบ",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: (params) => <>{<div>สุ่ม</div>}</>,
    },
    {
      field: "getform",
      headerName: "ฟอร์ม",
      headerAlign: "center",
      align: "center",
      width: 100,
      // valueGetter: getform
      renderCell: (params) =>
        params.row["tbindvforms.question_code"]?.substring(0, 5),
    },
  ];

  useEffect(() => {
    var config = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/gettoscoreresvcodeContentPageListTestScores/${selectMissions}/${data.testreqdate}/${data.testreqtime}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((res) => {
        setSelectAllList(res.data);
        Settestresultapprv(res.data[0].testresultapprv);
        // console.log("data :", res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/notfound404", {
            state: { statusCode: "401", text: err.response.data.message },
          });
        }
        console.log(err.response);
      });
  }, [selectMissions, data.testreqdate, data.testreqtime]);

  //ข้อมูลตาราง
  useEffect(() => {
    var config = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL + `/gettoscoreresvcode/${testresvcode}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((res) => {
        settoscoreresvcode(res.data);
        Settestresultapprv(res.data[0].testresultapprv);
        // console.log("data :", res.data);
        //ค่าอนุมัติเป็น null
        if (res.data[0].realscoredate === null) {
          setdatttappo("0000-00-00");
        } else {
          setdatttappo(res.data[0].realscoredate);
        }
        // console.log("data :", res.data[0].meminfo_id);
        // console.log("tbindvforms.indvtfrmcode:", res.data[0]["tbindvforms.indvtfrmcode"]);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/notfound404", {
            state: { statusCode: "401", text: err.response.data.message },
          });
        }
        console.log(err.response);
      });
  }, [testresvcode]);

  //แก้ไขคะแนน
  const handleChangeeditscore = (e, resultcode) => {
    // console.log('value',e.target.value);
    const edit = e.target.value;

    if (edit.indexOf("-") >= 0) {
      // if (edit  === edit.indexOf('-'))
      toast.error("กรอกข้อมูลเป็นตัวเลขเท่านั้น");
    } else if (edit === ''){
      var configs = {
        method: "POST",
        url:
          process.env.REACT_APP_API_URL +
          `/Inserteditscore/${resultcode}/${null}/${pers_id}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };
      Axios(configs)
      .then((res) => {
        // console.log(res.data)
        // navigate(0);
        toast.success("แก้ไขคะแนนเรียบร้อย");
      })
      .catch((err) => {
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
        console.log("getPubrelContents: ", err);
      });
    } else {
      
      var config = {
        method: "POST",
        url:
          process.env.REACT_APP_API_URL +
          `/Inserteditscore/${resultcode}/${edit}/${pers_id}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };
      Axios(config)
      .then((res) => {
        // console.log(res.data)
        // navigate(0);
        toast.success("แก้ไขคะแนนเรียบร้อย");
      })
      .catch((err) => {
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
        console.log("getPubrelContents: ", err);
      });

     
    }
  };

  const handleApprove = () => {
    SetApprove((value) => !value);
  };
  // console.log(selectAllList)
  // const [age, setAge] = React.useState('ราชการต่างประเทศ');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  useEffect(() => {
    var config = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + `/getTbtestscoringcriteria`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((res) => {
        setMission(res.data);
        // console.log("data :", res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/notfound404", {
            state: { statusCode: "401", text: err.response.data.message },
          });
        }
        console.log(err.response);
      });
  }, []);

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
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          วันที่จอง วันที่ {date} เวลา {reqtime} น.
        </Box>
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {testresultapprv === 1 ? (
            <PrintTableTestList data={selectAllList}  token={token} selectMissions={selectMissions} testreqdate={location.state.testreqdate} testreqtime={location.state.testreqtime} />
          ) : (
            ""
          )}
        </Box>
        <Box>
        {testresultapprv === 1 ? (
          <Typography component="subtitle1">
            ค่าเฉลี่ยผลการทดสอบภาษาอังกฤษ
          </Typography>
           ) : (
            ""
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ margin: "10px" }}>
          <FormControl sx={{ minWidth: 180 }} disabled>
            <InputLabel id="demo-simple-select-label">
              ชื่อรายการทดสอบ
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={
                data.testscoringcriteria === "SCC1"
                  ? "ราชการต่างประเทศ (ด้านการบิน)"
                  : data.testscoringcriteria === "SCC2"
                  ? "ราชการต่างประเทศกรณีอื่นๆ"
                  : data.testscoringcriteria === "SCC3"
                  ? "ศึกษาหลักสูตร วทอ.ฯ และ รร.สธ.ทอ."
                  : data.testscoringcriteria === "SCC4"
                  ? "ศึกษาหลักสูตร รร.นอส.ฯ และ รร.นฝ.ฯ"
                  : data.testscoringcriteria === "SCC5"
                  ? "ปรับเลื่อนชั้นยศ จ.อ.เป็น พ.อ.อ."
                  : data.testscoringcriteria === "SCC6"
                  ? "ทดสอบภาษาอังกฤษประจำปี"
                  : ""
              }
              label="ชื่อรายการทดสอบ"
              onChange={(e) => setselectMission(e.target.value)}
            >
              {mission.map((missions) => (
                <MenuItem value={missions.mission} key={missions.mission}>
                  {missions.mission}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* <Box sx={{margin:'10px'}}>
        <Button variant="contained"  sx={{
                minWidth: 100,
                minHeight: 55,
                fontSize: 16,
              }}
              // onClick={() => SubmitSelect()}
              >
            ตกลง
          </Button>
        </Box> */}
      </Box>
      <br />
      <div style={{ height: 400, width: "100%" }}>
        {/* <Link to="#" style={{ textDecoration: "none" }}>
      <Button variant="outlined"  startIcon={<PersonIcon />}>
        ดูผลคะแนนรายบุคคล
      </Button>
      </Link> */}
        <Link
          to="/ContentListScores"
          style={{ textDecoration: "none" }}
          state={{
            testscoringcriteria:
              selectMission === "" ? data.testscoringcriteria : "",
            selectAllListsss: selectAllListsss,
          }}
        >
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
        </Link>
        <DataGrid
          getRowId={(row) => row["testresultcode"]}
          rows={filteredArrayIncludes}
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
      <DrawerHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "50px",
        }}
      >
        {/* <Link to="#" style={{ textDecoration: "none" }}>
          <ColorButton variant="outlined" onClick={handleApprove} sx={{marginLeft:'10px'}} className="BtnApprove">
            อนุมัติการจองวันทดสอบทั้งหมด
          </ColorButton>
        </Link> */}
        {/* {
          Approve === false ? ( <Link to="#" style={{ textDecoration: "none" }}>
          <ColorButton variant="outlined" onClick={handleApprove} sx={{marginLeft:'10px'}} className="BtnApprove">
          อนุมัติผลคะแนนสอบ
          </ColorButton>
        </Link>) : ( <Link to="#" style={{ textDecoration: "none" }}>
          <ColorButton disabled variant="outlined" onClick={handleApprove} sx={{marginLeft:'10px'}} >
          อนุมัติผลคะแนนสอบ
          </ColorButton>
        </Link>)
        } */}
        {/* {
USR04 === "0" && USR05 === "0" && USR03 === "1" ?
"" : testresultapprv === 1 ? <ColorButtonun
disabled

variant="outlined"
// onClick={handleApprove}
sx={{ marginLeft: "10px" }}
>
อนุมัติผลคะแนนสอบแล้ว
</ColorButtonun>   :
          
          <ColorButton
          variant="outlined"
          onClick={(e) => handleChangeAppove(e, testresvcode)}
          sx={{ marginLeft: "10px" }}
          className="BtnApprove"
          
        >
          อนุมัติผลคะแนนสอบ
        </ColorButton>
} */}
        {/* { testresultapprv === 1 ?  
          <ColorButtonun
            disabled

            variant="outlined"
            // onClick={handleApprove}
            sx={{ marginLeft: "10px" }}
          >
            อนุมัติผลคะแนนสอบแล้ว
          </ColorButtonun>  
          :
          
          <ColorButton
          variant="outlined"
          onClick={(e) => handleChangeAppove(e, testresvcode)}
          sx={{ marginLeft: "10px" }}
          className="BtnApprove"
          
        >
          อนุมัติผลคะแนนสอบ
        </ColorButton>
          } */}
        {/* {
USR04 === "0" && USR05 === "0" && USR03 === "1" ? "" : 
USR04 === "0" && USR05 === "0" && USR02 === "1" ? "" : 
USR04 === "0" && USR05 === "0" && USR01 === "1" ? "" : 
testresultapprv === 1 ? <ColorButtonun
disabled

variant="outlined"
// onClick={handleApprove}
sx={{ marginLeft: "10px" }}
>
อนุมัติผลคะแนนสอบแล้ว
</ColorButtonun>   :
          
          <ColorButton
          variant="outlined"
          onClick={(e) => handleChangeAppove(e, testresvcode)}
          sx={{ marginLeft: "10px" }}
          className="BtnApprove"
          
        >
          อนุมัติผลคะแนนสอบ
        </ColorButton>
} */}
        {USR04 === "0" && USR05 === "0" && USR03 === "1" ? (
          ""
        ) : USR04 === "0" && USR05 === "0" && USR02 === "1" ? (
          ""
        ) : USR04 === "0" && USR05 === "0" && USR01 === "1" ? (
          ""
        ) : testresultapprv === 1 ? (
          <ColorButtonun
            disabled
            variant="outlined"
            // onClick={handleApprove}
            sx={{ marginLeft: "10px" }}
          >
            อนุมัติผลคะแนนสอบแล้ว
          </ColorButtonun>
        ) : (
          <ColorButton
            variant="outlined"
            onClick={(e) => handleChangeAppove(e, testresvcode)}
            sx={{ marginLeft: "10px" }}
            className="BtnApprove"
          >
            อนุมัติผลคะแนนสอบ
          </ColorButton>
        )}
      </Box>
    </>
  );
}

export default ContentPageListTestScores;
