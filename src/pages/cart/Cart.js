import React, { useState } from "react";
import { Grid } from "@mui/material";
import CartList from "../../components/cart/CartList";
import CartCheck from "../../components/cart/CartCheck";

const Cart = () => {
  const carData = [
    {
      id: 1,
      name: "SUV Model I30",
      maxSpeed: 225,
      mileage: 10,
      fuel: 5.7,
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
    {
      id: 2,
      name: "SUV Model I30",
      maxSpeed: 225,
      mileage: 10,
      fuel: 5.7,
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
    {
      id: 3,
      name: "SUV Model I30",
      maxSpeed: 225,
      mileage: 10,
      fuel: 5.7,
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
    {
      id: 4,
      name: "SUV Model I30",
      maxSpeed: 225,
      mileage: 10,
      fuel: 5.7,
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
    {
      id: 5,
      name: "SUV Model I30",
      maxSpeed: 225,
      mileage: 10,
      fuel: 5.7,
      color: "Black",
      image: "/car1.jpg",
      price: 50000000,
      option: "라이트",
    },
  ];

  const [cart, setCart] = useState(carData);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CartList cart={cart} setCart={setCart} />
        </Grid>

        <Grid item xs={6}>
          <CartCheck cart={cart} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
