/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MediaControlCard from "./MediaControlCard";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { styled } from "@mui/material/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom'

import { listPubrelContentsBy } from "../components/functions/pubrelContents";
import { logout } from "../../src/store/userSilce";

function ContentPageHome() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = user.user;
  const token = user.user.token;
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));


  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listPubrelContentsBy(token, 3)
      .then((res) => {
        setLoading(false);
        // console.log("data: ", res.data);
        setContents(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if(err.response.status === 401) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        } else if(err.response.status === 404) {
          dispatch(logout());
          navigate('/notfound404', { state: {statusCode: err.response.status, txt: err.response.data} })
        }
         console.log("get pubrelcontentBy: ",err);
      });
  };
  // console.log("index: ",contents)

  return (
    <>
      <p>
        ยินดีต้อนรับ {userLogin.rank} {userLogin.fname} {userLogin.lname}
      </p>
      {/* <DrawerHeader /> */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to="/PagePublicRelationsManagement"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button variant="contained">การจัดการประชาสัมพันธ์</Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ marginRight: "40%", fontWeight: "bold", fontSize: "18px" }}>
          ข่าวสาร และประชาสัมพันธ์
        </p>
        {
          contents.map((item, index) => (
            <MediaControlCard key={index} contents={item} loading={loading} />
          ))
        }
      </Box>
      <DrawerHeader />
      <Box
        sx={{
          width: "100%",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <Container>
          <Link
            to="/ContentPagePressRelease"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            MORE
            <NavigateNextIcon />
          </Link>
        </Container>
      </Box>
      <DrawerHeader />
      <Footer />
    </>
  );
}

export default ContentPageHome;
