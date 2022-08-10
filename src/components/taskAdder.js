import { db, auth } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
function TaskAdder() {
  const [startValue, setStart] = useState(new Date());
  const [endValue, setEnd] = useState(new Date());
  const [subject, setSubject] = useState("");
  const [desc, setDesc] = useState("");
  const [state, setState] = useState({
    showSidebar: false,
  });
  const handleSubmit = async () => {
    await addDoc(collection(db, "Meetings"), {
      // meeting_end_time: new Date(endValue.getTime()),
      // meeting_start_time: new Date(startValue.getTime()),
      meeting_end_time: new Date(),
      meeting_start_time: new Date(),
      subject: subject,
      description: desc,
      createdBy: auth.currentUser.uid,
    });
  };

  const form = (props) => {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <div>
          <Stack>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="start time"
                value={startValue}
                onChange={(newValue) => {
                  setStart(newValue);
                }}
              />
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="end time"
                value={endValue}
                onChange={(newValue) => {
                  setEnd(newValue);
                }}
              />
            </LocalizationProvider>
            <TextField
              label="description"
              value={subject}
              onChange={(newValue) => {
                setDesc(newValue.target.value);
              }}
            ></TextField>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Subject</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="hello"
                id="demo-simple-select"
                onChange={(newValue) => {
                  setSubject(newValue);
                }}
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Math"}>Math</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={handleSubmit}>Create event</Button>
          </Stack>
        </div>
      </Box>
    );
  };
  return (
    <div>
      <Button
        onClick={() => {
          if (state.showSidebar) setState({ showSidebar: false });
          else setState({ showSidebar: true });
        }}
        variant="outlined"
      >
        Create Event
      </Button>
      <Drawer
        anchor={"right"}
        open={state.showSidebar}
        onClose={() => {
          if (state.showSidebar) setState({ showSidebar: false });
          else setState({ showSidebar: true });
        }}
      >
        {form()}
      </Drawer>
    </div>
  );
}
export default TaskAdder;
