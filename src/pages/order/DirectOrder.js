import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import CartCheck from "../../components/cart/CartCheck";
import CartOne from "../../components/cart/CartOne";

const DirectOrder = () => {
  const carsData = [
    {
      id: 1,
      name: "차량 1",
      maxSpeed: 225,
      mileage: 10,
      fuel: "5.7",
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
  ];

  const [cart, setCart] = useState(carsData);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          즉시 결제
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CartOne car={cart[0]} setCart={setCart} />
          </Grid>

          <Grid item xs={6}>
            <CartCheck cart={cart} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DirectOrder;
