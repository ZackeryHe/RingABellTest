import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../src/components/firebase";
import Button from "@mui/material/Button";

const localizer = momentLocalizer(moment);
function Calendar() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("day");
  const [sideBarState, setSideBarState] = useState({
    showSidebar: false,
    meetingDocId: null,
    subject: null,
    name: null,
    bio: null,
    zoomLink: null,
  });

  useEffect(() => {
    const q = query(collection(db, "Meetings"));
    onSnapshot(q, (querySnapshot) => {
      setEvents(
        querySnapshot.docs.map((doc) => ({
          start: new Date(doc.data().meeting_start_time.seconds * 1000),
          end: new Date(doc.data().meeting_end_time.seconds * 1000),
          id: doc.id,
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
          defaultView={view}
          defaultDate={date}
          onNavigate={(newDate) => {
            setDate(newDate);
          }}
          onView={(newView) => {
            setView(newView);
          }}
          events={events}
          onSelectEvent={toggleSidebar}
          style={{ height: 1000 }}
          views={["week", "day"]}
        ></BigCalendar>
      </div>
    );
  };
  const SideBar = (props) => (
    <div>
      <Drawer
        anchor={"right"}
        open={sideBarState.showSidebar}
        onClose={toggleSidebar}
      >
        {setSideBarInfo()}
      </Drawer>
    </div>
  );

  const toggleSidebar = async (calEvent) => {
    if (sideBarState.showSidebar)
      setSideBarState({
        showSidebar: false,
        meetingDocId: null,
        subject: null,
        name: null,
        bio: null,
        zoomLink: null,
      });
    else {
      if (calEvent) {
        let docRef = doc(db, "Meetings", calEvent.id);
        let docSnap = await getDoc(docRef);
        const tutorDocId = docSnap.data().createdBy;
        const subject = docSnap.data().subject;
        docRef = doc(db, "Tutors", tutorDocId);
        docSnap = await getDoc(docRef);
        const name = docSnap.data().name;
        const bio = docSnap.data().bio;
        const zoomLink = docSnap.data().zoomLink;
        if (tutorDocId === auth.currentUser.uid) {
          setSideBarState({
            showSidebar: true,
            meetingDocId: calEvent.id,
            subject: subject,
            name: name,
            bio: bio,
            zoomLink: zoomLink,
          });
        } else {
          setSideBarState({
            showSidebar: true,
            meetingDocId: null,
            subject: subject,
            name: name,
            bio: bio,
            zoomLink: zoomLink,
          });
        }
      }
    }
  };
  const setSideBarInfo = () => {
    return (
      <div>
        <Box sx={{}}>
          <h1>tutor name: {sideBarState.name}</h1>
          <h1>tutor bio: {sideBarState.bio}</h1>
          <h1>subject: {sideBarState.subject}</h1>
          <h1>zoom link: {sideBarState.zoomLink}</h1>
          {sideBarState.meetingDocId && (
            <Button
              onClick={async () => {
                await deleteDoc(doc(db, "Meetings", sideBarState.meetingDocId));
              }}
            >
              Delete This Event
            </Button>
          )}
        </Box>
      </div>
    );
  };

  return (
    <div>
      <MyCalendar></MyCalendar>
      <SideBar></SideBar>
    </div>
  );
}

export default Calendar;
