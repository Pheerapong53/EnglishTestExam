import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ControlPoint, CloudUpload } from "@mui/icons-material";
import { logout } from "../store/userSilce";
import axios from "axios";
import { toast } from "react-toastify";

function ModalAddTemplateExcel() {
  //Component Declaration
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  //Hook and Logic
  const [open, setOpen] = React.useState(false);

  // Ref for the description element to manage focus
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    // Focus the description element when the dialog opens
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //State for holding the new Template file selected by the user
  const [fileTemplate, setFileTemplate] = useState("");

  //State for holding the preview content of the currently selected files (before submission)
  const [fileTemplatePreview, setFileTemplatePreview] = useState("");

  //Event Handler
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFileTemplate("");
    setOpen(false);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileTemplate(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileTemplate !== "") {
      const renamedFile = new File([fileTemplate], "Template.xlsx", {
        type: fileTemplate.type,
      });
      const formData = new FormData();
      formData.append("file", renamedFile);

      try {
        const res = await axios.post(
          process.env.REACT_APP_API_URL + "/uploadtemplate",
          formData,
          {
            headers: {
              authtoken: "bearer " + token,
            },
          }
        );
        toast.success(res.data.message, { onClose: handleClose });
      } catch (error) {
        console.error("Error uploading text file:", error);
      }
    }
  };
  //Render
  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        onClick={handleOpen}
      >
        Upload Template Excel
      </Button>

      {/*Dialog Upload File */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true} sx={{ width: "600px" }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="ไฟล์ Template"
                sx={{ margin: "10px" }}
                id="outlined-basic"
                name="problem"
                value={fileTemplate?.name || ""}
                required
                fullWidth
                variant="outlined"
              />

              <input
                label="ไฟล์ Template"
                accept=".xlsx, .xls"
                id="file-template"
                component="span"
                multiple
                name="file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-template">
                <Button
                  sx={{ margin: "10px" }}
                  component="span"
                  variant="outlined"
                  fullWidth
                >
                  อัพโหลดไฟล์ Template (นามสกุล .xlsx)
                </Button>
              </label>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ paddingRight: "20px" }}>
                  <Button type="submit" variant="contained">
                    บันทึก
                  </Button>
                </Box>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalAddTemplateExcel;
