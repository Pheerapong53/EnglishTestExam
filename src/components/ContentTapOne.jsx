/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import { CardMedia, Card, CardHeader } from '@mui/material';
//import "../index.css";
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Grid, Paper, Select } from '@mui/material';
import { styled } from "@mui/material/styles";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TbBookingStatus from './TbBookingStatus';
import TbSelectTestDateAndTime from './TbSelectTestDateAndTime';
import TbCheckingBookingData from './TbCheckingBookingData';
import { rankarr, perscorpsarr, persgrpsarr, rtafunitarr } from '../components/functions/GlobalUseData';
/*------------------ Redux ---------------------*/
import { useDispatch, useSelector } from "react-redux";
import { fetchMemberInfoByPersId, fetchMemberInfoByName } from '../store/MemberInfoSlice';
//import { getCandAtDueDate } from '../ReduxSlice/TestResevationSlice';

/*------------------- Style --------------------------*/
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'THSarabunNew',
      fontSize: 14
    }
  },

  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          backgroundColor: grey['200']
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: 30,
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: 30,
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 30
        }
      }
    }
  }

});

/*------------------------------ ContentTapOne -------------------------------------*/
function ContentTapOne(props) {
  /*----------------------------- Show/Hide Checking Panel -----------------*/
  const [checkingpanel, setHideCheckingPanel] = useState(false);

  const { user } = useSelector((state) => ({ ...state }))
  const token = user.user.token

  /*----------------------- Image ----------------------------------------*/
  const [openImgPanel, setOpenImgPanel] = useState(false);
  const handleOpenImgPanel = () => setOpenImgPanel(true);
  const handleCloseImgPanel = () => setOpenImgPanel(false);

  /*----------------------------- data selection -------------------------*/
  const [rank, setRank] = useState(0);
  const [perscorps, setPersCorps] = useState(0);
  const [persgrps, setPersGrps] = useState(0);
  const [rtafunit, setRtafUnit] = useState(0);

  /*----------------------------- candidate list ---------------------------*/
  const [persidValue, setPersIdValue] = useState('');
  const [persNameValue, setPersNameValue] = useState('');
  const [persPositionValue, setPersPositionValue] = useState('');
  const [persCellPhone, setPersCellPhone] = useState('');
  const [persOffTel, setPersOffTel] = useState('');
  const [persEmail, setPersEmail] = useState('');
  const [imgpath, setImgPath] = useState('');

  const [newdate, setNewDate] = useState(props.date);
  const updateddate = useMemo(() => newdate, [newdate]);

  /*------------------------ Func : setInitialValue --------------------*/
  const setInitBySearchFieldOnClick = () => {
    setRank(0);
    setPersCorps(0);
    setPersGrps(0);
    setRtafUnit(0);
    setPersIdValue('');
    setPersNameValue('');
    setPersPositionValue('');
    setPersCellPhone('');
    setPersOffTel('');
    setPersEmail('');
    setImgPath('');
  };

  /*----------------------- Redux : useEffect --------------------------*/
  const meminfolist = useSelector((state) => {
    if (persidValue !== '' && persNameValue !== '') {
      return state.memberinfostate.meminfoarr;
    }
    return null;
  });
  const meminfodispatch = useDispatch();

  /*-------------------------- search func ------------------------------*/
  const setFoundMemInfo = (res) => {
    setRank(rankarr.indexOf(res.rank));
    setPersCorps(perscorpsarr.indexOf(res.branch));
    setPersGrps(persgrpsarr.indexOf(res.branchgrp));
    setRtafUnit(Object.keys(rtafunitarr).indexOf(res.affiliation));
    setPersIdValue(res.pers_id);
    setPersNameValue(res.name);
    setPersPositionValue(res.position);
    setPersCellPhone(res.cellphone);
    setPersOffTel(res.offtel);
    setPersEmail(res.email);
    setImgPath(res.image);
  };

  const persIdSearchOnClick = useCallback(() => {
    if (persidValue?.length === 13) {
      meminfodispatch(fetchMemberInfoByPersId({ 'pers_id': persidValue, 'token': token }))
        .then(res => {
          if (res.payload.length === 0) {
            toast(`ไม่พบข้อมูลของ ขรก.ที่มีเลขประจำตัวประชาชน ${persidValue} ในระบบ กำลังตรวจสอบข้อมูลจากระบบ HRIS`, { position: toast.POSITION.TOP_CENTER });
            //------------------ HRIS --------------------
            //toast(`ไม่พบข้อมูลของ ขรก.ที่มีเลขประจำตัวประชาชน ${persidValue} ในระบบ กรุณากรอกข้อมูลบุคคลให้ครบถ้วน`, { position: toast.POSITION.TOP_CENTER });
          } else {
            setFoundMemInfo(res.payload);
          }
        })
        .catch(err => {
          console.error(err);
        });

    } else {
      toast('กรุณากรอกเลขประจำตัวประชาชนให้ครบ ๑๓ หลัก', { position: toast.POSITION.TOP_CENTER });
    }
  }, [persidValue, meminfodispatch]);

  const persNameSearchOnClick = useCallback(() => {
    if (persNameValue?.length > 0) {
      meminfodispatch(fetchMemberInfoByName({ 'pers_name': persNameValue.length === 0 ? "''" : persNameValue }))
        .then(res => {
          if (res.payload.length === 0) {
            toast(`ไม่พบรายชื่อในระบบ กำลังตรวจสอบข้อมูลจากระบบ HRIS`, { position: toast.POSITION.TOP_CENTER });
            //------------------ HRIS --------------------
            //toast(`ไม่พบรายชื่อในระบบ กรุณากรอกข้อมูลบุคคลให้ครบถ้วน`, { position: toast.POSITION.TOP_CENTER });
          } else {
            setFoundMemInfo(res.payload);
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      toast('กรุณาตรวจสอบความถูกต้องของรายชื่อที่กรอก', { position: toast.POSITION.TOP_CENTER });
    }
  }, [persNameValue, meminfodispatch]);

  /*----------------------------------- Return --------------------------*/
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={4} sx={{ padding: 4 }}>
        <Item>
          <Stack direction={'row'} spacing={2} >
            <Item>
              <Grid container
                columnSpacing={1}
                rowSpacing={1}
              //sx={{ border: '4px solid green' }}
              >
                <Grid item xs={12}
                  sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}
                >
                  ข้อมูลบุคคล
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  เลขประจำตัวประชาชน:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    inputProps={{ maxLength: 13 }}
                    value={persidValue}
                    onChange={(evt) => {
                      setPersIdValue(evt.target.value);
                    }}
                    onClick={() => {
                      setInitBySearchFieldOnClick();
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      persIdSearchOnClick();
                    }}
                  >
                    ค้นหา
                  </Button>
                </Grid>
                <Grid item xs={3}></Grid>

                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  ชื่อ:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={persNameValue}
                    onChange={(evt) => {
                      setPersNameValue(evt.target.value);
                    }}
                    onClick={() => {
                      setInitBySearchFieldOnClick();
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant='contained'
                    onClick={() => {
                      persNameSearchOnClick();
                    }}
                  >
                    ค้นหา
                  </Button>
                </Grid>
                <Grid item xs={3}></Grid>

                <Grid item xs={3} sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                  ตำแหน่ง:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={persPositionValue}
                    onChange={(evt) => {
                      setPersPositionValue(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  ยศ:
                </Grid>
                <Grid item xs={3}>
                  <Select value={rank} fullWidth onChange={(newRank) => { setRank(newRank.target.value) }}>
                    {
                      rankarr.map((rnk, i) => {
                        return (<MenuItem key={i} value={i}>{rnk}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>

                <Grid item xs={3} sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}>
                  เหล่า:
                </Grid>
                <Grid item xs={3}>
                  <Select value={perscorps} fullWidth onChange={(newRank) => { setPersCorps(newRank.target.value) }}>
                    {
                      perscorpsarr.map((rnk, i) => {
                        return (<MenuItem key={i} value={i}>{rnk}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>
                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  จำพวก:
                </Grid>
                <Grid item xs={3}>
                  <Select value={persgrps} fullWidth onChange={(newRank) => { setPersGrps(newRank.target.value) }}>
                    {
                      persgrpsarr.map((rnk, i) => {
                        return (<MenuItem key={i} value={i}>{rnk}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>

                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  สังกัด:
                </Grid>
                <Grid item xs={3}>
                  <Select value={rtafunit} fullWidth onChange={(newRank) => { setRtafUnit(newRank.target.value) }}>
                    {
                      Object.keys(rtafunitarr).map((rnk, i) => {
                        return (<MenuItem key={i} value={i}>{rnk}</MenuItem>)
                      })
                    }
                  </Select>
                </Grid>
                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  รูปถ่าย:
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <Button
                      variant='outlined'
                      sx={{ width: '100%' }}
                      onClick={handleOpenImgPanel}
                    >
                      แสดงรูปภาพ
                    </Button>
                    <Modal
                      open={openImgPanel}
                      onClose={handleCloseImgPanel}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Card sx={{ maxWidth: 450 }}>
                        <CardHeader
                          sx={{ textAlign: 'center' }}
                          titleTypographyProps={{
                            variant: 'caption',
                          }}
                          title={`เลขประจำตัวประชาชน: ${persidValue}`}
                          subheaderTypographyProps={{
                            variant: 'caption',
                            fontWeight: 'bold'
                          }}
                          subheader={`ยศ-ชื่อ-นามสกุล: ${meminfolist?.rank} ${persNameValue}`}
                        />
                        <CardMedia
                          component="img"
                          // src={`${process.env.REACT_APP_API_URL}/pagebookdate/previewfilepath?filepath=${imgpath}`}
                          src={imgpath ? `data:image/jpeg;base64,${imgpath}` : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                          alt="CardMedia Image Example"
                          style={{
                            height: 450
                          }}
                        />
                      </Card>
                    </Modal>
                  </div>
                </Grid>

                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  เบอร์มือถือ:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    inputProps={{ maxLength: 10 }}
                    value={persCellPhone}
                    onChange={(evt) => {
                      setPersCellPhone(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  เบอร์ที่ทำงาน:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    inputProps={{ maxLength: 5 }}
                    value={persOffTel}
                    onChange={(evt) => {
                      setPersOffTel(evt.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={3}
                  sx={{ fontSize: 12, fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end' }}
                >
                  E-mail:
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={persEmail}
                    onChange={(evt) => {
                      setPersEmail(evt.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>
            </Item>
            <Item>
              <TbBookingStatus date={updateddate/*newdate*/} />
            </Item>
          </Stack>
        </Item>
        <Item>
          <TbSelectTestDateAndTime
            date={props.date}
            checkpanelstate={checkingpanel}
            tabclosefunc={props.tabclosefunc}
            hidecheckingpanelfunc={setHideCheckingPanel}
            newdatefunc={setNewDate}
            meminfolist={meminfolist}
          />
        </Item>
        <Item>
          {
            checkingpanel &&
            <TbCheckingBookingData
              checkpanelstate={checkingpanel}
              hidecheckingpanelfunc={setHideCheckingPanel}
            />
          }
        </Item>
      </Stack>
    </ThemeProvider >
  );
}

export default ContentTapOne;