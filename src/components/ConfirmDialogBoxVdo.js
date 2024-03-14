import React from 'react';
import Button from '@mui/material/Button';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const ConfirmDialogBoxVdo = ( props ) => {
    const { title, content, openDialogVdo, setOpenDialogVdo, setDelFlag, setConfirmDelImg, setConfirmDel } = props;
    const handleClose = () => setOpenDialogVdo(false);
    return (
        <Dialog maxWidth='xs' open={ openDialogVdo } onClose={handleClose}>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenDialogVdo(false);
                    setDelFlag(false);
                }}>
                    ไม่ใช่
                </Button>
                <Button onClick={() => {
                    setOpenDialogVdo(false);
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

export default ConfirmDialogBoxVdo;