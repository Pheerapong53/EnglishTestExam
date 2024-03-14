// import React from 'react'
// import { blue, red, green } from "@mui/material/colors";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Chip from '@mui/material/Chip';
// import Modal from '@mui/material/Modal'
// import Box from '@mui/material/Box'
// import Typography from "@mui/material/Typography";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { styled } from "@mui/material/styles";


// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//     fontSize: 18,
//     textAlign: 'center'
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));






// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: "50%",
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };
// const theme = createTheme({
//     palette: {
//       primary: {
//         main: red[500],
//       },
//       secondary: {
//         main: green[500],
//       },
//       third: {
//         main: blue[800],
//       },
//     },
//   });
// function ModalTestPass() {

//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//   return (
//     <>
//         <strong>
//                <ThemeProvider theme={theme}>
//               <Chip label="ผ่าน" color="secondary"   onClick={handleOpen}/>
//               </ThemeProvider>
//               <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" sx={{textAlign: "center",fontWeight:'bold'}} variant="h5" component="h2">
//            ชุดข้อสอบภาษาอังกฤษ
//           </Typography>
//           <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" ,marginTop:'10px'}}>
//           <Typography id="modal-modal-title" sx={{textAlign: "center",fontWeight:'bold'}} variant="p" component="p">
//            เกณฑ์ผ่าน 60 คะแนน
//           </Typography>
//           </Box>
//           <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>state</StyledTableCell>
//             <StyledTableCell >คะแนน/100</StyledTableCell>
//             <StyledTableCell >คะแนนที่ได้</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
          
//             <StyledTableRow>
//               <StyledTableCell ><p>เสร็จสิ้น</p><p>Submitted Friday, 27 january 2022, 4:11PM.</p></StyledTableCell>
//               <StyledTableCell sx={{textAlign: 'center'}}>0.00</StyledTableCell>
//               <StyledTableCell sx={{textAlign: 'center'}}>0.00</StyledTableCell>
//             </StyledTableRow>
         
//         </TableBody>
//       </Table>
//     </TableContainer>


//           <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" ,marginTop:'10px'}}>
//           <Typography id="modal-modal-title" sx={{textAlign: "center"}} variant="p" component="p">
//            คะแนนที่ได้ คือ 0.00
//           </Typography>
//           <Typography id="modal-modal-title" sx={{textAlign: "center",color: "green",fontWeight:'bold'}} variant="p" component="p">
//            ผ่าน
//           </Typography>
//           <Typography id="modal-modal-title" sx={{textAlign: "center",fontSize:'10px'}} variant="p" component="p">
//            หมดสิทธิ์ทำข้อสอบแล้ว
//           </Typography>
//           </Box>
//         </Box>
//       </Modal>
//         </strong>
//     </>
//   )
// }

// export default ModalTestPass

import React from 'react'
import { blue, red, green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from "@mui/material/styles";
import moment from "moment";
require("moment/locale/th");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 18,
    textAlign: 'center',
 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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






const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: green[500],
      },
      third: {
        main: blue[800],
      },
    },
  });
function ModalTestPass({minscore,realscore,testconductdate,submittime,editscore,realscoredate}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

// console.log(minscore,realscore,testconductdate,submittime,editscore,'realscoredate',realscoredate)
const date = moment(realscoredate).add(543, "year").format("DD MMMYY")
const reqtime = moment(submittime,'HH:mm:ss').format('HH.mm');
// console.log(date,reqtime)
  return (
    <>
        <strong>
               
        
               <ThemeProvider theme={theme}>

                    {editscore === null || editscore === 0? 
                    realscore >= minscore ? 
                      <Chip label="ผ่าน" color="secondary"  sx={{ fontWeight: 'bold'}} onClick={handleOpen}/>:
                      <Chip label="ไม่ผ่าน"  color="primary" sx={{ fontWeight: 'bold'}} onClick={handleOpen}/>
                  
                    :
                    
                    editscore >= minscore ? 
                    <Chip label="ผ่าน" color="secondary"   onClick={handleOpen}/>
                    :
                    <Chip label="ไม่ผ่าน"  color="primary" onClick={handleOpen}/>
                  
                    }

              </ThemeProvider>             

              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{textAlign: "center",fontWeight:'bold'}} variant="h5" component="h2">
           ชุดข้อสอบภาษาอังกฤษ
          </Typography>
          
          <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" ,marginTop:'10px'}}>
          <Typography id="modal-modal-title" sx={{textAlign: "center",fontWeight:'bold',fontSize:'18px'}} variant="p" component="p">
           เกณฑ์ผ่าน {minscore} คะแนน
          </Typography>
          </Box>
          <br></br>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>หัวข้อ</StyledTableCell>
            <StyledTableCell >คะแนน / 100</StyledTableCell>
            <StyledTableCell >คะแนนที่ได้</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow >
             
              <StyledTableCell ><Typography sx={{fontSize:'18px'}}><b>เสร็จสิ้น</b><br></br>ส่งข้อสอบ วันที่ {date === "Invalid date" ?'-' : date},เวลา {reqtime === "Invalid date" ?'-' : reqtime} น.</Typography></StyledTableCell>
              <StyledTableCell sx={{textAlign: 'center'}}><Typography sx={{fontSize:'18px',fontWeight:'bold'}}>100</Typography></StyledTableCell>

              {editscore === null || editscore === 0? 
              <StyledTableCell sx={{textAlign: 'center'}}><Typography sx={{fontSize:'18px',fontWeight:'bold'}}>{realscore}</Typography></StyledTableCell>:

              <StyledTableCell sx={{textAlign: 'center'}}><Typography sx={{fontSize:'18px',fontWeight:'bold'}}>{editscore}</Typography></StyledTableCell>

              }
            </StyledTableRow>
         
        </TableBody>
      </Table>
    </TableContainer>


          <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" ,marginTop:'10px'}}>
          {editscore === null || editscore === 0? 
          <Typography id="modal-modal-title" sx={{textAlign: "center",fontSize:'20px'}} variant="p" component="p">
           คะแนนที่ได้ คือ {realscore} คะแนน
          </Typography>
          :
          <Typography id="modal-modal-title" sx={{textAlign: "center",fontSize:'20px'}} variant="p" component="p">
           คะแนนที่ได้ คือ {editscore} คะแนน
          </Typography>
          }

          <br></br>
          {editscore === null || editscore === 0? 
                    realscore >= minscore ? 
                    <Typography id="modal-modal-title" sx={{textAlign: "center",color: "green",fontWeight:'bold',fontSize:'25px'}} variant="p" component="p">
                    ผ่าน
                   </Typography> :
                   <Typography id="modal-modal-title" sx={{textAlign: "center",color: "red",fontWeight:'bold',fontSize:'25px'}} variant="p" component="p">
                      ไม่ผ่าน
                  </Typography> 
                  
                    :
                    
                    editscore >= minscore ? 
                    <Typography id="modal-modal-title" sx={{textAlign: "center",color: "green",fontWeight:'bold',fontSize:'25px'}} variant="p" component="p">
                    ผ่าน
                   </Typography> :
                   <Typography id="modal-modal-title" sx={{textAlign: "center",color: "red",fontWeight:'bold',fontSize:'25px'}} variant="p" component="p">
                      ไม่ผ่าน
                  </Typography> 
                  
                    }

         
          </Box>
        </Box>
      </Modal>
        </strong>
    </>
  )
}




export default ModalTestPass