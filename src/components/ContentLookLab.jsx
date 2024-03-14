/* eslint-disable no-unused-vars */
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



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

const columns = [
  { field: "id", headerName: "ลำดับ", width: 50 },
  { field: "bookingcode", headerName: "รหัสการจอง", width: 100 },
  { field: "bookingdate", headerName: "วันที่จอง", width: 150 },
  { field: "bookingtime", headerName: "เวลาที่จอง", width: 150 },
  {
    field: "examlocation",
    headerName: "สถานที่สอบ",
    width: 150,
  },
  { field: "examcode", headerName: "รหัสการสอบ", width: 150 },
  {
    field: "examiner",
    headerName: "ผู้คุมสอบ",
    width: 200,
  },
  {
    field: "type",
    headerName: "แบบ",
    width: 150,
  },
  {
    field: "management",
    headerName: "การจัดการ",
    width: 150,
    renderCell: (params) => (
      <strong>
        <Link to="/PageExamManagement" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
          >
            เข้าดูรายชื่อ
          </Button>
        </Link>
      </strong>
    ),
  },
  {
    field: "pass",
    headerName: "เกณฑ์การผ่าน",
    width: 150,
    renderCell: (params) => (
      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="ผ่าน" />
      </FormGroup>
    ),
  },
];

const rows = [
  {
    id: 1,
    bookingcode: "xxxxx",
    bookingdate: "1 ก.พ.65",
    bookingtime: "9.00 น.",
    examlocation: "lab 1",
    examcode: "1234567891",
    examiner: "ร.ต.รักชาติ ยิ่งชีพ",
    type:'แบบ random'
  },
  {
    id: 2,
    bookingcode: "xxxxx",
    bookingdate: "1 ก.พ.65",
    bookingtime: "9.00 น.",
    examlocation: "lab 1",
    examcode: "1234567891",
    examiner: "ร.ต.รักชาติ ยิ่งชีพ",
    type:'แบบ random'
  },
  {
    id: 3,
    bookingcode: "xxxxx",
    bookingdate: "1 ก.พ.65",
    bookingtime: "9.00 น.",
    examlocation: "lab 1",
    examcode: "1234567891",
    examiner: "ร.ต.รักชาติ ยิ่งชีพ",
    type:'แบบ random'
  },
  {
    id: 4,
    bookingcode: "xxxxx",
    bookingdate: "1 ก.พ.65",
    bookingtime: "9.00 น.",
    examlocation: "lab 1",
    examcode: "1234567891",
    examiner: "ร.ต.รักชาติ ยิ่งชีพ",
    type:'แบบ random'
  },
  {
    id: 5,
    bookingcode: "xxxxx",
    bookingdate: "1 ก.พ.65",
    bookingtime: "9.00 น.",
    examlocation: "lab 1",
    examcode: "1234567891",
    examiner: "ร.ต.รักชาติ ยิ่งชีพ",
    type:'แบบ random'
  },
];

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

function ContentLookLab() {
  var months = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
  var d = new Date();
  
  const [PreviousMonth , setPreviousMonth] = React.useState("")
  const [NextMonth , setNextMonth] = React.useState("")

 
  const handlePreviousMonth = () => {
    const stateDate =   new Date().getMonth() - 1
   //  const Previous = new Date(2022, stateDate);
   //  console.log(Previous)
   setPreviousMonth(months[stateDate])
   }

   const handleNextMonth = () => {
     const stateDate =   new Date().getMonth() + 1
     // const Next = new Date(2022, stateDate);
     setNextMonth(months[stateDate])
   }




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
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          การจัดการทดสอบ
        </Box>
      </Typography>
      <DrawerHeader />
      <Box sx={{width: "100%",display: "flex",justifyContent:"space-between"}}>
        <Box sx={{display: "flex",justifyContent:"center",alignItems: "center"}}>
          <IconButton aria-label="delete" size="large" onClick={handlePreviousMonth}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="subtitle1" gutterBottom>
       {months[d.getMonth() - 1]} {d.getFullYear() + 543}
      </Typography>
        </Box>
        <Box sx={{display: "flex",justifyContent:"center",alignItems: "center"}}>
        <Typography variant="subtitle1" gutterBottom>
        {months[d.getMonth() + 1]} {d.getFullYear() + 543}
      </Typography>
        <IconButton aria-label="delete" size="large" onClick={handleNextMonth}>
        <NavigateNextIcon />
      </IconButton>
    
        </Box>
      </Box>
      <div style={{ height: 450, width: "100%" }}>
      <Link to="/PageTestManagement" style={{ textDecoration: "none" }}>
      <Button variant="outlined" sx={{margin: '10px 0px'}}  startIcon={<ArrowBackIcon />}>
        BACK
      </Button>
      </Link>
        <Box sx={{ display: "flex" }}>
          <Box
            component="span"
            sx={{
              p: 1,
              backgroundColor: "#eeeeee",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <span style={{ color: "#000" }}>ที่นั่งสอบคงเหลือ</span>
            <span style={{ color: "#4caf50", marginLeft: "10px" }}>
              lab1(หมายเลขLabจะขึ้นตามlabที่กด) = 20
            </span>
          </Box>
             
        </Box>
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
    </>
  );
}

export default ContentLookLab;
