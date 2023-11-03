import React, { useState } from "react";
import { Grid } from "@mui/material";
import CartList from "../../components/cart/CartList";
import CartCheck from "../../components/cart/CartCheck";

const Cart = () => {
  const carData = {
    id: 1,
    name: 'SUV Model I30',
    maxSpeed: '225km/h',
    mileage: '10km/l',
    fuel: '5.7',
    color: 'Black',
    image: '/car1.jpg',
    price: '50,000,000',
    option: '라이트',
  };

  const [cart, setCart] = useState([carData]);

  return (
    <div style={{ padding: "16px" }}>
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
