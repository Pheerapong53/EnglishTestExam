import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ControlPoint, CloudUpload } from "@mui/icons-material";

function ModalAddMultiple() {
  //Component Declaration

  // Style for aligning buttons horizontally

  //Hooks and Logic

  //Event Handlers

  //Render
  return (
    <Link to="/PageAddManyExam">
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        startIcon={<ControlPoint />}
      >
        เพิ่มหลายโจทย์
      </Button>
    </Link>
  );
}

export default ModalAddMultiple;
