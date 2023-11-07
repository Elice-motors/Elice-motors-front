import React from "react";
import {
  Divider,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import OrderItem from "./OrderItem";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const dividerStyle = {
  marginBottom: "20px",
};

const OrderHistory = ({ orders, totalAmount, cancelOrder }) => {
  const completedOrders = orders.filter(
    (order) => order.status === "주문 완료"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "배송 완료"
  );

  return (
    <div style={{ marginTop: "10px" }}>
      <Typography variant="h5" style={textStyle}>
        주문 내역
      </Typography>

      {completedOrders.map((order, index) => (
        <OrderItem
          key={index}
          order={order}
          totalAmount={totalAmount}
          cancelOrder={cancelOrder}
          isDelivered={false}
        />
      ))}

      <Divider style={dividerStyle} />

      {deliveredOrders.map((order, index) => (
        <OrderItem
          key={index}
          order={order}
          totalAmount={totalAmount}
          cancelOrder={cancelOrder}
          isDelivered={true}
        />
      ))}
    </div>
  );
};

export default OrderHistory;
