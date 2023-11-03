import React, { useState } from 'react';
import { Grid, Typography, Button, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';

const CarList = ({ cart, setCart }) => {
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
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
        장바구니({cart.length})
      </Typography>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {cart.map((car) => (
          <Grid container key={car.id} style={{ display: 'flex' }}>
            {/* 체크박스 */}
            <Grid item xs={1}>
              <Checkbox defaultChecked />
            </Grid>

            {/* 제품 이미지 및 제품명 */}
            <Grid item xs={5}>
              <Link to={`/cars/${car.id}`}>
                <img src={car.image} alt={car.name} style={{ width: '100%' }} />
              </Link>
            </Grid>

            {/* 옵션, 색상 및 결제 금액 */}
            <Grid item xs={3}>
              <Typography>옵션: {car.option}</Typography>
              <Typography>색상: {car.color}</Typography>
              <Typography style={{ fontWeight: 'bold' }}>
                결제 금액: {car.price} 원
              </Typography>
            </Grid>

            {/* 삭제 버튼 */}
            <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(car.id)}
                style={{ flex: 1 }}
              >
                삭제
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CarList;
