import React, { useState, useEffect } from "react";
import { Chip, Container, Typography } from "@mui/material";
import { deleteOrder, getUserOrders } from "../../lib/api";
import OrderItem from "../../components/order/order-detail/OrderItem";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "20px",
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserOrders();
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const cancelOrder = async (orderNumber) => {
    try {
      const response = await deleteOrder(orderNumber);
      if (response.status === 200) {
        setOrders((prev) =>
          prev.filter((item) => item.orderNumber !== orderNumber)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ marginTop: "80px" }}>
        <Typography variant="h5" style={textStyle}>
          나의 주문 내역
        </Typography>
        {orders?.map((order, index) => (
          <React.Fragment key={index}>
            <Chip
              style={{
                pading: "10px 20px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "15px",
              }}
              label={`주문번호 : ${order.orderNumber}`}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={textStyle}>
                배송지: {order.address}
              </Typography>
              <Chip
                label={order.status}
                sx={{
                  bgcolor: "primary.main",
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            </div>
            <OrderItem key={index} order={order} cancelOrder={cancelOrder} />
          </React.Fragment>
        ))}
      </Container>
    </div>
  );
};

export default OrdersList;
