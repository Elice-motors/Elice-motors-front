import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import CommonCarCard from "../common/CommonCarCard";

const CartList = ({ cart, setCart }) => {
  const addToCart = (car) => {
    setCart([...cart, car]);
  };

  const removeFromCart = (carId) => {
    const updatedCart = cart.filter((car) => car.id !== carId);
    setCart(updatedCart);
  };

  const placeOrder = (car) => {
    // Your order handling logic goes here.
    console.log(`주문 요청: ${car.name}`);
  };
  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginBottom: "50px" }}
      >
        장바구니({cart.length})
      </Typography>
      <div style={{ overflowY: "scroll", height: "450px" }}>
        {cart.map((car) => (
          <CommonCarCard
            key={car.id}
            car={car}
            checkbox={true}
            actionComponent={
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(car.id)}
                style={{ width: "100%" }}
              >
                삭제
              </Button>
            }
          />
        ))}
      </div>
    </>
  );
};

export default CartList;
