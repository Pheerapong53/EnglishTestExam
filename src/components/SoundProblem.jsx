/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Campaign, PlayCircleOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

function SoundProblem({ form, filepath, order, onFinish, time }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const audioFile = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  //Updated 06112024
  const [playEnabled, setPlayEnabled] = useState(true);

  useEffect(() => {
    const axiosConfig = {
      baseURL: process.env.REACT_APP_API_URL,
      headers: { authtoken: "bearer " + token },
    };
    const axiosInstance = axios.create(axiosConfig);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/getfilesound/${form}/${filepath}`
        );
        const url = response.data;
        setTimeout(() => {
          //setNumUrl(urlNum);
          setAudioUrl(url);
        }, time);
      } catch (error) {
        console.error("Error fetching audio: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
      {playEnabled && (
        <IconButton
          onClick={() => {
            audioFile.current.play();
            setPlayEnabled(false);
          }}
        >
          <PlayCircleOutline fontSize="large" />
        </IconButton>
      )}
      {audioUrl ? (
        <>
          <audio
            src={"data:audio/mp3;base64," + audioUrl}
            autoPlay
            ref={audioFile}
            type="audio/mpeg"
            onEnded={() => {
              onFinish();
              setIsPlaying(false);
            }}
            onPlay={() => {
              setIsPlaying(true);
              setPlayEnabled(false);
            }}
          />
          {isPlaying && <Campaign fontSize="large" />}
        </>
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
}

export default SoundProblem;
