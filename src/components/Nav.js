import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import logo from "../Ring A Bell image.png";

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const photoURL = sessionStorage.getItem("photoURL");
  const role = sessionStorage.getItem("role");
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("displayName");
    sessionStorage.removeItem("bio");
    signOut(auth);
  };

  const UserMenu = () => {
    if (role) {
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
            <MenuItem onClick={handleClose}>{role + ""} calendar</MenuItem>
          </Link>
          <Link href="/">
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
            <MenuItem onClick={handleClose}>Sign In</MenuItem>
          </Link>
        </Menu>
      );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="logo" width={100} />
          <Typography
            variant="h5"
            component="div"
            color="whitesmoke"
            sx={{ flexGrow: 1 }}
          >
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
            <MenuIcon />
          </IconButton>
          <img
            style={{ borderRadius: "50%" }}
            src={photoURL}
            alt="loading"
            width="55"
            referrerPolicy="no-referrer"
          />
          <UserMenu></UserMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
