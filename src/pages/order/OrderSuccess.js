import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Box sx={{ my: 2 }}>
        <Typography variant="body1">
          주문번호: 123456789
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom>
        <strong>주문이 완료되었습니다.</strong>
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="body1">
          자세한 사항은 구매 내역을 확인해주세요.
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/" sx={{ width: '100%' }}>
          홈으로
        </Button>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Link to="/orderslist" style={{ display: 'block', width: '100%' }}>
          구매 내역 보기
        </Link>
      </Box>
    </Container>
  );
};

export default OrderSuccess;
