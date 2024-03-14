import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
import { useMediaQuery, Typography } from "@mui/material";
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
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
    width: "100%",
  },
};
function PagePrintTableScoreMobile() {
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
      width: "100%",
    },
  };
  const componentRef = useRef();
  //   const location = useLocation();
  //   const queryParams = new URLSearchParams(location.search);
  //   const encodedData = queryParams.get('data');
  //   const decodedString = decodeURIComponent(encodedData);
  //   const decodedArray = JSON.parse(decodedString);
  //   const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableTestListScoreMobile?data=${encodedData}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => ({ ...state }));
  // const token = user.user.token;
  const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // lg
  const isMediumScreen = useMediaQuery(
    "(min-width: 960px) and (max-width: 1199px)"
  ); // md
  const isSmallScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 959px)"
  ); // sm
  const isExtraSmallScreen = useMediaQuery("(max-width: 599px)"); // xs
  // const { countRole1 ,countRole2,countRole3,countRole4,countRole5,calculateMean1,calculateMean2,calculateMean3,calculateMean4,calculateMean5,max1,max2,max3,max4,max5,min1,min2,min3,min4,min5,allScoresmax,allScoresmin,selectAllList,testreqdate,realscoredate,filteredData,date,lastTwoChars} = useParams();
  const [selectAllList, setSelectAllList] = useState([]);
  const [testresultapprv, Settestresultapprv] = useState("");
  // const parsedFilteredData = JSON.parse(filteredData);
  //   const location = useLocation();
  //   const [values, setValues] = useState({});
  //   useEffect(() => {
  //     // ดึงข้อมูลจาก query parameters ใน URL
  //     const queryParams = new URLSearchParams(location.search);
  //     // const receivedData = {};

  //     // นำข้อมูลมาเก็บใน Object receivedData
  //     for (const [key, value] of queryParams.entries()) {
  //         setValues[key] = value;
  //     }

  //     // ทำอะไรกับข้อมูลที่ได้รับ
  //     // console.log('Received Data:', receivedData);
  //   }, [location]);

  //   const testxxx = "xxx"
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedData = queryParams.get("data");
  const decodedString = decodeURIComponent(encodedData);
  const decodedArray = JSON.parse(decodedString);
  const testxxx = `https://englishtest.rtaf.mi.th/PagePrintTableScoreMobile?data=${encodedData}`;

  useEffect(() => {
    var config = {
      method: "GET",
      url:
        process.env.REACT_APP_API_URL +
        `/getalldataContentPageListTestScoresDivision/${decodedArray.data.testrequnit}/${decodedArray.data.testreqdate}`,
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
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        } else if (err.response.status === 404) {
          dispatch(logout());
          navigate("/notfound404", {
            state: { statusCode: err.response.status, txt: err.response.data },
          });
        }
        console.log("getPubrelContents: ", err);
      });
  }, [decodedArray, dispatch, navigate]);

        const filteredArrayIncludes = selectAllList.filter((item) =>
      item.testindvappvcode?.includes("APR")
    );
    const filteredData = filteredArrayIncludes.filter(
      (item) => item.testresvcode === decodedArray.data.testresvcode
    );

    const countRole1 = () => {
      let counter = 0;

      filteredData.forEach((item) => {
        if (
          item["tbmemberinfo.mem_rank"] === "น.ต." ||
          item["tbmemberinfo.mem_rank"] === "น.ต.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "น.ท." ||
          item["tbmemberinfo.mem_rank"] === "น.ท.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "น.อ." ||
          item["tbmemberinfo.mem_rank"] === "น.อ.หญิง"
        ) {
          counter++;
        }
      });

      return counter;
    };

    const countRole2 = () => {
      let counter = 0;

      filteredData.forEach((item) => {
        if (
          item["tbmemberinfo.mem_rank"] === "ร.ต." ||
          item["tbmemberinfo.mem_rank"] === "ร.ต.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "ร.ท." ||
          item["tbmemberinfo.mem_rank"] === "ว่าที่ ร.ท." ||
          item["tbmemberinfo.mem_rank"] === "ร.ท.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "ร.อ." ||
          item["tbmemberinfo.mem_rank"] === "ร.อ.หญิง"
        ) {
          counter++;
        }
      });

      return counter;
    };

    const countRole3 = () => {
      let counter = 0;

      filteredData.forEach((item) => {
        if (
          item["tbmemberinfo.mem_rank"] === "พ.อ.อ.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "พ.อ.อ." ||
          item["tbmemberinfo.mem_rank"] === "พ.อ.ท.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "พ.อ.ท." ||
          item["tbmemberinfo.mem_rank"] === "พ.อ.ต.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "พ.อ.ต."
        ) {
          counter++;
        }
      });

      return counter;
    };

    const countRole4 = () => {
      let counter = 0;

      filteredData.forEach((item) => {
        if (
          item["tbmemberinfo.mem_rank"] === "จ.อ.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "จ.อ." ||
          item["tbmemberinfo.mem_rank"] === "จ.ท.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "จ.ท." ||
          item["tbmemberinfo.mem_rank"] === "จ.ต.หญิง" ||
          item["tbmemberinfo.mem_rank"] === "จ.ต."
        ) {
          counter++;
        }
      });

      return counter;
    };

    const countRole5 = () => {
      let counter = 0;

      filteredData.forEach((item) => {
        if (
          item["tbmemberinfo.mem_rank"] === "นางสาว" ||
          item["tbmemberinfo.mem_rank"] === "นาง" ||
          item["tbmemberinfo.mem_rank"] === "นาย" ||
          item["tbmemberinfo.mem_rank"] === "ไม่ระบุ"
        ) {
          counter++;
        }
      });

      return counter;
    };

    const filteredData1 = filteredData.filter(
      (item) =>
        item["tbmemberinfo.mem_rank"] === "น.ต." ||
        item["tbmemberinfo.mem_rank"] === "น.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "น.ท." ||
        item["tbmemberinfo.mem_rank"] === "น.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "น.อ." ||
        item["tbmemberinfo.mem_rank"] === "น.อ.หญิง"
    );
  const renderData1 = () => {
      const renderedItems = [];
      for (let i = 0; i < filteredData1.length; i++) {
        renderedItems.push(filteredData1[i]["editscore"]);
      }

      return renderedItems;
    };

    const calculateMean1 = () => {
      let sum = 0;
      filteredData1.forEach((item) => {
        item["editscore"] === null || item["editscore"] === 0
          ? (sum += item["realscore"])
          : (sum += item["editscore"]);
      });

      const mean = sum / filteredData1.length;
      return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
    };

    const filteredData2 = filteredData.filter(
      (item) =>
        item["tbmemberinfo.mem_rank"] === "ร.ต." ||
        item["tbmemberinfo.mem_rank"] === "ร.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "ร.ท." ||
        item["tbmemberinfo.mem_rank"] === "ว่าที่ ร.ท." ||
        item["tbmemberinfo.mem_rank"] === "ร.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "ร.อ." ||
        item["tbmemberinfo.mem_rank"] === "ร.อ.หญิง"
    );
    const renderData2 = () => {
      const renderedItems = [];
      for (let i = 0; i < filteredData2.length; i++) {
        renderedItems.push(filteredData2[i]["editscore"]);
      }

      return renderedItems;
    };
    const calculateMean2 = () => {
      let sum = 0;
      filteredData2.forEach((item) => {
        item["editscore"] === null || item["editscore"] === 0
          ? (sum += item["realscore"])
          : (sum += item["editscore"]);
      });

      const mean = sum / filteredData2.length;
      return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
    };

    const filteredData3 = filteredData.filter(
      (item) =>
        item["tbmemberinfo.mem_rank"] === "พ.อ.อ.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.อ." ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ท." ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "พ.อ.ต."
    );
    const renderData3 = () => {
      const renderedItems = [];
      for (let i = 0; i < filteredData3.length; i++) {
        renderedItems.push(filteredData3[i]["editscore"]);
      }

      return renderedItems;
    };
    const calculateMean3 = () => {
      let sum = 0;
      filteredData3.forEach((item) => {
        item["editscore"] === null || item["editscore"] === 0
          ? (sum += item["realscore"])
          : (sum += item["editscore"]);
      });

      const mean = sum / filteredData3.length;
      return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
    };

    const filteredData4 = filteredData.filter(
      (item) =>
        item["tbmemberinfo.mem_rank"] === "จ.อ.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.อ." ||
        item["tbmemberinfo.mem_rank"] === "จ.ท.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.ท." ||
        item["tbmemberinfo.mem_rank"] === "จ.ต.หญิง" ||
        item["tbmemberinfo.mem_rank"] === "จ.ต."
    );

    const renderData4 = () => {
      const renderedItems = [];
      for (let i = 0; i < filteredData4.length; i++) {
        renderedItems.push(filteredData4[i]["editscore"]);
      }

      return renderedItems;
    };

    const calculateMean4 = () => {
      let sum = 0;
      filteredData4.forEach((item) => {
        item["editscore"] === null || item["editscore"] === 0
          ? (sum += item["realscore"])
          : (sum += item["editscore"]); // sum += item["editscore"];
      });

      const mean = sum / filteredData4.length;
      return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
    };

    const filteredData5 = filteredData.filter(
      (item) =>
        item["tbmemberinfo.mem_rank"] === "ไม่ระบุ" ||
        item["tbmemberinfo.mem_rank"] === "นางสาว" ||
        item["tbmemberinfo.mem_rank"] === "นาง" ||
        item["tbmemberinfo.mem_rank"] === "นาย"
    );

    const renderData5 = () => {
      const renderedItems = [];
      for (let i = 0; i < filteredData5.length; i++) {
        renderedItems.push(filteredData5[i]["editscore"]);
      }

      return renderedItems;
    };

    const calculateMean5 = () => {
      let sum = 0;
      filteredData5.forEach((item) => {
        item["editscore"] === null || item["editscore"] === 0
          ? (sum += item["realscore"])
          : (sum += item["editscore"]);
      });

      const mean = sum / filteredData5.length;
      return mean.toFixed(2) === "NaN" ? 0 : Number(mean.toFixed(2));
    };

    const maxScores1 =
      Math.max.apply(Math, renderData1()) === -Infinity
        ? 0
        : Math.max.apply(Math, renderData1());
    const maxScores2 =
      Math.max.apply(Math, renderData2()) === -Infinity
        ? 0
        : Math.max.apply(Math, renderData2());
    const maxScores3 =
      Math.max.apply(Math, renderData3()) === -Infinity
        ? 0
        : Math.max.apply(Math, renderData3());
    const maxScores4 =
      Math.max.apply(Math, renderData4()) === -Infinity
        ? 0
        : Math.max.apply(Math, renderData4());
    const maxScores5 =
      Math.max.apply(Math, renderData5()) === -Infinity
        ? 0
        : Math.max.apply(Math, renderData5());
    const minScores1 =
      Math.min.apply(Math, renderData1()) === Infinity
        ? 0
        : Math.min.apply(Math, renderData1());
    const minScores2 =
      Math.min.apply(Math, renderData2()) === Infinity
        ? 0
        : Math.min.apply(Math, renderData2());
    const minScores3 =
      Math.min.apply(Math, renderData3()) === Infinity
        ? 0
        : Math.min.apply(Math, renderData3());
    const minScores4 =
      Math.min.apply(Math, renderData4()) === Infinity
        ? 0
        : Math.min.apply(Math, renderData4());
    const minScores5 =
      Math.min.apply(Math, renderData5()) === Infinity
        ? 0
        : Math.min.apply(Math, renderData5());
    const allScoresmax = [
      maxScores1,
      maxScores2,
      maxScores3,
      maxScores4,
      maxScores5,
    ];
    const allScoresmin = [
      minScores1,
      minScores2,
      minScores3,
      minScores4,
      minScores5,
    ];
    const nonZeroNumbers = allScoresmin.filter((number) => number !== 0);
    const allScoresMax =  Math.max.apply(Math, allScoresmax) === -Infinity ? 0 : Math.max.apply(Math, allScoresmax)
    const allScoresMin =   Math.min.apply(Math, nonZeroNumbers) === Infinity ? 0 : Math.min.apply(Math, nonZeroNumbers)
    const date = moment(decodedArray.testreqdate).add(543, "year").format("DD MMMYY");
    const lastTwoChars = date.slice(-2);
  return (
    <>
      <Box style={styles.paperContainer}></Box>
<Box
          style={styles.textblur}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "fixed",
            // background:'#000000'
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
              height:  { lg: "100%", md: "100%", sm: "100%", xs: "100%" },
            }}
          >
