/* eslint no-use-before-define: 0 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";
import PageBookDate from "./pages/PageBookDate";
import PageTest from "./pages/PageTest";
import PageFinishAttempt from "./pages/PageFinishAttempt";
import PageTestScoreData from "./pages/PageTestScoreData";
import PageExamManagement from "./pages/PageExamManagement";
import PageTestDate from "./pages/PageTestDate";
import PageEditRegister from "./pages/PageEditRegister";
import PageEditPublicRelation from "./pages/PageEditPublicRelation";
import PageAddPublicRelation from "./pages/PageAddPublicRelation";
import Sidebar from "./components/Sidebar";
import ContentRegisterBook from "./components/ContentRegisterBook";
import ContentPageEditRegisterBook from "./components/ContentPageEditRegisterBook";
import ContentPageAddRemember from "./components/ContentPageAddRemember";
import ContentPageAddExam from "./components/ContentPageAddExam";
import ContentPageAddExaminer from "./components/ContentPageAddExaminer";
import ContentPageAddCoorDinaTor from "./components/ContentPageAddCoorDinaTor";
import ContentPageAddSuperVisor from "./components/ContentPageAddSuperVisor";
import ContentPageAddAdmin from "./components/ContentPageAddAdmin";
import ContentPagePressRelease from "./components/ContentPagePressRelease";
import PagePrintTestScoreMobile from "./pages/PagePrintTestScoreMobile";
import PagePrintTableTestListScoreMobile from "./pages/PagePrintTableTestListScoreMobile";
import PagePrintTableScoreMobile from "./pages/PagePrintTableScoreMobile";
import UserLoginRoute from "./components/UserLoginRoute";
import Notfound404 from "./components/Notfound404";

//import new component 180967
import ContentPageAddMember from "./components/ContentPageAddMember";

// import PageTestScoreex from "./pages/PageTestScoreex";

// function
import { currentUser } from "./components/functions/user";

import { useDispatch } from "react-redux";
import { login } from "./store/userSilce";
// Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token");
  // console.log("token", idToken);
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        const {
          mem_rank,
          mem_fname,
          mem_lname,
          mem_email,
          pers_id,
          mem_pos,
          mem_affiliation,
        } = res.data.user;
        const official_id = res.data.user.tbmemberinfos[0].official_id;

        dispatch(
          login({
            token: idToken,
            rank: mem_rank,
            fname: mem_fname,
            lname: mem_lname,
            email: mem_email,
            pers_id: pers_id,
            official_id: official_id,
            position: mem_pos,
            orgname: mem_affiliation,
            userRole: res.data.userRole,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/notfound404" element={<Notfound404 />} />
        <Route
          path="*"
          element={
            <Notfound404 text="The page you’re looking for doesn’t exist." />
          }
        />
        <Route path="/" element={<PageLogin />} />
        <Route path="/PageRegister" element={<PageRegister />} />

        {/* Protect Login Path */}
        <Route
          path="/PageHome"
          element={
            // <UserLoginRoute>
            <Sidebar />
            // </UserLoginRoute>
          }
        />
        <Route
          path="/PagePublicRelationsManagement"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />

        {/* Sidebar */}
        <Route
          path="/PageMember"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        {/* New Path */}
        <Route
          path="/PageMemberInformation/:right"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        {/* New AddMember Path */}
        <Route
          path="/ContentPageAddMember/:right"
          element={
            <UserLoginRoute>
              <ContentPageAddMember />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageBookTestDate"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageDoTest"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTestScoreInformation"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTestManagement"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageExamArchive"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageExamInformation"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageExaminer"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageCoorDinaTor"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageSuperVisor"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageAdmin"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageExamArchiveLookExam"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageLookLab"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageCheckApproval"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageManageMembers"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTestScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageTestScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentIndividualScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentListScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentListDivisionScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageListTestScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageListTestScoresDivision"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentViewTestScores"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageSettingWeb"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentTeamDev"
          element={
            <UserLoginRoute>
              <Sidebar />
            </UserLoginRoute>
          }
        />

        {/* Content Page */}
        <Route
          path="/ContentPagePressRelease"
          element={
            <UserLoginRoute>
              <ContentPagePressRelease />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddExam"
          element={
            <UserLoginRoute>
              <ContentPageAddExam />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddExaminer"
          element={
            <UserLoginRoute>
              <ContentPageAddExaminer />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddCoorDinaTor"
          element={
            <UserLoginRoute>
              <ContentPageAddCoorDinaTor />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddSuperVisor"
          element={
            <UserLoginRoute>
              <ContentPageAddSuperVisor />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddAdmin"
          element={
            <UserLoginRoute>
              <ContentPageAddAdmin />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageBookDate"
          element={
            <UserLoginRoute>
              <PageBookDate />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTest"
          element={
            <UserLoginRoute>
              <PageTest />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageFinishAttempt"
          element={
            <UserLoginRoute>
              <PageFinishAttempt />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTestScoreData"
          element={
            <UserLoginRoute>
              <PageTestScoreData />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageExamManagement"
          element={
            <UserLoginRoute>
              <PageExamManagement />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageTestDate"
          element={
            <UserLoginRoute>
              <PageTestDate />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageEditRegister"
          element={
            <UserLoginRoute>
              <PageEditRegister />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageEditExaminer"
          element={
            <UserLoginRoute>
              <PageEditRegister />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageEditPublicRelation"
          element={
            <UserLoginRoute>
              <PageEditPublicRelation />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PageAddPublicRelation"
          element={
            <UserLoginRoute>
              <PageAddPublicRelation />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentRegisterBook"
          element={
            <UserLoginRoute>
              <ContentRegisterBook />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageEditRegisterBook"
          element={
            <UserLoginRoute>
              <ContentPageEditRegisterBook />
            </UserLoginRoute>
          }
        />
        <Route
          path="/ContentPageAddRemember"
          element={
            <UserLoginRoute>
              <ContentPageAddRemember />
            </UserLoginRoute>
          }
        />
        <Route
          path="/PagePrintTestScoreMobile"
          element={<PagePrintTestScoreMobile />}
        />
        <Route
          path="/PagePrintTableTestListScoreMobile"
          element={<PagePrintTableTestListScoreMobile />}
        />

        <Route
          path="/PagePrintTableScoreMobile"
          element={<PagePrintTableScoreMobile />}
        />
        {/*  */}
        {/* <Route path="/PageTextScore_ex/:id" element={<PageTestScoreex />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
