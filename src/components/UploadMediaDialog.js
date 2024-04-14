import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Card, CardMedia, Autocomplete, TextField, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { CardContent } from "@mui/material";
import axios from "axios";
/*------------- Redux -------------------*/
import {
  getIntroVideoFiles,
  getSingleIntroVideoFile,
  delSingleIntroVideoFile,
} from "../store/TestMgmtSlice";
import { toast } from "react-toastify";

const UploadMediaDialogBox = (props) => {
  const { openMediaDlg, setOpenMediaDlg } = props.action;
  const [mediapath, setMediaPath] = useState([]);
  const [mediafile, setMediaFile] = useState([]);
  const [source, setSource] = useState(0); //---> 0 = local video, 1 = stream
  const [selvideo, setSelVideo] = useState("");
  const [inputValue, setInputValue] = useState(""); //---> text
  const [delSelFile, setDelSelFile] = useState(false);
  const [saveActivate, setSaveActivate] = useState(false);
  const [options, setOptions] = useState([]);

  /*---------------- get all video files ------------------*/
  const videofiledispatch = useDispatch();
  const allvideofiles = useSelector(
    (state) => state.testmgmtstate.introvideofiles
  );
  useEffect(() => {
    videofiledispatch(getIntroVideoFiles());
  }, [videofiledispatch, delSelFile, saveActivate]);

  useEffect(() => {
    setOptions(
      allvideofiles?.map((rs) => {
        return rs["introvdotitle"];
      })
    );
    setDelSelFile(false);
    setSaveActivate(false);
    setSelVideo("");
    setMediaFile([]);
    setMediaPath([]);
  }, [allvideofiles]);

  /*-------------------------------------------------------*/
  const onDrop = useCallback(
    (acceptedFiles) => {
      let selfile = acceptedFiles.map((file) => {
        return file;
      });
      setMediaFile(selfile);
      setMediaPath(
        acceptedFiles.map((file) => {
          return URL.createObjectURL(file);
        })
      );
      setSource(0);
      setSelVideo(selfile[0].name);
      setSaveActivate(false);
    },
    [setMediaPath]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
  });
  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            maxHeight: "520px",
          },
        },
      }}
      open={openMediaDlg}
    >
      <DialogTitle>วีดิโอแนะนำการทดสอบ</DialogTitle>
      <DialogContent>
        <Card elevation={0}>
          <CardContent>
            <Stack direction={"column"} spacing={2}>
              <CardMedia
                component={"video"}
                sx={{ height: 280 }}
                src={
                  source === 0
                    ? mediapath[0]
                    : selvideo !== ""
                    ? `${process.env.REACT_APP_API_URL}/testmgmt/singleintrovideofile/${selvideo}`
                    : ""
                }
                autoPlay
                controls
              />
              <Autocomplete
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="เลือกไฟล์แนะนำการทดสอบ" />
                )}
                value={selvideo}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setSource(1);
                    videofiledispatch(getSingleIntroVideoFile(newValue)).then(
                      (vdostream) => {
                        setMediaPath(vdostream.payload);
                      }
                    );
                    setSelVideo(newValue);
                  } else {
                    setSelVideo("");
                  }
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={["", ...(options || [])]}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
            </Stack>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} padding={1} direction="row">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button
                variant="contained"
                onClick={open}
                >
                    อัพโหลดไฟล์วีดิโอ
                </Button>
            </div>
            <Button
            variant="contained"
            disabled={!(source === 0)&&(selvideo !== '') ? true : false}
            onClick={() => {
                let dup_check = options?.filter(op => {
                    return op === mediafile[0].name
                });
                if (dup_check.length > 0){
                    toast.warning('ไฟล์วีดิโอแนะนำการทดสอบที่ต้องการอัพโหลดมีอยู่ในฐานข้อมูลเรียบร้อยแล้ว...',{position: 'top-center'});
                }else{
                    const formData = new FormData();
                    let extname = mediafile[0].name.split('.')[1];

                    if(extname === 'mp3' || extname === 'mp4') {
                        formData.append('file', new File(mediafile, selvideo));
                        axios({
                            method: 'post',
                            url: `${process.env.REACT_APP_API_URL}/testmgmt/videoupload`,
                            data: formData,
                            headers: { 'Content-Type': 'multipart/form-data' }
                        }).then(res => {
                            toast.success(
                                'บันทึกไฟล์วีดิโอแนะนำการทดสอบเรียบร้อยแล้ว...',
                                { position: 'top-center' }
                            );
                            setSaveActivate(true);
                        }).catch(err => {
                            toast.error(
                                'ไม่สามารถบันทึกไฟล์วีดิโอแนะนำการทดสอบได้...',
                                { position: 'top-center' }
                            );
                            //setSaveActivate(false);
                        });
                    }else {
                        toast.error(
                            'อนุญาตให้อัพโหลดเฉพาะไฟล์ mp3 หรือ mp4 เท่านั้น...',
                            { position: 'top-center' }
                        );
                    }
                }//end of if_dup_check
            }}//end on Click
            >
                บันทึกไฟล์วีดิโอ
            </Button>
            <Button
            variant="contained"
            onClick={() => {
                setOpenMediaDlg(false)
            }}
            >
                ปิด
            </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UploadMediaDialogBox;
