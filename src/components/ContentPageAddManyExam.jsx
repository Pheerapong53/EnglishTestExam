import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowBack, CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import ModalAddMultipleOld from "./ModalAddMultipleOld";
import ModalAddTemplateExcel from "./ModalAddTemplateExcel";
import ModalAddManyProblem from "./ModalAddManyProblem";
import * as XLSX from "xlsx";

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
  const [selectedExcelTemplate, setSelectedExcelTemplate] = useState(null);

  const handleExcelTemplateUpload = (fileType) => (event) => {
    const file = event.target.files[0];
    if (file && fileType === "Excel") {
      setSelectedExcelTemplate(file);
    }
  };

  const handleFileUpload = (fileType) => (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Uploaded ${fileType} file:`, file.name);
      // Handle file upload logic here
    }
  };

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
          <ModalAddMultipleOld />

          {/* Button to upload Excel file */}
          <ModalAddTemplateExcel />

          {/* Button to upload MP3 file */}
          <ModalAddManyProblem />

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
      {/* Display preview of Excel data in a table */}
      {selectedExcelTemplate && (
        <div>
          <p>Selected File: {selectedExcelTemplate.name}</p>
          {/* "บันทึก" (Save) Button */}
          <Button
            variant="contained"
            color="success"
            style={{ marginTop: "20px" }}
            onClick={() => setSelectedExcelTemplate(null)}
          >
            บันทึก
          </Button>
          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={() => setSelectedExcelTemplate(null)}
          >
            ยกเลิก
          </Button>
        </div>
      )}
    </>
  );
}

export default ContentPageAddManyExam;
