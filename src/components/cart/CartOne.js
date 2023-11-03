import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const CartOne = ({ car, removeFromCart }) => {
  return (
    <>
      <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        즉시 결제
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2} style={{ display: 'flex' }}>
            {/* 제품 이미지 및 제품명 */}
            <Grid item xs={5}>
              <Link to={`/cars/${car.id}`}>
                <img src={car.image} alt={car.name} style={{ width: '100%' }} />
              </Link>
              <Typography variant="h6" style={{ marginTop: '10px', fontWeight: 'bold' }}>
                {car.name}
              </Typography>
            </Grid>

            {/* 옵션, 색상 및 결제 금액 */}
            <Grid item xs={3}>
              <Typography>옵션: {car.option}</Typography>
              <Typography>색상: {car.color}</Typography>
              <Typography style={{ fontWeight: 'bold', display: 'inline' }}>
                결제 금액: {car.price} 원
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CartOne;
