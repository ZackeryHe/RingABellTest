import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  getDoc,
  doc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const localizer = momentLocalizer(moment);
function Calendar() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("day");

  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);

  const [isLoading, setLoading] = useState(true);

  const handleClickOpen = async (event) => {
    setLoading(true);
    setOpen(true);

    const eventData = await (
      await getDoc(doc(db, "Meetings", event.id))
    ).data();
    const teacherData = await (
      await getDoc(doc(db, "User", eventData.createdBy))
    ).data();

    setInfo({
      teacherName: teacherData.displayName,
      teacherEmail: teacherData.email,
      teacherPhoto: teacherData.photoURL,
      teacherBio: teacherData.bio,
      meetingLink: teacherData.zoom,
      numberOfPeople: eventData.attendance.length,
      eventId: event.id,
      signedUp: eventData.attendance.includes(auth.currentUser.uid),
    });

    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignUp = (eventId) => {
    const docRef = doc(db, "Meetings", eventId);
    updateDoc(docRef, {
      attendance: arrayUnion(auth.currentUser.uid),
    });
    setInfo((prevState) => ({
      ...prevState,
      numberOfPeople: prevState.numberOfPeople + 1,
      signedUp: true,
    }));
  };

  const handleCancel = (eventId) => {
    const docRef = doc(db, "Meetings", eventId);
    updateDoc(docRef, {
      attendance: arrayRemove(auth.currentUser.uid),
    });
    setInfo((prevState) => ({
      ...prevState,
      numberOfPeople: prevState.numberOfPeople - 1,
      signedUp: false,
    }));
  };

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
        onSelectEvent={(event) => handleClickOpen(event)}
        views={["week", "day"]}
        eventPropGetter={(event) => {
          let backgroundColor;
          if (event.title === "English") backgroundColor = "green";
          return { style: { backgroundColor: backgroundColor } };
        }}
      ></BigCalendar>
    );
  };

  return (
    <div>
      <MyCalendar></MyCalendar>
      {!isLoading && (
        <Dialog
          PaperProps={{
            sx: {
              maxHeight: "30%",
            },
          }}
          fullWidth={true}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Event Information</DialogTitle>
          <DialogContent>
            <DialogContentText>Review event information</DialogContentText>
            <Container>
              <Grid container spacing={2}>
                <Grid container xs item direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h6">Tutor</Typography>
                  </Grid>
                  <Grid container item direction="row" spacing={1}>
                    <Grid item>
                      <img
                        style={{ borderRadius: "50%" }}
                        src={info.teacherPhoto}
                        alt="loading"
                        width="55"
                        referrerPolicy="no-referrer"
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h7">{info.teacherName}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container xs item direction="column" spacing={1}>
                  <Grid item>
                    <Typography variant="h6">About</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h7">{info.teacherBio}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    display="block"
                    variant="h7"
                    color="text.secondary"
                  >
                    Number of people attending: {info.numberOfPeople}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    display="block"
                    variant="h7"
                    color="text.secondary"
                  >
                    Contact at {info.teacherEmail}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h7" color="text.secondary">
                    Meeting link: {info.meetingLink}
                  </Typography>
                </Grid>
                {sessionStorage.getItem("role") === "student" &&
                  !info.signedUp && (
                    <Grid item margin={1}>
                      <Button
                        onClick={() => handleSignUp(info.eventId)}
                        variant="outlined"
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  )}
                {sessionStorage.getItem("role") === "student" &&
                  info.signedUp && (
                    <Grid item margin={1}>
                      <Button
                        onClick={() => handleCancel(info.eventId)}
                        variant="outlined"
                      >
                        Cancel Registration
                      </Button>
                    </Grid>
                  )}
              </Grid>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Calendar;
