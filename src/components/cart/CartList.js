import React from "react";
import { Typography, Button } from "@mui/material";
import CommonCarCard from "../common/CommonCarCard";

const CartList = ({ cart, removeFromCart }) => {
  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginBottom: "50px" }}
      >
        장바구니({cart.length})
      </Typography>
      <div style={{ overflowY: "scroll", height: "450px" }}>
        {cart.map((car, index) => (
          <CommonCarCard
            key={index}
            car={car}
            checkbox={true}
            actionComponent={
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(car.carId, car.option)}
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
