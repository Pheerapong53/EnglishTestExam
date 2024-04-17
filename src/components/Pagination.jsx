import React from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { red, blue} from "@mui/material/colors";
//import { useState} from "react";

const Pagination = ({
  QuestionAndChoice,
  onPress,
  isRead,
}) => {

  const ColorBlueButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  const ColorRedButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[100]),
    backgroundColor: red[100],
    "&:hover": {
      backgroundColor: red[200],
    },
  }));


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        "& button": { m: "7px" },
      }}
    >
      {QuestionAndChoice != null ? (
        QuestionAndChoice?.map((question, index) => (
          <>
            {question.onSelect === false ? (
              <ColorBlueButton
                key={question.id}
                size="small"
                variant="contained"
                style={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                }}
                onClick={() => {
                  onPress(index);
                }}
                disabled={isRead}
              >
                {" "}
                {index + 1}
              </ColorBlueButton>
            ) : (
              <ColorRedButton
                key={question.id}
                size="small"
                variant="contained"
                style={{
                  maxWidth: "30px",
                  maxHeight: "30px",
                  minWidth: "30px",
                  minHeight: "30px",
                }}
                onClick={() => {
                  onPress(index);
                }}
                disabled={isRead}
              >
                {" "}
                {index + 1}
              </ColorRedButton>
            )}
          </>
        ))
      ) : (
        <p>No Data</p>
      )}
    </Box>
  );
};

export default Pagination;
