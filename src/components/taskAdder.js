import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

function TaskAdder() {
  const [startValue, setStart] = useState(new Date());
  const [endValue, setEnd] = useState(new Date());
  const [subject, setSubject] = useState("");
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
            label="subject name"
            value={subject}
            onChange={(newValue) => {
              setSubject(newValue.target.value);
            }}
          ></TextField>
          <Button onClick={handleSubmit}>Create event</Button>
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
