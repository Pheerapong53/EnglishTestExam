import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery, Typography } from '@mui/material';
import { QRCodeCanvas } from "qrcode.react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import logo from "../img/logo.png";
import ImageList from "@mui/material/ImageListItem";
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type": {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

function PagePrintTableTestListScoreMobile() {
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
      const componentRef = useRef();
      const location = useLocation();
      const navigate = useNavigate();
      const queryParams = new URLSearchParams(location.search);
      const encodedData = queryParams.get('data');
      const decodedString = decodeURIComponent(encodedData);
      const [selectAllList, setSelectAllList] = React.useState([]);
      const [testresultapprv, Settestresultapprv] = useState("");
      // Parse the JSON string back into an array or object
      const decodedArray = JSON.parse(decodedString);
    // const {
    //     data
    //   } = decodedData;

    const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableTestListScoreMobile?data=${encodedData}`;
    
    useEffect(() => {
      var config = {
        method: "GET",
        url:
          process.env.REACT_APP_API_URL +
          `/gettoscoreresvcodeContentPageListTestScores/${decodedArray.selectMissions}/${decodedArray.testreqdate}/${decodedArray.testreqtime}`,
        headers: {
          authtoken: "bearer " + decodedArray.token,
        },
      };
  
      Axios(config)
        .then((res) => {
          setSelectAllList(res.data);
          Settestresultapprv(res.data[0].testresultapprv);
          // console.log("data :", res.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            navigate("/notfound404", {
              state: { statusCode: "401", text: err.response.data.message },
            });
          }
          console.log(err.response);
        });
    }, [decodedArray,navigate]);
    
    
    // const testxxx = "555"
      const isLargeScreen = useMediaQuery('(min-width: 1200px)'); // lg
      const isMediumScreen = useMediaQuery('(min-width: 960px) and (max-width: 1199px)'); // md
      const isSmallScreen = useMediaQuery('(min-width: 600px) and (max-width: 959px)'); // sm
      const isExtraSmallScreen = useMediaQuery('(max-width: 599px)'); // xs
    //   console.log("decodedArray",decodedArray)
      return (
    <>
    {/* {decodedArray[0]?.mission} */}
    
    <Box style={styles.paperContainer}></Box>
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
          ref={componentRef}
        >
          <Box
            sx={{
              width: "100%",
              zIndex: "3",
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // marginTop: "15px",
              height: "100vh",
            }}
          >
            <TableContainer
              sx={{
                // backgroundColor: " rgba(255, 255, 255, 0.9)",
                width: { lg: "1280px", md: "1280px", sm: "350px", xs: "350px" },
                // height: "100%",
                display: "flex",
                borderWidth: "1px",
                borderColor: "#000000",
                marginTop: "100px",
                justifyContent:'center',
             
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ border: "2px solid black"}}>
                    <TableCell align="center" colSpan={6}>
                      <Box
                        sx={{
                          width: {
                            lg: "1200px",
                            md: "1200px",
                            sm: "300px",
                            xs: "300px",
                          },
                          height: {
                            lg: "150px",
                            md: "150px",
                            sm: "35px",
                            xs: "35px",
                          },
                          display: "flex",
                          justifyContent:'space-between',
                          alignItems: 'center',
                         
                        }}
                      >
                        <Box>
                          <ImageList
                            sx={{
                              width: {
                                lg: "120px",
                                md: "120px",
                                sm: "50px",
                                xs: "50px",
                              },
                              height: {
                                lg: "120px",
                                md: "120px",
                                sm: "50px",
                                xs: "50px",
                              },
                              paddingRight:'10px',
                              display:'flex',
                              justifyContent:'center',
                              alignItems: 'center',
                            }}
                          >
                            <img src={logo} alt="logo" />
                          </ImageList>
                        </Box>
                        <Box>
                          <Box>
                            <Typography
                              // variant="subtitle1"
                              component="div"
                              sx={{
                                color: "#2F5597",
                                fontWeight: "bold",
                                fontSize: {
                                  lg: "16px",
                                  md: "16px",
                                  sm: "6px",
                                  xs: "6px",
                                },
                              }}
                            >
                              ศูนย์ภาษา กรมยุทธศึกษาทหารอากาศ
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: {
                                lg: "800px",
                                md: "800px",
                                sm: "220px",
                                xs: "220px",
                              },
                              height: {
                                lg: "80px",
                                md: "80px",
                                sm: "20px",
                                xs: "20px",
                              },
                              backgroundColor: "#2F5597",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              // variant="body2"
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize: {
                                  lg: "12px",
                                  md: "12px",
                                  sm: "6px",
                                  xs: "6px",
                                },
                              }}
                            >
                              รายงานผลคะแนนการทดสอบภาษาอังกฤษ
                            </Typography>
                            <Typography
                              // variant="body2"
                              component="div"
                              sx={{
                                color: "#ffffff",
                                fontSize: {
                                  lg: "12px",
                                  md: "12px",
                                  sm: "6px",
                                  xs: "6px",
                                },
                              }}
                            >
                              แยกตามรายการทดสอบ
                            </Typography>
                          </Box>
                        </Box>
                              <Box
                 sx={{
                  width: {
                    lg: "160px",
                    md: "160px",
                    sm: "60px",
                    xs: "60px",
                  },
                  height: {
                    lg: "160px",
                    md: "160px",
                    sm: "60px",
                    xs: "60px",
                  },
                  display:'flex',
                  flexDirection:'column',
                  paddingLeft:{
                    lg: "50px",
                    md: "50px",
                    sm: "10px",
                    xs: "10px",
                  },
                  paddingTop:{
                    lg: "0px",
                    md: "0px",
                    sm: "5px",
                    xs: "5px",
                  }
                  // padding: 2,
                }}
                >
                {
                  isSmallScreen   || isExtraSmallScreen   ?<>
                  <QRCodeCanvas
                  value={testxxx}
                  size={40}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                    x: undefined,
                    y: undefined,
                    height: 8,
                    width: 8,
                    excavate: true,
                  }}
                /> 
                <Box
                  sx={{
                    width: { lg: "160px", md: "60px", sm: "40px", xs: "40px" },
                    height: { lg: "160px", md: "60px", sm: "10px", xs: "10px" },
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: { lg: "12px", md: "12px", sm: "6px", xs: "6px"  }}}
                  >
                    Verify
                  </Typography>
                </Box>
                  </> 
                
                : 
                <>
                <QRCodeCanvas
                    value={testxxx}
                    size={140}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                    imageSettings={{
                      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciNW49eY224gsT55faql5f-AaKfOyeoj9gQ&usqp=CAU",
                      x: undefined,
                      y: undefined,
                      height: 10,
                      width: 10,
                      excavate: true,
                    }}
                  /> 
                   <Box
                  sx={{
                    width: { lg: "140px", md: "140px", sm: "40px", xs: "40px" },
                    height: { lg: "60px", md: "60px", sm: "10px", xs: "10px" },
                    backgroundColor: "#000000",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                   
                  }}
                >
                  <Typography
                    // variant="body2"
                    component="div"
                    sx={{ color: "#ffffff", fontSize: { lg: "12px", md: "12px", sm: "6px", xs: "6px"  }}}
                  >
                    Verify
                  </Typography>
                </Box>
                </>
               
                }
                 
                </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                  <Typography
                        // variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        ผลการทดสอบวัดระดับความเข้าใจภาษาอังกฤษ
                      </Typography>

                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#000000",
                          fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          },
                          fontWeight: "bold",
                        }}
                      >
                        {"โครงการ" +
                         selectAllList[0]?.["tbtestreservation.tbtestscoringcriterium.mission"]
                       
                         }
                        {"(" +
                          selectAllList[0]?.["tbmember.tbmemberinfos.mem_affiliation"] +
                          "หน่วยผู้ประสาน" +
                          ")"}
                      </Typography>
                  </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      ลำดับ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      ยศ-ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      สังกัด
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      สอบได้
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      ทดสอบเมื่อ
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },
                      }}
                    >
                      หมายเหตุ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                {selectAllList.map((dataprop, i) => (
                    <StyledTableRow
                      key={dataprop["tbmember.tbmemberinfos.meminfo_id"]}
                      sx={{ border: "2px solid black", }}
                    >
                      <StyledTableCell align="center" ><Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>{i + 1}</Box></StyledTableCell>
                      <StyledTableCell align="center"><Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                        {dataprop["tbmemberinfo.mem_rank"] +
                          " " +
                          dataprop["tbmemberinfo.mem_fname"] +
                          " " +
                          dataprop["tbmemberinfo.mem_lname"]}</Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>{dataprop["tbmemberinfo.mem_affiliation"]}</Box>  
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                             {dataprop["editscore"] === null ||
                        dataprop["editscore"] === 0
                          ? dataprop["realscore"]
                          : dataprop["editscore"]} </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}> {moment(dataprop["realscoredate"])
                        .add(543, "year")
                        .format("DD MMMYY") === "Invalid date" ? "ไม่ได้เข้าสอบ" : moment(dataprop["realscoredate"])
                        .add(543, "year")
                        .format("DD MMMYY")}  </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>   {
                          dataprop["tbtestreservation.tbtestscoringcriterium.mission"]
                        }</Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableRow sx={{ border: "2px solid black" }}>
                  <TableCell align="center" colSpan={6}>
                    <Box
                      sx={{
                        width: {
                          lg: "1200px",
                          md: "1200px",
                          sm: "300px",
                          xs: "300px",
                        },
                        height: {
                          lg: "80px",
                          md: "80px",
                          sm: "35px",
                          xs: "35px",
                        },
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          width: {
                            lg: "1200px",
                            md: "1200px",
                            sm: "300px",
                            xs: "300px",
                          },
                         
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          // variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          }}}
                        >
                          เอกสารนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                          มีโทษตามกฏหมาย
                        </Typography>
                        <Typography
                          // variant="body2"
                          component="div"
                          sx={{ color: "#2F5597", fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          } }}
                        >
                          หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                          โทร.02-534-2965
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Box>
        </Box>
    </>
  )
}

export default PagePrintTableTestListScoreMobile