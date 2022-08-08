import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const localizer = momentLocalizer(moment);
function Calendar() {
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    showSidebar: false,
  });
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );
  useEffect(() => {
    const q = query(collection(db, "Meetings"));
    onSnapshot(q, (querySnapshot) => {
      setEvents(
        querySnapshot.docs.map((doc) => ({
          start: new Date(doc.data().meeting_start_time.seconds * 1000),
          end: new Date(doc.data().meeting_end_time.seconds * 1000),
          title: doc.data().subject,
        }))
      );
    });
  }, []);
  const MyCalendar = (props) => {
    return (
      <div className="height1200">
        <BigCalendar
          localizer={localizer}
          defaultView="day"
          events={events}
          defaultDate={defaultDate}
          onSelectEvent={toggleSidebar}
          style={{ height: 1000 }}
          views={["week", "day"]}
        ></BigCalendar>
      </div>
    );
  };

  const sideInfo = () => (
    <Box sx={{ width: "100%", pl: 2 }}>
      <text>zoom link</text>
      <text>teacher name</text>
    </Box>
  );

  const SideBar = (props) => (
    <div>
      <Drawer anchor={"right"} open={state.showSidebar} onClose={toggleSidebar}>
        {sideInfo()}
      </Drawer>
    </div>
  );

  function toggleSidebar() {
    if (state.showSidebar) setState({ showSidebar: false });
    else setState({ showSidebar: true });
  }
  return (
    <div>
      <MyCalendar></MyCalendar>
      <SideBar></SideBar>
    </div>
  );
}

export default Calendar;
