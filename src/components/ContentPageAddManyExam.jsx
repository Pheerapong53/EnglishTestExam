import React from "react";
import { Link } from "react-router-dom";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[800],
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
  const handleFileUpload = (fileType) => (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploaded ${fileType} file:`, file.name);
      // Handle file upload logic here
    }
  };

  return (
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
        {/* Button to upload Excel file */}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          color="primary"
        >
          Upload Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            hidden
            onChange={handleFileUpload("Excel")}
          />
        </Button>

        {/* Button to upload MP3 file */}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          color="secondary"
        >
          Upload MP3
          <input
            type="file"
            accept=".mp3"
            hidden
            onChange={handleFileUpload("MP3")}
          />
        </Button>

        {/* Button to upload TXT file */}
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUpload />}
          color="third"
        >
          Upload TXT
          <input
            type="file"
            accept=".txt"
            hidden
            onChange={handleFileUpload("TXT")}
          />
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default ContentPageAddManyExam;
