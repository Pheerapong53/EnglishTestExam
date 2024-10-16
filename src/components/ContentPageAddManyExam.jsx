import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import ModalAddMultiple from "./ModalAddMultiple";
import ModalAddTemplateExcel from "./ModalAddTemplateExcel";
import ModalAddManyProblem from "./ModalAddManyProblem";
import ModalAddManyTxt from "./ModalAddManyTxt";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: red[800],
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function ContentPageAddManyExam() {
  //Component Declaration
  //Hook and Logic
  //Event Handler
  //Render
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography component="div">
          <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
            เพิ่มโจทย์ข้อสอบ
          </Box>
        </Typography>

        <DrawerHeader />

        {/* Back button */}
        <Link to="/PageExamArchive" style={{ textDecoration: "none" }}>
          <Button variant="outlined" startIcon={<ArrowBack />}>
            BACK
          </Button>
        </Link>

        {/* File upload buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          {/* Button to upload Multiple Question */}
          <ModalAddMultiple />

          {/* Button to upload Template Excel file */}
          <ModalAddTemplateExcel />

          {/* Button to upload MP3 file */}
          <ModalAddManyProblem />

          {/* Button to upload TXT file */}
          <ModalAddManyTxt />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default ContentPageAddManyExam;
