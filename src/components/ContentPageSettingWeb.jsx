import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { lightGreen } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow ,green} from "@mui/material/colors";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ModalEditIpAddress from '../components/ModalEditIpAddress'
import Footer from '../components/Footer'





const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "company", headerName: "หน่วยงาน", width: 300 },
    { field: "ipaddress", headerName: "IP Address", width: 300 },
    {field: "manage",headerName: "การจัดการ",width: 500, renderCell: (params) => (
      <strong>
<ModalEditIpAddress />

  

  <ThemeProvider theme={theme}>
    <Button
      variant="contained"
      color="primary"
      size="small"
      style={{ marginLeft: 16 }}
      startIcon={<DeleteForeverIcon />}
    >
      DELETE
    </Button>
  </ThemeProvider>
    </strong>
    ),},
  ];
  
  const rows = [
    { id: 1, company: "ศภษ.ยศ.ทอ.", ipaddress: "10.107.82.1" },
    { id: 2, company: "ศภษ.ยศ.ทอ.", ipaddress: "10.107.82.1" },
    { id: 3, company: "ศภษ.ยศ.ทอ.", ipaddress: "10.107.82.1" },
    { id: 4, company: "ศภษ.ยศ.ทอ.", ipaddress: "10.107.82.1" },
    { id: 5, company: "ศภษ.ยศ.ทอ.", ipaddress: "10.107.82.1" },
  ];

  const columnsSave = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "date", headerName: "วดป.", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "loginDate", headerName: "เวลาเข้าสู่ระบบ", width: 200 },
    { field: "logoutDate", headerName: "เวลาออกจากระบบ", width: 200 },
    { field: "lastmenu", headerName: "เมนูสูดท้ายที่ใช้งานก่อนออกจากระบบ", width: 200 },
  ];
  
  const rowsSave = [
    { id: 1, date: "24/06/2565", email: "watcharin_dang" ,loginDate:'0906',logoutDate:'0910',lastmenu:'ทำแแบทดสอบ'},
    { id: 2, date: "24/06/2565", email: "watcharin_dang" ,loginDate:'0906',logoutDate:'0910',lastmenu:'ทำแแบทดสอบ'},
    { id: 3, date: "24/06/2565", email: "watcharin_dang" ,loginDate:'0906',logoutDate:'0910',lastmenu:'ทำแแบทดสอบ'},
    { id: 4, date: "24/06/2565", email: "watcharin_dang" ,loginDate:'0906',logoutDate:'0910',lastmenu:'ทำแแบทดสอบ'},
    { id: 5, date: "24/06/2565", email: "watcharin_dang" ,loginDate:'0906',logoutDate:'0910',lastmenu:'ทำแแบทดสอบ'},
  ];


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

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: lightGreen[500],
    "&:hover": {
      backgroundColor: alpha(
        lightGreen[500],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: lightGreen[500],
  },
}));

function ContentPageSettingWeb() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

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
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </Box>
    );
  }


  const ButtonDownLoad = styled(Button)(({ theme }) => ({
    // color: theme.palette.getContrastText(green[50]),
    color:green[50],
    backgroundColor: green[700],
    borderColor: green[400],
    borderWidth: "2px",
    '&:hover': {
      backgroundColor: green[500],
      borderColor: green[700],
      borderWidth: "2px",
    },
  }));

  return (
    <>
      <p>ยินดีต้อนรับ จ.อ.อาทิตย์ แสนโคก</p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#EEEEEE",
            width: "100%",
            height: "100px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
          >
            <p>สถานะเว็บไซต์</p>
            <GreenSwitch defaultChecked />
            <p>
              ปิด:ขออภัย กำลังปรับปรุงเว็บไซต์ (อนุญาตเฉพาะผู้คุมสอบ
              ผู้บังคับบัญชา ผู้ดูแลระบบ Login เข้าสู่ระบบได้เท่านั้น)
            </p>
          </Box>
        </Box>
        <br />
        <Box
          sx={{
            backgroundColor: "#EEEEEE",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
          >
            <p>ควบคุมการเข้าถึง</p>
            <GreenSwitch defaultChecked />
            <p>
              ควบคุมการเข้าสู่ระบบในบางเวลา เช่น การสอบรายการสำคัญๆ
              อนุญาตให้ผู้เข้าสอบอยู่ในระบบเท่านั้น
            </p>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
          >
            <p>อนุญาตเฉพาะ IP Address</p>
            <Button sx={{ marginLeft: "50px" }} variant="contained"  onClick={handleClickOpen}>
              เพิ่มการอนุญาต
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"เพิ่มการอนุญาต IP Address"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <Box sx={{padding:'10px'}}>
           <TextField id="outlined-basic" label="หน่วยงาน" variant="outlined" />
           <TextField id="outlined-basic" label="IP Address" variant="outlined" sx={{marginLeft:'10px'}}/>
           </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">บันทึก</Button>
        </DialogActions>
      </Dialog>
          </Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
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
     
        </Box>
        <br />
        <Box
          sx={{
            backgroundColor: "#EEEEEE",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "50px" }}
          >
            <p>บันทึกเข้าสู่ระบบ</p>
            <ButtonDownLoad startIcon={<ArrowDownwardIcon />}  sx={{ marginLeft: "50px" }} variant="contained">
              ดาวโหลด
            </ButtonDownLoad>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: 16 }}
                startIcon={<DeleteForeverIcon />}
              >
                ลบการบันทึก
              </Button>
            </ThemeProvider>
          </Box>
          <Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsSave}
          columns={columnsSave}
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
          </Box>
        </Box>
      </Box>
      <DrawerHeader />
        <Footer />  
    </>
  );
}

export default ContentPageSettingWeb;
