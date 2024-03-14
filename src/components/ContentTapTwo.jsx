import React from 'react'
import Box from "@mui/material/Box";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material/styles";
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLinkOperator,
  } from '@mui/x-data-grid';
import ModalEditRegisterBook from '../components/ModalEditRegisterBook'
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue, red, yellow } from "@mui/material/colors";
import Paper from '@mui/material/Paper';
import "../index.css";




function ContentTapTwo() {

    const [CanCleBook, setCanCleBook] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [check, SetCheck] = React.useState(false);
    const [CanCleBookS , setCanCleBookS] = React.useState(false);
    const [SubmitBook, SetSubmitBook] = React.useState(false);
    const [openBook, setOpenBook] = React.useState(false);
    const [CanCleCheck, SetCanCleCheck,] = React.useState(false);

    const handleCanCleBook = () => {
        SetCanCleCheck(value => !value)
        SetSubmitBook(false);
      }
    const CanCleSubmitBook = () => {
        setCanCleBookS(value => !value)
        SetCanCleCheck(false);
      }
    const CloseCanCleBook = () => {
        setCanCleBook(false);
      };
    const OpenCanCleBook = () => {
        setCanCleBook(true);
        
      };

   
    const handleChangeS = (event) => {
        setAge(event.target.value);
      };
    const handleClickCheck = () => {
        SetCheck(value => !value)
        setCanCleBookS(false)
        SetSubmitBook(false)
      }
    const handleClickOpenBook = () => {
        setOpenBook(true);
    
  };
    const handleCloseBook = () => {
        setOpenBook(false);
  };
    const handleSubmitBook = () => {
        SetSubmitBook(value => !value)
        setOpenBook(false);
        SetCheck(false)
  }

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
        { field: "id", headerName: "ลำดับ", width: 50 },
        { field: "idnumber", headerName: "เลขประจำตัว", width: 150 },
        { field: "name", headerName: "ยศ ชื่อ สกุล", width: 200 },
        { field: "position", headerName: "ตำแหน่ง", width: 250 },
        { field: "affiliation", headerName: "สังกัด", width: 100 },
        { field: "corp", headerName: "เหล่า", width: 100 },
        { field: "group", headerName: "จำพวกทหาร", width: 100 },
        { field: "image", headerName: "รูปถ่าย", width: 100 },
        { field: "Email", headerName: "Email", width: 200 },
        { field: "mobilenumber", headerName: "เบอร์มือถือ", width: 100 },
        { field: "worknumber", headerName: "เบอร์ที่ทำงาน", width: 100 },
        {field: "manage",headerName: "การจัดการ",width: 250, renderCell: (params) => (
          <strong>
 
          <Box sx={{display: "flex"}}>
          <ModalEditRegisterBook />
      
      
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
          </Box>
      
        </strong>
        ),},
      ];
      
      const rowsSS = [
        { id: 1, idnumber: "0000000000", name: "จ.อ.อาทิตย์ แสนโคก" ,position:'จนท.ปซว.',Email:'aaaa@rtaf.mi.th'},
        
      ];

      function createData(no,date, period,register,remain) {
        return {no, date, period,register,remain };
      }

      const rows = [
        createData('1','1 ก.พ.2565' , "9:00 - 10.00","0","100" ),
        createData('2','1 ก.พ.2565' , "10:30 - 11.30","50","50" ),
        createData('3','1 ก.พ.2565' , "13:30 - 14.30","20","80" ),
       
     
      ];
      const CancleBook = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
          backgroundColor: red[700],
        },
      }));
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

  return (
    <div>
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
            <TextField  InputLabelProps={{
            shrink: true,
          }} type="file" id="outlined-basic"  label="อัพโหลดไฟล์ กรุณาใช้ฟอร์มของระบบ" variant="outlined" />
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
        <Box sx={{width:'200px' ,height:'40px',backgroundColor: "#4caf50" ,borderRadius: "50px",textAlign: "center",display: "flex",justifyContent: "center",alignItems: "center"}}>
          <p style={{color:'#ffffff' ,fontWeight:'bold',fontSize:'14px'}}>จองวันทดสอบเรียบร้อย</p>
        </Box>
        <p>วันที่เข้ารับการทดสอบ: 1 ก.พ.2565 เวลา: 09:00</p>
        </Box>) : ''}

        {CanCleBookS === true  ? ( <Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center",alignItems: "center", flexDirection: "column",padding:'10px'}}>
        <Box sx={{width:'200px' ,height:'40px',backgroundColor: "#f44336" ,borderRadius: "50px",textAlign: "center",display: "flex",justifyContent: "center",alignItems: "center"}}>
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
        <br />
        <Box sx={{display: 'flex',justifyContent:'flex-end'}}>
  {SubmitBook === true ? (<CancleBook variant="contained" onClick={handleCanCleBook}>กรณียกเลิกการจอง</CancleBook>) : ''}

</Box>
    </div>
  )
}

export default ContentTapTwo