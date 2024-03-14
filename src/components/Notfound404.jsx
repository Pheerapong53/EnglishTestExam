import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";

export default function Notfound404({ text }) {
    const { state } = useLocation();
    // const message = JSON.stringify(state);
    // const messageparse = JSON.parse(state);
    // console.log("state txt: " + state.txt)
    // console.log("state statusCode: " + state.statusCode)
    // console.log("message: " + message)
    // console.log("messageparse: " + messageparse)
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">{state === null || state?.statusCode === 404 ? "404" : state?.statusCode }</Typography>
            <Typography variant="h6">
                {text || state.txt}
           </Typography>
            <Link to={"/"}>
              <Button variant="contained">Back HomePage</Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src={state === null || state?.statusCode === 404 ? "https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg": "https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/401-Unauthorized-t.jpg"}
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}