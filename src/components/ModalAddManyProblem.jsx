import React, { useCallback, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { CloudUpload, Description } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, red, yellow } from "@mui/material/colors";
import { addManyExam } from "./functions/cefrLevel";
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
function ModalAddManyProblem() {
  //Component Declaration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;

  //Hook and Logic
  const [files, setFiles] = useState([]);
  console.log(files);

  const [fileName, setFileName] = useState();
  //open-close Datagrid when press button
  const [check, setCheck] = React.useState(false);

  //Event Handler
  const onDrop = useCallback((acceptedFiles) => {
    const mp3Files = acceptedFiles.filter((file) => file.type === "audio/mpeg");
    setFiles(mp3Files);
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please upload a folder containing MP3 files.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      FormData.append("files", file);
    });

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/uploadmanyfiles",
        formData,
        {
          headers: {
            authtoken: "bearer " + token,
          },
        }
      );
      toast.success(res.data.message);
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
    setFileName();
    setFiles([]);
    setCheck(false);
    setOpen(false);
  };

  // const [confirm, SetConfirm] = React.useState(false);
  const handleClickCheck = () => {
    if (files === undefined) {
      toast.error("Please Select File");
    } else if (fileName !== undefined) {
      const fileExtension = fileName.split(".").pop();
      if (fileExtension === "xlsx") {
        setCheck(true);
      } else {
        toast.error("accept only File .xlsx");
      }
    } else if (files !== undefined) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  //Insert Data in Many Row
  const handleConfirm = () => {
    if (files !== undefined && files.length !== 0) {
      //console.log("fileExcel : ", fileExcel);
      addManyExam(files, token)
        .then((res) => {
          toast.success(res.data.msg, { onClose: () => navigate(0) });
        })
        .catch((error) => {
          if (error.response.status === 401 || error.response.status === 404) {
            dispatch(logout());
            navigate("/notfound404", {
              state: {
                statusCode: error.response.status,
                txt: error.response.data,
              },
            });
          } else {
            toast.error(error.response.data.message);
          }
        });
    } else {
      toast.error("Please Select New File");
    }
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
        UPLOAD MP3
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
            UPLOAD MP3
          </Typography>

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
            <Box>
              <section className="container" style={{ display: "flex" }}>
                {/* DROPZONE */}
                <div>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                      width: "30vw",
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

export default ModalAddManyProblem;
