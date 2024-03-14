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
import { Link } from "react-router-dom";
import { blue, red, green, yellow } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import PrintIcon from "@mui/icons-material/Print";
import ModalTestPass from "../components/ModalTestPass";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PrintTestScore from "../components/PrintTestScore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PrintTableScore from "../components/PrintTableScore";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../src/store/userSilce";
import { useDispatch } from "react-redux";
require("moment/locale/th");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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
function createData(no, rank, numberofpeople, average, hightscore) {
  return { no, rank, numberofpeople, average, hightscore };
}


function ContentPageListTestScoresDivision() {
  const location = useLocation();
  const data = location.state;

  
  const [Approve, SetApprove] = React.useState(false);
  const handleApprove = () => {
    SetApprove((value) => !value);
  };
  const [company, setCompany] = React.useState("");
  const [selectAllList, setSelectAllList] = useState([]);
  const navigate = useNavigate();
// console.log("selectAllList",selectAllList)
  const handleChange = (event) => {
    setCompany(event.target.value);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Companys = [
    "กง.ทอ.",
    "กบ.ทอ.",
    "กพ.ทอ.",
    "กร.ทอ.",
    "ขว.ทอ.",
    "ขส.ทอ.",
    "คปอ.",
    "จร.ทอ.",
    "ชย.ทอ.",
    "ชอ.ทอ.(ดอนเมือง)",
    "ชอ.ทอ.(บางซื่อ)",
    "ทสส.ทอ.",
    "บก.ทอ.",
    "พธ.ทอ.",
    "พอ.",
    "ยก.ทอ.",
    "ยศ.ทอ.",
    "รร.นนก.",
    "ศวอ.ทอ.",
    "สก.ทอ.",
    "สตน.ทอ.",
    "สธน.ทอ.",
    "สน.ผบ.ดม",
    "สนภ.ทอ.",
    "สบ.ทอ.",
    "สปช.ทอ.",
    "สพ.ทอ.",
    "สลก.ทอ.",
    "สวบ.ทอ.",
    "สอ.ทอ.",
    "อย.",
    "บน.1",
    "บน.2",
    "บน.3",
    "บน.4",
    "บน.5",
    "บน.6",
    "บน.7",
    "บน.21",
    "บน.23",
    "บน.41",
    "บน.46",
    "บน.56",
    "สถานีรายงาน",
    "ศซว.ทอ.",
    "ศซบ.ทอ.",
    "รร.การบิน",
    "สพร.ทอ.",
    "ศปอว.ทอ.",
    "สำนักงานการบิน ทอ.",
    "สยล.ทอ.",
    "สง.ปรมน.ทอ.",
    "ศูนย์อำนวยการเครื่องบินพระราชพาหนะ",
    "ศูนย์อำนวยการเฮลิคอปเตอร์พระราชพาหนะ",
    "ศูนย์การสงครามทางอากาศ",
    "สคม.ทอ.",
  ];
  
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const userLogin = user.user;
  const pers_id = userLogin.pers_id;
  const [dateappove, setdatttappo] = useState("");
  const [toscoreresvcode, settoscoreresvcode] = useState([]);
  const [testresultapprv, Settestresultapprv] = useState("");
  const monthCurrent = parseInt(new Date().toISOString().substring(5, 7));
  const dateCurrent = parseInt(new Date().toISOString().substring(8, 10));
  const monthappov = parseInt(dateappove.substring(5, 7));
  const dateappov = parseInt(dateappove.substring(8, 10));
  const date = moment(data.testreqdate).add(543, "year").format("DD MMMYY");
  const reqtime = moment(data.testreqtime, "HH:mm:ss").format("HH.mm");
  const yearCurrent = parseInt(
    moment(new Date()).add(543, "year").format("YY")
  );
  const yearappov = parseInt(moment(dateappove).add(543, "year").format("YY"));
  let difmonth = Math.abs(monthCurrent - monthappov);
  let difday = Math.abs(dateCurrent - dateappov);
  const { testresvcode, testreqdate, testreqtime, testresultcode } =
    location.state;
  const userRole = user.user.userRole;
  const USR01 = userRole[0].status;
  const USR02 = userRole[1].status;
  const USR03 = userRole[2].status;
  const USR04 = userRole[3].status;
  const USR05 = userRole[4].status;
  const orgname = user.user.orgname;
  const dispatch = useDispatch();
  const refreshPage = () => {
    navigate(0);
  };
  const handleBlur = (e, resultcode) => {
    const edit = e.target.value;
    refreshPage();
    // toast.success("แก้ไขคะแนนเรียบร้อย");
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
  const filteredArrayIncludes = selectAllList.filter((item) =>
    item.testindvappvcode?.includes("APR")
  );
 
  const filteredData = filteredArrayIncludes.filter(
    (item) => item.testresvcode === testresvcode
  );
// console.log("filteredData",filteredData)
  useEffect(() => {
    var config = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/getalldataContentPageListTestScoresDivision/${data.testrequnit}/${data.testreqdate}`,
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
  }, []);



  const handleChangeAppove = (e, testresvcode) => {
    // console.log('value',e.target.value);
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



  const countRole1 = () => {
    let counter = 0;

    filteredData.forEach((item) => {
      if (
        item["tbmemberinfo.mem_rank"] === "น.ต." ||
        item["tbmemberinfo.mem_rank"] === "น.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "น.ท." ||
        item["tbmemberinfo.mem_rank"] === "น.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "น.อ." ||
        item["tbmemberinfo.mem_rank"] === "น.อ.หญิง"
      ) {
        counter++;
      }
    });

    return counter;
  };

  const countRole2 = () => {
    let counter = 0;

    filteredData.forEach((item) => {
      if (
        item["tbmemberinfo.mem_rank"] === "ร.ต." ||
        item["tbmemberinfo.mem_rank"] === "ร.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "ร.ท." ||
        item["tbmemberinfo.mem_rank"] === "ว่าที่ ร.ท." ||
        item["tbmemberinfo.mem_rank"] === "ร.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "ร.อ." ||
        item["tbmemberinfo.mem_rank"] === "ร.อ.หญิง"
      ) {
        counter++;
      }
    });

    return counter;
  };

  const countRole3 = () => {
    let counter = 0;

    filteredData.forEach((item) => {
      if (
        item["tbmemberinfo.mem_rank"] === "พ.อ.อ.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.อ." ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ท." ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ต."
      ) {
        counter++;
      }
    });

    return counter;
  };

  const countRole4 = () => {
    let counter = 0;

    filteredData.forEach((item) => {
      if (
        item["tbmemberinfo.mem_rank"] === "จ.อ.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.อ." ||
        item["tbmemberinfo.mem_rank"] === "จ.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.ท." ||
        item["tbmemberinfo.mem_rank"] === "จ.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.ต."
      ) {
        counter++;
      }
    });

    return counter;
  };
  // console.log("countRole4: ", countRole4());
  const countRole5 = () => {
    let counter = 0;

    filteredData.forEach((item) => {
      if (
        item["tbmemberinfo.mem_rank"] === "นางสาว" ||
        item["tbmemberinfo.mem_rank"] === "นาง" ||
        item["tbmemberinfo.mem_rank"] === "นาย" ||
        item["tbmemberinfo.mem_rank"] === "ไม่ระบุ"
      ) {
        counter++;
      }
    });

    return counter;
  };

  const filteredData1 = filteredData.filter(
    (item) =>
      item["tbmemberinfo.mem_rank"] === "น.ต." ||
      item["tbmemberinfo.mem_rank"] === "น.ต.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "น.ท." ||
      item["tbmemberinfo.mem_rank"] === "น.ท.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "น.อ." ||
      item["tbmemberinfo.mem_rank"] === "น.อ.หญิง"
  );
  const renderData1 = () => {
    const renderedItems = [];
    for (let i = 0; i < filteredData1.length; i++) {
      renderedItems.push(filteredData1[i]["editscore"]);
    }

    return renderedItems;
  };
  const calculateMean1 = () => {
    let sum = 0;
    filteredData1.forEach((item) => {
      item["editscore"] === null || item["editscore"] === 0
        ? (sum += item["realscore"])
        : (sum += item["editscore"]);
    });

    const mean = sum / filteredData1.length;
    return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
  };

  const filteredData2 = filteredData.filter(
    (item) =>
      item["tbmemberinfo.mem_rank"] === "ร.ต." ||
      item["tbmemberinfo.mem_rank"] === "ร.ต.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "ร.ท." ||
      item["tbmemberinfo.mem_rank"] === "ว่าที่ ร.ท." ||
      item["tbmemberinfo.mem_rank"] === "ร.ท.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "ร.อ." ||
      item["tbmemberinfo.mem_rank"] === "ร.อ.หญิง"
  );
  const renderData2 = () => {
    const renderedItems = [];
    for (let i = 0; i < filteredData2.length; i++) {
      renderedItems.push(filteredData2[i]["editscore"]);
    }

    return renderedItems;
  };
  const calculateMean2 = () => {
    let sum = 0;
    filteredData2.forEach((item) => {
      item["editscore"] === null || item["editscore"] === 0
        ? (sum += item["realscore"])
        : (sum += item["editscore"]);
    });

    const mean = sum / filteredData2.length;
    return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
  };

  const filteredData3 = filteredData.filter(
    (item) =>
      item["tbmemberinfo.mem_rank"] === "พ.อ.อ.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "พ.อ.อ." ||
      item["tbmemberinfo.mem_rank"] === "พ.อ.ท.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "พ.อ.ท." ||
      item["tbmemberinfo.mem_rank"] === "พ.อ.ต.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "พ.อ.ต."
  );
  const renderData3 = () => {
    const renderedItems = [];
    for (let i = 0; i < filteredData3.length; i++) {
      renderedItems.push(filteredData3[i]["editscore"]);
    }

    return renderedItems;
  };
  const calculateMean3 = () => {
    let sum = 0;
    filteredData3.forEach((item) => {
      item["editscore"] === null || item["editscore"] === 0
        ? (sum += item["realscore"])
        : (sum += item["editscore"]);
    });

    const mean = sum / filteredData3.length;
    return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
  };

  const filteredData4 = filteredData.filter(
    (item) =>
      item["tbmemberinfo.mem_rank"] === "จ.อ.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "จ.อ." ||
      item["tbmemberinfo.mem_rank"] === "จ.ท.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "จ.ท." ||
      item["tbmemberinfo.mem_rank"] === "จ.ต.หญิง" ||
      item["tbmemberinfo.mem_rank"] === "จ.ต."
  );

  const renderData4 = () => {
    const renderedItems = [];
    for (let i = 0; i < filteredData4.length; i++) {
      renderedItems.push(filteredData4[i]["editscore"]);
    }

    return renderedItems;
  };

  const calculateMean4 = () => {
    let sum = 0;
    filteredData4.forEach((item) => {
      item["editscore"] === null || item["editscore"] === 0
        ? (sum += item["realscore"])
        : (sum += item["editscore"]); // sum += item["editscore"];
    });

    const mean = sum / filteredData4.length;
    return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
  };

  const filteredData5 = filteredData.filter(
    (item) =>
      item["tbmemberinfo.mem_rank"] === "ไม่ระบุ" ||
      item["tbmemberinfo.mem_rank"] === "นางสาว" ||
      item["tbmemberinfo.mem_rank"] === "นาง" ||
      item["tbmemberinfo.mem_rank"] === "นาย"
  );

  const renderData5 = () => {
    const renderedItems = [];
    for (let i = 0; i < filteredData5.length; i++) {
      renderedItems.push(filteredData5[i]["editscore"]);
    }

    return renderedItems;
  };

  const calculateMean5 = () => {
    let sum = 0;
    filteredData5.forEach((item) => {
      item["editscore"] === null || item["editscore"] === 0
        ? (sum += item["realscore"])
        : (sum += item["editscore"]);
    });

    const mean = sum / filteredData5.length;
    return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
  };

  const maxScores1 =
    Math.max.apply(Math, renderData1()) === -Infinity
      ? 0
      : Math.max.apply(Math, renderData1());
  const maxScores2 =
    Math.max.apply(Math, renderData2()) === -Infinity
      ? 0
      : Math.max.apply(Math, renderData2());
  const maxScores3 =
    Math.max.apply(Math, renderData3()) === -Infinity
      ? 0
      : Math.max.apply(Math, renderData3());
  const maxScores4 =
    Math.max.apply(Math, renderData4()) === -Infinity
      ? 0
      : Math.max.apply(Math, renderData4());
  const maxScores5 =
    Math.max.apply(Math, renderData5()) === -Infinity
      ? 0
      : Math.max.apply(Math, renderData5());
  const minScores1 =
    Math.min.apply(Math, renderData1()) === Infinity
      ? 0
      : Math.min.apply(Math, renderData1());
  const minScores2 =
    Math.min.apply(Math, renderData2()) === Infinity
      ? 0
      : Math.min.apply(Math, renderData2());
  const minScores3 =
    Math.min.apply(Math, renderData3()) === Infinity
      ? 0
      : Math.min.apply(Math, renderData3());
  const minScores4 =
    Math.min.apply(Math, renderData4()) === Infinity
      ? 0
      : Math.min.apply(Math, renderData4());
  const minScores5 =
    Math.min.apply(Math, renderData5()) === Infinity
      ? 0
      : Math.min.apply(Math, renderData5());
  const allScoresmax = [
    maxScores1,
    maxScores2,
    maxScores3,
    maxScores4,
    maxScores5,
  ];
  const allScoresmin = [
    minScores1,
    minScores2,
    minScores3,
    minScores4,
    minScores5,
  ];
  const nonZeroNumbers = allScoresmin.filter((number) => number !== 0);

  function getFullName(params) {
    return `${params.row["tbmemberinfo.mem_rank"] || ""} ${
      params.row["tbmemberinfo.mem_fname"] || ""
    } ${params.row["tbmemberinfo.mem_lname"] || ""}`;
  }
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
          toast.success("แก้ไขคะแนนเรียบร้อย");
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
          toast.success("แก้ไขคะแนนเรียบร้อย");
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

  const columns = [
    {
      field: "id",
      headerName: "ลำดับ",
      width: 100,
      valueGetter: (params) =>
        params.api.getRowIndex(params.row["testresultcode"]) + 1,
    },
    { field: "tbmemberinfo.pers_id", headerName: "เลขประจำตัว", width: 300 },
    {
      field: "tbtestreservation.testappvcode",
      headerName: "รหัสการทดสอบ",
      width: 220,
    },
    {
      field: "FullName",
      headerName: "ยศ ชื่อ นามสกุล",
      width: 220,
      align: "center",
      valueGetter: getFullName,
    },
    {
      field: "tbtestreservation.tbtestscoringcriterium.mission",
      headerName: "เหตุผลขอรับการทดสอบ",
      width: 220,
    },
    { field: "testlabroom", headerName: "สถานที่", width: 220 },
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
      width: 220,
    },
    { field: "realscore", headerName: "คะแนน", width: 220 },
    {
      field: "editscore",
      headerName: "แก้ไขคะแนน",
      width: 220,
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
                },
              }}
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
              InputProps={{
                inputProps: {
                  style: { textAlign: "center", fontSize: 14 },
                },
              }}
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
              onBlur={(e) => handleBlur(e, params.row.testresultcode)}
              //  onChange={(e) => handleChangeeditscore(e, params.row.testresultcode)}
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

  return (
    <>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ข้อมูลผลคะแนนการทดสอบ
        </Box>
      </Typography>
      {/* <DrawerHeader /> */}
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {testresultapprv === 1 ? (
          <Box>
            <PrintTableScore
              countRole1={countRole1()}
              countRole2={countRole2()}
              countRole3={countRole3()}
              countRole4={countRole4()}
              countRole5={countRole5()}
              calculateMean1={calculateMean1()}
              calculateMean2={calculateMean2()}
              calculateMean3={calculateMean3()}
              calculateMean4={calculateMean4()}
              calculateMean5={calculateMean5()}
              max1={maxScores1}
              max2={maxScores2}
              max3={maxScores3}
              max4={maxScores4}
              max5={maxScores5}
              min1={minScores1}
              min2={minScores2}
              min3={minScores3}
              min4={minScores4}
              min5={minScores5}
              allScoresmax={
                Math.max.apply(Math, allScoresmax) === -Infinity
                  ? 0
                  : Math.max.apply(Math, allScoresmax)
              }
              allScoresmin={
                Math.min.apply(Math, nonZeroNumbers) === Infinity
                  ? 0
                  : Math.min.apply(Math, nonZeroNumbers)
              }
              selectAllList={selectAllList}
              testreqdate={data.testreqdate}
              realscoredate={data.realscoredate}
              filteredData={filteredData}
              date={date}
              data={data}
              token={token}
              //  testreqdate =
            />
          </Box>
        ) : (
          ""
        )}

        <Box>
          <Typography component="subtitle1">
            ค่าเฉลี่ยผลการทดสอบภาษาอังกฤษ
          </Typography>
        </Box>
      </Box>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>
          วันที่จอง วันที่ {date} เวลา {reqtime} น.
        </Box>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {USR04 === "0" && USR05 === "0" && USR02 === "1" ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "10px" }}
          >
            <Typography component="subtitle1" sx={{ fontSize: "20px" }}>
              {orgname}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "10px" }}
          >
            <FormControl sx={{ minWidth: 180 }} disabled>
              <InputLabel id="demo-simple-select-label">
                หน่วยที่ต้องการดู
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="หน่วยที่ต้องการดู"
                onChange={handleChange}
                defaultValue={data.testrequnit}
              >
                {Companys.map((Company) => (
                  <MenuItem value={Company} key={Company}>
                    {Company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      <br />

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <TableContainer component={Paper} sx={{ width: "60%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ชั้นยศ</StyledTableCell>
                <StyledTableCell>จำนวนผู้เข้ารับการทดสอบ</StyledTableCell>
                <StyledTableCell>ค่าเฉลี่ย</StyledTableCell>
                <StyledTableCell>คะแนนสูงสุด</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  น.ต.-น.อ.
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole1()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {calculateMean1().toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, renderData1()) === -Infinity
                    ? 0
                    : Math.max.apply(Math, renderData1())}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  ร.ต.-ร.อ.
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole2()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {calculateMean2().toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, renderData2()) === -Infinity
                    ? 0
                    : Math.max.apply(Math, renderData2())}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  พ.อ.ต.-พ.อ.อ.
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole3()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {calculateMean3().toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, renderData3()) === -Infinity
                    ? 0
                    : Math.max.apply(Math, renderData3())}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  จ.ต.-จ.อ.
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole4()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {calculateMean4().toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, renderData4()) === -Infinity
                    ? 0
                    : Math.max.apply(Math, renderData4())}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  พนักงานราชการและลูกจ้าง
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole5()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {calculateMean5().toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, renderData5()) === -Infinity
                    ? 0
                    : Math.max.apply(Math, renderData5())}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  รวม
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {countRole1() +
                    countRole2() +
                    countRole3() +
                    countRole4() +
                    countRole5()}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {isNaN(
                    (calculateMean1() +
                      calculateMean2() +
                      calculateMean3() +
                      calculateMean4() +
                      calculateMean5()) /
                      (countRole1() +
                        countRole2() +
                        countRole3() +
                        countRole4() +
                        countRole5())
                  )
                    ? 0
                    : parseFloat(
                        (calculateMean1() +
                          calculateMean2() +
                          calculateMean3() +
                          calculateMean4() +
                          calculateMean5()) /
                          (countRole1() +
                            countRole2() +
                            countRole3() +
                            countRole4() +
                            countRole5())
                      ).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {Math.max.apply(Math, allScoresmax) === -Infinity
                    ? 0
                    : Math.max.apply(Math, allScoresmax)}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
        <Link
          to="/ContentListDivisionScores"
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
        </Link>
        <DataGrid
          getRowId={(row) => row["testresultcode"]}
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

export default ContentPageListTestScoresDivision;
