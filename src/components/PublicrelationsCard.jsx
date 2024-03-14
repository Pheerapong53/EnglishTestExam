/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import moment from "moment";

import LoadingCard from "../components/LoadingCard";
import ContentPageDetailPublicRelations from "../components/ContentPageDetailPublicRelations";


const PublicrelationsCard = ({loading, item}) => {
    const [open, setOpen] = React.useState(false);
    const [contentdetailby, setContentdetailby] = useState([]);

    const handleClickOpen = (i) => {
        setOpen(true);
        setContentdetailby(i);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    //   console.log("Public: ", item)
      const chkImg = item.pathmedia[0]?.primgcode.includes("IMG");
    return (
        <>
          <Box
            sx={{
              width: "30vw",
              height: "20vh",
              margin: "10px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            // key={index}
          >
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
                  onClick={() => handleClickOpen(item)}
                >
                  <Card
                raised
                sx={{
                  display: "flex",
                  margin: "0 auto",
                  padding: "0.1em",
                  height: '12vw',
                  // width: '100%',
                }}
                // style={cardStyle}
                elevation={6}
              >
                <CardMedia
                  component="img"
                  // sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                  sx={{ width: "30%", objectFit: "contain" }}
                  image={
                    item && item.pathmedia.length && chkImg
                      ? // chkImg ?
                        // 'https://img.uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.svg'
                        process.env.REACT_APP_API_URL_IMG +
                        item.pathmedia[0]?.primgfilepath
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                  // image={process.env.REACT_APP_API_URL_IMG + item.pathmedia[index]?.primgfilepath}
                  alt="Image"
                />
                <Box sx={{ display: "flex", flexDirection: "column", width: '30vw' }}>
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{ marginLeft: "10px", cursor: "pointer" }}
                  >
                    {item.pubrel_title}
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
                      >
                        <LinesEllipsis
                          text={item.pubrelcont[0].pubrelcontents}
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
                    {moment(item.pubrel_createddate)
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
        </>
      );
}

export default PublicrelationsCard