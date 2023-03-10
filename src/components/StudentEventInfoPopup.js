import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TaskAdder from "./TaskAdder";

function StudentEventInfoPopup() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create an event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Creation</DialogTitle>
        <DialogContent>
          <TaskAdder />
          <DialogContentText>
            Make sure to press create before pressing done!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default StudentEventInfoPopup;
