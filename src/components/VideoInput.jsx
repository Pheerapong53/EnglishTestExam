/* eslint-disable no-unused-vars */
import React from 'react'
import Button from "@mui/material/Button";
function VideoInput(props) {

    const { width, height } = props;

    const inputRef = React.useRef();
  
    const [source, setSource] = React.useState();
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setSource(url);
    };
  
    const handleChoose = (event) => {
      inputRef.current.click();
    };

  return (
    <div className="VideoInput">
    <input
      ref={inputRef}
      className="VideoInput_input"
      type="file"
      onChange={handleFileChange}
      accept=".mov,.mp4"
    />
    {!source && <Button variant="contained" onClick={handleChoose}>Choose</Button>}
    {source && (
      <video
        className="VideoInput_video"
        width="100%"
        height={height}
        controls
        src={source}
      />
    )}
    <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
{
    source && (
<Button sx={{marginTop:'10px'}} variant="contained">UPLOAD</Button>
    )
}
    
  </div>
  )
}

export default VideoInput