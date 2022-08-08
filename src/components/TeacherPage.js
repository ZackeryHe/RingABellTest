import Calendar from "./calendar";
import TaskAdder from "./taskAdder";
import Box from "@mui/material/Box";

function TeacherPage() {
  return (
    <Box sx={{ width: "75%" }}>
      <Calendar />
      <TaskAdder />
    </Box>
  );
}
export default TeacherPage;
