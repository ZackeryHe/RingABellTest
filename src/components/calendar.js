import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Events from "./events";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

const localizer = momentLocalizer(moment);
function Calendar() {
  const [state, setState] = useState({
    showSidebar: false,
  });
  const defaultDate = new Date();

  const MyCalendar = (props) => {
    const events = Events();
    return (
      <div className="height200">
        <BigCalendar
          localizer={localizer}
          defaultView="day"
          events={events}
          defaultDate={defaultDate}
          onSelectEvent={toggleSidebar}
          style={{ height: 500 }}
        ></BigCalendar>
      </div>
    );
  };
  const sideInfo = () => (
    <Box sx={{ width: 300 }}>
      <button>hello</button>
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
