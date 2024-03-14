/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ContentPageDetailPublicRelations = (props) => {
    const { open, onClose, data } = props;
    // console.log("content: ", data);
    // console.log("pubrelcont: ", data.pubrelcont[0].pubrelcontents);
  return (
    <>
    <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <Box
            sx={{ display: "flex", flexDirection: "column", margin: "50px" }}
            key={data.pubrel_id}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{ marginLeft: "10px", cursor: "pointer" }}
            >
              {/* คำแนะนำการทำข้อสอบ */}
              {data.pubrel_title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ fontSize: "18px", marginLeft: "50px" }}
            >
              <ul>
                {data.pubrelcont?.map((paragraph, i) =>{
                    return <li key={i}>{paragraph.pubrelcontents}</li>
                })}
                {/* <li>ระยะเวลาการทดสอบ 60 นาที</li>
                <li>เมื่อกดปุ่ม Start เวลาจะเริ่มนับถอยหลัง</li>
                <li>ระบบจะปิดอัตโนมัติเมื่อครบ 60 นาที</li>
                <li>สามารถกด Submit เพื่อส่งคำตอบ หากทำเสร็จก่อนหมดเวลา</li>
                <li>สามารถย้อนกลับเพื่อแก้ไขคำตอบได้</li>
                <li>สามารถฟังเสียงได้เพียงครั้งเดียว</li> */}
              </ul>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ marginLeft: "10px", fontSize: "18px" }}
            >
              {moment(data.pubrel_createddate).add(543, 'year').format('ll')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {data.pathmedia?.map((media, i)=> {
                const chkImg = data.pathmedia[i]?.primgcode.includes("IMG");
                return (
                  <CardMedia
                    key={i}
                    component={chkImg ? "img" : "video"}
                    style={{
                        // width: "100%",
                        // height: "100%",
                        // objectFit: "cover",
                        objectPosition: "center",
                        margin: "5px 5px 0 0",
                    }}
                    sx={chkImg ? { width: "20%", height: "20%", objectFit: "contain" } :{ width: "30%", height: "30%", objectFit: "contain" }}
                    image={process.env.REACT_APP_API_URL_IMG + media.primgfilepath}
                    title="Media Preview"
                    controls
                  />
                )
            })}
            {/* <CardMedia
              component="img"
              sx={{ width: "20%", height: "20%" }}
              style={{ border: "5px solid #000", marginLeft: "5px" }}
              image="https://img.freepik.com/free-photo/hawaiian-pizza-with-pineappleham-cheese-isolated-white-background_123827-21002.jpg?w=1060&t=st=1657595743~exp=1657596343~hmac=c87e16a97adbb1cd42959c34433ebb42d61f920ece3eea4858464a0336cbd3c1"
              alt="Live from space album cover"
            /> */}
            {/* <CardMedia
              component="video"
              sx={{ width: "20%", height: "20%" }}
              style={{ border: "5px solid #000", marginLeft: "5px" }}
              image="https://www.w3schools.com/html/mov_bbb.mp4"
              alt="video"
              controls
            />
            <CardMedia
              component="img"
              sx={{ width: "20%", height: "20%" }}
              style={{ border: "5px solid #000", marginLeft: "5px" }}
              image="https://img.freepik.com/free-photo/hawaiian-pizza-with-pineappleham-cheese-isolated-white-background_123827-21002.jpg?w=1060&t=st=1657595743~exp=1657596343~hmac=c87e16a97adbb1cd42959c34433ebb42d61f920ece3eea4858464a0336cbd3c1"
              alt="Live from space album cover"
            /> */}
          </Box>
        </List>
      </Dialog>
    </>
  )
}

export default ContentPageDetailPublicRelations