/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Card from "@mui/material/Card";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModalEditExamArchiveLookExam from "../components/ModalEditExamArchiveLookExam";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ModalAddMultiple from "../components/ModalAddMultiple";
import ModalAddOne from "../components/ModalAddOne";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ModalEditExamByCerfcode from "./ModalEditExamByCerfcode";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../../src/store/userSilce";
import { toast } from "react-toastify";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

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
          <CloseIcon />
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

function ContentPageExamArchiveLookExam() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state}));
  const token = user.user.token;
  const navigate = useNavigate();

  //get data from navigate to show in Datagrid
  const location = useLocation();
  //โจทย์+ตัวเลือก Tbquestion include Tbchoice
const [choiceLists, setChoiceLists] = useState([]);
useEffect(() => {
  var config = {
    method: "GET",
    url: process.env.REACT_APP_API_URL + "/getchoicelist",
    headers: {
      authtoken: "bearer " + token,
    },
  };
  Axios(config).then((response) => {
    setChoiceLists(response.data);
  }).catch((error) => {
    if(error.response.status === 401 || error.response.status === 404) {
      dispatch(logout());
      navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
    } else {
      toast.error(error.response.data.message);
    }
  });
  }, []);

  const columns = [
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
                startIcon={<DeleteForeverIcon />}
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

  var cerfcodeDropdown = [location.state.id];
  // for (let i = 0; i < questionLists.length; i++) {
  //   cerfcodeDropdown.push(questionLists[i].id);
  // }

  function filter(nameKey, myArray) {
    var questionAndChoice = [];
    var j = 1;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].cerfcode === nameKey) {
        questionAndChoice.push({
          id: j++,
          questioncode: myArray[i].questioncode,
          question: myArray[i].question,
          problem: myArray[i].problem,
          choicecode: myArray[i]["tbchoices.choicecode"],
          choicetext: myArray[i]["tbchoices.choicetext"],
          answer: myArray[i]["tbchoices.answer"],
          cerfcode: myArray[i].cerfcode,
          formcode: myArray[i].formcode,
        });
      }
    }

    return questionAndChoice;
  }

  const choice = filter(`${location.state.id}`, choiceLists);

  const handleDeleteClick = (clickedexam) =>{
    //console.log(clickedMember);
    confirmAlert({
      title: 'ยืนยันการลบ',
      message: `คุณต้องการที่จะลบ ${clickedexam.row.questioncode} ใช่หรือไม่`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => toDeleteQuestionAndChoice(clickedexam),
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ],
    });
  };
 
//Delete QuestionAndChoice
const toDeleteQuestionAndChoice = (clickedexam) => {
  const questioncode = clickedexam.row.questioncode;
  var config = {
    method: "DELETE",
    url: process.env.REACT_APP_API_URL + `/delquestionandchoice/${questioncode}`,
    headers: {
      authtoken: "bearer " + token,
    },
  };

  Axios(config).then((response) => {
      setChoiceLists(
        choiceLists.filter((val) => {
          return val["questioncode"] !== questioncode;
        })
      );
      toast.success(response.data.msg);
    })
    .catch((error) => {
      if(error.response.status === 401 || error.response.status === 404) {
        dispatch(logout());
        navigate('/notfound404', { state: {statusCode: error.response.status, txt: error.response.data} })
      } else {
        toast.error(error.response.data.message);
      }
    });

  // Axios.delete(process.env.REACT_APP_API_URL + `/delquestionandchoice/${questioncode}`).then(
  //   (response) => {
  //     setChoiceLists(
  //       choiceLists.filter((val) => {
  //         return val["questioncode"] !== questioncode;
  //       })
  //     );
  //   }
  // );
};

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          คลังข้อสอบ
        </Box>
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}
      >
        <Button
          variant="outlined"
          startIcon={<ControlPointIcon />}
          onClick={handleClickOpen}
        >
          เพิ่มโจทย์ข้อสอบ
        </Button>
      </Box>

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
        <Link to="/PageExamArchive" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
        </Link>
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

          <Typography
            sx={{ fontSize: 16, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Box>รหัสความสามารถทางภาษาอังกฤษสากล</Box>
            <Box sx={{ marginLeft: "100px" }}>{location.state.id}</Box>
          </Typography>

          <Typography
            sx={{ fontSize: 16, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Box>ระดับความยากง่ายตามกรอบ</Box>
            <Box sx={{ marginLeft: "172px" }}>
              {location.state.cerfdifficultylevel}
            </Box>
          </Typography>
          <Typography
            sx={{ fontSize: 16, display: "flex" }}
            color="text.secondary"
            gutterBottom
          >
            <Box>ลักษณะข้อสอบ</Box>
            <Box sx={{ marginLeft: "263px" }}>
              {location.state.cerfdifficultyleveldesc}
            </Box>
          </Typography>
        </Card>
      </Box>

      {/* show question for each cerflevel */}
      <DataGrid
        sx={{ marginTop: "30px" }}
        rows={choice}
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


