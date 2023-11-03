import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const MainProductBanner = () => {
  return (
    <div style={{ marginTop: "60px", width: "100%" }}>
      <Card sx={{ maxHeight: "780px" }}>
        <CardMedia
          sx={{ height: "650px" }}
          image="/car1.jpg"
          alt="Image Banner"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            NEW ARRIVAL
          </Typography>
          <Typography variant="h4" component="div">
            SUV T10
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link style={{ textDecoration: "none" }} to="/1">
              <Button sx={{ color: "black" }}>자세히 보러가기 ▶</Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainProductBanner;
