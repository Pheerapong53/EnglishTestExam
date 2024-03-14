import React, { useState } from "react";
import { Paper, Grid, Box, Typography } from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { CardMedia, Card, CardHeader } from "@mui/material";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, red, orange, blue } from "@mui/material/colors";

// import ModalUpdateMember from './ModalUpdateMember';
import { useDispatch, useSelector } from "react-redux";
import {
  delCandAtDueDate,
  addOrUpdateTestResvInfo,
} from "../store/TestReservationSlice";
import { rtafunitarr } from "../components/functions/GlobalUseData";
import { toast } from "react-toastify";
import moment from "moment";

dayjs.locale("th");
dayjs.extend(buddhistEra);

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "THSarabunNew",
      fontSize: 12,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: grey["100"],
          border: "1px solid blue",
        },
      },
    },
  },
});

const th_montharr = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
/*----------------------- TbCheckingBookingData -------------------------------*/
function TbCheckingBookingData(props) {
  /*---------------------- Redux ---------------------------------------------*/
  const updatememberlist = useSelector(
    (state) => state.testresvinfostate.candAtDueDateArr
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user in redux
  const { user } = useSelector((state) => ({ ...state }));
  const pers_id = user.user.pers_id;

  const scoringcriteria = useSelector(
    (state) => state.scoringcriteriastate.scoringcriteria
  );
  //console.log('TbCheckingBookingData ->>>> ', scoringcriteria);
  /*----------------------- Del/Edit Member Info Model -----------------------*/
  const [openEditMbrModal, setOpenEditMbrModal] = useState(false);
  const [openDelMbrModal, setOpenDelMbrModal] = useState(false);
  const handleOpenDelMbrModal = () => setOpenDelMbrModal(true);
  const handleCloseDelMbrModal = () => setOpenDelMbrModal(false);

  /*----------------------- Image ----------------------------------------*/
  const [openImgPanel, setOpenImgPanel] = useState(false);
  const handleOpenImgPanel = () => setOpenImgPanel(true);
  const handleCloseImgPanel = () => setOpenImgPanel(false);

  const [rowid, setRowId] = useState(0); //to get row id of the table (image)
  const [delrowid, setDelRowId] = useState(-1);
  const [editrowinfo, setEditRowInfo] = useState([]);

  /*------------------- Thai Date --------------------------*/
  const thDateFormatFunc = (date) => {
    let thdate = dayjs(date).format("DD-MM-BBBB");
    let thmonth = th_montharr[Number(thdate.split("-")[1]) - 1];
    return thdate.split("-")[0] + " " + thmonth + " " + thdate.split("-")[2];
  };

  //console.log('TbCheckingBookingData : updatememberlist ->>>> ', updatememberlist);
  /*--------------------- return ---------------------------*/
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer sx={{ minWidth: 450 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={12}
                      sx={{ fontSize: 14, fontWeight: "bold" }}
                    >
                      ตรวจสอบข้อมูล
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={12}
                      sx={{ fontWeight: "bold" }}
                    >
                      รหัสการจอง: {updatememberlist["resvcode"]} วันที่จอง:{" "}
                      {thDateFormatFunc(updatememberlist["date"])}{" "}
                      ช่วงเวลาที่จอง: {updatememberlist["period"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={12}
                      sx={{ fontWeight: "bold" }}
                    >
                      {updatememberlist["reason"]} ณ ประเทศ{" "}
                      {updatememberlist["country"]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      ลำดับ
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      เลขประจำตัวประชาชน
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      ยศ-ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      ตำแหน่ง
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      สังกัด
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      เหล่า
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      จำพวกทหาร
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      รูปถ่าย
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      อีเมล
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      เบอร์มือถือ
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      เบอร์ที่ทำงาน
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold" }}
                      colSpan={2}
                    >
                      การจัดการ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {updatememberlist["member"]?.map((mbr, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell align="center">{mbr.pers_id}</TableCell>
                      <TableCell align="center">
                        {mbr.rank + " " + mbr.name}
                      </TableCell>
                      <TableCell align="center">{mbr.position}</TableCell>
                      <TableCell align="center">{mbr.affiliation}</TableCell>
                      <TableCell align="center">{mbr.branch}</TableCell>
                      <TableCell align="center">{mbr.branchgrp}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="ภาพถ่ายของผู้เข้าสอบ">
                          <IconButton
                            sx={{ color: blue["A700"] }}
                            onClick={() => {
                              handleOpenImgPanel();
                              setRowId(i);
                            }}
                          >
                            <ImageIcon />
                          </IconButton>
                        </Tooltip>
                        <Modal
                          open={openImgPanel}
                          onClose={handleCloseImgPanel}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Card sx={{ maxWidth: 450 }}>
                            <CardHeader
                              sx={{ textAlign: "center" }}
                              titleTypographyProps={{
                                variant: "caption",
                              }}
                              title={`เลขประจำตัวประชาชน: ${updatememberlist["member"][rowid].pers_id}`}
                              subheaderTypographyProps={{
                                variant: "caption",
                                fontWeight: "bold",
                              }}
                              subheader={`ยศ-ชื่อ-นามสกุล: ${
                                updatememberlist["member"][rowid].rank +
                                " " +
                                updatememberlist["member"][rowid].name
                              }`}
                            />
                            <CardMedia
                              component="img"
                              // src={`${process.env.REACT_APP_API_URL}/pagebookdate/previewfilepath?filepath=${updatememberlist['member'][rowid].image}`}
                              // src={`data:image/jpeg;base64,${updatememberlist['member'][rowid].image}`}
                              src={
                                updatememberlist["member"][rowid].image
                                  ? `data:image/jpeg;base64,${updatememberlist["member"][rowid].image}`
                                  : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                              }
                              alt="CardMedia Image Example"
                              height="400"
                            />
                          </Card>
                        </Modal>
                      </TableCell>
                      <TableCell align="center">{mbr.email}</TableCell>
                      <TableCell align="center">{mbr.cellphone}</TableCell>
                      <TableCell align="center">{mbr.offtel}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="แก้ไขข้อมูลผู้เข้าสอบ">
                          <IconButton
                            sx={{ color: orange["400"] }}
                            onClick={() => {
                              setOpenEditMbrModal(true);
                              let editmbrlist = updatememberlist[
                                "member"
                              ].filter(
                                (item) =>
                                  item.pers_id ===
                                  updatememberlist["member"][i].pers_id
                              );
                              setEditRowInfo(editmbrlist);
                              // console.log(editmbrlist);
                              navigate("/PageEditRegister", {
                                state: {
                                  data: editmbrlist,
                                  url: "/PageExamInformation",
                                },
                              });
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {
                          /*--------------------------------------------*/
                          /*------------ Link to member page -----------*/
                          /*--------------------------------------------*/
                          // openEditMbrModal &&
                          // <ModalUpdateMember
                          //     open={openEditMbrModal}
                          //     setOpen={setOpenEditMbrModal}
                          //     editrowinfo={editrowinfo}
                          // />
                        }
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="ลบข้อมูลผู้เข้าสอบ">
                          <IconButton
                            sx={{ color: red["800"] }}
                            onClick={() => {
                              handleOpenDelMbrModal();
                              setDelRowId(i);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {
                          <Modal
                            open={openDelMbrModal}
                            onClose={handleCloseDelMbrModal}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 500,
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 16,
                                  fontWeight: "bold",
                                }}
                                align="center"
                                component={"div"}
                              >
                                กดปุ่มยืนยัน
                                หากต้องการลบรายชื่อผู้เข้าสอบที่เลือก
                              </Typography>
                              <Typography align="center" component={"div"}>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    xs={6}
                                    display={"flex"}
                                    justifyContent={"flex-end"}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        let newmbrlist = updatememberlist[
                                          "member"
                                        ].filter(
                                          (item) =>
                                            item.pers_id !==
                                            updatememberlist["member"][delrowid]
                                              .pers_id
                                        );
                                        let newstate = Object.assign(
                                          Object.assign({}, updatememberlist),
                                          { member: newmbrlist }
                                        );
                                        dispatch(delCandAtDueDate(newstate));
                                        props.hidecheckingpanelfunc(
                                          !props.checkpanelstate
                                        );
                                      }}
                                    >
                                      ยืนยัน
                                    </Button>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={6}
                                    display={"flex"}
                                    justifyContent={"flex-start"}
                                  >
                                    <Button
                                      variant="contained"
                                      onClick={handleCloseDelMbrModal}
                                    >
                                      ยกเลิก
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Typography>
                            </Box>
                          </Modal>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              onClick={() => {
                //อัพเดทรหัสการจอง และข้อมุลในตารางจอง
                let tmp = Object.assign({}, updatememberlist);

                let scc = scoringcriteria.filter((el) => {
                  return el.mission === tmp["reason"];
                })[0]["scoringcriteriacode"];
                Object.assign(tmp, { reason: scc });
                let lastestupdatememberlist = Object.assign(tmp, {
                  testresvdate: moment().format("YYYY-MM-DD"),
                  testresvtime: moment().format("HH:mm"),
                  /*---------------- Have to modify to get from user redux ---------*/
                  coordinator: pers_id,
                  /*----------------------------------------------*/
                  testrequnit: Object.keys(rtafunitarr).find(
                    (k) =>
                      rtafunitarr[k] ===
                      updatememberlist["resvcode"].match(/[a-zA-Z]+/g)[0]
                  ),
                });

                // console.log("rtafunitarr: ", rtafunitarr);
                // console.log("updatememberlist: ", updatememberlist);
                // console.log("lastestupdatememberlist: ", lastestupdatememberlist);
                // dispatch(addOrUpdateTestResvInfo(lastestupdatememberlist));
                Promise.all([
                  dispatch(addOrUpdateTestResvInfo(lastestupdatememberlist)),
                ]).then((res) => {
                  let text = "";
                  switch (res[0].payload.data.status) {
                    case "insert":
                      text = "บันทึกการลงทะเบียนจองการสอบเรียบร้อยแล้ว";
                      break;
                    case "update":
                      text = "อัพเดทการลงทะเบียนจองการสอบเรียบร้อยแล้ว";
                      break;
                    case "error":
                      text =
                        "การลงทะเบียนจองการสอบไม่ประสบความสำเร็จ ตรวจสอบอีกครั้ง";
                      break;
                    default:
                      break;
                  }

                  if (res) {
                    toast(text, { position: toast.POSITION.TOP_CENTER });
                  }
                });
              }}
            >
              ยืนยันการจองวันทดสอบ
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={() => {
                props.hidecheckingpanelfunc(!props.checkpanelstate);
              }}
            >
              ย้อนกลับ
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default TbCheckingBookingData;
