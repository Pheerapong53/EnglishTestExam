/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import {
  DeleteForever,
  Close,
  ArrowBack,
  ControlPoint,
} from "@mui/icons-material";
import ModalEditExamArchiveLookExam from "../components/ModalEditExamArchiveLookExam";
import PropTypes from "prop-types";
import ModalAddMultiple from "../components/ModalAddMultiple";
import ModalAddOne from "../components/ModalAddOne";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import ModalEditExamByCerfcode from "./ModalEditExamByCerfcode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

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
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function ContentPageExamArchiveLookExam() {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();

  //get data from navigate to show in Datagrid
  const location = useLocation();

  const columns = [
    { field: "id", headerName: "ลำดับ", width: 100 },
    {
      field: "questioncode",
      headerName: "รหัสโจทย์",
      width: 200,
    },
    { field: "problem", headerName: "ไฟล์โจทย์", width: 200 },
    { field: "question", headerName: "โจทย์", width: 400 },
    { field: "formcode", headerName: "รหัสฟอร์ม", width: 150 },
    {
      field: "checkbookingdate",
      headerName: "การจัดการ",
      width: 300,
      renderCell: (params) => {
        return (
          <strong>
            {/* แก้ไขโจทย์ข้อสอบ */}
            <ModalEditExamByCerfcode params={params} />

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                startIcon={<DeleteForever />}
                onClick={() => {
                  handleDeleteClick(params);
                  //toDeleteQuestionAndChoice(params);
                }}
              >
                DELETE
              </Button>
            </ThemeProvider>
          </strong>
        );
      },
    },
  ];

  const columns_old = [
    { field: "id", headerName: "ลำดับ", width: 100 },
    { field: "questioncode", headerName: "รหัสโจทย์", width: 200 },
    { field: "problem", headerName: "ไฟล์โจทย์", width: 200 },
    { field: "question", headerName: "โจทย์", width: 400 },
    { field: "choicetext", headerName: "ตัวเลือก", width: 400 },
    { field: "answer", headerName: "คำตอบถูก(1)/ผิด(0)", width: 150 },
    { field: "cerfcode", headerName: "รหัสความสามารถ", width: 150 },
    { field: "formcode", headerName: "รหัสฟอร์ม", width: 150 },
    {
      field: "checkbookingdate",
      headerName: "การจัดการ",
      width: 300,
      renderCell: (params) => {
        return (
          <strong>
            {/* แก้ไขโจทย์ข้อสอบ */}
            <ModalEditExamByCerfcode params={params} />

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                startIcon={<DeleteForever />}
                onClick={() => {
                  handleDeleteClick(params);
                  //toDeleteQuestionAndChoice(params);
                }}
              >
                DELETE
              </Button>
            </ThemeProvider>
          </strong>
        );
      },
    },
  ];

  const DetailRow = ({ label, value, labelWidth }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={labelWidth}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12 - labelWidth}>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );

  var cerfcodeDropdown = [location.state.id];

  //Hooks and Logic
  //โจทย์+ตัวเลือก Tbquestion include Tbchoice
  const [choiceLists, setChoiceLists] = useState([]);
  const [questionLists, setQuestionLists] = useState([]);

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    var configQuestion = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/getquestionfilterbycerfcode/${location.state.id}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };
    var configChoice = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/getchoicelist",
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Promise.all([Axios(configQuestion), Axios(configChoice)])
      .then(([questionRes, choiceRes]) => {
        setQuestionLists(questionRes.data);
        setChoiceLists(choiceRes.data);
      })
      .catch(handleError);
  }, []);

  const filterData = (key, myArray, isChoice = false) => {
    return myArray
      .filter((item) => item.cerfcode === key)
      .map((item, index) => ({
        id: index + 1,
        questioncode: item.questioncode,
        question: item.question,
        problem: item.problem,
        cerfcode: item.cerfcode,
        formcode: item.formcode,
        ...(isChoice && {
          choicecode: item["tbchoices.choicecode"],
          choicetext: item["tbchoices.choicetext"],
          answer: item["tbchoices.answer"],
        }),
      }));
  };

  const choice = filterData(location.state.id, choiceLists, true);
  const question = filterData(location.state.id, questionLists, false);
  // console.log("Choice :", choice);
  // console.log("Question :", question);

  //Event Handlers
  const handleError = (error) => {
    if (error.response?.status === 401 || error.response?.status === 404) {
      dispatch(logout());
      navigate("/notfound404", {
        state: {
          statusCode: error.response.status,
          txt: error.response.data,
        },
      });
    } else {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteClick = (clickedexam) => {
    //console.log(clickedMember);
    confirmAlert({
      title: "ยืนยันการลบ",
      message: `คุณต้องการที่จะลบ ${clickedexam.row.questioncode} ใช่หรือไม่`,
      buttons: [
        {
          label: "Yes",
          onClick: () => toDeleteQuestionAndChoice(clickedexam),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  //Delete QuestionAndChoice
  const toDeleteQuestionAndChoice = (clickedexam) => {
    const questioncode = clickedexam.row.questioncode;
    var config = {
      method: "DELETE",
      url:
        process.env.REACT_APP_API_URL + `/delquestionandchoice/${questioncode}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((response) => {
        setChoiceLists(
          choiceLists.filter((val) => {
            return val["questioncode"] !== questioncode;
          })
        );
        toast.success(response.data.msg);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 404) {
          dispatch(logout());
          navigate("/notfound404", {
            state: {
              statusCode: error.response.status,
              txt: error.response.data,
            },
          });
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Render
  return (
    <>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          คลังข้อสอบ
        </Box>
      </Typography>
      <DrawerHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Link to="/PageExamArchive" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBack />}>
            BACK
          </Button>
        </Link>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="outlined"
            startIcon={<ControlPoint />}
            onClick={handleClickOpen}
          >
            เพิ่มโจทย์ข้อสอบ
          </Button>
        </div>
      </div>

      {/* Alert Dialog When Click "เพิ่มโจทย์ข้อสอบ" */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          เพิ่มคลังข้อสอบ
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              width: "500px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {/* เพิ่มรายข้อ */}
            <ModalAddOne dropdown={cerfcodeDropdown} />

            {/* เพิ่มหลายข้อ */}
            <ModalAddMultiple />
          </Box>
        </DialogContent>
      </BootstrapDialog>

      {/* show detail exam from PageExamArchive */}
      <Box>
        <Card
          sx={{
            minWidth: 275,
            minHeight: "25vh",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            padding: "25px",
          }}
          elevation={6}
        >
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            รายละเอียดข้อสอบ
          </Typography>
          <DetailRow
            label="รหัสความสามารถทางภาษาอังกฤษสากล"
            value={location.state.id}
            labelWidth={4}
          />

          <DetailRow
            label="ระดับความยากง่ายตามกรอบ"
            value={location.state.cerfdifficultylevel}
            labelWidth={4}
          />

          <DetailRow
            label="ลักษณะข้อสอบ"
            value={location.state.cerfdifficultyleveldesc}
            labelWidth={4}
          />
          <DetailRow
            label="ประเภทของการวัดทักษะ"
            value={location.state.cerfleveltype}
            labelWidth={4}
          />
        </Card>
      </Box>

      {/* show question for each cerflevel */}
      <DataGrid
        sx={{ marginTop: "30px" }}
        rows={question}
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
    </>
  );
}

export default ContentPageExamArchiveLookExam;
