import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { signInWithPopup, deleteUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth, provider } from "./firebase";
import theme from "../theme";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CreateAccountButton from "./CreateAccountButton";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Ring A Bell
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [role, setRole] = React.useState();

  const onClickSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userUID = result.user.uid;
        const docSnap = await getDoc(doc(db, "User", userUID));
        if (!docSnap.exists()) {
          deleteUser(auth.currentUser)
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        } else {
          const role = docSnap.data().role;
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("photoURL", docSnap.data().photoURL);
          sessionStorage.setItem("displayName", docSnap.data().displayName);
          sessionStorage.setItem("bio", docSnap.data().bio);
          sessionStorage.setItem("zoom", docSnap.data().zoom);
          setRole(role);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {role && <Navigate to={role + "s"}></Navigate>}
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item xs>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="h7" color="text.seco">
                  to continue to Ring A Bell Calendar
                </Typography>
              </Grid>
              <Grid item margin={3}>
                <Button
                  variant="outlined"
                  style={{ minWidth: "300px" }}
                  color="primary"
                  onClick={onClickSignIn}
                >
                  Sign in Using Google
                </Button>
              </Grid>
              <Grid item>
                <Typography color="text.secondary" variant="h7">
                  Don't have an account?
                </Typography>
              </Grid>
              <Grid item>
                <CreateAccountButton></CreateAccountButton>
              </Grid>
            </Grid>
          </Paper>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
