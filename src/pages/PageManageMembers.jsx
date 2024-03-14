/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import { blue, red, yellow } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { logout } from "../../src/store/userSilce";
import {useDispatch } from 'react-redux'
import "react-toastify/dist/ReactToastify.css";

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

function getFullName(params) {
  return `${params.row.mem_rank || ""}${params.row.mem_fname || ""} ${
    params.row.mem_lname || ""
  }`;
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

function PageManageMembers() {
  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      width: 100,
      valueGetter: (params) => params.api.getRowIndex(params.row.pers_id) + 1,
    },
    {
      field: "fullName",
      headerName: "ยศ ชื่อ สกุล",
      width: 300,
      headerAlign: "center",
      align: "center",
      valueGetter: getFullName,
    },
    { field: "mem_affiliation", headerName: "สังกัด", width: 220 },
    {
      field: "commanderright",
      headerName: "สิทธิ์ผู้บังคับบัญชา ผอ.ศภษ. รอง ผอ.หน.ผผศ.",
      width: 280,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={params.row.USR04}
              onChange={(event) => {
                ApprovehandleChange1(event, params);
              }}
            >
              <MenuItem value={"2"}>รออนุมัติ</MenuItem>
              <MenuItem value={"1"}>อนุมัติ</MenuItem>
              <MenuItem value={"0"}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "examinerright",
      headerName: "ผู้คุมสอบ นกศ.จนท.",
      width: 220,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={params.row.USR03}
              onChange={(event) => {
                ApprovehandleChange2(event, params);
              }}
            >
              <MenuItem value={"2"}>รออนุมัติ</MenuItem>
              <MenuItem value={"1"}>อนุมัติ</MenuItem>
              <MenuItem value={"0"}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "adminright",
      headerName: "ผู้ดูแลระบบ",
      width: 220,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={params.row.USR05}
              onChange={(event) => {
                ApprovehandleChange3(event, params);
              }}
            >
              <MenuItem value={"2"}>รออนุมัติ</MenuItem>
              <MenuItem value={"1"}>อนุมัติ</MenuItem>
              <MenuItem value={"0"}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "examineeright",
      headerName: "ผู้เข้าสอบ",
      width: 220,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={params.row.USR01}
              onChange={(event) => {
                ApprovehandleChange4(event, params);
              }}
            >
              <MenuItem value={"2"}>รออนุมัติ</MenuItem>
              <MenuItem value={"1"}>อนุมัติ</MenuItem>
              <MenuItem value={"0"}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "coordinatorright",
      headerName: "ผู้ประสาน",
      width: 220,
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={params.row.USR02}
              onChange={(event) => {
                ApprovehandleChange5(event, params);
              }}
            >
              <MenuItem value={"2"}>รออนุมัติ</MenuItem>
              <MenuItem value={"1"}>อนุมัติ</MenuItem>
              <MenuItem value={"0"}>ไม่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "management",
      headerName: "การจัดการ",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <strong>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: 16 }}
                  startIcon={<DeleteForeverIcon />}
                  onClick={(event) => {
                    DeleteUser(event, params);
                  }}
                >
                  DELETE
                </Button>
              </ThemeProvider>
            </strong>
          </>
        );
      },
    },
  ];

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
  var d = new Date();
  // var FullYear = d.getFullYear() + 543
  // console.log(FullYear)
  const [previousMonthCount, setPreviousMonthCount] = useState(
    new Date().getMonth() - 1
  );
  const [nextMonthCount, setNextMonthCount] = useState(
    new Date().getMonth() + 1
  );
  const [currentMonthCount, setCurrentMonthCount] = useState(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear() + 543
  );
  const [nextyear, setnextyear] = useState(
    months[nextMonthCount] === "มกราคม" ? currentYear + 1 : currentYear
  );
  const [previousyear, setpreviousyear] = useState(
    months[previousMonthCount] === "ธันวาคม" ? currentYear - 1 : currentYear
  );
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  // const [FullYearsnext , setFullYearsnext] = useState(months[nextMonthCount] === "มกราคม" ? (d.getFullYear() + 543) + 1 : d.getFullYear() + 543)
  // const [FullYearsprevious , setFullYearsprevious] = useState(months[previousMonthCount] === "ธันวาคม" ? (d.getFullYear() + 543) - 1 : d.getFullYear() + 543)
  const [getUsers, setGetUsers] = useState([]);
  const [getAccess, setGetAccess] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(false);
  const [open, setOpen] = useState(false);
  const [getUserDelete, setGetUserDelete] = useState([]);
  const dispatch = useDispatch();
  // const [ok, setOk] = useState(false);

  const handleRowClick = (params) => {
    setMessage(
      `"${params.row.mem_rank || ""}${params.row.mem_fname || ""} ${
        params.row.mem_lname || ""
      }"`
    );
  };

  const handleClickOk = () => {
    if (open === true) {
      var config = {
        method: "PUT",
        url:
          process.env.REACT_APP_API_URL +
          `/deleteUser/${getUserDelete.pers_id}`,
        headers: {
          authtoken: "bearer " + token,
        },
      };
      axios(config)
        .then((res) => {
          toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
        })
        .then((res) => {
          setAlerts(true);
          toast.success("ระบบได้ทำการลบร้อยแล้ว");
          navigate(0);
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
        // .catch((err) => {
        //   if (err.response.status === 401) {
        //     navigate("/notfound404", {
        //       state: { statusCode: "401", text: err.response.data.message },
        //     });
        //   }
        //   // console.log(err.response);
        // });
      // console.log("getUserDelete",getUserDelete)
      handleClose();
    } else {
      // console.log("test2")
      // handleClose()
    }
    // setOpen(false);
    // setOk(true);
    // setOpen(false);
    // navigate(0)
  };

  const handleClose = () => {
    setOpen(false);
    // setOk(false);
    // setOpen(false);
  };
  // console.log("ok", ok )
  //  console.log("เดือนต่อไป" ,months[nextMonthCount],nextyear)
  //  console.log("เดือนปัจจุบัญ" ,months[currentMonthCount],currentYear)
  //  console.log("เดือนก่อนหน้า" ,months[previousMonthCount],previousyear)
  //  console.log("ปีก่อนหน้า" ,previousyear)
  //  console.log("ปีต่อไป" ,nextyear)
  //  console.log(months[Current])
  //  console.log(months[NextMonth])
  //  console.log(months[PreviousMonth])
  // console.log("ปีก่อนหน้า" ,FullYearsprevious)
  // console.log("ปีต่อไป" ,FullYearsnext)

  const handlePreviousMonthClick = () => {
    setPreviousMonthCount(
      previousMonthCount - 1 < 0 ? 11 : previousMonthCount - 1
    );
    setNextMonthCount(nextMonthCount - 1 < 0 ? 11 : nextMonthCount - 1);
    setCurrentMonthCount(
      currentMonthCount - 1 < 0 ? 11 : currentMonthCount - 1
    );
    setpreviousyear(
      months[previousMonthCount] === "มกราคม" ? previousyear - 1 : previousyear
    );
    setnextyear(months[nextMonthCount] === "มกราคม" ? nextyear - 1 : nextyear);
    setCurrentYear(currentMonthCount - 1 < 0 ? currentYear - 1 : currentYear);
  };

  const handleNextMonthClick = () => {
    setNextMonthCount(nextMonthCount + 1 > 11 ? 0 : nextMonthCount + 1);
    setPreviousMonthCount(
      previousMonthCount + 1 > 11 ? 0 : previousMonthCount + 1
    );
    setCurrentMonthCount(
      currentMonthCount + 1 > 11 ? 0 : currentMonthCount + 1
    );
    setnextyear(months[nextMonthCount] === "ธันวาคม" ? nextyear + 1 : nextyear);
    setpreviousyear(
      months[previousMonthCount] === "ธันวาคม" ? previousyear + 1 : previousyear
    );
    setCurrentYear(currentMonthCount + 1 > 11 ? currentYear + 1 : currentYear);
  };

  const DeleteUser = (event, cellValues) => {
    setGetUserDelete(cellValues.row);
    setOpen(true);
    // let pers_id = cellValues.row.pers_id
    // setOpen(true);
    // console.log(pers_id);
    // if(open === true){
    //   console.log(pers_id);
    //   // handleClose();
    // }

    // handleClose();
    // if(ok === true){
    //   console.log("test1")
    //   var config = {
    //     method: 'DELETE',
    //     url: process.env.REACT_APP_API_URL + `/deleteUser/${pers_id}`,
    //     headers: {
    //       'authtoken': 'bearer '+ token
    //     }
    //   };
    // axios(config).then((res) => {
    //     setAlerts(true)
    //     toast.success('ระบบได้ทำการลบร้อยแล้ว')
    // setOk(false);
    //     navigate(0)
    //   })
    //   .catch((err) => {
    //     if(err.response.status === 401) {
    //       navigate('/notfound404', { state: {statusCode: "401", text: err.response.data.message} })
    //     }
    //     console.log(err.response)
    //   })
    // }else{
    //   console.log("test2")
    // }

    // axios.delete(process.env.REACT_APP_API_URL + `/deleteUser/${pers_id}`,{
    //   headers : {
    //     'Content-Type': 'application/json',
    //     'authtoken': 'bearer ' + token ,
    //   }
    // },)
    //   .then((res) => {
    //     setAlerts(true)
    //     toast.success('ระบบได้ทำการลบร้อยแล้ว')
    //     navigate(0)
    //   })
    //   .catch((err) => {
    //     if(err.response.status === 401) {
    //       navigate('/notfound404', { state: {statusCode: "401", text: err.response.data.message} })
    //     }
    //     console.log(err.response)
    //   })
  };

  const ApprovehandleChange1 = (event, cellValues) => {
    const valueAccess = event.target.value;
    const pers_id = cellValues.row.pers_id;
    var config = {
      method: "PUT",
      url:
        process.env.REACT_APP_API_URL +
        `/getPerIdAccess1/${pers_id}/${valueAccess}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
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
  };

  const ApprovehandleChange2 = (event, cellValues) => {
    const valueAccess = event.target.value;
    const pers_id = cellValues.row.pers_id;

    var config = {
      method: "PUT",
      url:
        process.env.REACT_APP_API_URL +
        `/getPerIdAccess2/${pers_id}/${valueAccess}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
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
  };

  const ApprovehandleChange3 = (event, cellValues) => {
    const valueAccess = event.target.value;
    const pers_id = cellValues.row.pers_id;
    // console.log(valueAccess)
    var config = {
      method: "PUT",
      url:
        process.env.REACT_APP_API_URL +
        `/getPerIdAccess3/${pers_id}/${valueAccess}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
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
  };

  const ApprovehandleChange4 = (event, cellValues) => {
    const valueAccess = event.target.value;
    const pers_id = cellValues.row.pers_id;
    var config = {
      method: "PUT",
      url:
        process.env.REACT_APP_API_URL +
        `/getPerIdAccess4/${pers_id}/${valueAccess}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
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
  };

  const ApprovehandleChange5 = (event, cellValues) => {
    const valueAccess = event.target.value;
    const pers_id = cellValues.row.pers_id;
    var config = {
      method: "PUT",
      url:
        process.env.REACT_APP_API_URL +
        `/getPerIdAccess5/${pers_id}/${valueAccess}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        toast.success("ระบบได้ทำการอัพเดทสิทธิ์เรียบร้อยแล้ว");
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
  };

  useEffect(() => {
    var config = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/getUser",
      headers: {
        authtoken: "bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        setGetUsers(res.data);
        // console.log("data: ",res.data);
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
    axios
      .get(process.env.REACT_APP_API_URL + "/getAccess", {
        headers: {
          "Content-Type": "application/json",
          authtoken: "bearer " + token,
        },
      })
      .then((res) => {
        setGetAccess(res.data);
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
  // console.log("getUsers",getUsers);
  // console.log("getAccess",getAccess);

  var results = [];
  for (var i = 0; i < getUsers.length; i++) {
    for (var j = 0; j < getAccess.length; j++) {
      if (getUsers[i].pers_id === getAccess[j].persid) {
        results.push({
          mem_rank: getUsers[i].mem_rank,
          mem_fname: getUsers[i].mem_fname,
          mem_lname: getUsers[i].mem_lname,
          mem_affiliation: getUsers[i].mem_affiliation,
          pers_id: getUsers[i].pers_id,
          meminfo_id: getUsers[i].meminfo_id,
          USR01: getAccess[j].USR01,
          USR02: getAccess[j].USR02,
          USR03: getAccess[j].USR03,
          USR04: getAccess[j].USR04,
          USR05: getAccess[j].USR05,
        });
      }
    }
  }

  const filteredArrayIncludes = results.filter(
    (item) => item.USR01 === "1" || item.USR01 === "0" || item.USR01 === "2"
  );
  // console.log("filteredArrayIncludes",filteredArrayIncludes);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  // const handleClick = () => {
  //   setNextMonth(NextMonth + 1 <= 11 ? NextMonth + 1 : NextMonth )
  //   setCurrent(NextMonth)
  //   setPreviousMonth(NextMonth - 1 <= 0 ? NextMonth : NextMonth )
  // };
  //  console.log("results",results);
  return (
    <>
      {alerts ? (
        <ToastContainer draggable={false} transition={Zoom} autoClose={3000} />
      ) : (
        <></>
      )}
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          จัดการสมาชิก
        </Box>
      </Typography>
      <DrawerHeader />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row.pers_id}
          onRowClick={handleRowClick}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`ยืนยันการลบข้อมูล`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`คุณการลบข้อมูลของ ${message}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              ไม่ใช่
            </Button>
            <Button onClick={handleClickOk}>ใช่</Button>
          </DialogActions>
        </Dialog>
      </div>
      <DrawerHeader />
      <Footer />
    </>
  );
}

export default PageManageMembers;
