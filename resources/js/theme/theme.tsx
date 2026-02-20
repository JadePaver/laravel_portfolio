// theme.ts
import { createTheme } from "@mui/material/styles";

// Define your custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#FD6F00", // your primary color
    },
    secondary: {
      main: "#FFFFFF", // your secondary color
    },
    // Accent color can be custom
    info: {
      main: "#000000", // treat accent as info or custom property
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
