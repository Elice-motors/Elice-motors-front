import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getBannerProduct } from "../../lib/api";

const MainProductBanner = () => {
  const [newItem, setNewItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBannerProduct();
        if (response.status === 200) {
          setNewItem(response.data.car);
        }
      } catch (e) {
        console.error(e);
        if (e.response.status === 400) {
          alert("상품 정보가 없습니다.");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div style={{ marginTop: "60px", width: "100%" }}>
      <Card sx={{ maxHeight: "780px" }}>
        <CardMedia
          sx={{ height: "650px" }}
          image={newItem.img}
          alt="Image Banner"
          component="img"
          style={{
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            NEW ARRIVAL
          </Typography>
          <Typography variant="h4" component="div">
            {newItem.carName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              style={{ textDecoration: "none" }}
              to={`/car/${newItem.carId}`}
            >
              <Button sx={{ color: "black" }}>자세히 보러가기 ▶</Button>
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainProductBanner;
