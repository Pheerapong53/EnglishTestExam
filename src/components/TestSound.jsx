/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

function TestSound({ form, filepath, onFinish, time }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;
  const audioNum = useRef(null);
  const audioFile = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [numUrl,setNumUrl] = useState(null);
  // const [playSound, setPlaySound] = useState(false);
  // console.log(numUrl);
  // console.log(time);
  useEffect(() => {
    const axiosConfig = {
      baseURL: process.env.REACT_APP_API_URL,
      headers: {authtoken: "bearer " + token},
    };
    const axiosInstance = axios.create(axiosConfig);
    const fetchData = async () => {
      try {
        const Num = filepath.split("");
        await axiosInstance.get(`/getfilesound/NO/${
          Num[9] + Num[10] + Num[11]
        }.mp3`).then((result) => {
          setTimeout(() => {
            //setNumUrl(urlNum);
            setNumUrl(result.data);
          }, time);
        }).catch((error) => {
          console.error("Error:", error);
          // setPlaySound(true);
          return
        });
        //const urlNum = responseNum.data;

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
    <div>
      {numUrl ? (<audio
            src={"data:audio/mp3;base64," + numUrl}
            ref={audioNum}
            autoPlay
            //controls
            type="audio/mpeg"
            onEnded={() => audioFile.current.play()}
          />) : ("")}
      {audioUrl ? (
          <audio
            src={"data:audio/mp3;base64," + audioUrl}
            ref={audioFile}
            // autoPlay
            //controls
            type="audio/mpeg"
            onEnded={onFinish}
          />
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
}

export default TestSound;

