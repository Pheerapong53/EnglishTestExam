import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../img/logo.png'
import ImageList  from '@mui/material/ImageListItem';


function Navbar() {
  return (
    <>
<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar sx={{justifyContent: 'flex-end'}}>
      <ImageList sx={{ width: 75, height: 75  , padding:2,display: { md: 'block', xs: 'none' }}} >
        <img src={logo} alt="logo" />
        </ImageList>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 , paddingLeft:2 }}>
        ระบบการทดสอบภาษาอังกฤษของกองทัพอากาศ <br />
          (RTAF ENGLISH TEST)
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
    </>
  )
}

export default Navbar