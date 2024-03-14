/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import ContentPageDetailPublicRelations from "../components/ContentPageDetailPublicRelations";
// import LoadingCard from "../components/LoadingCard";

// import LinesEllipsis from "react-lines-ellipsis";
// import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

import { listPubrelContents } from "../components/functions/pubrelContents";
import PublicrelationsCard from "./PublicrelationsCard";


function ContentPagePressRelease() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const token = user.user.token;

  const pageSize = 6;

  const navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [contents, setContents] = useState([]);
  const [count, setCount] = useState([]);
  // const [contentdetailby, setContentdetailby] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  })

  // const handleClickOpen = (i) => {
  //   setOpen(true);
  //   setContentdetailby(i);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    loadData();
  }, [pagination.from, pagination.to]);

  const loadData = () => {
    setLoading(true);
    listPubrelContents(token, pagination)
      .then((res) => {
        setLoading(false);
        // console.log("data: ", res.data);
        setContents(res.data.data);
        setCount(res.data.count);
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
        console.log("listPubrelContents: ",err);
      });
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({...pagination, from: from, to: to});
  }
  
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#EEEEEE",
            width: "80vw",
            height: "90vh",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ margin: "20px" }}>
              <Typography variant="h6" gutterBottom>
                ข่าวประชาสัมพันธ์
              </Typography>
            </Box>
            <Box sx={{ margin: "20px" }}>
              <Link to="/PageHome" style={{ textDecoration: "none" }}>
                <Button variant="outlined" startIcon={<ArrowBackIcon />}>
                  BACK
                </Button>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          >
            {contents.map((item, index) => (
              <PublicrelationsCard loading={loading} item={item} key={index} />
            ))}
          </Box>
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <Pagination count={Math.ceil(count / pageSize)} variant="outlined" shape="rounded" onChange={handlePageChange} />
        </Box>
      </Box>
    </div>
  );
}

export default ContentPagePressRelease;
