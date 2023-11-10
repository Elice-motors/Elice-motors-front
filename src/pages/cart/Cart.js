import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CartList from "../../components/cart/CartList";
import CartCheck from "../../components/cart/CartCheck";
import { useLocalForage } from "../../LocalForageContext";

const Cart = () => {
  const { getItem, setItem } = useLocalForage();

  useEffect(() => {
    getItem("CartList").then((items) => {
      if (items) {
        setCart(items);
      }
    });
  }, [getItem]);

  const [cart, setCart] = useState([]);
  const removeFromCart = (carId, carOption) => {
    const updatedCart = cart.filter(
      (car) => car.carId !== carId || car.option !== carOption
    );
    setCart(updatedCart);
    setItem("CartList", updatedCart);
  };

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
          <CartList cart={cart} removeFromCart={removeFromCart} />
        </Grid>

        <Grid item xs={6}>
          <CartCheck cart={cart} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
