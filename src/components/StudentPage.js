import Calendar from "./calendar";
import Nav from "./Nav";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import theme from "../theme";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
function StudentPage() {
  return (
    <ThemeProvider theme={theme}>
      <Nav></Nav>
      <Container>
        <Grid container spacing={5} marginTop={5} direction="column">
          <Grid item xs={4}>
            <Calendar />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
export default StudentPage;
