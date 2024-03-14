import React,{useState} from "react";
import {useDropzone} from 'react-dropzone'
import Button from "@mui/material/Button";




function ImageDropzoneOne() {
    const [files, setFiles] = useState([])


    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          )
        },
      })



  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div>
        <div>{images}</div>
          <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button variant="contained" component="span" fullWidth>
                Upload IMAGE
        </Button>
      </div>
    </div>
  )
}

export default ImageDropzoneOne