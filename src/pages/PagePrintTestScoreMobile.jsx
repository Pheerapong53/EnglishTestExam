/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from "../img/logo.png";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageListItem";
import { useMediaQuery, Typography } from '@mui/material';
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, } from "react-router-dom";
import Axios from "axios";

function PagePrintTestScoreMobile() {
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get("data");
  const decodedString = decodeURIComponent(encodedData);
  const decodedArray = JSON.parse(decodedString);
  const [getImage, setgetImage] = React.useState([]);
    // console.log("decodedArray",decodedArray);
  // const { encodedData } = useParams();
  // const decodedString = decodeURIComponent(encodedData);
  
  const getImageApi = async () => {
    // console.log("realscore",realscore)
    await Axios.get(
      `https://otp.rtaf.mi.th/api/gateway/VnJOSTl5ZldBQVBkWnlKc2ZkN3NGhGbnhtNFJTVHUzS3BfWlRvd2/personalPicture/${decodedArray.mem_email}/base64`
    )
      .then((res) => {
        setgetImage(res.data);
        // console.log("res.data: ",res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getImageApi();
  }, []);
  const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?data=${encodedData}`;
  // Parse the JSON string to get the original object
  // const decodedData = JSON.parse(decodedString);

  // Extract pers_id from the decoded data
  // const {
  //   getImageResult,
  //   getImagePicture_base64,
  //   mem_rank,
  //   mem_fname,
  //   mem_lname,
  //   pers_id,
  //   date,
  //   mem_affiliation,
  //   mission,
  //   editscore,
  //   realscore,
  //   AppDate,
  //   AppMouht,
  //   numbereay,
  //   checkScore,
  // } = decodedData;
  const year = decodedArray.date.substring(7, 9);
  // const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTestScoreMobile/${encodedData}`;
  const isLargeScreen = useMediaQuery('(min-width: 1200px)'); // lg
  const isMediumScreen = useMediaQuery('(min-width: 960px) and (max-width: 1199px)'); // md
  const isSmallScreen = useMediaQuery('(min-width: 600px) and (max-width: 959px)'); // sm
  const isExtraSmallScreen = useMediaQuery('(max-width: 599px)'); // xs
  
  return (
    <>
      {/* <Box style={styles.paperContainer} ></Box> */}
      <Box
        style={styles.textblur}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "fixed",
          // width: "740px"
        }}
        // ref={componentRef}
        // ref={componentRef}
      >
        <Box sx={{ width: { lg: "740px", md: "740px", sm: "340px", xs: "340px" }, height: { lg: "100px", md: "100px", sm: "50px", xs: "50px" }, display: "flex" }}>
          <Box>
          <ImageList sx={{ width: { lg: "80px", md: "80px", sm: "4px", xs: "40px" }, height: { lg: "80px", md: "80px", sm:"40px", xs: "40px" }, padding:{ lg: "18px 10px 0px 0px", md: "18px 10px 0px 0px", sm: "9px 5px 0px 0px", xs: "9px 5px 0px 0px" }  }}>
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
                  // variant="h5"
                  component="div"
                  sx={{ color: "#2F5597", fontWeight: "bold" ,fontSize:{ lg: "16px", md: "26px", sm: "10px", xs: "10px" } }}
                >
                  ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { lg: "660px", md: "660px", sm: "300px", xs: "300px" },
                  height: { lg: "50px", md: "50px", sm: "25px", xs: "25px" },
                  backgroundColor: "#2F5597",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
               <Typography
                  variant="body2"
                  component="div"
                  sx={{ color: "#ffffff", fontSize: { lg: "16px", md: "26px", sm: "10px", xs: "10px" } }}
                >
                  รายงานผลคะแนนการทดสอบภาษาอังกฤษ (รายบุคคล)
                </Typography>
            </Box>
          </Box>
        </Box>
        <Box
            sx={{
              width: { lg: "740px", md: "740px", sm: "340px", xs: "340px" },
              height: { lg: "440px", md: "440px", sm: "240px", xs: "240px" },
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#2F5597",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
          {/* <Box sx={{display: "flex",flexDirection:'column'}}> */}
          <Box sx={{ width: { lg: "150px", md: "150px", sm: "75px", xs: "75px" }, height: { lg: "350px", md: "350px", sm: "250px", xs: "250px" } }}>
              <Box>
              <ImageList sx={{ width: { lg: "150px", md: "150px", sm: "50px", xs: "50px" }, margin: { lg: "10px", md: "10px", sm: "5px", xs: "5px" } }}>
                <img
                  src={
                    decodedArray.getImageResult === "Process-Complete"
                      ? `data:image/jpeg;base64,${getImage.picture_base64}`
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  alt="logo"
                />
              </ImageList>
            </Box>
          </Box>

          <Box
              sx={{
                width: { lg: "295px", md: "295px", sm: "195px", xs: "195px" },
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                marginLeft: { lg: "30px", md: "30px", sm: "0px", xs: "0px" },
                
              }}
            >
            <Box sx={{ margin:{ lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
            <Typography
                  // variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" },
                    fontWeight: "bold",
                  }}
                >
                  ยศ-ชื่อ-นามสกุล
                </Typography>
            </Box>
            <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                <Typography
                  // variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" } }}
                >
                  {decodedArray.mem_rank + decodedArray.mem_fname + " " + decodedArray.mem_lname}
                </Typography>
              </Box>
              <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                <Typography
                  // variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" },
                    fontWeight: "bold",
                  }}
                >
                  หมายเลขประจำตัวประชาชน
                </Typography>
              </Box>
              <Box sx={{ margin:{ lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                <Typography
                  // variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" }}}
                >
                  {decodedArray.pers_id}
                </Typography>
              </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
              <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                    <Typography
                      // variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" },
                        fontWeight: "bold",
                      }}
                    >
                      ทดสอบเมื่อ
                    </Typography>
                  </Box>
                  <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                    <Typography
                      // variant="body2"
                      component="div"
                      sx={{ color: "red", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" } }}
                    >
                      {decodedArray.date === "Invalid date" ? "-" : decodedArray.date}
                    </Typography>
                  </Box>
              </Box>
              <Box sx={{ marginLeft: { lg: "60px", md: "60px", sm: "20px", xs: "20px" } }}>
              <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                    <Typography
                      // variant="body2"
                      component="div"
                      sx={{
                        color: "#2F5597",
                        fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" },
                        fontWeight: "bold",
                      }}
                    >
                      สังกัด
                    </Typography>
                  </Box>
                  <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                    <Typography
                      // variant="body2"
                      component="div"
                      sx={{ color: "#2F5597", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" } }}
                    >
                      {decodedArray.mem_affiliation}
                    </Typography>
                  </Box>
              </Box>
            </Box>
            <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                <Typography
                  // variant="body2"
                  component="div"
                  sx={{
                    color: "#2F5597",
                    fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" },
                    fontWeight: "bold",
                  }}
                >
                  รายการทดสอบ
                </Typography>
              </Box>
              <Box sx={{ margin: { lg: "5px", md: "5px", sm: "2px", xs: "2px" } }}>
                <Typography
                  // variant="body2"
                  component="div"
                  sx={{ color: "#2F5597", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" } }}
                >
                  {decodedArray.mission === "ทดสอบภาษาอังกฤษประจำปี"
                    ? "โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล ทอ.ประจำปี " +
                      year +
                      " (สังกัด " +
                      decodedArray.mem_affiliation +
                      ")"
                    : decodedArray.mission}
                </Typography>
              </Box>
          </Box>
          <Box sx={{ width: { lg: "295px", md: "295px", sm: "170px", xs: "170px" }, height: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: { lg: "148px", md: "148px", sm: "80px", xs: "80px" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: { lg: "148px", md: "148px", sm: "80px", xs: "80px" },
                    height: "20%",
                    backgroundColor: "#2F5597",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: { lg: "16px", md: "16px", sm: "8px", xs: "8px" } }}
                  >
                    ผลคะแนน <br />
                    การทดสอบ
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width:  { lg: "148px", md: "148px", sm: "80px", xs: "80px" },
                    height: "53.8%",
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
                    <ImageList sx={{ width: { lg: "80px", md: "80px", sm: "40px", xs: "40px" }, height: { lg: "80px", md: "80px", sm: "40px", xs: "40px" } }}>
                      <img src={logo} alt="logo" />
                    </ImageList>
                  </Box>
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{
                      color: "red",
                      fontSize: { lg: "60px", md: "60px", sm: "30px", xs: "30px" },
                      fontWeight: "bold",
                      zIndex: "9999",
                    }}
                  >
                    {decodedArray.editscore === null || decodedArray.editscore === 0
                      ? decodedArray.realscore
                      : decodedArray.editscore}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width: { lg: "148px", md: "148px", sm: "80px", xs: "80px" },
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize:  { lg: "20px", md: "20px", sm: "10px", xs: "10px" }}}
                  >
                    CEFR <br />
                    Level
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  width: { lg: "147px", md: "147px", sm: "90px", xs: "90px" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: { lg: "147px", md: "147px", sm: "90px", xs: "90px" },
                    height: { lg: "20%", md: "20%", sm: "10%", xs: "10%" },
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                {
                  isSmallScreen   || isExtraSmallScreen   ? <QRCodeCanvas
                  value={testxxx}
                  size={90}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                    x: undefined,
                    y: undefined,
                    height: 12,
                    width: 12,
                    excavate: true,
                  }}
                /> : 
                <QRCodeCanvas
                    value={testxxx}
                    size={147}
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
                }
                 
                </Box>
                <Box
                  sx={{
                    width: { lg: "147px", md: "147px", sm: "90px", xs: "90px" },
                    height: "10%",
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "60px",
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: { lg: "20px", md: "20px", sm: "10px", xs: "10px"  }}}
                  >
                    Verify
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { lg: "147px", md: "147px", sm: "90px", xs: "90px" },
                    height: { lg: "30%", md: "30%", sm: "28.5%", xs: "28.5%" },
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
                    // variant="body2"
                    component="div"
                    sx={{ color: "#000000", fontSize: { lg: "20px", md: "20px", sm: "10px", xs: "10px"  }}}
                  >
                    ผลคะแนน <br />
                    ใช้ได้ถึง <br />
                  </Typography>
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "red", fontSize: { lg: "20px", md: "20px", sm: "10px", xs: "10px"  } }}
                  >
                    {decodedArray.AppDate} {decodedArray.AppMouht}
                    {decodedArray.numbereay}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#2F5597",
                    width:  { lg: "147px", md: "147px", sm: "90px", xs: "90px" },
                    height: "19.8%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize:  { lg: "20px", md: "20px", sm: "10px", xs: "10px"  } }}
                  >
                    {decodedArray.checkScore >= 10 && decodedArray.checkScore <= 26
                      ? "A1"
                      : decodedArray.checkScore >= 27 && decodedArray.checkScore <= 47
                      ? "A2"
                      : decodedArray.checkScore >= 48 && decodedArray.checkScore <= 77
                      ? "B1"
                      : decodedArray.checkScore >= 78 && decodedArray.checkScore <= 89
                      ? "B2"
                      : decodedArray.checkScore >= 90 && decodedArray.checkScore <= 100
                      ? "C1"
                      : ""}
                  </Typography>
                </Box>
              </Box>
            </Box>
        </Box>
        <Box
            sx={{
              width: { lg: "740px", md: "740px", sm: "340px", xs: "340px" },
              height: { lg: "50px", md: "50px", sm: "25px", xs: "25px" },
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
              // variant="body2"
              component="div"
              sx={{ color: "#2F5597", fontSize:{ lg: "12px", md: "12px", sm: "6px", xs: "6px" } }}
            >
              เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร มีโทษตามกฏหมาย{" "}
              <br />
              หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
              โทร.02-534-2965
            </Typography>
          </Box>
      </Box>
    </>
  );
}

export default PagePrintTestScoreMobile;
