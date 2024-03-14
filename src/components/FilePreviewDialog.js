import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'; //added on 13042023

const FilePreviewDialogBox = (props) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const { title, previewfile, openDialog, setOpenDialog } = props;
    const navigate = useNavigate()
    var delayInMilliseconds = 3000

    const [selectedURLFilePath, setSelectedURLFilePath] = useState(''); //added on 13042023

    useEffect(async () => {
        await axios.get(process.env.REACT_APP_API + `/PageEditInsertScore/previewfilepath?token=${token}`, {
            params: { 'filepath': previewfile },
            responseType: 'blob',
        }).then((res) => {
            /*---------------- PDF/Image Preview edited on 14042023 -----------------------*/
            setSelectedURLFilePath(
                URL.createObjectURL(new Blob([res.data],
                    {
                        type: previewfile.split('.')[1] === 'pdf' ? 'application/pdf' : `image/${previewfile.split('.')[1]}`
                    }))
            );
        })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error("กรุณาเข้าระบบใหม่อีกครั้ง");
                    setTimeout(function () {
                        navigate('/')
                        localStorage.clear();
                    }, delayInMilliseconds);
                } else {
                    console.log("err: ", err.response.data)
                }
            })
    }, [props]);

    return (
        <Dialog
            maxWidth={200}
            open={openDialog}
        >
            <DialogTitle></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box
                                    display={'flex'}
                                    sx={{
                                        height: 40,
                                        fontSize: 28,
                                        fontWeight: 'bold',
                                    }}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                >
                                    {title}
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {/*------------------ added 14042023 -------------------*/}
                                <DocViewer
                                    documents={[
                                        {
                                            uri: selectedURLFilePath,
                                            fileName: previewfile.split('/')[1]
                                        }
                                    ]}
                                    pluginRenderers={DocViewerRenderers}
                                //style={{ height: 500, width: 200 }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display={'flex'}
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            height: 50,
                                            width: 100,
                                            fontFamily: 'THSarabunNew',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                        }}
                                        onClick={() => {
                                            setOpenDialog(false);
                                        }}
                                    >
                                        ปิด
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    );
}

export default FilePreviewDialogBox;