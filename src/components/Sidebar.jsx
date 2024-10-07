import React from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import logo from "../img/logo.png";
import ImageList from "@mui/material/ImageListItem";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import ContentPageHome from "./ContentPageHome";
//import ContentPageMember from './ContentPageMember';

//Update ContentPageMember
import ContentPageMember from "./ContentPageMember";
import ContentPageMemberInformation from "./ContentPageMemberInformation";

import ContentPageBookTestDate from "./ContentPageBookTestDate";
import ContentPageDoTest from "./ContentPageDoTest";
import ContentPageTestScoreInformation from "./ContentPageTestScoreInformation";
import ContentPageTestManagement from "./ContentPageTestManagement";
import ContentPageExamArchive from "./ContentPageExamArchive";
// import ContentPageExamInformation from "./ContentPageExamInformation";
// import ContentPageExaminer from "./ContentPageExaminer";
// import ContentPageCoorDinaTor from "./ContentPageCoorDinaTor";
// import ContentPageSuperVisor from "./ContentPageSuperVisor";
// import ContentPageAdmin from "./ContentPageAdmin";
import ContentPageCheckApproval from "./ContentPageCheckApproval";
import ContentPageExamArchiveLookExam from "./ContentPageExamArchiveLookExam";
import ContentPageExamArchiveByForm from "./ContentPageExamArchiveByForm"; //Add New Page 071067
import ContentPageAddManyExam from "./ContentPageAddManyExam"; //Add New Page 071067
import ContentPagePublicRelationsManagement from "./ContentPagePublicRelationsManagement";
import ContentLookLab from "./ContentLookLab";
import PageManageMembers from "../pages/PageManageMembers";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PageTestScores from "../pages/PageTestScores";
import ContentPageTestScores from "../components/ContentPageTestScores";
import ContentIndividualScores from "../components/ContentIndividualScores";
import ContentViewTestScores from "../components/ContentViewTestScores";
import ContentPageSettingWeb from "../components/ContentPageSettingWeb";
import ContentListScores from "../components/ContentListScores";
import ContentPageListTestScores from "../components/ContentPageListTestScores";
import ContentListDivisionScores from "../components/ContentListDivisionScores";
import ContentPageListTestScoresDivision from "../components/ContentPageListTestScoresDivision";
import GroupIcon from "@mui/icons-material/Group";
import ContentTeamDev from "../components/ContentTeamDev";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../src/store/userSilce";

