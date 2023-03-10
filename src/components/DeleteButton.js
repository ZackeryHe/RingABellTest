import { db } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

import Button from "@mui/material/Button";

function DeleteButton(event) {
  const [show, setShow] = useState(false);

  const handleDelete = async (docid) => {
    await deleteDoc(doc(db, "Meetings", docid));
  };

  const handleButton = () => {
    setShow(true);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleButton}>
        <div>
          {event.event.title + " "}
          {new Date(event.event.start).toDateString() + " "}
          {new Date(event.event.start).getHours() + ":"}
          {new Date(event.event.start).getMinutes() < 10
            ? "0" + new Date(event.event.start).getMinutes()
            : new Date(event.event.start).getMinutes() + " "}
        </div>
      </Button>
      {show && (
        <Button
          color="secondary"
          onClick={() => handleDelete(event.event.docid)}
        >
          Confirm Deletion
        </Button>
      )}
      {show && <Button onClick={handleCancel}>Cancel</Button>}
    </div>
  );
}
export default DeleteButton;
