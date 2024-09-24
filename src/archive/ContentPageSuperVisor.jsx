/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

//confirmDialog
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

//import function filter member by usrtypeid
import { filter, filterByClick } from "../archive/filterMember";
import { toast } from "react-toastify";

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

function ContentPageSuperVisor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;

  const columns = [
    { field: "id", headerName: "ลำดับ", width: 50 },
    { field: "idnumber", headerName: "เลขประจำตัว", width: 150 },
    { field: "name", headerName: "ยศ ชื่อ นามสกุล", width: 200 },
    { field: "position", headerName: "ตำแหน่ง", width: 500 },
    { field: "affiliation", headerName: "สังกัด", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "management",
      headerName: "การจัดการ",
      width: 220,
      renderCell: (params) => (
        <strong>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ marginLeft: 16, color: "#000" }}
              startIcon={<EditIcon />}
              onClick={() => {
                editHandler(params);
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
              startIcon={<DeleteForeverIcon />}
              onClick={() => {
                handleDeleteClick(params);
                //toDeleteMember(params);
              }}
            >
              DELETE
            </Button>
          </ThemeProvider>
        </strong>
      ),
    },
  ];

  //get member from backend include [tbmember,tbmemberinfo, tbaccessrights]
  const [MemberLists, setMemberLists] = useState([]);
  useEffect(() => {
    var config = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/getmemberinfo",
      headers: {
        authtoken: "bearer " + token,
      },
    };
    Axios(config)
      .then((response) => {
        setMemberLists(response.data);
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
  //console.log(MemberLists);

  //filter member by usertypeid = usr04 and select data to show in datagrid
  const members = filter("USR04", MemberLists);
  //console.log(members);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  //function edit member
  const navigate = useNavigate();
  const editHandler = (clickedMember) => {
    const data = filterByClick(
      MemberLists,
      "official_id",
      clickedMember.row.idnumber,
      "tbmemberinfos.mem_email",
      clickedMember.row.email
    );
    navigate("/PageEditRegister", {
      state: {
        data: data,
        url: "/PageSuperVisor",
      },
    });
  };

  const handleDeleteClick = (clickedMember) => {
    //console.log(clickedMember);
    confirmAlert({
      title: "ยืนยันการลบ",
      message: `คุณต้องการที่จะลบ ${clickedMember.row.name} ใช่หรือไม่`,
      buttons: [
        {
          label: "Yes",
          onClick: () => toDeleteMember(clickedMember),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const toDeleteMember = (clickedMember) => {
    const delData = filterByClick(
      MemberLists,
      "official_id",
      clickedMember.row.idnumber,
      "tbmemberinfos.mem_email",
      clickedMember.row.email
    );
    // const delId = delData[0].pers_id + "-" + "USR04";
    const delId = `${delData[0].pers_id}-USR04`;

    var config = {
      method: "DELETE",
      url: process.env.REACT_APP_API_URL + `/delmember/${delId}`,
      headers: {
        authtoken: "bearer " + token,
      },
    };
    Axios(config)
      .then((response) => {
        setMemberLists(
          MemberLists.filter((val) => {
            return val["tbaccessrights.accessrightsid"] !== delId;
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
          ข้อมูลผู้บังคับบัญชา
        </Box>
      </Typography>
      <DrawerHeader />
      <div style={{ height: 450, width: "100%" }}>
        <Link to="/PageMember" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            BACK
          </Button>
        </Link>
        <Link to="/ContentPageAddSuperVisor" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ControlPointIcon />}>
            เพิ่มสมาชิก
          </Button>
        </Link>
        <DataGrid
          rows={members}
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

export default ContentPageSuperVisor;
