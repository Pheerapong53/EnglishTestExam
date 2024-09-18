import React, { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  ArrowBack,
  Edit,
  DeleteForever,
  ControlPoint,
} from "@mui/icons-material";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { blue, red, yellow } from "@mui/material/colors";
import { toast } from "react-toastify";
//import { filter } from "./functions/filterMember";

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
    <Box sx={{ p: 0.5, pb: 0 }}>
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

function filterMembers(nameKey, myArray) {
  var members = [];
  var j = 1;
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i]["tbaccessrights.usrtypeid"] === nameKey) {
      members.push({
        id: j++,
        idnumber: myArray[i].official_id,
        name:
          myArray[i]["tbmemberinfos.mem_rank"] +
          myArray[i]["tbmemberinfos.mem_fname"] +
          " " +
          myArray[i]["tbmemberinfos.mem_lname"],
        position: myArray[i]["tbmemberinfos.mem_pos"],
        affiliation: myArray[i]["tbmemberinfos.mem_affiliation"],
        email: myArray[i]["tbmemberinfos.mem_email"],
      });
    }
  }

  return members;
}

function ContentPageMemberInformation() {
  //Component Declaration
  const { right } = useParams();
  const titlePage = {
    USR01: "ข้อมูลผู้เข้าสอบ",
    USR02: "ข้อมูลผู้ประสานงาน",
    USR03: "ข้อมูลผู้คุมสอบ",
    USR04: "ข้อมูลผู้บังคับบัญชา",
    USR05: "ข้อมูลผู้ดูแลระบบ",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
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
              startIcon={<Edit />}
              onClick={() => {
                //editHandler(params);
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
                //handleDeleteClick(params)
              }}
            >
              DELETE
            </Button>
          </ThemeProvider>
        </strong>
      ),
    },
  ];
  const [MemberLists, setMemberLists] = useState([]);
  const members = filterMembers(right, MemberLists);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  //Hooks and Logic
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

  //Event Handlers

  //Render
  return (
    <>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          {titlePage[right]}
        </Box>
      </Typography>
      <DrawerHeader />
      <div style={{ height: 450, width: "100%" }}>
        <Link to="/PageMember" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBack />}>
            ย้อนกลับ
          </Button>
        </Link>
        <Link
          to={`/ContentPageAddMember/${right}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" startIcon={<ControlPoint />}>
            เพิ่มสมาชิก
          </Button>
        </Link>
        <Link to="/ContentPageAddExam" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ControlPoint />}>
            เพิ่มสมาชิก(Old)
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

export default ContentPageMemberInformation;
