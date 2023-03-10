import Calendar from "./calendar";
import Nav from "./Nav";
import * as React from "react";
import CreateEventPopup from "./CreateEventPopup";
import { ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import theme from "../theme";
import Container from "@mui/material/Container";
import DeletionPopup from "./DeletionPopup";
import Alert from "@mui/material/Alert";
function TeacherPage() {
  return (
    <ThemeProvider theme={theme}>
      <Nav></Nav>
      <Container>
        <Grid
          container
          spacing={3}
          marginTop={5}
          marginBottom={5}
          direction="column"
        >
          <Grid item xs={4}>
            <Alert icon={false}>Directions: write directions here</Alert>
          </Grid>
          <Grid item xs={4}>
            <Calendar />
          </Grid>
          <Grid container xs item>
            <Grid item xs={2}>
              <CreateEventPopup></CreateEventPopup>
            </Grid>
            <Grid item xs={2}>
              <DeletionPopup></DeletionPopup>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
export default TeacherPage;
