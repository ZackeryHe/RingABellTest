import Calendar from "./calendar";
import Box from "@mui/material/Box";
import { Navigate } from "react-router-dom";
import * as React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
function StudentPage() {
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const r = await getRole();
        setRole(r);
      } else {
        setRole("signed out");
      }
    });
  }, []);

  async function getRole() {
    let docRef = doc(db, "Tutors", auth.currentUser.uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) return "tutor";
    docRef = doc(db, "Students", auth.currentUser.uid);
    docSnap = await getDoc(docRef);

    if (docSnap.exists()) return "student";
    else return "other";
  }
  return (
    <div>
      {role === "student" && (
        <Box sx={{ width: "75%" }}>
          <Calendar />
        </Box>
      )}
      {role === "tutor" && <Navigate to="/tutors" />}
      {(role === "signed out" || role === "other") && <Navigate to="/login" />}
    </div>
  );
}
export default StudentPage;
