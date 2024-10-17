import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
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
  Edit,
} from "@mui/icons-material";
import ModalEditExamByCerfcode from "./ModalEditExamByCerfcode";
import PropTypes from "prop-types";
import ButtonAddMultiple from "../components/ButtonAddMultiple";
import ModalAddOne from "../components/ModalAddOne";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { toast } from "react-toastify";
import ToPrintPageExamArchiveByForm from "./ToPrintPageExamArchiveByForm";

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

function ContentPageExamArchiveByForm() {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();
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
    { field: "cerfcode", headerName: "รหัสความยากง่าย", width: 200 },
    { field: "formcode", headerName: "รหัสฟอร์ม", width: 150 },
    {
      field: "checkbookingdate",
      headerName: "การจัดการ",
      width: 300,
      renderCell: (params) => {
        return (
          <strong>
            {/* แก้ไขโจทย์ข้อสอบ */}
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }}
                startIcon={<Edit />}
                onClick={() => {
                  setParams(params);
                  handleOpenModal();
                }}
              >
                EDIT
              </Button>
            </ThemeProvider>

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
  //Hooks and Logic
  const [openModal, setOpenModal] = useState(false);
  const [params, setParams] = useState();
  const [open, setOpen] = React.useState(false);
  const [questionLists, setQuestionLists] = useState([]);
  console.log(questionLists);

  const [formcode, setFormcode] = useState(""); // To store selected formcode

  useEffect(() => {
    var configQuestion = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + `/getquestionlist`,
      headers: {
        authtoken: "bearer " + token,
      },
    };
    Axios(configQuestion)
      .then((res) => {
        setQuestionLists(res.data);
      })
      .catch(handleError);
  }, []);

  const filterData = (key, myArray) => {
    return myArray
      .filter((item) => item.formcode === key)
      .map((item, index) => ({
        id: index + 1,
        questioncode: item.questioncode,
        question: item.question,
        problem: item.problem,
        cerfcode: item.cerfcode,
        formcode: item.formcode,
      }));
  };

  // Fileter questions based on selected formcode
  const question = filterData(formcode, questionLists);

  // Extract unique formcodes for the dropdown options
  const uniqueFormcodes = [
    ...new Set(questionLists.map((item) => item.formcode)),
  ];

  const cerfcodeDropdown = [
    ...new Set(questionLists.map((item) => item.cerfcode)),
  ];

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

  const handleDeleteForm = () => {
    if (formcode === "") {
      toast.error("กรุณาเลือกฟอร์ม");
      return;
    }
    confirmAlert({
      title: "ยืนยันการลบ",
      message: `คุณต้องการที่จะลบฟอร์ม ${formcode} ใช่หรือไม่`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            toDeleteForm();
          },
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
        setQuestionLists(
          questionLists.filter((val) => {
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

  const toDeleteForm = () => {
    var config = {
      method: "DELETE",
      url: process.env.REACT_APP_API_URL + `/delform/${formcode}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };

    Axios(config)
      .then((response) => {
        setQuestionLists(
          questionLists.filter((val) => {
            return val["formcode"] !== formcode;
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
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //Render
  return (
    <>
      <ModalEditExamByCerfcode
        params={params}
        open={openModal}
        handleClose={handleCloseModal}
      />

      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          คลังข้อสอบ
        </Box>
      </Typography>
      <DrawerHeader />
      <div style={{ height: 450, width: "100%" }}>
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
          <Box display="flex" alignItems="center" gap="20px">
            <FormControl style={{ width: 200 }}>
              <InputLabel id="formcode-select-label" sx={{ fontSize: "18px" }}>
                กรุณาเลือกฟอร์ม
              </InputLabel>
              <Select
                labelId="formcode-select-label"
                id="formcode-select"
                value={formcode}
                label="Select Formcode"
                onChange={(e) => setFormcode(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Formcode</em>
                </MenuItem>
                {uniqueFormcodes.map((code, index) => (
                  <MenuItem key={index} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <ToPrintPageExamArchiveByForm toprint={question} />
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<DeleteForever />}
                onClick={() => {
                  handleDeleteForm();
                }}
              >
                DELETE FORM
              </Button>
            </ThemeProvider>
          </Box>
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
              <ButtonAddMultiple />
            </Box>
          </DialogContent>
        </BootstrapDialog>

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
      </div>
    </>
  );
}

export default ContentPageExamArchiveByForm;
