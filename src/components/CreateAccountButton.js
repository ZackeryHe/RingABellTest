import { useState } from "react";
import * as React from "react";
import { signInWithPopup, getAdditionalUserInfo, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, provider } from "./firebase";

function CreateAccountButton() {
  const [show, setShow] = useState(false);

  const handleButton = () => {
    setShow(true);
  };

  const onClickSignUp = (role) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (getAdditionalUserInfo(result).isNewUser) {
          const userUID = result.user.uid;
          const email = result.user.email;
          const displayName = result.user.displayName;
          const photoURL = result.user.photoURL;

          setDoc(doc(db, "User", userUID), {
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            role: role,
            bio: "Hi, my name is " + displayName,
            zoom: "",
          });
        } else {
          signOut(auth);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {!show && (
        <Button sx={{ textDecoration: "underline" }} onClick={handleButton}>
          create an account
        </Button>
      )}
      {show && (
        <Button color="secondary" onClick={() => onClickSignUp("student")}>
          I am a student
        </Button>
      )}
      {show && (
        <Button color="secondary" onClick={() => onClickSignUp("teacher")}>
          I am a teacher
        </Button>
      )}
    </div>
  );
}
export default CreateAccountButton;
