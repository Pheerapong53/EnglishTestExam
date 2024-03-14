import React from 'react';
import Button from '@mui/material/Button';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const ConfirmDialogBoxImg = ( props ) => {
    const { title, content, openDialogImg, setOpenDialogImg, setDelFlag,setConfirmDelImg, setConfirmDel } = props;
    const handleClose = () => setOpenDialogImg(false);
    return (
        <Dialog maxWidth='xs' open={ openDialogImg } onClose={handleClose}>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenDialogImg(false);
                    setDelFlag(false);
                    // setOpenDialogImg(false);
                }}>
                    ไม่ใช่
                </Button>
                <Button onClick={() => {
                    setOpenDialogImg(false);
                    setDelFlag(true);
                    setConfirmDelImg(true);
                    setConfirmDel(false);
                }}>
                    ใช่
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialogBoxImg;