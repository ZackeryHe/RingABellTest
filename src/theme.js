import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8bc34a",
    },
    secondary: {
      main: "#d81b60",
    },
  },
  navlink: {
    color: "white",
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
export default theme;
