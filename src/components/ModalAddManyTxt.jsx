import React, { useCallback, useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSilce";
import axios from "axios";

//กำหนด theme สี
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: yellow[500],
    },
    third: {
      main: blue[500],
    },
  },
});

//กำหนด style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

//เพิ่มหลายข้อ
function ModalAddManyTxt() {
  //Component Declaration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  const folderOptions = [
    "F0001",
    "F0002",
    "F0003",
    "F0004",
    "F0005",
    "F0006",
    "F0007",
    "F0008",
    "F0009",
    "F0010",
  ];

  //Hook and Logic
  const [files, setFiles] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");

  //Event Handler
  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles : ", acceptedFiles);

    const txtFiles = acceptedFiles.filter((file) => file.type === "text/plain");
    setFiles(txtFiles);
  }, []);

  const handleUpload = async () => {
    if (!selectedFolder) {
      toast.error("Please select a folder.");
      return;
    }

    if (files.length === 0) {
      toast.error("Please upload a folder containing TXT files.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + `/uploadmanytxtfiles/${selectedFolder}`,
        formData,
        {
          headers: {
            authtoken: "bearer " + token,
          },
        }
      );
      toast.success(res.data.message);

      handleClose();
    } catch (error) {
      toast.error("Error uploading folder.");
    }
  };

  //const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    directory: true,
  });

  //open-close dialog เพิ่มโจทย์ข้อสอบ
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFiles([]);
    setSelectedFolder("");
    setOpen(false);
  };

  //Render
  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUpload />}
        color="secondary"
        onClick={handleOpen}
      >
        UPLOAD TXT
      </Button>

      {/* เพิ่มโจทย์ข้อสอบใช้วิธีโยนไฟล์ */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            maxHeight: "80vh", // Limit the height to 80% of the viewport height
            overflowY: "auto", // Enable vertical scrolling if content overflows
          }}
        >
          <Typography
            id="modal-modal-title"
            sx={{ textAlign: "center" }}
            variant="h6"
            component="h2"
          >
            UPLOAD TXT
          </Typography>
          {/* Folder Selection */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="folder-select-label">Select Folder</InputLabel>
            <Select
              labelId="folder-select-label"
              id="folder-select"
              value={selectedFolder}
              label="Select Folder"
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              {folderOptions.map((folder, index) => (
                <MenuItem key={index} value={folder}>
                  {folder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* อัปโหลดไฟล์ For Multiple File */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <section
                className="container"
                style={{ display: "flex", width: "100%" }}
              >
                {/* DROPZONE */}
                <div style={{ width: "100%" }}>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderStyle: "dashed",
                      borderColor: "#000",
                      borderWidth: "3px",
                    }}
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  {files.length > 0 && (
                    <div>
                      <h4>Files to Upload:</h4>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button onClick={handleUpload} disabled={files.length === 0}>
                    Upload Folder
                  </button>
                </div>
              </section>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalAddManyTxt;
