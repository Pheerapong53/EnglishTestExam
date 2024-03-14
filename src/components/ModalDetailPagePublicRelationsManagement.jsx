import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue,red , yellow } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import DetailsIcon from '@mui/icons-material/Details';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: blue[800],
      },
    },
  });

function ModalDetailPagePublicRelationsManagement() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <>
<ThemeProvider theme={theme}>
     <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          startIcon={<DetailsIcon />}
          onClick={handleOpen}
        >
          DETAIL
    </Button>
     </ThemeProvider>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{textAlign: "center",fontWeight:'bold'}} variant="h5" component="h2">
           รายละเอียด
          </Typography>
          <Box sx={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column" ,marginTop:'10px'}}>
          <Typography id="modal-modal-title" sx={{textAlign: "center"}} variant="p" component="p">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sit pariatur dignissimos vero deleniti doloremque laudantium itaque repellat magni facilis! Pariatur ex molestias dicta placeat? Dolorum corrupti voluptates veritatis ipsam.
          </Typography>
            
          </Box>
          
        </Box>
      </Modal>
    </>
  )
}

export default ModalDetailPagePublicRelationsManagement