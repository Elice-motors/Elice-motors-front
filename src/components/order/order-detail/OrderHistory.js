import React from 'react';
import { Divider, Card, CardContent, Grid, Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const cardStyle = {
  marginBottom: '20px',
  border: 'none',
  background: '#f5f5f5',
};

const textStyle = {
  fontWeight: 'bold',
  marginBottom: '10px',
};

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#084B8A',
    },
    secondary: {
      main: '#819FF7',
    },
  },
});

const dividerStyle = {
  marginBottom: '20px',
};

const centerAlign = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
};

const OrderHistory = ({ orders, totalAmount, cancelOrder }) => {
  const completedOrders = orders.filter((order) => order.status === '주문 완료');
  const deliveredOrders = orders.filter((order) => order.status === '배송 완료');

  return (
    <div>
      <Typography variant="h5" style={textStyle}>
        주문 내역
      </Typography>

      {completedOrders.map((order, index) => (
        <React.Fragment key={index}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" style={textStyle}>
                주문번호: {order.orderNumber}
              </Typography>
            </Grid>
            <Grid item>
              <ThemeProvider theme={customTheme}>
                <Button variant="contained" color="primary" sx={{ borderRadius: '20px', marginBottom: '20px' }}>
                  주문 완료
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Card style={cardStyle}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <img src={order.carImage} alt={order.carName} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {order.carName}
                  </Typography>
                  <Typography>옵션: {order.option}</Typography>
                  <Typography>색상: {order.color}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h7">결제 금액: {order.price} 원</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <div style={centerAlign}>
            <div style={{ display: 'none' }}>
              <Typography variant="h6" style={textStyle}>
                주문번호: {order.orderNumber}
              </Typography>
            </div>
            <div style={{ flex: 1 }}></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h7" style={{ fontWeight: 'bold' }}>총 결제 금액: {totalAmount} 원</Typography>
              <div style={{ paddingRight: '10px' }}></div>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  // 주문 취소 확인 얼럿 표시
                  if (window.confirm('정말로 주문을 취소할까요?')) {
                    cancelOrder(order.orderNumber);
                  }
                }}
              >
                주문 취소
              </Button>
            </div>
          </div>
          <Divider style={dividerStyle} />
        </React.Fragment>
      ))}

      {deliveredOrders.map((order, index) => (
        <React.Fragment key={index}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6" style={textStyle}>
                주문번호: {order.orderNumber}
              </Typography>
            </Grid>
            <Grid item>
              <ThemeProvider theme={customTheme}>
                <Button variant="contained" color="secondary" sx={{ borderRadius: '20px', marginBottom: '20px', color: 'white' }}>
                  배송 완료
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>

          <Card style={cardStyle}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <img src={order.carImage} alt={order.carName} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    {order.carName}
                  </Typography>
                  <Typography>옵션: {order.option}</Typography>
                  <Typography>색상: {order.color}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h7">결제 금액: {order.price} 원</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderHistory;
