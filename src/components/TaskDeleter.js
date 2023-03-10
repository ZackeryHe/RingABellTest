import { db, auth } from "./firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";

function TaskDeleter() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser.uid + "";
    const q = query(collection(db, "Meetings"), where("createdBy", "==", uid));
    onSnapshot(q, (querySnapshot) => {
      setEvents(
        querySnapshot.docs.map((doc) => ({
          start: new Date(doc.data().meeting_start_time.seconds * 1000),
          end: new Date(doc.data().meeting_end_time.seconds * 1000),
          title: doc.data().subject,
          docid: doc.id,
        }))
      );
    });
  }, []);

  return (
    <div>
      {events.map((event) => {
        return <DeleteButton key={event.docid} event={event}></DeleteButton>;
      })}
    </div>
  );
}
export default TaskDeleter;