// Functions
import { logoutHandler } from "../components/functions/user";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const userLogin = user.user;

  //user_role
  // const user_role = user.user.userRole
  // console.log("user role Sidebar: ", user_role)

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const userRole = user?.user?.userRole || [];

  // console.log("role: ", userRole);

  const USR01 = userRole[0]?.status;
  const USR02 = userRole[1]?.status;
  const USR03 = userRole[2]?.status;
  const USR04 = userRole[3]?.status;
  const USR05 = userRole[4]?.status;
  const orgname = user.user.orgname;
  const pers_idIndi = user.user.official_id;
  const rankIndi = user.user.rank;
  const fnameIndi = user.user.fname;
  const lnameIndi = user.user.lname;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    const idTokenResult = await localStorage.getItem("token");
    const pers_id = await userLogin.pers_id;
    await logoutHandler(idTokenResult, pers_id).then((res) => {
      dispatch(logout());
      toast.success("Logout Complete");
    });
    navigate("/", { replace: true });
  };

  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <ImageList
              sx={{
                width: 75,
                height: 75,
                padding: 2,
                display: { md: "block", xs: "none" },
              }}
            >
              <img src={logo} alt="logo" />
            </ImageList>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { md: "block", xs: "block" } }}
            >
              ระบบการทดสอบภาษาอังกฤษของกองทัพอากาศ <br />
              (RTAF ENGLISH TEST)
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Link
            exact="true"
            to="/PageHome"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <Tooltip title="Home">
                  <HomeIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></HomeIcon>
                </Tooltip>
                <ListItemText primary="HOME" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageMember"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <Tooltip title="ข้อมูลสมาชิก">
                  <PersonIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></PersonIcon>
                </Tooltip>
                <ListItemText
                  primary="ข้อมูลสมาชิก"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageBookTestDate"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <Tooltip title="ข้อมูลกำหนดวันสอบ">
                  <CalendarTodayIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></CalendarTodayIcon>
                </Tooltip>
                <ListItemText
                  primary="ข้อมูลกำหนดวันสอบ"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageDoTest"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <Tooltip title="ทำแบบทดสอบ">
                  <MenuBookIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></MenuBookIcon>
                </Tooltip>
                <ListItemText
                  primary="ทำแบบทดสอบ"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageTestManagement"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <Tooltip title="ข้อมูลจัดการทดสอบ">
                  <SettingsIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></SettingsIcon>
                </Tooltip>
                <ListItemText
                  primary="ข้อมูลจัดการทดสอบ"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageExamArchive"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <Tooltip title="ข้อมูลคลังข้อสอบ">
                  <LibraryBooksIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></LibraryBooksIcon>
                </Tooltip>
                <ListItemText
                  primary="ข้อมูลคลังข้อสอบ"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />

          {/* <Link to="/PageTestScores" style={{ textDecoration: "none", color: "black" }}> */}
          {/* <Link to={USR02 === '1' || USR03 === '1' || USR04 === '1' || USR05 === '1' ?  "/PageTestScores" : "/ContentViewTestScores"}  state={{ */}
          <Link
            to={
              USR01 === "1" &&
              USR02 === "0" &&
              USR03 === "0" &&
              USR04 === "0" &&
              USR05 === "0"
                ? "/ContentViewTestScores"
                : "/PageTestScores"
            }
            state={{
              pers_id: pers_idIndi,
              mem_rank: rankIndi,
              mem_fname: fnameIndi,
              mem_lname: lnameIndi,
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 7}
                onClick={(event) => handleListItemClick(event, 7)}
              >
                <Tooltip title="ผลคะแนนทดสอบ">
                  <QueryStatsIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></QueryStatsIcon>
                </Tooltip>
                <ListItemText
                  primary="ผลคะแนนทดสอบ"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/PageManageMembers"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 6}
                onClick={(event) => handleListItemClick(event, 6)}
              >
                <Tooltip title="จัดการสมาชิก">
                  <ManageAccountsIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ManageAccountsIcon>
                </Tooltip>
                <ListItemText
                  primary="จัดการสมาชิก"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/ContentPageSettingWeb"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 8}
                onClick={(event) => handleListItemClick(event, 8)}
              >
                <Tooltip title="ตั้งค่าเว็บไซต์">
                  <SettingsSuggestIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></SettingsSuggestIcon>
                </Tooltip>
                <ListItemText
                  primary="ตั้งค่าเว็บไซต์"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          <Link
            to="/ContentTeamDev"
            style={{ textDecoration: "none", color: "black" }}
          >
            <List>
              <ListItemButton
                sx={{
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                selected={selectedIndex === 9}
                onClick={(event) => handleListItemClick(event, 9)}
              >
                <Tooltip title="สมาชิกทีมพัฒนา">
                  <GroupIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></GroupIcon>
                </Tooltip>
                <ListItemText
                  primary="สมาชิกทีมพัฒนา"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </List>
          </Link>
          <Divider />
          {/* <Link to="/" style={{ textDecoration: "none", color: "red" }}> */}
          <List>
            <ListItemButton
              sx={{
                height: 40,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={selectedIndex === 10}
              // onClick={(event) => handleListItemClick(event, 10)}
              onClick={handleLogout}
            >
              <Tooltip title="LOGOUT">
                <LogoutIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                ></LogoutIcon>
              </Tooltip>
              <ListItemText primary="LOGOUT" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </List>
          {/* </Link> */}
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          {/* TEXT */}
          {location.pathname === "/PageHome" ? (
            <ContentPageHome />
          ) : location.pathname === "/PageMember" ? (
            <ContentPageMember />
          ) : location.pathname === "/PageBookTestDate" ? (
            <ContentPageBookTestDate />
          ) : location.pathname === "/PageDoTest" ? (
            <ContentPageDoTest />
          ) : location.pathname === "/PageTestScoreInformation" ? (
            <ContentPageTestScoreInformation />
          ) : location.pathname === "/PageTestManagement" ? (
            <ContentPageTestManagement />
          ) : location.pathname === "/PageExamArchive" ? (
            <ContentPageExamArchive />
          ) : // ) : location.pathname === "/PageExamInformation" ? (
          //   <ContentPageExamInformation />
          // ) : location.pathname === "/PageExaminer" ? (
          //   <ContentPageExaminer />
          // ) : location.pathname === "/PageCoorDinaTor" ? (
          //   <ContentPageCoorDinaTor />
          // ) : location.pathname === "/PageSuperVisor" ? (
          //   <ContentPageSuperVisor />
          // ) : location.pathname === "/PageAdmin" ? (
          //   <ContentPageAdmin />
          location.pathname === "/PageCheckApproval" ? (
            <ContentPageCheckApproval />
          ) : location.pathname === "/PageExamArchiveLookExam" ? (
            <ContentPageExamArchiveLookExam />
          ) : location.pathname === "/PagePublicRelationsManagement" ? (
            <ContentPagePublicRelationsManagement />
          ) : location.pathname === "/PageLookLab" ? (
            <ContentLookLab />
          ) : location.pathname === "/PageManageMembers" ? (
            <PageManageMembers />
          ) : location.pathname === "/PageTestScores" ? (
            <PageTestScores />
          ) : location.pathname === "/ContentPageTestScores" ? (
            <ContentPageTestScores />
          ) : location.pathname === "/ContentIndividualScores" ? (
            <ContentIndividualScores />
          ) : location.pathname === "/ContentViewTestScores" ? (
            <ContentViewTestScores />
          ) : location.pathname === "/ContentPageSettingWeb" ? (
            <ContentPageSettingWeb />
          ) : location.pathname === "/ContentListScores" ? (
            <ContentListScores />
          ) : location.pathname === "/ContentPageListTestScores" ? (
            <ContentPageListTestScores />
          ) : location.pathname === "/ContentListDivisionScores" ? (
            <ContentListDivisionScores />
          ) : location.pathname === "/ContentPageListTestScoresDivision" ? (
            <ContentPageListTestScoresDivision />
          ) : location.pathname === "/ContentTeamDev" ? (
            <ContentTeamDev />
          ) : //new path
          location.pathname.match(/^\/PageMemberInformation\/[^]+$/) ? (
            <ContentPageMemberInformation />
          ) : location.pathname === "/PageExamArchiveByForm" ? (
            <ContentPageExamArchiveByForm />
          ) : location.pathname === "/PageAddManyExam" ? (
            <ContentPageAddManyExam />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
}
export default Sidebar;
