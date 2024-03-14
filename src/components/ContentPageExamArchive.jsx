/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbar,
  GridLinkOperator,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ModalEditExamArchive from "../components/ModalEditExamArchive";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ModalAddMultiple from "../components/ModalAddMultiple";
import ModalAddOne from "../components/ModalAddOne";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import ModalAddTypeExam from "./ModalAddTypeExam";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//set up dialog for addExam
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

function ContentPageExamArchive() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;

  const columns = [
    { field: "id", headerName: "รหัสความสามารถทางภาษาอังกฤษสากล", width: 250 },
    {
      field: "cerfdifficultylevel",
      headerName: "ระดับความยากง่ายตามกรอบ CEFR",
      width: 230,
    },
    {
      field: "cerfdifficultyleveldesc",
      headerName: "ลักษณะข้อสอบ",
      width: 600,
    },
    { field: "n_cerfcode", headerName: "จำนวนข้อ", width: 90 },
    {
      field: "management",
      headerName: "การจัดการ",
      width: 350,
      renderCell: (params) => {
        return (
          <strong>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="third"
                size="small"
                style={{ marginLeft: 16, color: "#fff" }}
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  lookExamHandler(params);
                }}
              >
                ดูข้อสอบ
              </Button>
            </ThemeProvider>

            {/* edit button */}
            <ModalEditExamArchive
              cerfcode={params.row["id"]}
              cerfdifficultylevel={params.row["cerfdifficultylevel"]}
              cerfdifficultyleveldesc={params.row["cerfdifficultyleveldesc"]}
            />

            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                startIcon={<DeleteForeverIcon />}
                onClick={() => {
                  handleDeleteClick(params);
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

  //get questions from backend include [tbcefrdifficultylevel, tbquestion]
  const [questionLists, setQuestionLists] = useState([]);
  useEffect(() => {
    var config = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/getquestioninfo",
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((response) => {
        setQuestionLists(response.data);
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
  }, []);

  //ย้ายไปไว้ที่ ModalAddOne
  //Create Dropdown Lists
  var cerfcodeDropdown = [];
  for (let i = 0; i < questionLists.length; i++) {
    cerfcodeDropdown.push(questionLists[i].id);
  }

  //show question look exam
  const navigate = useNavigate();
  const lookExamHandler = (clickedexam) => {
    navigate("/PageExamArchiveLookExam", {
      state: {
        id: clickedexam.row.id,
        cerfdifficultylevel: clickedexam.row.cerfdifficultylevel,
        cerfdifficultyleveldesc: clickedexam.row.cerfdifficultyleveldesc,
      },
    });
  };

  const handleDeleteClick = (clickedexam) =>{
    confirmAlert({
      title: 'ยืนยันการลบ',
      message: `คุณต้องการที่จะลบ ${clickedexam.row.id} ใช่หรือไม่`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => toDeleteCefrLevel(clickedexam),
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ],
    });
  }

  //Delete CefrLevel
  const toDeleteCefrLevel = (clickedexam) => {
    const id = clickedexam.row.id;

    var config = {
      method: "DELETE",
      url: process.env.REACT_APP_API_URL + `/delcefrlevel/${id}`,
      headers: {
        authtoken: "bearer " + token,
      }, 
    };
    Axios(config).then(
      (response) => {
        setQuestionLists(
          questionLists.filter((val) => {
            return val["id"] !== id;
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
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  //open-close Dialog เพิ่มโจทย์ข้อสอบ
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  //open-close Dialog เพิ่มประเภทข้อสอบ
  const [openS, setOpenS] = React.useState(false);
  const handleOpenS = () => setOpenS(true);
  const handleCloseS = () => setOpenS(false);

  //กำหนดตัวแปร scroll ให้กับ Dialog: body->ไม่มีแถบ Scrollbar ด้านข้าง, paper->มีแถบ Scrollbar ด้านข้าง
  const [scroll, setScroll] = React.useState("paper");

  //เพิ่มประเภทข้อสอบ
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (openS) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openS]);

  //function search
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
      <DrawerHeader />
      <div style={{ height: 450, width: "100%" }}>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
          เพิ่มโจทย์ข้อสอบ
        </Button>

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
            เพิ่มโจทย์ข้อสอบ
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

        {/* เพิ่มประเภทข้อสอบ */}
        <ModalAddTypeExam />

        <DataGrid
          rows={questionLists}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ Toolbar: QuickSearchToolbar }}
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
      <DrawerHeader />
      <Footer />
    </>
  );
}

export default ContentPageExamArchive;



