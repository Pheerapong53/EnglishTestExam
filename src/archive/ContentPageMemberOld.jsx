import React from "react";
import CardMedia from "@mui/material/CardMedia";
import images from "../img";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function ContentPageMemberOld() {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <>
      <Typography component="div">
        <Box sx={{ textAlign: "center", fontSize: 24, fontWeight: 500 }}>
          ข้อมูลสมาชิก
        </Box>
      </Typography>

      <DrawerHeader />

      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ margin: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="30%"
              image={images.examer}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ผู้เข้าสอบ
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to="/PageExamInformation"
                style={{ textDecoration: "none" }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PanToolAltIcon />}
                >
                  CLICK ME
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>

        <Box sx={{ margin: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="30%"
              image={images.examiner}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ผู้คุมสอบ
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/PageExaminer" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PanToolAltIcon />}
                >
                  CLICK ME
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ margin: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="30%"
              image={images.coordinator}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ผู้ประสานงาน
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/PageCoorDinaTor" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PanToolAltIcon />}
                >
                  CLICK ME
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ margin: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="30%"
              image={images.command}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ผู้บังคับบัญชา
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/PageSuperVisor" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PanToolAltIcon />}
                >
                  CLICK ME
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ margin: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="30%"
              image={images.admin}
              alt="image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ผู้ดูแลระบบ
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/PageAdmin" style={{ textDecoration: "none" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<PanToolAltIcon />}
                >
                  CLICK ME
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ContentPageMemberOld;
