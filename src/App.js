import "./App.css";
import TeacherPage from "./components/TeacherPage";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./components/StudentPage";
import MyAccount from "./components/MyAccount";
function App() {
  return (
    <Router>
      <div className="app">
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/teachers" element={<TeacherPage />} />
          <Route path="login" element={<LogIn />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/account" element={<MyAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
