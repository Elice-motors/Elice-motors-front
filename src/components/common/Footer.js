import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div
      style={{ position: "relative", height: "100%", paddingBottom: "40px" }}
    >
      <AppBar
        position="absolute"
        sx={{
          width: "100%",
          top: "auto",
          bottom: 0,
          bgcolor: "#bdc3c7",
        }}
      >
        <Toolbar>
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Elice Motors. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