<TableContainer
          sx={{
            // backgroundColor: " rgba(255, 255, 255, 0.9)",
            width: { lg: "1280px", md: "1280px", sm: "350px", xs: "350px" },
            // height: { lg: "1280px", md: "1280px", sm: "350px", xs: "350px" },
            display: "flex",
            borderWidth: "1px",
            borderColor: "#000000",
            marginTop: "100px",
            justifyContent:'center',
         
          }}
        //  sx={{
        //    backgroundColor: " rgba(255, 255, 255, 0.9)",
        //    width: "800px",
        //    height: "100%",
        //    display: "flex",
        //    borderWidth: "1px",
        //    borderColor: "#000000",
        //  }}
         // ref={componentRef}
       >
<Table aria-label="simple table">
<TableHead>
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
                      lg: "150px",
                      md: "150px",
                      sm: "35px",
                      xs: "35px",
                    },
                    display: "flex",
                    justifyContent:'space-between',
                    alignItems: 'center',
                   
                  }}
                  //  sx={{
                  //    width: "750px",
                  //    height: "80px",
                  //    display: "flex",
                  //  }}
                 >
                   <Box>
                     <ImageList
                      //  sx={{ width: 80, height: 50, padding: 2 }}
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
                        //  variant="subtitle1"
                         component="div"
                        //  sx={{ color: "#2F5597", fontWeight: "bold" }}
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
                      //  sx={{
                      //    width: "600px",
                      //    height: "40px",
                      //    backgroundColor: "#2F5597",
                      //    display: "flex",
                      //    justifyContent: "center",
                      //    alignItems: "center",
                      //    flexDirection: "column",
                      //  }}
                     >
                       <Typography
                        //  variant="body2"
                         component="div"
                        //  sx={{ color: "#ffffff", fontSize: "12px" }}
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
                        //  variant="body2"
                         component="div"
                        //  sx={{ color: "#ffffff", fontSize: "12px" }}
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
                         แยกตามรายการทดสอบ และสังกัด
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
                   {/* <Box>
                     <ImageList
                       sx={{ width: 80, height: 50, padding: 2 }}
                     >
                       <img src={qrcode} alt="logo" />
                     </ImageList>
                   </Box> */}
                 </Box>
               </TableCell>
             </TableRow>
             <TableRow sx={{ border: "2px solid black" }}>
               <TableCell align="center" colSpan={6}>
                 <Typography
                  //  variant="body2"
                   component="div"
                  //  sx={{
                  //    color: "#000000",
                  //    fontSize: "10px",
                  //    fontWeight: "bold",
                  //  }}
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
                  //  variant="body2"
                   component="div"
                  //  sx={{
                  //    color: "#000000",
                  //    fontSize: "10px",
                  //    fontWeight: "bold",
                  //  }}
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
                   รายการทดสอบ
                   โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                   ทอ.ประจำปี {lastTwoChars} สังกัด ศซว.ทอ.
                 </Typography>
               </TableCell>
             </TableRow>
             <TableRow sx={{ border: "2px solid black" }}>
                      <TableCell
                      colSpan={1}
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        colSpan={1}
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                      colSpan={1}
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                      colSpan={1}
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                      colSpan={2}
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                      {/* <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        
                      </TableCell> */}
                    </TableRow>
