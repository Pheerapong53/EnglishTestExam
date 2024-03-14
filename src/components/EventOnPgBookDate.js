import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Grid
} from "@mui/material";
import moment from "moment";

const EventOnPgBookDate = (props) => {
    const { openEventDialog, setOpenEventDialog, eventInfoOnClick } = props.state;
    const handleDlgClose = () => { setOpenEventDialog(false); };
    return (
        <div>
            <Dialog
                PaperProps={{
                    sx: {
                        width: '50%',
                        height: '60%',
                    }
                }}
                open={openEventDialog}
                onClose={handleDlgClose}
            >
                <DialogTitle>
                    <Box sx={{ 
                        padding: 1,
                        color: 'white',
                        bgcolor: 'primary.main', 
                        textAlign: 'center',
                        fontWeight: 'bold' }}
                    >
                        {eventInfoOnClick.event.title}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Box sx={{ fontWeight: 'bold' }}>หน่วยเข้ารับการทดสอบ:</Box>
                        </Grid>
                        <Grid item xs={6}>
                            {eventInfoOnClick.event.extendedProps.directorate}
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ fontWeight: 'bold' }}>เริ่มทำการทดสอบเวลา:</Box>
                        </Grid>
                        <Grid item xs={6}>
                            {moment(eventInfoOnClick.event.start).format('HH:mm')}
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ fontWeight: 'bold' }}>สิ้นสุดการทดสอบเวลา:</Box>
                        </Grid>
                        <Grid item xs={6}>
                            {moment(eventInfoOnClick.event.end).format('HH:mm')}
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ fontWeight: 'bold' }}>ห้องทดสอบ:</Box>
                        </Grid>
                        <Grid item xs={6}>{eventInfoOnClick.event.extendedProps.lab}</Grid>
                        <Grid item xs={6}>
                            <Box sx={{ fontWeight: 'bold' }}>จำนวนผู้เข้ารับการทดสอบ:</Box>
                        </Grid>
                        <Grid item xs={6}>{eventInfoOnClick.event.extendedProps.seatcount}</Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box padding={2}>
                        <Button variant='contained' onClick={handleDlgClose}>ปิด</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default EventOnPgBookDate;