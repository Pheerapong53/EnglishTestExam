/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";

function SoundTwoQuestions({
  Num1,
  Num2,
  form,
  filepath,
  filepath1,
  filepath2,
  onFinish,
  onStart,
  time,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;

  const audioNum1 = useRef(null);
  const audioNum2 = useRef(null);
  const audioQuestion = useRef(null);
  const audioAsk1 = useRef(null);
  const audioAsk2 = useRef(null);

  const [audioAskOneUrl, setAudioAskOneUrl] = useState(null);
  const [audioAskTwoUrl, setAudioAskTwoUrl] = useState(null);
  const [numOneUrl, setNumOneUrl] = useState(null);
  const [numTwoUrl, setNumTwoUrl] = useState(null);
  const [audioQuestionUrl, setAudioQuestionUrl] = useState(null);

  useEffect(() => {
    const axiosConfig = {
      baseURL: process.env.REACT_APP_API_URL,
      headers: {authtoken: "bearer " + token},
    };
    const axiosInstance = axios.create(axiosConfig);
    const fetchData = async () => {
      try {
        await axiosInstance
          .get(`/getfilesound/${form}/${filepath}`)
          .then((result) => {
            setAudioQuestionUrl(result.data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // setPlaySound(true);
            return;
          });

        await axiosInstance
          .get(`/getfilesound/NO/${Num1}.mp3`)
          .then((result) => {
            setNumOneUrl(result.data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // setPlaySound(true);
            return;
          });

        await axiosInstance
          .get(`/getfilesound/NO/${Num2}.mp3`)
          .then((result) => {
            setNumTwoUrl(result.data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // setPlaySound(true);
            return;
          });

        await axiosInstance
          .get(`/getfilesound/${form}/${filepath1}.mp3`)
          .then((result) => {
            setAudioAskOneUrl(result.data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // setPlaySound(true);
            return;
          });

        await axiosInstance
          .get(`/getfilesound/${form}/${filepath2}.mp3`)
          .then((result) => {
            setAudioAskTwoUrl(result.data);
          })
          .catch((error) => {
            console.error("Error:", error);
            // setPlaySound(true);
            return;
          });
      } catch (error) {
        console.error("Error fetching audio: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {audioQuestionUrl ? (
        <audio
          src={"data:audio/mp3;base64," + audioQuestionUrl}
          autoPlay
          //controls
          type="audio/mpeg"
          onEnded={() => setTimeout(() => {
            onStart()
            audioNum1.current.play();
          },0)}
        />
      ) : (
        <p>Loading audio...</p>
      )}

      {numOneUrl ? (
        <audio
          src={"data:audio/mp3;base64," + numOneUrl}
          ref={audioNum1}
          // autoPlay
          //controls
          type="audio/mpeg"
          onEnded={() => 
            audioAsk1.current.play()
          }
        />
      ) : (
        ""
      )}

      {audioAskOneUrl ? (
        <audio
          src={"data:audio/mp3;base64," + audioAskOneUrl}
          ref={audioAsk1}
          // autoPlay
          //controls
          type="audio/mpeg"
          onEnded={() => setTimeout(() => {
            audioNum2.current.play()
          },10000)}
        />
      ) : (
        <p>Loading audio...</p>
      )}
      {numTwoUrl ? (
        <audio
          src={"data:audio/mp3;base64," + numTwoUrl}
          ref={audioNum2}
          // autoPlay
          //controls
          type="audio/mpeg"
          onEnded={() => audioAsk2.current.play()}
        />
      ) : (
        ""
      )}
      {audioAskTwoUrl ? (
        <audio
          src={"data:audio/mp3;base64," + audioAskTwoUrl}
          ref={audioAsk2}
          // autoPlay
          //controls
          type="audio/mpeg"
          onEnded={() => setTimeout(() => {
            onFinish();
          },16000)}
        />
      ) : (
        <p>Loading audio...</p>
      )}
    </div>
  );
}

export default SoundTwoQuestions;

