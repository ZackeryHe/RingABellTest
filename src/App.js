import "./App.css";
import TutorsPage from "./components/TutorPage";
import SignUp from "./components/SignUp";
import Nav from "./components/Nav";
import LogIn from "./components/LogIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import StudentPage from "./components/StudentPage";
import * as React from "react";
// import { auth, db } from "./components/firebase";
// import { doc, getDoc } from "firebase/firestore";
import MyAccount from "./components/MyAccount";
function App() {
  // const [role, setRole] = React.useState(null);

  // React.useEffect(() => {
  //   const fetchRole = async () => {
  //     const p = await isTeacher();
  //     if (p) setRole(true);
  //     else setRole(false);
  //   };
  //   fetchRole();
  // }, []);

  // async function isTeacher() {
  //   const docRef = doc(db, "Tutors", auth.currentUser.uid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) return "tutor";
  //   else return "student";
  // }

  return (
    <Router>
      <div className="app">
        <Nav></Nav>
        <Routes>
          <Route path="/" exact element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="/tutors" element={<TutorsPage />} />
          <Route path="/students" element={<StudentPage />} />
          <Route path="/account" element={<MyAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
