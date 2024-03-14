/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios'
import { QRCode } from 'react-qrcode-logo';
import Box from "@mui/material/Box";
import logo from "../img/logo.png";
import ImageList from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useLocation ,useParams } from 'react-router-dom';
import {QRCodeCanvas} from 'qrcode.react';
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";


function PagePrintTestScore() {
    // const location = useLocation();
    const navigate = useNavigate();
    const { perid, testappvcode} = useParams();
    // const data = location.state;
    // console.log(data);
    const [getImage, setgetImage] = React.useState([])
    const [getPagePrintTestScore, setgetPagePrintTestScore] = React.useState([])
   const email =  getPagePrintTestScore[0]?.["tbmemberinfo.mem_email"]
   const editscore = getPagePrintTestScore[0]?.["editscore"]
   const realscore = getPagePrintTestScore[0]?.["realscore"]
   const mem_rank = getPagePrintTestScore[0]?.["tbmember.tbmemberinfos.mem_rank"]
   const mem_fname = getPagePrintTestScore[0]?.["tbmember.tbmemberinfos.mem_fname"]
   const mem_lname = getPagePrintTestScore[0]?.["tbmember.tbmemberinfos.mem_lname"]
   const testreqdate = getPagePrintTestScore[0]?.["tbtestreservation.testreqdate"]
     const date = moment(testreqdate).add(543, "year").format("DD MMMYY");
   const mem_affiliation = getPagePrintTestScore[0]?.["tbmemberinfo.mem_affiliation"]
   const mission = getPagePrintTestScore[0]?.["tbtestreservation.tbtestscoringcriterium.mission"]
   const year = date.substring(7, 9);
const testresultapprvdate = getPagePrintTestScore[0]?.["testresultapprvdate"]
   const apprvdate = moment(testresultapprvdate).add(543, "year").format("DD MMM");
  const apprvyear = parseInt(moment(testresultapprvdate).add(543, "year").format("YY")) + 1;
  const { user } = useSelector((state) => ({...state}))
  const token = user.user.token; 
  // const year = date.substring(7, 9);
   
    // const apprvdate = moment(data.testresultapprvdate).add(543, "year").format("DD MMM");
    // const apprvyear = parseInt(moment(data.testresultapprvdate).add(543, "year").format("YY")) + 1;
    const getImageApi = async () => {
        // console.log(EmailPersonStudent)
        await Axios.get(
          `https://otp.rtaf.mi.th/api/gateway/VnJOSTl5ZldBQVBkWnlKc2ZkN3NGhGbnhtNFJTVHUzS3BfWlRvd2/personalPicture/${email}/base64`,
        )
          .then((res) => {
            setgetImage(res.data)
            // console.log("res.data: ",res.data)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    
      useEffect(() => {
        getImageApi()
      }, [])

      useEffect(() => {
        
        Axios.get(
          process.env.REACT_APP_API_URL + `/getPagePrintTestScore/${perid}/${testappvcode}`,{
            headers : {
              'Content-Type': 'application/json',
              'authtoken': 'bearer ' + token ,
            }
          },
        )
          .then((res) => {
            setgetPagePrintTestScore(res.data);      
            // console.log("data :", res.data);
            //ค่าอนุมัติเป็น null
          })
          .catch((err) => {
            if(err.response.status === 401) {
              navigate('/notfound404', { state: {statusCode: "401", text: err.response.data.message} })
            }
            console.log(err.response)
          })
      }, [perid,testappvcode]);

      // console.log("getPagePrintTestScore",getPagePrintTestScore[0]["tbmemberinfo.mem_email"])

    const styles = {
        paperContainer: {
          backgroundImage: `url(${logo})`,
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        },
    
        textblur: {
          backgroundColor: "rgba(255, 255, 255,0.9)",
          position: "absolute",
          width: "100vw",
        },
      };

  return (
    <>
     <Box
          style={styles.textblur}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        
        >
          <Box sx={{ width: "700px", height: "100px", display: "flex" }}>
            <Box>
              <ImageList sx={{ width: 100, height: 100, padding: 2 }}>
                <img src={logo} alt="logo" />
              </ImageList>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#2F5597", fontWeight: "bold" }}
                >
                  ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "600px",
                  height: "50px",
                  backgroundColor: "#2F5597",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#ffffff", fontSize: "16px" }}
                >
                  รายงานผลคะแนนการทดสอบภาษาอังกฤษ (รายบุคคล)
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "700px",
              height: "350px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "150px", height: "350px" }}>
              <Box>
                <ImageList sx={{ width: "120px", margin: "10px" }}>
                  <img src={ getImage.result === "Process-Complete" ? `data:image/jpeg;base64,${getImage.picture_base64}` : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="logo" />
                </ImageList>
              </Box>
            </Box>
            <Box
              sx={{
                width: "275px",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ยศ-ชื่อ-นามสกุล
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mem_rank + " " + mem_fname + " " + mem_lname}
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  หมายเลขประจำตัวประชาชน
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {perid}
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      ทดสอบเมื่อ
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "red", fontSize: "16px" }}
                    >
                      {date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ marginLeft: "60px" }}>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      สังกัด
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "5px" }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ color: "#2F5597", fontSize: "16px" }}
                    >
                      {mem_affiliation}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  รายการทดสอบ
                </Typography>
              </Box>
              <Box sx={{ margin: "5px" }}>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: "16px" }}
                >
                  {mission === "ทดสอบภาษาอังกฤษประจำปี"
                    ? "โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล ทอ.ประจำปี " +
                      year +
                      " (สังกัด " +
                      mem_affiliation +
                      ")"
                    : mission}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: "275px", height: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "170px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "170px",
                    height: "20%",
                    backgroundColor: "#2F5597",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "24px" }}
                  >
                    ผลคะแนน <br />
                    การทดสอบ
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "170px",
                    height: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                  }}
                >
                  <Box sx={{ position: "absolute", filter: "blur(2px)" }}>
                    <ImageList sx={{ width: 80, height: 80 }}>
                      <img src={logo} alt="logo" />
                    </ImageList>
                  </Box>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      color: "red",
                      fontSize: "60px",
                      fontWeight: "bold",
                      zIndex: "9999",
                    }}
                  >
                    {editscore !== null ? editscore : realscore}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "105px" }}>
                <Box sx={{ width: "105px", height: "40%" ,display:'flex' ,flexDirection: 'column'}}>
                  {/* <ImageList sx={{ width: "105px" }}>
                    <img src={qrcode} alt="logo" /> 
                  </ImageList> */}
                  <Box>
                  <QRCodeCanvas
  value={"Verify success"}
  size={105}
  bgColor={"#ffffff"}
  fgColor={"#000000"}
  level={"L"}
  includeMargin={false}
  imageSettings={{
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
    x: undefined,
    y: undefined,
    height: 24,
    width: 24,
    excavate: true,
  }}
/>
                  </Box>
<Box sx={{width:'100%',height:'50px',backgroundColor:'#000000',textAlign:'center'}}>
<Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: "16px" }}
                  >
                    Verify 
                  </Typography>
</Box>
                </Box>
                <Box
                  sx={{
                    width: "105px",
                    height: "30%",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "#2F5597",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "#000000", fontSize: "14px" }}
                  >
                    ผลคะแนน <br />
                    ใช้ได้ถึง <br />
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{ color: "red", fontSize: "14px" }}
                  >
                    {apprvdate}
                    {apprvyear}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "700px",
              height: "50px",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize: "12px" }}
            >
              เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย{" "}
              <br />
              หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
              โทร.02-534-2965
            </Typography>
          </Box>
        </Box>
    </>
  )
}

export default PagePrintTestScore