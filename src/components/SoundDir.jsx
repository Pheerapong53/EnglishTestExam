/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Campaign } from "@mui/icons-material";
import { logout } from "../../src/store/userSilce";

function SoundDir({ dir, onFinish, time }) {
  const [dirUrl, setDirUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  useEffect(() => {
    const axiosConfig = {
      baseURL: process.env.REACT_APP_API_URL,
      headers: { authtoken: "bearer " + token },
    };
    const axiosInstance = axios.create(axiosConfig);
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/getfilesound/DIR_END/${dir}`
        );
        const url = response.data;
        setTimeout(() => {
          //setNumUrl(urlNum);
          setDirUrl(url);
        }, time);
      } catch (error) {
        console.error("Error fetching audio: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {dirUrl ? (
        <>
          <audio
            src={"data:audio/mp3;base64," + dirUrl}
            autoPlay
            //controls
            type="audio/mpeg"
            onEnded={onFinish}
            onPlay={() => setIsPlaying(true)}
          />
          {isPlaying && <Campaign fontSize="large" />}
        </>
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
}

export default SoundDir;
