import { db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import TextField from "@mui/material/TextField";
function TaskAdder() {
  const [startValue, setStart] = useState(new Date());
  const [endValue, setEnd] = useState(new Date());
  const [subject, setSubject] = useState("");

  const handleSubmit = async () => {
    await addDoc(collection(db, "Meetings"), {
      // meeting_end_time: new Date(endValue.getTime()),
      // meeting_start_time: new Date(startValue.getTime()),
      meeting_end_time: new Date(),
      meeting_start_time: new Date(),
      subject: subject,
    });
  };

  return (
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
      <button onClick={handleSubmit}>click me</button>
    </div>
  );
}
export default TaskAdder;
