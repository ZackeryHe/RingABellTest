import { db, auth } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
function TaskAdder() {
  const [startValue, setStart] = useState(new Date());
  const [endValue, setEnd] = useState(new Date());
  const [subject, setSubject] = useState("");
  const [meetingLink] = useState(sessionStorage.getItem("zoom"));
  const [showSubjectError, setShowSubjectError] = useState(false);
  const [showStartError, setShowStartError] = useState(false);
  const [showLengthError, setShowLengthError] = useState(false);
  const handleSubmit = async () => {
    subject ? setShowSubjectError(false) : setShowSubjectError(true);
    new Date(startValue) < new Date(endValue)
      ? setShowStartError(false)
      : setShowStartError(true);
    new Date(endValue) - new Date(startValue) < 7200000
      ? setShowLengthError(false)
      : setShowLengthError(true);

    if (
      subject &&
      meetingLink !== "" &&
      new Date(startValue) < new Date(endValue) &&
      new Date(endValue) - new Date(startValue) < 7200000
    ) {
      await addDoc(collection(db, "Meetings"), {
        meeting_end_time: new Date(endValue),
        meeting_start_time: new Date(startValue),
        subject: subject,
        createdBy: auth.currentUser.uid,
        attendance: [],
      });
    }
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        spacing={2}
        marginTop={1}
        marginBottom={1}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {showStartError && (
            <Grid item>
              <Typography color="error.main">
                start time must be before end time*
              </Typography>
            </Grid>
          )}
          <Grid item>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="start time"
              value={startValue}
              onChange={(newValue) => {
                setStart(newValue);
              }}
            />
          </Grid>
          {showLengthError && (
            <Grid item>
              <Typography color="error.main">
                meetings must be shorter than 2 hours*
              </Typography>
            </Grid>
          )}
          <Grid item>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="end time"
              value={endValue}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
            />
          </Grid>
        </LocalizationProvider>
        {showSubjectError && (
          <Grid item>
            <Typography color="error.main">enter subject*</Typography>
          </Grid>
        )}
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              label="subject"
              value={subject}
              onChange={(newValue) => {
                setSubject(newValue.target.value);
              }}
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Math"}>Math</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          {meetingLink === "" && (
            <Alert severity="error">
              You can add/change your zoom link in your account settings
            </Alert>
          )}
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <TextField
              disabled={true}
              label="Meeting Link"
              value={meetingLink}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleSubmit}>
            Create event
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default TaskAdder;
