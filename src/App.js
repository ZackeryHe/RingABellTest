import "./App.css";
import TutorsPage from "./components/TutorPage";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./components/StudentPage";
import * as React from "react";
import MyAccount from "./components/MyAccount";
import PrivateRoutes from "./components/PrivateRoutes.js";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route element={<SignIn />} path="/" exact></Route>

          <Route element={<PrivateRoutes allowedRoles={["student"]} />}>
            <Route element={<StudentPage />} path="/students"></Route>
          </Route>
          <Route element={<PrivateRoutes allowedRoles={["teacher"]} />}>
            <Route element={<TutorsPage />} path="/teachers"></Route>
          </Route>
          <Route
            element={<PrivateRoutes allowedRoles={["teacher", "student"]} />}
          >
            <Route path="/account" element={<MyAccount />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
