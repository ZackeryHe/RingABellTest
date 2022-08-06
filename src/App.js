import "./App.css";
import TeacherPage from "./components/TeacherPage";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app">
        {/*<nav></nav>*/}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/calendar" element={<TeacherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
