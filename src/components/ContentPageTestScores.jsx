/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import ModalTestPass from "../components/ModalTestPass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Axios from "axios";
import moment from "moment";
import PrintTestScore from "../components/PrintTestScore";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/userSilce";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
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

function getFullName(params) {
  return `${params.row["tbmemberinfo.mem_rank"] || ""} ${
    params.row["tbmemberinfo.mem_fname"] || ""
  } ${params.row["tbmemberinfo.mem_lname"] || ""}`;
}

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
function ContentPageTestScores() {
  const [Approve, SetApprove] = React.useState(false);
  const [Approveresult, SetApproveresult] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  const { testresvcode, testreqdate, testreqtime, testresultcode } =
    location.state;
  const [toscoreresvcode, settoscoreresvcode] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const userRole = user.user.userRole;
  const userLogin = user.user;
  const USR01 = userRole[0].status;
  const USR02 = userRole[1].status;
  const USR03 = userRole[2].status;
  const USR04 = userRole[3].status;
  const USR05 = userRole[4].status;
  const pers_id = userLogin.pers_id;
  const navigate = useNavigate();
  const [dateappove, setdatttappo] = useState("");
  const dispatch = useDispatch();
  const date = moment(testreqdate).add(543, "year").format("DD MMMYY");
  const reqtime = moment(testreqtime, "HH:mm:ss").format("HH.mm");
  const [testresultapprv, Settestresultapprv] = useState("");
  const refreshPage = () => {
    navigate(0);
  };
  const handleBlur = (e, resultcode) => {
    const edit = e.target.value;
    refreshPage();
    if (edit === "") {
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
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          } else if (err.response.status === 404) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
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
          // toast.success("แก้ไขคะแนนเรียบร้อย");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          } else if (err.response.status === 404) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          }
          console.log("getPubrelContents: ", err);
        });
    }
  };
  const filteredArrayIncludes = toscoreresvcode.filter((item) =>
    item.testindvappvcode?.includes("APR")
  );

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      headerAlign: "center",
      width: 50,
      align: "center",
      valueGetter: (params) =>
        params.api.getRowIndex(params.row["testresultcode"]) + 1,
    },
    {
      field: "tbmemberinfo.pers_id",
      headerName: "เลขประจำตัว",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "tbtestreservation.testappvcode",
      headerName: "รหัสการทดสอบ",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "FullName",
      headerName: "ยศ ชื่อ นามสกุล",
      headerAlign: "center",
      width: 220,
      align: "center",
      valueGetter: getFullName,
    },
    {
      field: "tbtestreservation.tbtestscoringcriterium.mission",
      headerName: "เหตุผลขอรับการทดสอบ",
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "testlabroom",
      headerName: "สถานที่",
      headerAlign: "center",
      width: 100,
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
       
          {params.row["testconductdate"] === null ? (
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
      headerAlign: "center",
      width: 80,
      align: "center",
    },
    {
      field: "realscore",
      headerName: "คะแนนที่ได้",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "editscore",
      headerName: "แก้ไขคะแนน",
      headerAlign: "center",
      width: 100,
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
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                  min: 0, // Prevents entering negative numbers
                },
              }}
              onBlur={(e) => handleBlur(e, params.row.testresultcode)} // เมื่อพับหน้าหรือออกจาก TextField
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
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                  min: 0, // Prevents entering negative numbers
                },
              }}
              onBlur={(e) => handleBlur(e, params.row.testresultcode)} // เมื่อพับหน้าหรือออกจาก TextField
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
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                  min: 0, // Prevents entering negative numbers
                },
              }}
              onBlur={(e) => handleBlur(e, params.row.testresultcode)} // เมื่อพับหน้าหรือออกจาก TextField
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
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: (params) => {
      
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
     
      renderCell: (params) =>
        params.row["tbindvforms.question_code"]?.substring(0, 5),
    },
  ];



  const handleFocus = () => {
    // This function will be called when the input field gains focus.
    setIsFocused(true);
  };

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

  //แก้ไขคะแนน
  const handleChangeeditscore = (e, resultcode) => {
    // console.log('value',e.target.value);
    const edit = e.target.value;

    if (edit.indexOf("-") >= 0) {
      // if (edit  === edit.indexOf('-'))
      toast.error("กรอกข้อมูลเป็นตัวเลขเท่านั้น");
    } else if (edit === "") {
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
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          } else if (err.response.status === 404) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
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
          // toast.success("แก้ไขคะแนนเรียบร้อย");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          } else if (err.response.status === 404) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: err.response.status,
                txt: err.response.data,
              },
            });
          }
          console.log("getPubrelContents: ", err);
        });
    }
  };

  //อนุมัติ
  const handleApproveone = (e) => {
    e.preventDefault();
    SetApproveresult((value) => !value);
    // console.log("Approveresult", Appro/gettoscoreresvcodeveresult);
    // console.log("Approveresult date", Approveone)
  };
  // console.log("testresvcode", testresvcode)
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
  }, [testresvcode]);

 
  const yearCurrent = parseInt(
    moment(new Date()).add(543, "year").format("YY")
  );
  const monthCurrent = parseInt(new Date().toISOString().substring(5, 7));
  const dateCurrent = parseInt(new Date().toISOString().substring(8, 10));
  const datttCurrent = new Date().toISOString().substring(0, 10);
  

  //วันอนุมัติ

  const yearappov = parseInt(moment(dateappove).add(543, "year").format("YY"));
  const monthappov = parseInt(dateappove.substring(5, 7));
  const dateappov = parseInt(dateappove.substring(8, 10));
  const datttappov = dateappove.substring(0, 10);
  
  let difmonth = Math.abs(monthCurrent - monthappov);
  let difday = Math.abs(dateCurrent - dateappov);

  const handleApprove = () => {
    SetApprove((value) => !value);
  };

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
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          <b>
            {"รหัสการจองการทดสอบ   " +
              testresvcode +
              " วันที่จอง   " +
              date +
              "   เวลาที่จอง   " +
              reqtime +
              " น."}{" "}
          </b>
        </Box>
      </Typography>
      <DrawerHeader />
      <div style={{ height: 400, width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <Link
            to="/PageTestScores"
            style={{ textDecoration: "none" }}
            state={{
              currentMonthCount: location.state.currentMonthCount,
              currentYear: location.state.currentYear,
              PreviousMonthCount: location.state.PreviousMonthCount,
              Previousyear: location.state.Previousyear,
              NextMonthCount: location.state.NextMonthCount,
              nextyear: location.state.nextyear,
            }}
          >
            <Button variant="outlined" startIcon={<ArrowBackIcon />}>
              BACK
            </Button>
          </Link>
        </Box>
        <br></br>

        <DataGrid
          getRowId={(row) => row["testresultcode"]}
          // getRowId={(row) => row["tbmember.pers_id"]}
          rows={filteredArrayIncludes}
          columns={columns}
          pageSize={5}
          // onCellEditCommit={handleChangeeditscore}
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

export default ContentPageTestScores;
