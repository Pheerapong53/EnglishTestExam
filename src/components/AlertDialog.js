import React from 'react';
import Button from '@mui/material/Button';
import Dialog  from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const AlertDialog = (props) => {
    const { title, content, openDialog, setOpenDialog } = props;
    const handleClose = () => setOpenDialog(false);
    return (
        <Dialog maxWidth='200px' open={ openDialog } onClose={handleClose}>
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ content }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setOpenDialog(false);
                }}>
                    ปิด
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AlertDialog;