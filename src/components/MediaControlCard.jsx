/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import ContentPageDetailPublicRelations from "./ContentPageDetailPublicRelations";
import LoadingCard from "./LoadingCard";

import LinesEllipsis from "react-lines-ellipsis";
import moment from "moment";

// import { useSelector } from "react-redux";

// import { listPubrelContentsBy } from "./functions/pubrelContents";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function MediaControlCard({contents, loading}) {
  // const { user } = useSelector((state) => ({ ...state }));
  // const token = user.user.token;

  const [open, setOpen] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);
  // const [contents, setContents] = useState([]);
  const [contentdetailby, setContentdetailby] = useState([]);
  const handleClickOpen = (i) => {
    setOpen(true);
    setContentdetailby(i);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const loadData = () => {
  //   setLoading(true);
  //   listPubrelContentsBy(token, 3)
  //     .then((res) => {
  //       setLoading(false);
  //       // console.log("data: ", res.data);
  //       setContents(res.data);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       console.log(err);
  //     });
  // };

  // console.log("data: ", contents[1]?.pathmedia[0]);
  // console.log("key: ", key);
  // console.log("contents: ", contents);
  // console.log("loading: ", loading);

  const chkImg = contents.pathmedia[0]?.primgcode.includes("IMG");
  return (
    <>
      
        {/* // contents.map((item, index) => {
          // console.log(chkImg)
          // return (
            <> */}
              <Box sx={{ width: "55%", margin: "5px" }} >
                {loading ? (
                  <LoadingCard line={4} />
                ) : (
                  <>
                    <Link
                      to="#"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickOpen(contents)}
                    >
                      <Card
                        raised
                        sx={{
                          display: "flex",
                          margin: "0 auto",
                          padding: "0.1em",
                        }}
                        elevation={6}
                        // key={key}
                      >
                        <CardMedia
                          component="img"
                          // sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                          sx={{ width: "25%", objectFit: "contain" }}
                          image={
                            contents && contents.pathmedia.length && chkImg
                              ? // chkImg ?
                                // 'https://img.uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.svg'
                                process.env.REACT_APP_API_URL_IMG +
                                contents.pathmedia[0]?.primgfilepath
                              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                          }
                          // image={process.env.REACT_APP_API_URL_IMG + item.pathmedia[index]?.primgfilepath}
                          alt="Image"
                          // key={index}
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }} >
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ marginLeft: "10px", cursor: "pointer" }}
                          >
                            {contents.pubrel_title}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{ marginLeft: "5px" }}
                          >
                            <ul>
                              <li
                                style={{ cursor: "pointer", listStyle: "none" }}
                                // key={key}
                              >
                                <LinesEllipsis
                                  text={contents.pubrelcont[0].pubrelcontents}
                                  maxLine="2"
                                  ellipsis="..."
                                  trimRight
                                  basedOn="letters"
                                />
                              </li>
                            </ul>
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{ marginLeft: "10px", cursor: "pointer" }}
                          >
                            {/* 15/5/65 */}
                            {moment(contents.pubrel_createddate)
                              .add(543, "year")
                              .format("ll")}
                          </Typography>
                        </Box>
                      </Card>
                    </Link>
                    <ContentPageDetailPublicRelations
                      open={open}
                      onClose={handleClose}
                      data={contentdetailby}
                    />
                  </>
                 )} 
              </Box>
            {/* </>
          // );
        // })
      // } */}
    </>
  );
}
