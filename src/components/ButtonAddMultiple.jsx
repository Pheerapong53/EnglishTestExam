import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

function ButtonAddMultiple() {
  //Component Declaration

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

export default ButtonAddMultiple;
