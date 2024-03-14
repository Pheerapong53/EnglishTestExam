/* eslint-disable no-unused-vars */
import React, { useRef, forwardRef } from 'react'
import { useState, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import logo from '../img/logo.png'
import bas from '../img/bas.jpg'
import ImageList  from '@mui/material/ImageListItem';
import qrcode from '../img/qrcode.jpg'

import {QRCodeSVG} from "qrcode.react"

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const ContentShowScoreStudent = (id) => {
    const ID = JSON.stringify(id);
    const id_on = ID.split(':')[1]
    // const on_student = id_on.split(/}/)[0]
    const txt = `http://localhost:3000/PageTextScore_ex/${id_on}`
  return (
    <div >
        {/* <ImageList  sx={{ width:'105px'}}>
        <img src={qrcode} alt="logo" />
        </ImageList> */}
        <QRCodeSVG value={txt} size={105}/>
    </div>
  )
}

export default ContentShowScoreStudent