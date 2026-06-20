import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeScreen from "./pages/HomeScreen";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import CreateHomework from "./pages/CreateHomework";
import TeacherHomework from "./pages/TeacherHomework";
import HomeworkDetails from "./pages/HomeworkDetails";
import CreateMCQ from "./pages/CreateMCQ";
import TeacherMCQ from "./pages/TeacherMCQ";
import MCQDetails from "./pages/MCQDetails";
import ViewStudents from "./pages/ViewStudent";
import StudentDetails from "./pages/StudentDetails";
import StudentHomework from "./pages/StudentHomework";
import StudentHomeworkDetails from "./pages/StudentHomeworkDetails";
import StudentMCQ from "./pages/StudentMCQ";
import StudentMCQDetails from "./pages/StudentMCQDetails";
import MCQResults from "./pages/MCQResults";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TeacherLiveSessions from "./pages/TeacherLiveSessions";
import CreateLiveSession from "./pages/CreateLiveSession";
import StudentLiveSessions from "./pages/StudentLiveSessions";
import TeacherLogin from "./pages/TeacherLogin";
import VerifyEmail from "./pages/VerifyEmail";
import GamesPage from "./pages/GamesPage";
import CrosswordGame from "./pages/games/CrosswordGame";
import FillBlank from "./pages/games/FillBlank";
import WordMatch from "./pages/games/WordMatch";
import TeacherCrossword from "./pages/TeacherCrossword";
import TeacherFillBlank from "./pages/TeacherFillBlank";
import TeacherWordMatch from "./pages/TeacherWordMatch";
import About from "./pages/About";
import StudentReview from "./pages/StudentReview";
import TeacherReviews from "./pages/TeacherReview";

import LMSAssistant from "./components/LMSAssistant";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/crossword" element={<CrosswordGame />} />
        <Route path="/games/fill-blanks" element={<FillBlank />} />
        <Route path="/games/word-match" element={<WordMatch />} />
        <Route path="/teacher/games/crossword" element={<TeacherCrossword />} />
        <Route
          path="/teacher/games/fill-blanks"
          element={<TeacherFillBlank />}
        />
        <Route
          path="/teacher/games/word-match"
          element={<TeacherWordMatch />}
        />
        <Route path="/teacher/homework/create" element={<CreateHomework />} />
        <Route path="/teacher/homework" element={<TeacherHomework />} />
        <Route path="/teacher/homework/:id" element={<HomeworkDetails />} />
        <Route path="/teacher/mcq/create" element={<CreateMCQ />} />
        <Route path="/teacher/mcq" element={<TeacherMCQ />} />
        <Route path="/teacher/mcq/:id" element={<MCQDetails />} />
        <Route path="/teacher/results" element={<MCQResults />} />
        <Route path="/teacher/students" element={<ViewStudents />} />
        <Route path="/teacher/students/:id" element={<StudentDetails />} />
        <Route path="/teacher/reviews" element={<TeacherReviews />} />
        <Route path="/student/homework" element={<StudentHomework />} />
        <Route
          path="/student/homework/:id"
          element={<StudentHomeworkDetails />}
        />
        <Route path="/student/mcq" element={<StudentMCQ />} />
        <Route path="/student/mcq/:id" element={<StudentMCQDetails />} />
        <Route path="/student/review" element={<StudentReview />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/teacher/live-sessions"
          element={<TeacherLiveSessions />}
        />
        <Route
          path="/teacher/live-sessions/create"
          element={<CreateLiveSession />}
        />
        <Route
          path="/student/live-sessions"
          element={<StudentLiveSessions />}
        />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
      <LMSAssistant />
    </>
  );
};

export default App;
