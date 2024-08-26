import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
} from "@mui/material";

import SoundTwoQuestions from "./SoundTwoQuestions";
import TestSound from "./TestSound";
import SoundDir from "./SoundDir";

const PostIndvForm = ({
  QuestionAndChoice,
  QuestionNumber,
  EndOfListenning,
  ToggleCountDown,
  TogglePagination,
  OnAnswerSelect,
}) => {
  //CountDown Timer
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeDiv, setTimeDiv] = useState(13000);
  const [isCounting, setIsCounting] = useState(true);
  const [isFiftyOne, setFiftyOne] = useState(false);
  const [isFiftySeven, setFiftySeven] = useState(false);
  const [isFiftyNine, setFiftyNine] = useState(false);
  const [isEnd, setEnd] = useState(false);
  const [showSound, setShowSound] = useState(true);
  //console.log(QuestionNumber);
  //console.log(QuestionAndChoice);

  //Time Count Down
  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1000);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeRemaining]);

  const CounntdownProgressBar = ({ timeRemaining, timeDiv, showSound }) => {
    return (
      showSound && (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={(timeRemaining / timeDiv) * 100}
          />
          <Box
            sx={{
              width: "100%",
              height: "100%",
              top: 0,
              left: 2,
              bottom: 0,
              right: 2,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="red"
              fontSize={15}
            >
              {timeRemaining ? `${timeRemaining / 1000} s` : ""}
            </Typography>
          </Box>
        </Box>
      )
    );
  };

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
  }

  useEffect(() => {
    initializeStateFromLocalStorage(setShowSound, "soundBool");
    initializeStateFromLocalStorage(setFiftyOne, "51");
    initializeStateFromLocalStorage(setFiftySeven, "57");
    initializeStateFromLocalStorage(setFiftyNine, "59");
    initializeStateFromLocalStorage(setEnd, "endBool");
  }, []);

  useEffect(() => {
    saveToLocalStorage("soundBool", showSound);
    saveToLocalStorage("51", isFiftyOne);
    saveToLocalStorage("57", isFiftySeven);
    saveToLocalStorage("59",isFiftyNine);
    saveToLocalStorage("endBool",isEnd);
  }, [showSound, isFiftyOne, isFiftySeven,isFiftyNine,isEnd]);

  return (
    <>
      {QuestionAndChoice != null &&
        QuestionNumber >= 1 &&
        QuestionNumber <= 56 &&
        (QuestionNumber === 51 ? (
          <>
            {showSound && (
              <SoundDir
                dir="Dir_51_56.mp3"
                onFinish={() => setFiftyOne(true)}
                time={0}
              />
            )}
            {isFiftyOne && (
              <FormControl>
                {QuestionAndChoice?.filter(
                  (question) => parseInt(question.order, 10) === QuestionNumber
                ).map((question) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <FormLabel key={question.questioncode}>
                        {QuestionNumber} :
                        {question["questionText"] === "none" ||
                        question["questionText"].includes("mp3") ? (
                          <>
                            {showSound && (
                              <TestSound
                                form={question["form"]}
                                filepath={question["filepath"]}
                                // order={question["order"].padStart(3, "0")}
                                order={question["order"]}
                                time={5000}
                                onFinish={() => {
                                  setTimeDiv(question["time"]);
                                  setTimeRemaining(question["time"]);
                                  setTimeout(() => {
                                    setTimeRemaining(0);
                                    EndOfListenning(QuestionNumber++);
                                  }, question["time"]);
                                }}
                              />
                            )}
                          </>
                        ) : (
                          `${question["questionText"]}`
                        )}
                      </FormLabel>

                      <RadioGroup
                        key={question.order}
                        name={question.questioncode}
                        onChange={(e) => {
                          OnAnswerSelect(e, e.target.value);
                        }}
                      >
                        {["A", "B", "C", "D"].map((choice) => (
                          <FormControlLabel
                            key={question[`${choice}_choicecode`]}
                            value={question[`${choice}_choicetext`]}
                            control={<Radio />}
                            label={`${choice}.${
                              question[`${choice}_choicetext`]
                            }`}
                            checked={
                              question.onAnswer ===
                              question[`${choice}_choicetext`]
                            }
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                    {/* end of question */}

                    <CounntdownProgressBar
                      timeRemaining={timeRemaining}
                      timeDiv={timeDiv}
                      showSound={showSound}
                    />
                  </Box>
                ))}
              </FormControl>
            )}
          </>
        ) : (
          <FormControl>
            {QuestionAndChoice?.filter(
              (question) => parseInt(question.order, 10) === QuestionNumber
            ).map((question) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <FormLabel key={question.questioncode}>
                    {QuestionNumber} : 
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>
                        {showSound && (
                          <TestSound
                            form={question["form"]}
                            filepath={question["filepath"]}
                            // order={question["order"].padStart(3, "0")}
                            order={question["order"]}
                            time={5000}
                            onFinish={() => {
                              setTimeDiv(question["time"]);
                              setTimeRemaining(question["time"]);
                              setTimeout(() => {
                                setTimeRemaining(0);
                                EndOfListenning(QuestionNumber++);
                              }, question["time"]);
                            }}
                          />
                        )}
                      </>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>

                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
                {/* end of question */}

                <CounntdownProgressBar
                  timeRemaining={timeRemaining}
                  timeDiv={timeDiv}
                  showSound={showSound}
                />
              </Box>
            ))}
          </FormControl>
        ))}

      {QuestionNumber >= 57 && QuestionNumber <= 58 && (
        <>
          {!isFiftySeven && showSound && (
            <SoundDir
              dir="Dir_57_58.mp3"
              onFinish={() => setFiftySeven(true)}
              time={0}
            />
          )}
          {isFiftySeven && (
            <FormControl>
              {[57, 58].map((qNumber) => (
                <>
                  {QuestionAndChoice?.filter(
                    (question) => parseInt(question.order, 10) === qNumber
                  ).map((question) => (
                    <Box
                      sx={{
                        display: "row",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <FormLabel>
                        {question.order} : 
                        {question["questionText"] === "none" ||
                        question["questionText"].includes("mp3") ? (
                          <>
                            {question["order"].toString() === "57"
                              ? showSound && (
                                  <SoundTwoQuestions
                                    form={question["form"]}
                                    filepath={question["filepath"]}
                                    Num1="057"
                                    Num2="058"
                                    filepath1={
                                      question["questioncode"].includes("057")
                                        ? `${question.questioncode}_57`
                                        : `${question.form}${question.cerfcode}057_58`
                                    }
                                    filepath2={
                                      question["questioncode"].includes("057")
                                        ? `${question.questioncode}_58`
                                        : `${question.form}${question.cerfcode}057_57`
                                    }
                                    onStart={() => {
                                      setTimeDiv(38000);
                                      setTimeRemaining(38000);
                                    }}
                                    onFinish={() =>
                                      setTimeout(() => {
                                        EndOfListenning((QuestionNumber += 2));
                                      }, 0)
                                    }
                                  />
                                )
                              : ""}
                          </>
                        ) : (
                          `${question["questionText"]}`
                        )}
                      </FormLabel>
                      <RadioGroup
                        key={question.order}
                        name={question.questioncode}
                        onChange={(e) => {
                          OnAnswerSelect(e, e.target.value);
                        }}
                      >
                        {["A", "B", "C", "D"].map((choice) => (
                          <FormControlLabel
                            key={question[`${choice}_choicecode`]}
                            value={question[`${choice}_choicetext`]}
                            control={<Radio />}
                            label={`${choice}.${
                              question[`${choice}_choicetext`]
                            }`}
                            checked={
                              question.onAnswer ===
                              question[`${choice}_choicetext`]
                            }
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                  ))}
                </>
              ))}

              <CounntdownProgressBar
                timeRemaining={timeRemaining}
                timeDiv={timeDiv}
                showSound={showSound}
              />
            </FormControl>
          )}
        </>
      )}

      {QuestionNumber >= 59 && QuestionNumber <= 60 && (
        <>
          {!isFiftyNine && showSound && (
            <SoundDir
              dir="Dir_59_60.mp3"
              onFinish={() => setFiftyNine(true)}
              time={0}
            />
          )}
          {isFiftyNine && (
            <FormControl>
              {[59, 60].map((qNumber) => (
                <>
                  {QuestionAndChoice?.filter(
                    (question) => parseInt(question.order, 10) === qNumber
                  ).map((question) => (
                    <Box
                      sx={{
                        display: "row",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <FormLabel>
                        {question.order} : 
                        {question["questionText"] === "none" ||
                        question["questionText"].includes("mp3") ? (
                          <>
                            {question["order"].toString() === "59"
                              ? showSound && (
                                  <SoundTwoQuestions
                                    form={question["form"]}
                                    filepath={question["filepath"]}
                                    Num1="059"
                                    Num2="060"
                                    filepath1={
                                      question["questioncode"].includes("059")
                                        ? `${question.questioncode}_59`
                                        : `${question.form}${question.cerfcode}059_60`
                                    }
                                    filepath2={
                                      question["questioncode"].includes("059")
                                        ? `${question.questioncode}_60`
                                        : `${question.form}${question.cerfcode}059_59`
                                    }
                                    onStart={() => {
                                      setTimeDiv(38000);
                                      setTimeRemaining(38000);
                                    }}
                                    onFinish={() => setEnd(true)}
                                  />
                                )
                              : ""}
                            {isEnd && showSound && (
                              <SoundDir
                                dir="END.mp3"
                                onFinish={() =>
                                  setTimeout(() => {
                                    setShowSound(false);
                                    ToggleCountDown(true);
                                    TogglePagination(false);
                                    EndOfListenning((QuestionNumber += 2));
                                  }, 0)
                                }
                                time={0}
                              />
                            )}
                          </>
                        ) : (
                          `${question["questionText"]}`
                        )}
                      </FormLabel>
                      <RadioGroup
                        key={question.order}
                        name={question.questioncode}
                        onChange={(e) => {
                          OnAnswerSelect(e, e.target.value);
                        }}
                      >
                        {["A", "B", "C", "D"].map((choice) => (
                          <FormControlLabel
                            key={question[`${choice}_choicecode`]}
                            value={question[`${choice}_choicetext`]}
                            control={<Radio />}
                            label={`${choice}.${
                              question[`${choice}_choicetext`]
                            }`}
                            checked={
                              question.onAnswer ===
                              question[`${choice}_choicetext`]
                            }
                          />
                        ))}
                      </RadioGroup>
                    </Box>
                  ))}
                </>
              ))}

              <CounntdownProgressBar
                timeRemaining={timeRemaining}
                timeDiv={timeDiv}
                showSound={showSound}
              />
            </FormControl>
          )}
        </>
      )}

      {QuestionNumber >= 61 && QuestionNumber <= 68 && (
        <FormControl>
          {[61, 62, 63, 64, 65, 66, 67, 68].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3")
                      ? " "
                      : `${question["questionText"]}`}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
      {QuestionNumber >= 69 && QuestionNumber <= 76 && (
        <FormControl>
          {[69, 70, 71, 72, 73, 74, 75, 76].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>ไม่มีโจทย์</>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
      {QuestionNumber >= 77 && QuestionNumber <= 80 && (
        <FormControl>
          {[77, 78, 79, 80].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>ไม่มีโจทย์</>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
      {QuestionNumber >= 81 && QuestionNumber <= 84 && (
        <FormControl>
          {[81, 82, 83, 84].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>ไม่มีโจทย์</>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
      {QuestionNumber >= 85 && QuestionNumber <= 91 && (
        <FormControl>
          {[85, 86, 87, 88, 89, 90, 91].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>ไม่มีโจทย์</>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
      {QuestionNumber >= 92 && QuestionNumber <= 100 && (
        <FormControl>
          {[92, 93, 94, 95, 96, 97, 98, 99, 100].map((qNumber) => (
            <>
              {QuestionAndChoice?.filter(
                (question) => parseInt(question.order, 10) === qNumber
              ).map((question) => (
                <Box
                  sx={{
                    display: "row",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <FormLabel>
                    <>
                      {question.order} : 
                    </>
                    {question["questionText"] === "none" ||
                    question["questionText"].includes("mp3") ? (
                      <>ไม่มีโจทย์</>
                    ) : (
                      `${question["questionText"]}`
                    )}
                  </FormLabel>
                  <RadioGroup
                    key={question.order}
                    name={question.questioncode}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                    }}
                  >
                    {["A", "B", "C", "D"].map((choice) => (
                      <FormControlLabel
                        key={question[`${choice}_choicecode`]}
                        value={question[`${choice}_choicetext`]}
                        control={<Radio />}
                        label={`${choice}.${question[`${choice}_choicetext`]}`}
                        checked={
                          question.onAnswer === question[`${choice}_choicetext`]
                        }
                      />
                    ))}
                  </RadioGroup>
                </Box>
              ))}
            </>
          ))}
        </FormControl>
      )}
    </>
  );
};

export default PostIndvForm;
