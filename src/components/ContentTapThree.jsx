/* eslint-disable no-unused-vars */
import React from 'react'
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
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
import Switch from '@mui/material/Switch';
import { lightGreen } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue, red, yellow } from "@mui/material/colors";

function ContentTapThree() {
    const [age, setAge] = React.useState('');
    const [openBook, setOpenBook] = React.useState(false);
    const [SubmitBook, SetSubmitBook] = React.useState(false);
    const [check, SetCheck] = React.useState(true);
    const [CanCleBookS , setCanCleBookS] = React.useState(false);
    const [CanCleCheck, SetCanCleCheck,] = React.useState(false);
    const [CanCleBook, setCanCleBook] = React.useState(false);
 
    const OpenCanCleBook = () => {
        setCanCleBook(true);
        
      };
    const CanCleSubmitBook = () => {
        setCanCleBookS(value => !value)
        SetCheck(true);
        SetCanCleCheck(false)
      }
    const CloseCanCleBook = () => {
        setCanCleBook(false);
      };
    const handleCanCleBook = () => {
        SetCanCleCheck(value => !value)
        SetSubmitBook(false);
        
      }
    const handleSubmitBook = () => {
        SetSubmitBook(value => !value)
        setOpenBook(false);
        SetCheck(false)
  }
    const handleCloseBook = () => {
        setOpenBook(false);
  };
    const handleClickOpenBook = () => {
        setOpenBook(true);
        setCanCleBookS(false)
      };
    const handleChangeS = (event) => {
        setAge(event.target.value);
      };

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
      const label = { inputProps: { 'aria-label': 'Color switch demo' } };



  return (
    <div>
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
        <br />
        {check === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
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
        {/* <Box sx={{display: 'flex',justifyContent: 'center'}}>
            {SubmitBook === true ? "" : (<Button variant="contained"  onClick={handleClickOpenBook}>ตกลง</Button>)}
        
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

</Box> */}
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
        </Box>
        {CanCleCheck === true ? (<Box sx={{height:'100%' , width:'100%',backgroundColor: "#EEEEEE",borderRadius: "10px",display: "flex",justifyContent: "center", flexDirection: "column",padding:'10px'}}>
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

export default ContentTapThree