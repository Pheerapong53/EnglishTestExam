import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";

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

function ModalEditIpAddress() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <>
<ThemeProvider theme={theme}>
      <Link to="#" style={{ textDecoration: "none", color: "black" }}>
    <Button
      variant="contained"
      color="secondary"
      size="small"
      style={{ marginLeft: 16, color: "#000" }}
      startIcon={<EditIcon />}
      onClick={handleClickOpen}
    >
      EDIT
    </Button>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"แก้ไขการอนุญาต IP Address"}
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
          <Button color="third" sx={{color:'#fff'}} variant="contained">บันทึก</Button>
        </DialogActions>
      </Dialog>
    </Link>
  </ThemeProvider>
    </>
  )
}

export default ModalEditIpAddress