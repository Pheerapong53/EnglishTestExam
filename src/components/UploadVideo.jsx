import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { toast } from "react-toastify";
import axios from "axios";

const UploadVideo = (props) => {
  // console.log(props.token);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const extension = file.name.split(".").pop().toLowerCase();
    const allowedExtensions = ["mov", "mp4"];

    if (!allowedExtensions.includes(extension)) {
      toast.error("กรุณาเลือกไฟล์วิดีโอนามสกุล .mov หรือ .mp4");
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("กรุณาเลือกไฟล์วิดีโอ");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);

    try {
      await axios.post(
        process.env.REACT_APP_API_URL + "/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authtoken: "bearer " + props.token,
          },
        }
      );
      toast.success("อัปโหลดวิดีโอเรียบร้อย");
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("การอัปโหลดไฟล์วิดีโอมีปัญหา");
    }
    //console.log('File Upload: ', selectedFile);
  };
  return (
    <Typography align="center">
      <Input type="file" onChange={handleFileChange} accept=".mov,.mp4" />
      <Button
        sx={{ margin: "5px" }}
        size="large"
        variant="contained"
        onClick={handleUpload}
      >
        อัปโหลดวิดีโอแนะนำการทดสอบ
      </Button>
    </Typography>
  );
};

export default UploadVideo;
