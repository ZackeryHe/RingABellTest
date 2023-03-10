import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Button from "@mui/material/Button";
import TaskDeleter from "./TaskDeleter";
import Grid from "@mui/material/Grid";
function DeletionPopup() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Delete an event
      </Button>
      <Dialog fullWidth={true} open={open} onClose={handleClose}>
        <DialogTitle>Event Deletion</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Displaying current listed events:
          </DialogContentText>
          <Grid container marginTop={2}>
            <Grid item>
              <TaskDeleter></TaskDeleter>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeletionPopup;
