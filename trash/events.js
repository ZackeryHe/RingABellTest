// import { collection, query, onSnapshot } from "firebase/firestore";
// import { db } from "./firebase";
// import { useEffect, useState } from "react";
// //not used
// function Events() {
//   const [events, setEvents] = useState([]);
//   useEffect(() => {
//     const q = query(collection(db, "Meetings"));
//     onSnapshot(q, (querySnapshot) => {
//       setEvents(
//         querySnapshot.docs.map((doc) => ({
//           start: new Date(doc.data().meeting_start_time.seconds * 1000),
//           end: new Date(doc.data().meeting_end_time.seconds * 1000),
//           // start: new Date(),
//           // end: new Date(),
//           title: doc.data().subject,
//         }))
//       );
//     });
//   }, []);
//   return events;
// }

// export default Events;
