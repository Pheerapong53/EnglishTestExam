/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../src/store/userSilce";
import Pagination from "../components/Pagination";
import PostIndvForm from "../components/PostIndvForm";
import SoundDir from "../components/SoundDir";
import { toast } from "react-toastify";

function PageTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = user.token;
  const location = useLocation();

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const initializeStateFromLocalStorage = (setState, key) => {
    const savedValue = loadFromLocalStorage(key);
    if (savedValue !== null) {
      setState(savedValue);
    }
  };

  useEffect(() => {
    initializeStateFromLocalStorage(setQuestionNumber, "questionNumber");
    initializeStateFromLocalStorage(setIsStart, "startBool");
    initializeStateFromLocalStorage(setIsReading, "readBool");
    // initializeStateFromLocalStorage(setTime, "time");
    initializeStateFromLocalStorage(setIsCounting, "countBool");

    const savedAnswers = loadFromLocalStorage("answers");
    if (savedAnswers !== null) {
      setQuestionIndvform(savedAnswers);
      getFileText();
    } else {
      getQuestionFromIndv();
    }

    const savedTime = loadFromLocalStorage("Time");
    if (savedTime !== null) {
      setTime(savedTime);
    } else {
      setTime(65 * 60);
    }
  }, []);

  const [QuestionNumber, setQuestionNumber] = useState(55);
  const [QuestionIndvform, setQuestionIndvform] = useState(null);
  //console.log("QuestionIndvform :", QuestionIndvform);

  //toggle for Sound File
  //false -> Play DIR_1_50
  //First State
  const [isStart, setIsStart] = useState(false);

  //toggle button pagination
  //false -> Enable Button
  //True -> Disable Button
  //For Test useState(false)
  const [isReading, setIsReading] = useState(true);

  //Count Time Func
  const [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    saveToLocalStorage("questionNumber", QuestionNumber);
    saveToLocalStorage("answers", QuestionIndvform);
    saveToLocalStorage("startBool", isStart);
    saveToLocalStorage("readBool", isReading);
    saveToLocalStorage("Time", time);
    saveToLocalStorage("countBool", isCounting);
  }, [QuestionNumber, QuestionIndvform, isStart, isReading, time, isCounting]);

  //ข้อสอบมี 100 ข้อ
  //รับ state จาก ContentPageDoTest ข้อมูล testInfo
  //getquestionandchoicefrom tbindvform with indvtfrmcode (รหัสการจอง + เลขประจำตัวประชาชน)
  const testreservcode = location?.state.testresvcode;
  let testresultcode;
  if (typeof testreservcode !== "undefined") {
    //const pers_id = user?.pers_id;
    const pers_id = "1111111111111";
    if (typeof pers_id !== "undefined") {
      testresultcode = testreservcode.toString() + "-" + pers_id.toString();
    } else {
      console.log("undefined pers_id");
    }
  } else {
    console.log("undefined testreservcode");
  }

  //getquestion
  //server/routes/exam_archieve/exam.js -> getindvform
  const getFileText = async () => {
    try {
      const question = await axios
        .get(
          process.env.REACT_APP_API_URL +
            `/indvform?testresultcode=${testresultcode}`,
          {
            headers: {
              authtoken: "bearer " + token,
            },
          }
        )
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
      const compareNumericStrings = (a, b) => {
        return parseInt(a.questionorder, 10) - parseInt(b.questionorder, 10);
      };

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

      question.data.sort(compareNumericStrings).map(async (question, i) => {
        await fetchFileText(
          i,
          question["tbquestion.formcode"],
          question["tbquestion.problem"]
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getQuestionFromIndv = async () => {
    try {
      const question = await axios
        .get(
          process.env.REACT_APP_API_URL +
            `/indvform?testresultcode=${testresultcode}`,
          {
            headers: {
              authtoken: "bearer " + token,
            },
          }
        )
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
      const compareNumericStrings = (a, b) => {
        return parseInt(a.questionorder, 10) - parseInt(b.questionorder, 10);
      };

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

      const questions = await Promise.all(
        question.data.sort(compareNumericStrings).map(async (question, i) => {
          try {
            await fetchFileText(
              i,
              question["tbquestion.formcode"],
              question["tbquestion.problem"]
            );

            return {
              order: question.questionorder,
              questioncode: question.question_code,
              filepath: question["tbquestion.problem"],
              questionText: question["tbquestion.question"],
              cerfcode: question["tbquestion.cerfcode"],
              form: question["tbquestion.formcode"],
              onSelect: false,
              onAnswer: null,
              Score: 0,
              time:
                question["tbquestion.cerfcode"] === "L1A1" ||
                question["tbquestion.cerfcode"] === "L1A2" ||
                question["tbquestion.cerfcode"] === "L1B1"
                  ? 17000
                  : question["tbquestion.cerfcode"] === "L1B2" ||
                    question["tbquestion.cerfcode"] === "L1C1" ||
                    question["tbquestion.cerfcode"] === "L2A1" ||
                    question["tbquestion.cerfcode"] === "L2A2"
                  ? 20000
                  : 30000,
              A_choicecode: question["fk_choiceA.choicecode"],
              A_choicetext: question["fk_choiceA.choicetext"],
              A_answer: question["fk_choiceA.answer"],
              B_choicecode: question["fk_choiceB.choicecode"],
              B_choicetext: question["fk_choiceB.choicetext"],
              B_answer: question["fk_choiceB.answer"],
              C_choicecode: question["fk_choiceC.choicecode"],
              C_choicetext: question["fk_choiceC.choicetext"],
              C_answer: question["fk_choiceC.answer"],
              D_choicecode: question["fk_choiceD.choicecode"],
              D_choicetext: question["fk_choiceD.choicetext"],
              D_answer: question["fk_choiceD.answer"],
            };
          } catch (error) {
            console.error("Error:", error);
          }
        })
      );
      setQuestionIndvform(questions);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  //false -> Play Sound Question
  //const [isSendExam, setIsSendExam] = useState(false);

  //FileTextFromServer
  const [FileTextSixtyOne, setFileTextSixtyOne] = useState(null);
  const [FileTextSixtyNine, setFileTextSixtyNine] = useState(null);
  const [FileTextSeventySeven, setFileTextSeventySeven] = useState(null);
  const [FileTextEightyOne, setFileTextEightyOne] = useState(null);
  const [FileTextEightyFive, setFileTextEightyFive] = useState(null);
  const [FileTextNinetyTwo, setFileTextNinetyTwo] = useState(null);

  useEffect(() => {
    if (
      location.state?.url === "/PageFinishAttempt" &&
      location.state.data.data != null
    ) {
      setTestResvCode(location.state.data.testResvCode);
      //Disable DIR_1_50
      setIsStart(true);
      //Enable Button in Pagination
      setIsReading(false);
      setTime(location.state.data.time);
    } else {
      setTestResvCode(location.state);
    }
  }, []);

  const handleQuestionNumber = (number) => {
    setQuestionNumber(number);
  };

  const handleStart = (bool) => {
    setTimeout(() => {
      setIsStart(bool);
    }, 2000);
  };

  //For QuestionIndvform
  const checkIfAnswerIsCorrectIndv = (id, newStatus) => {
    const question = QuestionIndvform?.find(
      (question) => question.questioncode === id
    );

    if (question) {
      const selectedChoice = ["A", "B", "C", "D"].find((choice) => {
        return question[`${choice}_choicetext`] === newStatus;
      });

      if (selectedChoice) {
        return question[`${selectedChoice}_answer`];
      }
    }

    return null;
  };

  const updateStatusOnAnswerIndv = (id, newStatus) => {
    const updatedAnswer = QuestionIndvform?.map((question) => {
      if (question.questioncode === id) {
        const isCorrect = checkIfAnswerIsCorrectIndv(id, newStatus);
        return {
          ...question,
          onAnswer: newStatus,
          onSelect: true,
          Score: isCorrect ? 1 : 0,
        };
      }
      return question;
    });
    setQuestionIndvform(updatedAnswer);
  };

  const score = QuestionIndvform?.reduce(
    (total, question) => total + question.Score,
    0
  );

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
        data: QuestionIndvform,
        testResvCode: testResvCode,
        realScore: score,
        time: time,
      },
    });
  };

  //Button For Reading Exam
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  const [testResvCode, setTestResvCode] = useState("");

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          position: "fixed",
        }}
      >
        {isCounting && (
          <Card sx={{ minWidth: "150px", minHeight: "20px", boxShadow: 3 }}>
            <Typography
              variant="p"
              sx={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
              component="div"
              gutterBottom
            >
              <Box>
                เหลือเวลา {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}{" "}
              </Box>
            </Typography>
          </Card>
        )}
      </Box>

      {/* Button For Select Reading Exam */}
      {QuestionNumber >= 60 ? (
        <Box sx={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(60)}
              variant="contained"
            >
              61-68
            </ColorButton>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(68)}
              variant="contained"
            >
              69-76
            </ColorButton>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(76)}
              variant="contained"
            >
              77-80
            </ColorButton>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(80)}
              variant="contained"
            >
              81-84
            </ColorButton>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(84)}
              variant="contained"
            >
              85-91
            </ColorButton>
          </Box>
          <Box sx={{ margin: "0px 5px " }}>
            <ColorButton
              onClick={() => setQuestionNumber(91)}
              variant="contained"
            >
              92-100
            </ColorButton>
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
            {QuestionIndvform !== null && QuestionIndvform?.length !== 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {!isStart && (
                  <SoundDir
                    dir="Dir_1_50.mp3"
                    onFinish={() => handleStart(true)}
                    time={0}
                  />
                )}
                {isStart && (
                  <PostIndvForm
                    QuestionAndChoice={QuestionIndvform}
                    QuestionNumber={QuestionNumber + 1}
                    EndOfListenning={(i) => setQuestionNumber(i)}
                    ToggleCountDown={(bool) => setIsCounting(bool)}
                    TogglePagination={(bool) => setIsReading(bool)}
                    OnAnswerSelect={(e, value) => {
                      updateStatusOnAnswerIndv(e.target.name, value);
                    }}
                  />
                )}
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{ color: "#d32f2f", fontWeight: "bold" }}
              >
                ไม่พบชุดข้อสอบ กรุณาตรวจสอบผลการจองทดสอบ
              </Typography>
            )}
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
                เลขประจำตัวข้าราชการ : {user.official_id}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="p"
                sx={{ fontSize: "16px" }}
                component="div"
                gutterBottom
              >
                ชื่อ-นามสกุล : {user.rank}
                {user.fname} {user.lname}
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
                  QuestionAndChoice={QuestionIndvform}
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
                disabled={isReading}
                onClick={() => {
                  navigate("/PageFinishAttempt", {
                    state: {
                      data: QuestionIndvform,
                      testResvCode: testResvCode,
                      realScore: score,
                      time: time,
                    },
                  });
                }}
              >
                จบการทำแบบทดสอบ
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default PageTest;
