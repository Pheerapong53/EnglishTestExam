import React from "react";
import images from "../img";
import PanToolAlt from "@mui/icons-material/PanToolAlt";
import { CardActions, CardContent, Card, CardMedia } from "@mui/material";
import { Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function ContentPageMember1() {
  //Component Declaration
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  //Hooks and Logic
  //Event Handlers
  //Render
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
        {[
          {
            label: "ผู้เข้าสอบ",
            image: images.examer,
            //link: "/PageExamInformation",
            right: "USR01",
          },
          {
            label: "ผู้ประสานงาน",
            image: images.coordinator,
            //link: "/PageExaminer",
            right: "USR02",
          },
          {
            label: "ผู้คุมสอบ",
            image: images.examiner,
            //link: "/PageCoorDinaTor",
            right: "USR03",
          },
          {
            label: "ผู้บังคับบัญชา",
            image: images.command,
            //link: "/PageSuperVisor",
            right: "USR04",
          },
          {
            label: "ผู้ดูแลระบบ",
            image: images.admin,
            //link: "/PageAdmin",
            right: "USR05",
          },
        ].map((item, index) => (
          <Box key={index} sx={{ margin: "20px" }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="30%"
                image={item.image}
                alt="image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.label}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={`/PageMemberInformation/${item.right}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<PanToolAlt />}
                  >
                    CLICK ME
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      <Footer />
    </>
  );
}

export default ContentPageMember1;
