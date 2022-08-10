import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import * as React from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [role, setRole] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // const p = await isTeacher();
        // console.log(isTeacher());
        // if (p) setRole("tutor");
        // else setRole("student");
        const r = await getRole();
        setRole(r);
      } else {
        setRole("signed out");
      }
    });
  }, []);

  async function getRole() {
    let docRef = doc(db, "Tutors", auth.currentUser.uid);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) return "tutor";
    docRef = doc(db, "Students", auth.currentUser.uid);
    docSnap = await getDoc(docRef);

    if (docSnap.exists()) return "student";
    //uh oh
    else return "other";
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    signOut(auth);
  };
  const UserMenu = (props) => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in.
      return (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link href="/account">
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Link>
          <Link href={"" + role + "s"}>
            <MenuItem onClick={handleClose}>
              {role === "tutor" ? "Tutor" : "Student"} Calendar
            </MenuItem>
          </Link>
          <Link href="/login">
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Link>
        </Menu>
      );
    } else {
      // No user is signed in.
      return (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link href="/">
            <MenuItem onClick={handleClose}>Sign up</MenuItem>
          </Link>
          <Link href="/login">
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </Link>
        </Menu>
      );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ring A Bell
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <UserMenu></UserMenu>
        </Toolbar>
      </AppBar>
      {(role === "tutor" || role === "student") && (
        <Alert severity="success">
          You are currently logged in as a {role}
        </Alert>
      )}
    </Box>
  );
}
