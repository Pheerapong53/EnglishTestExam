import React, { useState } from "react";
import TestSound from "./TestSound";
import SoundDir from "./SoundDir";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SoundTwoQuestions from "./SoundTwoQuestions";

const Posts = ({
  QuestionAndChoice,
  QuestionNumber,
  OnAnswerSelect,
  EndOfListenning,
  TogglePagination,
  showSound,
  handleDirEnd,
}) => {
  const [checkedQuestion, setCheckedQuestion] = useState(null);

  const handleSelect = (e) => {
    setCheckedQuestion({
      [e.target.name]: e.target.value,
    });
  };

  const [isFiftyOne, setIsFiftyOne] = useState(false);
  const handleFiftyOne = (bool) => {
    setIsFiftyOne(bool);
  };
  const [isFiftySeven, setIsFiftySeven] = useState(false);
  const handleFiftySeven = (bool) => {
    setIsFiftySeven(bool);
  };
  const [isFiftyNine, setIsFiftyNine] = useState(false);
  const handleFiftyNine = (bool) => {
    setIsFiftyNine(bool);
  };
  const [isEnd, setIsEnd] = useState(false);
  const handleEnd = (bool) => {
    setIsEnd(bool);
  };

  return (
    <>
      {QuestionAndChoice != null &&
      QuestionNumber >= 0 &&
      QuestionNumber <= 49 ? (
        <Box key={QuestionAndChoice.id}>
          <FormControl>
            {QuestionAndChoice.filter(
              (question, index) => index === QuestionNumber
            ).map((question, index) => (
              <>
                {QuestionNumber >= 0 && QuestionNumber <= 29 ? (
                  <FormLabel key={question.questioncode}>
                    <>
                      {QuestionNumber + 1} : 
                      {/* {question.questioncode} */}
                    </>
                    {question.questionText === "none" ||
                    question.questionText.includes("mp3") ? (
                      <>
                        {showSound ? (
                          ""
                        ) : (
                          <TestSound
                            form={question.form}
                            filepath={question.filepath}
                            time={5000}
                            onFinish={() =>
                              setTimeout(() => {
                                EndOfListenning((QuestionNumber += 1));
                              }, 13000)
                            }
                          />
                        )}
                        {/* <p>13 sec For Do Test</p> */}
                      </>
                    ) : (
                      `${question.questionText}`
                    )}
                  </FormLabel>
                ) : QuestionNumber >= 30 && QuestionNumber <= 49 ? (
                  <FormLabel key={question.questioncode}>
                    <>
                      {QuestionNumber + 1} : 
                      {/* {question.questioncode} */}
                    </>
                    {question.questionText === "none" ||
                    question.questionText.includes("mp3") ? (
                      <>
                        {showSound ? (
                          ""
                        ) : (
                          <TestSound
                            form={question.form}
                            filepath={question.filepath}
                            time={5000}
                            onFinish={() => {
                              setTimeout(() => {
                                EndOfListenning((QuestionNumber += 1));
                              }, 15000);
                            }}
                          />
                        )}
                        {/* <p>15 sec For Do Test</p> */}
                      </>
                    ) : (
                      `${question.questionText}`
                    )}
                  </FormLabel>
                ) : (
                  ""
                )}
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
          </FormControl>
        </Box>
      ) : QuestionNumber === 50 ? (
        <Box key={QuestionAndChoice.id}>
          <FormControl>
            {QuestionAndChoice.filter(
              (question, index) => index === QuestionNumber
            ).map((question, index) => (
              <>
                <FormLabel key={question.questioncode}>
                  <>
                    {QuestionNumber + 1} : 
                    {/* {question.questioncode} */}
                  </>
                  {question.questionText === "none" ||
                  question.questionText.includes("mp3") ? (
                    <>
                      {isFiftyOne ? (
                        <>
                          {showSound ? (
                            ""
                          ) : (
                            <TestSound
                              form={question.form}
                              filepath={question.filepath}
                              time={5000}
                              onFinish={() =>
                                setTimeout(() => {
                                  EndOfListenning((QuestionNumber += 1));
                                }, 15000)
                              }
                            />
                          )}
                          {/* <p>15 sec For Do Test</p> */}
                        </>
                      ) : showSound ? (
                        handleFiftyOne(true)
                      ) : (
                        <SoundDir
                          dir="Dir_51_56.mp3"
                          onFinish={() => handleFiftyOne(true)}
                          time={0}
                        />
                      )}
                    </>
                  ) : (
                    `${question.questionText}`
                  )}
                </FormLabel>

                {isFiftyOne ? (
                  <RadioGroup
                    key={index}
                    onChange={(e) => {
                      OnAnswerSelect(e, e.target.value);
                      handleSelect(e);
                    }}
                    name={question.questioncode}
                  >
                    {question["choice"].map((choice, index) => (
                      <FormControlLabel
                        key={choice.choicecode}
                        value={choice.choicetext}
                        control={<Radio />}
                        label={choice.choicetext}
                        checked={question.onAnswer === choice.choicetext}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  ""
                )}
              </>
            ))}
          </FormControl>
        </Box>
      ) : QuestionNumber >= 51 && QuestionNumber <= 55 ? (
        <Box key={QuestionAndChoice.id}>
          <FormControl>
            {QuestionAndChoice.filter(
              (question, index) => index === QuestionNumber
            ).map((question, index) => (
              <>
                {QuestionNumber >= 51 && QuestionNumber <= 53 ? (
                  <FormLabel key={question.questioncode}>
                    <>
                      {QuestionNumber + 1} : 
                      {/* {question.questioncode} */}
                    </>
                    {question.questionText === "none" ||
                    question.questionText.includes("mp3") ? (
                      <>
                        {showSound ? (
                          ""
                        ) : (
                          <TestSound
                            form={question.form}
                            filepath={question.filepath}
                            time={5000}
                            onFinish={() =>
                              setTimeout(() => {
                                EndOfListenning((QuestionNumber += 1));
                              }, 15000)
                            }
                          />
                        )}
                        {/* <p>15 sec For Do Test</p> */}
                      </>
                    ) : (
                      `${question.questionText}`
                    )}
                  </FormLabel>
                ) : QuestionNumber >= 54 && QuestionNumber <= 55 ? (
                  <FormLabel key={question.questioncode}>
                    <>
                      {QuestionNumber + 1} : 
                      {/* {question.questioncode} */}
                    </>
                    {question.questionText === "none" ||
                    question.questionText.includes("mp3") ? (
                      <>
                        {showSound ? (
                          ""
                        ) : (
                          <TestSound
                            form={question.form}
                            filepath={question.filepath}
                            time={5000}
                            onFinish={() =>
                              setTimeout(() => {
                                EndOfListenning((QuestionNumber += 1));
                              }, 19000)
                            }
                          />
                        )}
                        {/* <p>19 sec For Do Test</p> */}
                      </>
                    ) : (
                      `${question.questionText}`
                    )}
                  </FormLabel>
                ) : (
                  ""
                )}
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
          </FormControl>
        </Box>
      ) : QuestionNumber >= 56 && QuestionNumber <= 57 ? (
        isFiftySeven ? (
          <FormControl>
            {QuestionAndChoice.slice(56, 57).map((question, index) => (
              <>
                <FormLabel key={question.questioncode}>
                  <>
                    {question.questioncode.split("").slice(10 - 12)} :{" "}
                    {/* {question.questioncode} */}
                  </>
                  {question.questionText === "none" ||
                  question.questionText.includes("mp3") ? (
                    <>
                      {showSound ? (
                        ""
                      ) : (
                        <SoundTwoQuestions
                          form={question.form}
                          filepath={question.filepath}
                          Num1="057"
                          Num2="058"
                          filepath1={`${question.questioncode}_57`}
                          filepath2={`${question.questioncode}_58`}
                          onFinish={() =>
                            setTimeout(() => {
                              EndOfListenning((QuestionNumber += 2));
                            }, 0)
                          }
                        />
                      )}

                      {/* <p>19 sec For Do Test</p> */}
                    </>
                  ) : (
                    `${question.questionText}`
                  )}
                </FormLabel>
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
            {QuestionAndChoice.slice(57, 58).map((question, index) => (
              <>
                <FormLabel key={question.questioncode}>
                  <>
                    {question.questioncode.split("").slice(10 - 12)} :{" "}
                    {/* {question.questioncode} */}
                  </>
                  {question.questionText === "none" ||
                  question.questionText.includes("mp3") ? (
                    <>
                      <p>19 sec For Do Test</p>
                    </>
                  ) : (
                    `${question.questionText}`
                  )}
                </FormLabel>
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
          </FormControl>
        ) : showSound ? (
          handleFiftySeven(true)
        ) : (
          <SoundDir
            dir="Dir_57_58.mp3"
            onFinish={() => handleFiftySeven(true)}
            time={0}
          />
        )
      ) : QuestionNumber >= 58 && QuestionNumber <= 59 ? (
        isFiftyNine ? (
          <FormControl>
            {QuestionAndChoice.slice(58, 59).map((question, index) => (
              <>
                <FormLabel key={question.questioncode}>
                  <>
                    {question.questioncode.split("").slice(10 - 12)} :{" "}
                    {/* {question.questioncode} */}
                  </>
                  {question.questionText === "none" ||
                  question.questionText.includes("mp3") ? (
                    <>
                      {showSound ? (
                        ""
                      ) : (
                        <SoundTwoQuestions
                          form={question.form}
                          filepath={question.filepath}
                          Num1="059"
                          Num2="060"
                          filepath1={`${question.questioncode}_59`}
                          filepath2={`${question.questioncode}_60`}
                          onFinish={() => handleEnd(true)}
                        />
                      )}
                      {isEnd ? (
                        <SoundDir
                          dir="END.mp3"
                          onFinish={() => {
                            TogglePagination(false);
                            EndOfListenning((QuestionNumber += 2));
                            handleEnd(false);
                            handleDirEnd(true);
                          }}
                          time={0}
                        />
                      ) : (
                        ""
                      )}
                      {/* <p>19 sec For Do Test</p> */}
                    </>
                  ) : (
                    `${question.questionText}`
                  )}
                </FormLabel>
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
            {QuestionAndChoice.slice(59, 60).map((question, index) => (
              <>
                <FormLabel key={question.questioncode}>
                  <>
                    {question.questioncode.split("").slice(10 - 12)} :{" "}
                    {/* {question.questioncode} */}
                  </>
                  {question.questionText === "none" ||
                  question.questionText.includes("mp3") ? (
                    <>
                      {/* <p>19 sec For Do Test</p> */}
                    </>
                  ) : (
                    `${question.questionText}`
                  )}
                </FormLabel>
                <RadioGroup
                  key={index}
                  onChange={(e) => {
                    OnAnswerSelect(e, e.target.value);
                    handleSelect(e);
                  }}
                  name={question.questioncode}
                >
                  {question["choice"].map((choice, index) => (
                    <FormControlLabel
                      key={choice.choicecode}
                      value={choice.choicetext}
                      control={<Radio />}
                      label={choice.choicetext}
                      checked={question.onAnswer === choice.choicetext}
                    />
                  ))}
                </RadioGroup>
              </>
            ))}
          </FormControl>
        ) : showSound ? (
          handleFiftyNine(true)
        ) : (
          <SoundDir
            dir="Dir_59_60.mp3"
            onFinish={() => handleFiftyNine(true)}
            time={0}
          />
        )
      ) : QuestionNumber >= 60 && QuestionNumber <= 67 ? (
        <FormControl>
          {QuestionAndChoice.slice(60, 68).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                <>
                  {question.questioncode.split("").slice(10 - 12)} :{" "}
                  {/* {question.questioncode} */}
                </>
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    {/* <p>13 sec For Do Test</p> */}
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : QuestionNumber >= 68 && QuestionNumber <= 75 ? (
        <FormControl>
          {QuestionAndChoice.slice(68, 76).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                {question.questioncode.split("").slice(10 - 12)} :{" "}
                {question.questioncode}
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    <p>13 sec For Do Test</p>
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : QuestionNumber >= 76 && QuestionNumber <= 79 ? (
        <FormControl>
          {QuestionAndChoice.slice(76, 80).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                {question.questioncode.split("").slice(10 - 12)} :{" "}
                {question.questioncode}
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    <p>13 sec For Do Test</p>
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : QuestionNumber >= 80 && QuestionNumber <= 83 ? (
        <FormControl>
          {QuestionAndChoice.slice(80, 84).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                {question.questioncode.split("").slice(10 - 12)} :{" "}
                {question.questioncode}
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    <p>13 sec For Do Test</p>
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : QuestionNumber >= 84 && QuestionNumber <= 90 ? (
        <FormControl>
          {QuestionAndChoice.slice(84, 91).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                {question.questioncode.split("").slice(10 - 12)} :{" "}
                {question.questioncode}
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    <p>13 sec For Do Test</p>
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : QuestionNumber >= 91 && QuestionNumber <= 99 ? (
        <FormControl>
          {QuestionAndChoice.slice(91, 100).map((question, index) => (
            <>
              <FormLabel key={question.questioncode}>
                {question.questioncode.split("")[9] === "1"
                  ? question.questioncode.split("").slice(9 - 12)
                  : question.questioncode.split("").slice(10 - 12)}
                : {question.questioncode}
                {question.questionText === "none" ||
                question.questionText.includes("mp3") ? (
                  <>
                    <p>13 sec For Do Test</p>
                  </>
                ) : (
                  `${question.questionText}`
                )}
              </FormLabel>
              <RadioGroup
                key={index}
                onChange={(e) => {
                  OnAnswerSelect(e, e.target.value);
                  handleSelect(e);
                }}
                name={question.questioncode}
              >
                {question["choice"].map((choice, index) => (
                  <FormControlLabel
                    key={choice.choicecode}
                    value={choice.choicetext}
                    control={<Radio />}
                    label={choice.choicetext}
                    checked={question.onAnswer === choice.choicetext}
                  />
                ))}
              </RadioGroup>
            </>
          ))}
        </FormControl>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};

export default Posts;
