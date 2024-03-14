/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import SoundDir from "../components/SoundDir";
import { toast } from "react-toastify";

function PageTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.user.token;

  //toggle button pagination
  //false -> Enable Button
  //True -> Disable Button
  //For Test useState(false)
  const [isReading, setIsReading] = useState(true);

  //toggle for Sound File
  //false -> Play DIR_1_50
  const [isStart, setIsStart] = useState(false);
  //false -> Play Sound Question
  const [isSendExam, setIsSendExam] = useState(false);

  const [QuestionAndChoicesFromDB, setQuestionAndChoiceFromDB] = useState(null);

  const [QuestionNumber, setQuestionNumber] = useState(0);

  //FileTextFromServer
  const [FileTextSixtyOne, setFileTextSixtyOne] = useState(null);
  const [FileTextSixtyNine, setFileTextSixtyNine] = useState(null);
  const [FileTextSeventySeven, setFileTextSeventySeven] = useState(null);
  const [FileTextEightyOne, setFileTextEightyOne] = useState(null);
  const [FileTextEightyFive, setFileTextEightyFive] = useState(null);
  const [FileTextNinetyTwo, setFileTextNinetyTwo] = useState(null);

  const getQuestionAndChoice = async () => {
    try {
      const choices = await axios
        .get(process.env.REACT_APP_API_URL + `/getchoice`, {
          headers: {
            authtoken: "bearer " + token,
          },
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

      const questions = await axios
        .get(process.env.REACT_APP_API_URL + `/getquestion`, {
          headers: {
            authtoken: "bearer " + token,
          },
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

      const axiosConfig = {
        baseURL: process.env.REACT_APP_API_URL,
        headers: { authtoken: "bearer " + token },
      };
      const axiosInstance = axios.create(axiosConfig);

      const fetchFileText = (index, form, filepath) => {
        const rangeMappings = [
          { range: [60, 67], stateSetter: setFileTextSixtyOne },
          { range: [68, 75], stateSetter: setFileTextSixtyNine },
          { range: [76, 79], stateSetter: setFileTextSeventySeven },
          { range: [80, 83], stateSetter: setFileTextEightyOne },
          { range: [84, 90], stateSetter: setFileTextEightyFive },
          { range: [91, 99], stateSetter: setFileTextNinetyTwo },
        ];

        const mapping = rangeMappings.find(
          (mapping) => index >= mapping.range[0] && index <= mapping.range[1]
        );

        if (mapping) {
          axiosInstance
            .get(`getfiletext/${form}/${filepath}`)
            .then((result) => {
              mapping.stateSetter(result.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      };

      setQuestionAndChoiceFromDB(
        questions.data.map((question, i) => {
          function fetchData() {
            try {
              const result = fetchFileText(
                i,
                question.formcode,
                question.problem
              );
              return result;
            } catch (error) {
              console.error("Error:", error);
            }
          }
          const fileCallFuction = fetchData();

          return {
            questioncode: question.questioncode,
            filepath: question.problem,
            questionText: question.question,
            cerfcode: question.cerfcode,
            form: question.formcode,
            onSelect: false,
            onAnswer: null,
            Score: 0,
            choice: choices.data
              .filter((choice) => choice.questioncode === question.questioncode)
              .map((value) => ({ value, sortValue: Math.random() }))
              .sort((a, b) => a.sortValue - b.sortValue)
              .map((item) => ({
                id: item.value.choicecode,
                choicetext: item.value.choicetext,
                answer: item.value.answer,
                questioncode: item.value.questioncode,
              })),
          };
        })
      );
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  useEffect(() => {
    if (
      location.state?.url === "/PageFinishAttempt" &&
      location.state.data.data != null
    ) {
      setQuestionAndChoiceFromDB(location.state.data.data);
      setTestResvCode(location.state.data.testResvCode);
      //Disable DIR_1_50
      setIsStart(true);
      //Enable Button in Pagination
      setIsReading(false);
      //Disable Sound File
      setIsSendExam(true);
      //Remaining Time
      setTime(location.state.data.time);
    } else {
      getQuestionAndChoice();
      setTestResvCode(location.state);
    }
  }, []);
  //console.log(QuestionAndChoicesFromDB);

  const handleQuestionNumber = (number) => {
    setQuestionNumber(number);
  };

  const handleStart = (bool) => {
    setTimeout(() => {
      setIsStart(bool);
    }, 2000);
  };

  const checkIfAnswerIsCorrect = (id, newStatus) => {
    const question = QuestionAndChoicesFromDB?.find(
      (question) => question.questioncode === id
    );
    if (question) {
      const selectChoices = question.choice
        .filter((choice) => choice.choicetext === newStatus)
        .map((item) => item.answer);
      //console.log(selectChoices);
      if (selectChoices.length > 0 && selectChoices[0] === 1) {
        return true;
      }
    }
    return false;
  };

  const updateStatusOnAnswer = (id, newStatus) => {
    const updatedAnswer = QuestionAndChoicesFromDB?.map((question) => {
      if (question.questioncode === id) {
        const isCorrect = checkIfAnswerIsCorrect(id, newStatus);
        return {
          ...question,
          onAnswer: newStatus,
          onSelect: true,
          Score: isCorrect ? 1 : 0,
        };
      }
      return question;
    });
    setQuestionAndChoiceFromDB(updatedAnswer);
  };

  const score = QuestionAndChoicesFromDB?.reduce(
    (total, question) => total + question.Score,
    0
  );

  //Count Time Func
  const [time, setTime] = useState(60 * 60);
  const [isCounting, setIsCounting] = useState(true);
  //const [timeUp, setTimeUp] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        } else {
          clearInterval(timer);
          handleTimeUp();
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isCounting, time]);

  const handleTimeUp = () => {
    navigate("/PageFinishAttempt", {
      state: {
        data: QuestionAndChoicesFromDB,
        testResvCode: testResvCode,
        realScore: score,
        time: time,
      },
    });
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  const location = useLocation();
  const [testResvCode, setTestResvCode] = useState("");

  return (
    <>
      <Navbar />
      {/* <>
        <p style={{ fontWeight: "bold" }}>Demo Version</p>
      </> */}

      {/* Button For Select Reading Exam */}
      {QuestionNumber >= 60 ? (
        <Box sx={{ margin: "20px", display: "flex" }}>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(60)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">61-68</ColorButton>
            </Link>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(68)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">69-76</ColorButton>
            </Link>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(76)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">77-80</ColorButton>
            </Link>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(80)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">81-84</ColorButton>
            </Link>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(84)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">85-91</ColorButton>
            </Link>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <Link
              onClick={() => setQuestionNumber(91)}
              to="#"
              style={{ textDecoration: "none" }}
            >
              <ColorButton variant="contained">92-100</ColorButton>
            </Link>
          </Box>
        </Box>
      ) : (
        ""
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        {QuestionNumber >= 60 && QuestionNumber <= 67 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 61 - 68. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextSixtyOne}
            </Box>
          </Card>
        ) : QuestionNumber >= 68 && QuestionNumber <= 75 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 69 - 76. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextSixtyNine}
            </Box>
          </Card>
        ) : QuestionNumber >= 76 && QuestionNumber <= 79 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 77 - 80. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextSeventySeven}
            </Box>
          </Card>
        ) : QuestionNumber >= 80 && QuestionNumber <= 83 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 81 - 84. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextEightyOne}
            </Box>
          </Card>
        ) : QuestionNumber >= 84 && QuestionNumber <= 90 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 85 - 91. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextEightyFive}
            </Box>
          </Card>
        ) : QuestionNumber >= 91 && QuestionNumber <= 99 ? (
          <Card sx={{ width: "35%", minHeight: "500px" }} elevation={6}>
            <Box sx={{ margin: "8%" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                Direction for questions 92 - 100. Select the Correct answer
                a,b,c, or d
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", margin: "8%" }}
            >
              {FileTextNinetyTwo}
            </Box>
          </Card>
        ) : (
          ""
        )}

        <Card
          sx={{
            width: "40%",
            maxHeight: "930px",
            marginLeft: "10px",
            overflowY: "scroll",
          }}
          elevation={6}
        >
          <Box sx={{ display: "flex", justifyContent: "center", margin: "8%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {isStart ? (
                <Posts
                  QuestionAndChoice={QuestionAndChoicesFromDB}
                  QuestionNumber={QuestionNumber}
                  EndOfListenning={(i) => setQuestionNumber(i)}
                  TogglePagination={(bool) => setIsReading(bool)}
                  OnAnswerSelect={(e, value) => {
                    updateStatusOnAnswer(e.target.name, value);
                  }}
                  showSound={isSendExam}
                  handleDirEnd={(bool) => setIsSendExam(bool)}
                />
              ) : (
                <SoundDir
                  dir="Dir_1_50.mp3"
                  onFinish={() => handleStart(true)}
                  time={0}
                />
              )}
            </Box>
          </Box>
        </Card>

        <Card
          sx={{ width: "25%", minHeight: "500px", marginLeft: "10px" }}
          elevation={6}
        >
          <Box sx={{ margin: "10px" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px" }}
                component="div"
                gutterBottom
              >
                นำทางแบบทดสอบ
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="p"
                sx={{ fontSize: "16px" }}
                component="div"
                gutterBottom
              >
                เลขประจำตัวข้าราชการ : {user.user.official_id}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "16px" }}
                component="div"
                gutterBottom
              >
                ชื่อ-นามสกุล : {user.user.rank}
                {user.user.fname} {user.user.lname}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                "& button": { m: "7px" },
              }}
            >
              <Box>
                <Pagination
                  QuestionAndChoice={QuestionAndChoicesFromDB}
                  onPress={handleQuestionNumber}
                  isRead={isReading}
                />
              </Box>
            </Box>
            <br />
            <Box>
              <Button
                variant="contained"
                fullWidth
                // disabled={isReading}
                onClick={() => {
                  navigate("/PageFinishAttempt", {
                    state: {
                      data: QuestionAndChoicesFromDB,
                      testResvCode: testResvCode,
                      realScore: score,
                      time: time,
                    },
                  });
                }}
              >
                Finish attempt
              </Button>
            </Box>
            <br />
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "18px", fontWeight: "bold" }}
                component="div"
                gutterBottom
              >
                <Box>
                  เหลือเวลา {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}{" "}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default PageTest;
