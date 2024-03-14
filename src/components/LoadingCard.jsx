import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const LoadingCard = ({ line }) => {
  const LoobLine = () => {
    let line = [];
    for (let i = 0; i < 4; i++) {
      line.push(
        <Typography
          component="div"
          // variant="h5"
          sx={{ marginLeft: "10px", marginBottom: "5px", cursor: "pointer" }}
        >
          <Skeleton variant="body1" animation="wave" width={i === 3 ? 430 :500} />
        </Typography>
      );
    }
    return line;
  };
  return (
    <>
      <Card
        raised
        sx={{
          display: "flex",
          margin: "0 auto",
          padding: "0.1em",
          height: '12vw',
        }}
        elevation={6}
      >
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={210}
          height={118}
        />
        {/* <Skeleton variant="body1"/> */}
        {/* <Skeleton animation="wave" width="60%" /> */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <br />
          {LoobLine()}
        </Box>
      </Card>
    </>
  );
};

export default LoadingCard;