</TableHead>
<TableBody>
                    {selectAllList.map((row, i) => (
                      <StyledTableRow
                        key={row["tbmember.tbmemberinfos.meminfo_id"]}
                        sx={{ border: "2px solid black" }}
                      >
                        <StyledTableCell align="center" colSpan={1}>
                        <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>   {i + 1}</Box>
                        </StyledTableCell>
                        <StyledTableCell align="center"  colSpan={1}>
                        <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                          {row["tbmemberinfo.mem_rank"] +
                            " " +
                            row["tbmemberinfo.mem_fname"] +
                            " " +
                            row["tbmemberinfo.mem_lname"]}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center"  colSpan={1}>
                        <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                              {row["editscore"] === null || row["editscore"] === 0
                            ? row["realscore"]
                            : row["editscore"]}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center"  colSpan={1}>
                        <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                          {row["realscoredate"] === null
                            ? "ยังไม่ได้ทำการทดสอบ"
                            : moment(row["realscoredate"])
                                .add(543, "year")
                                .format("DD MMMYY")}
                                </Box>
                        </StyledTableCell>
                        <StyledTableCell align="center"  colSpan={2}>
                        <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                          {Math.abs(
                            ((new Date(row["tbtestreservation.testreqdate"]) -
                              new Date(row["realscoredate"])) /
                              24) *
                              60 *
                              60 *
                              1000
                          ) === 0
                            ? row[
                                "tbtestreservation.tbtestscoringcriterium.mission"
                              ]
                            : "สอบวันสำรอง"}
                            </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableRow sx={{ border: "2px solid black" }}>
                      <TableCell align="center" colSpan={6}  className="page-break">
                        <Typography
                          // variant="body2"
                          component="div"
                          // sx={{
                          //   color: "#000000",
                          //   fontSize: "10px",
                          //   fontWeight: "bold",
                          // }}
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
                          ค่าเฉลี่ยผลการทดสอบภาษาอังกฤษ
                        </Typography>

                        <Typography
                          // variant="body2"
                          component="div"
                          // sx={{
                          //   color: "#000000",
                          //   fontSize: "10px",
                          //   fontWeight: "bold",
                          // }}
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
                          รายการทดสอบ
                          โครงการทดสอบความสามารถในการใช้ภาษาอังกฤษของกำลังพล
                          ทอ.ประจำปี {lastTwoChars}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ border: "2px solid black" }}>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        ชั้นยศ
                      </TableCell>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        จำนวนผู้เข้ารับการทดสอบ
                      </TableCell>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        ค่าเฉลี่ย
                      </TableCell>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        คะแนนสูงสุด
                      </TableCell>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        คะแนนต่ำสุด
                      </TableCell>
                      <TableCell
                        align="center"
                        // sx={{
                        //   color: "#000000",
                        //   fontWeight: "bold",
                        //   fontSize: "10px",
                        // }}
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
                        หมายเหตุ
                      </TableCell>
                    </TableRow>
                    <TableBody>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        น.ต.-น.อ.
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {countRole1()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {calculateMean1()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                          
                        {maxScores1}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {minScores1}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        ร.ต.-ร.อ.
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {countRole2()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {calculateMean2()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {maxScores2}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {minScores2}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        พ.อ.ต.-พ.อ.อ.
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {countRole3()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {calculateMean3()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {maxScores3}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {minScores3}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        จ.ต.-จ.อ.
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {countRole4()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {calculateMean4()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {maxScores4}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {minScores4}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        พนักงานราชการและลูกจ้าง
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {countRole5()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {calculateMean5()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {maxScores5}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {minScores5}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow sx={{ border: "2px solid black" }}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        รวม
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                        {countRole1() +
                          countRole2() +
                          countRole3() +
                          countRole4() +
                          countRole5() }  
                        </Box>
                        
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
{(calculateMean1() +
                          calculateMean2() +
                          calculateMean3() +
                          calculateMean4() +
                          calculateMean5()) /
                          (countRole1() +
                            countRole2() +
                            countRole3() +
                            countRole4() +
                            countRole5() )}
                        </Box>
                        
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>
                          
                        {allScoresMax}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                         <Box sx={{fontSize: {
                          lg: "12px",
                          md: "12px",
                          sm: "6px",
                          xs: "6px",
                        },color: "#000000",fontWeight: "bold",}}>

                        {allScoresMin}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      ></StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                  <TableRow sx={{ border: "2px solid black" }}>
                    <TableCell align="center" colSpan={6}>
                      <Box
                        sx={{
                          // width: "750px",
                          width: {
                            lg: "1200px",
                            md: "1200px",
                            sm: "300px",
                            xs: "300px",
                          },
                          // height: {
                          //   lg: "150px",
                          //   md: "150px",
                          //   sm: "35px",
                          //   xs: "35px",
                          // },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",  
                        }}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          // sx={{ color: "#2F5597", fontSize: "10px" }}
                          sx={{ color: "#2F5597", fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          }}}
                        >
                          เอการนี้เป็นเอกสารทางราชการผู้ที่ปลอมแปลงเอกสาร
                          มีโทษตามกฏหมาย
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          // sx={{ color: "#2F5597", fontSize: "10px" }}
                          sx={{ color: "#2F5597", fontSize: {
                            lg: "12px",
                            md: "12px",
                            sm: "6px",
                            xs: "6px",
                          }}}
                        >
                          หากมีข้อสงสัยติดต่อ แผนกแผนการศึกษา ศูนย์ภาษา ยศ.ทอ.
                          โทร.02-534-2965  
                        </Typography>
                        {/* {
                          filteredArrayIncludes.map((row, i) => (
                            <Typography
                            variant="body2"
                            component="div"
                            // sx={{ color: "#2F5597", fontSize: "10px" }}
                            sx={{ color: "#2F5597", fontSize: {
                              lg: "12px",
                              md: "12px",
                              sm: "6px",
                              xs: "6px",
                            }}}
                          >
                            {row.testindvappvcode}
                          </Typography>
                          ))
                        } */}
                      </Box>
                    </TableCell>
                  </TableRow>
</Table>

       </TableContainer>

          </Box>
</Box>
      {/* <h1>{countRole1()}</h1>
     <h1>{countRole2()}</h1>
     <h1>{countRole3()}</h1>
     <h1>{countRole4()}</h1>
     <h1>{countRole5()}</h1>
     <h1>{calculateMean1()}</h1>
     <h1>{calculateMean2()}</h1>
     <h1>{calculateMean3()}</h1>
     <h1>{calculateMean4()}</h1>
     <h1>{calculateMean5()}</h1>
     <h1>{maxScores1}</h1>
     <h1>{maxScores2}</h1>
     <h1>{maxScores3}</h1>
     <h1>{maxScores4}</h1>
     <h1>{maxScores5}</h1>
     <h1>{minScores1}</h1>
     <h1>{minScores2}</h1>
     <h1>{minScores3}</h1>
     <h1>{minScores4}</h1>
     <h1>{minScores5}</h1>
     <h1>{allScoresMax}</h1>
     <h1>{allScoresMin}</h1>
     <h1>{date}</h1> */}
     
      {/* {
selectAllList.map((row, i) => (
<h1>{row["tbmemberinfo.mem_fname"]}</h1>
))

     } */}
     
    </>
  );
}

export default PagePrintTableScoreMobile;
