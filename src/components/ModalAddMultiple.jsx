import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { ControlPoint } from "@mui/icons-material";

function ModalAddMultiple() {
  //Component Declaration
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  //Hooks and Logic
  const [open, setOpen] = useState(false);
  //Event Handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //Render
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Button variant="contained">เพิ่มไฟล์ Excel</Button>
          <Button variant="contained">เพิ่มไฟล์เสียง .mp3</Button>
          <Button variant="contained">เพิ่มไฟล์ .txt</Button>
        </Box>
      </Modal>
      <Button
        sx={{ width: "200px" }}
        variant="contained"
        onClick={handleOpen}
        startIcon={<ControlPoint />}
      >
        เพิ่มหลายโจทย์
      </Button>
    </>
  );
}

export default ModalAddMultiple;
