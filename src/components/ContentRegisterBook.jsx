import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { blue, red, yellow } from "@mui/material/colors";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { lightGreen } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: lightGreen[600],
    '&:hover': {
      backgroundColor: alpha(lightGreen[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: lightGreen[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const CancleBook = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[500],
    },
   
  },
});

const columnSS = [
  { field: "id", headerName: "ลำดับ", width: 200 },
  { field: "idnumber", headerName: "เลขประจำตัว", width: 500 },
  { field: "name", headerName: "ยศ ชื่อ สกุล", width: 500 },
  { field: "position", headerName: "ตำแหน่ง", width: 500 },
  { field: "affiliation", headerName: "สังกัด", width: 500 },
  { field: "corp", headerName: "เหล่า", width: 500 },
  { field: "group", headerName: "จำพวกทหาร", width: 500 },
  { field: "image", headerName: "รูปถ่าย", width: 500 },
  { field: "Email", headerName: "Email", width: 500 },
  { field: "mobilenumber", headerName: "เบอร์มือถือ", width: 500 },
  { field: "worknumber", headerName: "เบอร์ที่ทำงาน", width: 500 },
  {field: "manage",headerName: "การจัดการ",width: 500, renderCell: (params) => (
    <strong>
<ThemeProvider theme={theme}>
        <Link to="/ContentPageEditRegisterBook" style={{ textDecoration: "none", color: "black" }}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        style={{ marginLeft: 16, color: "#000" }}
        startIcon={<EditIcon />}
      >
        EDIT
      </Button>
      </Link>
    </ThemeProvider>



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

const rowsSS = [
  { id: 1, idnumber: "0000000000", name: "จ.อ.อาทิตย์ แสนโคก" ,position:'จนท.ปซว.',Email:'aaaa@rtaf.mi.th'},
  
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function ContentRegisterBook() {
  const [CanCleBook, setCanCleBook] = React.useState(false);
  const [openBook, setOpenBook] = React.useState(false);
  const [check, SetCheck] = React.useState(false);
  const [SubmitBook, SetSubmitBook] = React.useState(false);
  const [CanCleBookS , setCanCleBookS] = React.useState(false);
  const [CanCleCheck, SetCanCleCheck,] = React.useState(false);

  const OpenCanCleBook = () => {
    setCanCleBook(true);
  };
  const CloseCanCleBook = () => {
    setCanCleBook(false);
  };

  const CanCleSubmitBook = () => {
    setCanCleBookS(value => !value)
    SetCanCleCheck(false);
  }

  const handleClickCheck = () => {
    SetCheck(value => !value)
    setCanCleBookS(false)
  }

  const handleSubmitBook = () => {
    SetSubmitBook(value => !value)
    setOpenBook(false);
    SetCheck(false)
  }

const handleCanCleBook = () => {
  SetCanCleCheck(value => !value)
  SetSubmitBook(false);
}

  const handleClickOpenBook = () => {
    setOpenBook(true);
    
  };

  const handleCloseBook = () => {
    setOpenBook(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [age, setAge] = React.useState('');

  const handleChangeS = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 18,
      textAlign: 'center',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: 'center'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(no,date, period,register,remain) {
    return {no, date, period,register,remain };
  }
  
  const rows = [
    createData('1','1 ก.พ.2565' , "9:00 - 10.00","0","100" ),
    createData('2','1 ก.พ.2565' , "10:30 - 11.30","50","50" ),
    createData('3','1 ก.พ.2565' , "13:30 - 14.30","20","80" ),
   
 
  ];

  return (
    <>
    <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ลงทะเบียนจองวันทดสอบ
        </Box>
      </Typography>
      <Container >
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="ละทะเบียนรายบุคคล" {...a11yProps(0)} />
          <Tab label="ลงทะเบียนแบบกลุ่ม" {...a11yProps(1)} />
          <Tab label=" ล็อควันทดสอบ" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",padding:'10px' }}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px" }}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ลงทะเบียนรายบุคคล</p>
           
          </Box>
        <Box sx={{display: 'flex' ,justifyContent: 'center'}}>
        <Box sx={{display: "flex",justifyContent: "center", flexDirection: "column"}}>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
            <TextField error id="outlined-error-helper-text" label="เลขประจำตัวประชาชน" helperText="ไม่พบข้อมูลกรุณากรอกให้ครบถ้วน" variant="outlined"/>
            </Box>
            <Box sx={{marginLeft:'10px'}}>
                <Button sx={{width:'100px',height:'55px'}} variant="outlined">ค้นหา</Button>
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="ยศ" variant="outlined" />
            </Box>
            <Box sx={{marginLeft:'10px'}}>
                <Button sx={{width:'100px',height:'55px'}} variant="outlined">ค้นหา</Button>
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="ชื่อ" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="ตำแหน่ง" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="เหล่า" variant="outlined" />
            </Box>
            <Box sx={{marginLeft:'10px'}}>
              <TextField id="outlined-basic" label="จำพวก" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="สังกัด" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
            <Button sx={{width:'223px',height:'55px'}} variant="outlined"  onClick={handleOpen}>แสดงรูปภาพ</Button>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="400"
        image="https://img.freepik.com/free-photo/portrait-young-asia-lady-with-positive-expression-arms-crossed-smile-broadly-dressed-casual-clothing-looking-camera-pink-background_7861-3201.jpg?w=1060&t=st=1660809837~exp=1660810437~hmac=6ff5b3faac3a3a90bffe03874e4bd98d025255ec2637f5614d6c624a282adbc6"
        alt="green iguana"
      />
      </Card>
        </Box>
      </Modal>
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="เบอร์มือถือ" variant="outlined" />
            </Box>
            <Box sx={{marginLeft:'10px'}}>
              <TextField id="outlined-basic" label="เบอร์ที่ทำงาน" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <TextField id="outlined-basic" label="E-mail" variant="outlined" />
            </Box>
          </Box>
        </Box>
        <Box>
        <TableContainer component={Paper}>
          <p style={{textAlign:'center',fontSize:'18px',fontWeight:'bold'}}>สถานะการจอง</p>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ลำดับ</StyledTableCell>
            <StyledTableCell>วันที่</StyledTableCell>
            <StyledTableCell>ช่วงเวลา</StyledTableCell>
            <StyledTableCell>ลงทะเบียนแล้ว</StyledTableCell>
            <StyledTableCell>คงเหลือ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow  key={row.no}>
              <StyledTableCell align="right">{row.no}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.period}</StyledTableCell>
              <StyledTableCell align="right">{row.register}</StyledTableCell>
              <StyledTableCell align="right">{row.remain}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        </Box>
        </Box>

        <br />
        <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px" }}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>เลือกวันและเวลาทดสอบ</p>
           
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <p>เหตุผลขอรับการทดสอบ:</p>
            </Box>
            <Box sx={{width:'20%'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">ราชการต่างประเทศ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="ราชการต่างประเทศ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Box sx={{width:'20%',marginLeft:'10px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">สำหรับ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="สำหรับ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Box sx={{width:'20%',marginLeft:'10px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">ประเทศ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="ประเทศ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <p>วันที่เข้ารับการทดสอบ:</p>
            </Box>
            <Box sx={{width:'20%' ,marginLeft:'12px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">1 ก.พ.2565</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="1 ก.พ.2565"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
              <p>ช่วงเวลา:</p>
            </Box>
            <Box sx={{width:'20%' ,marginLeft:'100px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">9.00</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="9.00"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
          </Box>
          <Box sx={{display: 'flex',justifyContent: 'center'}}>
<Stack spacing={2} direction="row">
      <Link to="/PageBookDate" style={{ textDecoration: "none" }}>
      <Button variant="contained"  startIcon={<ArrowBackIcon />}>
        BACK
      </Button>
      </Link>
      <Button variant="contained" onClick={handleClickCheck}>ตรวจสอบ</Button>
    </Stack>
</Box>
        </Box>
        <br />
        {check === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px",textAlign: "center"}}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ตรวจสอบข้อมูล <br /> รหัสการจอง eeeee วันและเวลาที่จอง : 1 ก.พ.65 เวลา 9.00</p>
            
          </Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsSS}
          columns={columnSS}
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
      <br />
      <Box sx={{display: 'flex',justifyContent: 'center'}}>

      <Button variant="contained" onClick={handleClickOpenBook}>ยืนยันการจองวันทดสอบ</Button>
      <Dialog
        open={openBook}
        onClose={handleCloseBook}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันการจองวันทดสอบ"}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmitBook}>ตกลง</Button>
          <Button onClick={handleCloseBook} >ยกเลิก</Button>
        </DialogActions>
      </Dialog>
</Box>
        </Box> ): ""}
       
        {SubmitBook === true  ? ( <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",padding:'10px'}}>
        <Box sx={{width:'200px' ,backgroundColor: "#4caf50" ,borderRadius: "50px",textAlign: "center"}}>
          <p style={{color:'#ffffff' ,fontWeight:'bold',fontSize:'14px'}}>จองวันทดสอบเรียบร้อย</p>
        </Box>
        <p>วันที่เข้ารับการทดสอบ: 1 ก.พ.2565 เวลา: 09:00</p>
        </Box>) : ''}

        {CanCleBookS === true  ? ( <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",padding:'10px'}}>
        <Box sx={{width:'200px' ,backgroundColor: "#4caf50" ,borderRadius: "50px",textAlign: "center"}}>
          <p style={{color:'#ffffff' ,fontWeight:'bold',fontSize:'14px'}}>ยกเลิกการจองเรียบร้อย</p>
        </Box>
        </Box>) : ''}


        {CanCleCheck === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px",textAlign: "center"}}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ท่านลงทะเบียนไปแล้ว เมื่อ 3 ก.พ.2565 รายละเอียดดังนี้ <br /> รหัสการจอง eeeee วันและเวลาที่จอง : 1 ก.พ.65 เวลา 9.00</p>
            
          </Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsSS}
          columns={columnSS}
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
      <br />
      <Box sx={{display: 'flex',justifyContent: 'center'}}>

       <Button variant="contained" onClick={OpenCanCleBook}>ยกเลิกการจอง</Button>
      <Dialog
        open={CanCleBook}
        onClose={CloseCanCleBook}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยกเลิกการจองวันทดสอบ"}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={CanCleSubmitBook}>ตกลง</Button>
          <Button onClick={CloseCanCleBook} >ยกเลิก</Button>
        </DialogActions>
      </Dialog>
</Box>
        </Box> ): ""}

      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",padding:'10px' }}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px" }}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ลงทะเบียนแบบกลุ่ม</p>
           
          </Box>
        <Box sx={{display: 'flex' ,justifyContent: 'center'}}>
        <Box sx={{display: "flex",justifyContent: "center", flexDirection: "column"}}>
        <Box>
              <p>ไฟล์ที่ไว้ในการอัพโหลด:</p>
            </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box>
            <TextField id="outlined-basic" label="อัพโหลดไฟล์ กรุณาใช้ฟอร์มของระบบ" variant="outlined" />
            </Box>
            <Box sx={{marginLeft:'10px'}}>
                <Button sx={{width:'200px',height:'55px'}} variant="outlined">ดาวโหลดแบบฟอร์ม</Button>
            </Box>
          </Box>
            <Box>
              <p>เหตุผลขอรับการทดสอบ:</p>
            </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
            <Box sx={{width:'30%'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">ราชการต่างประเทศ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="ราชการต่างประเทศ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Box sx={{width:'30%',marginLeft:'10px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">สำหรับ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="สำหรับ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Box sx={{width:'30%',marginLeft:'10px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">ประเทศ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="ประเทศ"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>   
          </Box>
          <Box>
              <p>วันที่เข้ารับการทดสอบ:</p>
            </Box>
            <Box sx={{display:'flex',padding:'10px'}}>
            <Box sx={{width:'100%'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">1 ก.พ.2565</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="1 ก.พ.2565"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            </Box>
            <Box>
              <p>ช่วงเวลา:</p>
            </Box>
            <Box sx={{display:'flex',padding:'10px'}}>
            <Box sx={{width:'100%'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">9.00</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="9.00"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            </Box>
        </Box>
        <Box>
        <TableContainer component={Paper}>
        <p style={{textAlign:'center',fontSize:'18px',fontWeight:'bold'}}>สถานะการจอง</p>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ลำดับ</StyledTableCell>
            <StyledTableCell>วันที่</StyledTableCell>
            <StyledTableCell>ช่วงเวลา</StyledTableCell>
            <StyledTableCell>ลงทะเบียนแล้ว</StyledTableCell>
            <StyledTableCell>คงเหลือ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow  key={row.no}>
              <StyledTableCell align="right">{row.no}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.period}</StyledTableCell>
              <StyledTableCell align="right">{row.register}</StyledTableCell>
              <StyledTableCell align="right">{row.remain}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        </Box>
        <Box sx={{display: 'flex',justifyContent: 'center'}}>
<Stack spacing={2} direction="row">
<Link to="/PageBookDate" style={{ textDecoration: "none" }}>
      <Button variant="contained"  startIcon={<ArrowBackIcon />}>
        BACK
      </Button>
      </Link>
      <Button variant="contained" onClick={handleClickCheck}>ตรวจสอบ</Button>
    </Stack>
</Box>
        </Box>
        <br />
        {check === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px",textAlign: "center"}}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ตรวจสอบข้อมูล <br /> รหัสการจอง eeeee วันและเวลาที่จอง : 1 ก.พ.65 เวลา 9.00</p>
            
          </Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsSS}
          columns={columnSS}
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
      <br />
      <Box sx={{display: 'flex',justifyContent: 'center'}}>

      <Button variant="contained" onClick={handleClickOpenBook}>ยืนยันการจองวันทดสอบ</Button>
      <Dialog
        open={openBook}
        onClose={handleCloseBook}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยืนยันการจองวันทดสอบ"}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmitBook}>ตกลง</Button>
          <Button onClick={handleCloseBook} >ยกเลิก</Button>
        </DialogActions>
      </Dialog>
</Box>
        </Box> ): ""}
       
        {SubmitBook === true  ? ( <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",padding:'10px'}}>
        <Box sx={{width:'200px' ,backgroundColor: "#4caf50" ,borderRadius: "50px",textAlign: "center"}}>
          <p style={{color:'#ffffff' ,fontWeight:'bold',fontSize:'14px'}}>จองวันทดสอบเรียบร้อย</p>
        </Box>
        <p>วันที่เข้ารับการทดสอบ: 1 ก.พ.2565 เวลา: 09:00</p>
        </Box>) : ''}

        {CanCleBookS === true  ? ( <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",padding:'10px'}}>
        <Box sx={{width:'200px' ,backgroundColor: "#4caf50" ,borderRadius: "50px",textAlign: "center"}}>
          <p style={{color:'#ffffff' ,fontWeight:'bold',fontSize:'14px'}}>ยกเลิกการจองเรียบร้อย</p>
        </Box>
        </Box>) : ''}


        {CanCleCheck === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px",textAlign: "center"}}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ท่านลงทะเบียนไปแล้ว เมื่อ 3 ก.พ.2565 รายละเอียดดังนี้ <br /> รหัสการจอง eeeee วันและเวลาที่จอง : 1 ก.พ.65 เวลา 9.00</p>
            
          </Box>
          <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rowsSS}
          columns={columnSS}
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
      <br />
      <Box sx={{display: 'flex',justifyContent: 'center'}}>

       <Button variant="contained" onClick={OpenCanCleBook}>ยกเลิกการจอง</Button>
      <Dialog
        open={CanCleBook}
        onClose={CloseCanCleBook}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ยกเลิกการจองวันทดสอบ"}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={CanCleSubmitBook}>ตกลง</Button>
          <Button onClick={CloseCanCleBook} >ยกเลิก</Button>
        </DialogActions>
      </Dialog>
</Box>
        </Box> ): ""}

      </TabPanel>
      <TabPanel value={value} index={2}>
      <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",padding:'10px' }}>
        <Box
            sx={{ display: "flex", alignItems: "center",justifyContent: "center",marginLeft: "50px" }}
          >
            <p style={{fontSize:'18px',fontWeight:'bold'}}>ล็อควันทดสอบ</p>
           
          </Box>
          <Box sx={{display:'flex',padding:'10px'}}>
              <TextField sx={{width:'100%'}} id="outlined-basic" label="กิจกรรม" variant="outlined" />
            </Box>
            <Box sx={{display:'flex',padding:'10px'}}>
            <FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">วันที่</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="วันที่"
          onChange={handleChangeS}
        >
          <MenuItem value={10}>1 ก.พ.2565</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
            </Box>
            <Box sx={{display:'flex',padding:'10px'}}>
        <TableContainer component={Paper}>
          <p style={{textAlign:'center',fontSize:'18px',fontWeight:'bold'}}>สถานะการจอง</p>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>ลำดับ</StyledTableCell>
            <StyledTableCell>วันที่</StyledTableCell>
            <StyledTableCell>ช่วงเวลา</StyledTableCell>
            <StyledTableCell>ลงทะเบียนแล้ว</StyledTableCell>
            <StyledTableCell>คงเหลือ</StyledTableCell>
            <StyledTableCell>ล็อควัน</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow  key={row.no}>
              <StyledTableCell align="right">{row.no}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.period}</StyledTableCell>
              <StyledTableCell align="right">{row.register}</StyledTableCell>
              <StyledTableCell align="right">{row.remain}</StyledTableCell>
              <StyledTableCell align="right"> <GreenSwitch {...label} defaultChecked /></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
        <Box sx={{display: 'flex',justifyContent: 'center'}}>
<Stack spacing={2} direction="row">
<Link to="/PageBookDate" style={{ textDecoration: "none" }}>
      <Button variant="contained"  startIcon={<ArrowBackIcon />}>
        BACK
      </Button>
      </Link>
      <Button variant="contained">ตกลง</Button>
    </Stack>
</Box>
        </Box>
      </TabPanel>
    </Box>

<Box sx={{display: 'flex',justifyContent:'flex-end'}}>
  {SubmitBook === true ? (<CancleBook variant="contained" onClick={handleCanCleBook}>กรณียกเลิกการจอง</CancleBook>) : ''}

</Box>

<Box sx={{textAlign: "center"}}>
  <p style={{fontSize: '12px'}}>ในกรณีที่ต้องยกเลิกการจองวันทดสอบ ให้กรอกข้อมูลตามที่ได้ลงทะเบียนไว้และกดปุ่มลงทะเบียนอีกครั้ง จากนั้นให้กดปุ่ม "ยกเลิกการลงทะเบียน" ที่แสดงขึ้นมา</p>
</Box>

    </Container>
    </>
  )
}

export default ContentRegisterBook