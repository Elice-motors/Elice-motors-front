import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalForageProvider } from "./LocalForageContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3054d3",
    },
    secondary: {
      main: "#8797d3",
    },
  },
  typography: {
    fontFamily: "Noto Serif KR, serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <LocalForageProvider>
        <App />
      </LocalForageProvider>
    </React.StrictMode>
  </ThemeProvider>
);
