import React, { useState } from "react";
import { Grid } from "@mui/material";
import OrderCheckout from "../cart/OrderCheckout";
import CartOne from "../cart/CartOne";

const Cart = () => {
  const carsData = [
    {
      id: 1,
      name: '차량 1',
      maxSpeed: '225km/h',
      mileage: '10km/l',
      fuel: '5.7',
      color: 'Black',
      image: '/car1.jpg',
      price: '50,000,000',
      option: '라이트',
    },
  ];

  const [cart, setCart] = useState(carsData);

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <CartOne car={cart[0]} setCart={setCart}/>
        </Grid>

        <Grid item xs={6}>
          <OrderCheckout cart={cart} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
