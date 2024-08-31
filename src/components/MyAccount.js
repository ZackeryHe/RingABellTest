import Nav from "./Nav";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import theme from "../theme";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

function MyAccount() {
  const [name, setName] = useState(sessionStorage.getItem("displayName"));
  const [bio, setBio] = useState(sessionStorage.getItem("bio"));
  const [zoom, setZoom] = useState(sessionStorage.getItem("zoom"));
  const forceUpdate = useForceUpdate();

  const handleChange = async () => {
    const docRef = doc(db, "User", auth.currentUser.uid);
    setDoc(
      docRef,
      { displayName: name, bio: bio, zoom: zoom },
      { merge: true }
    );
    sessionStorage.setItem("displayName", name);
    sessionStorage.setItem("bio", bio);
    sessionStorage.setItem("zoom", zoom);
    forceUpdate();
  };

  function checkChange() {
    if (
      name !== sessionStorage.getItem("displayName") ||
      bio !== sessionStorage.getItem("bio") ||
      zoom !== sessionStorage.getItem("zoom")
    )
      return true;
    else return false;
  }

  return (
    <ThemeProvider theme={theme}>
      <Nav></Nav>
      <Container>
        <Grid container spacing={5} marginTop={5} direction="column">
          <Grid item xs>
            <Typography>Edit Name</Typography>
          </Grid>
          <Grid container item xs>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  variant="standard"
                  value={name}
                  onChange={(newValue) => {
                    setName(newValue.target.value);
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography>Edit About Me</Typography>
          </Grid>
          <Grid container item xs>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  variant="standard"
                  value={bio}
                  multiline
                  onChange={(newValue) => {
                    setBio(newValue.target.value);
                  }}
                ></TextField>
              </FormControl>
            </Grid>
          </Grid>
          {sessionStorage.getItem("role") === "teacher" && (
              <Grid item xs>
                <Typography>Edit Zoom Link</Typography>
              </Grid>
            ) && (
              <Grid container item xs>
                <Grid item>
                  <FormControl fullWidth>
                    <TextField
                      variant="standard"
                      value={zoom}
                      onChange={(newValue) => {
                        setZoom(newValue.target.value);
                      }}
                    ></TextField>
                  </FormControl>
                </Grid>
                <Grid item marginLeft={2}>
                  {console.log(zoom)}
                  {zoom === "" && (
                    <Alert severity="warning">
                      You must have a link to create a meeting
                    </Alert>
                  )}
                </Grid>
              </Grid>
            )}
        </Grid>
        <Grid item xs>
          {checkChange() && <Button onClick={handleChange}>Save</Button>}{" "}
        </Grid>
        <Grid item xs>
          {checkChange() && (
            <Button
              onClick={() => {
                setName(sessionStorage.getItem("displayName"));
                setBio(sessionStorage.getItem("bio"));
                setZoom(sessionStorage.getItem("zoom"));
              }}
            >
              Cancel
            </Button>
          )}{" "}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
export default MyAccount;
