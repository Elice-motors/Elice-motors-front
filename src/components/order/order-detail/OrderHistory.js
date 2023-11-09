import React from "react";
import { Chip, Typography } from "@mui/material";
import OrderItem from "./OrderItem";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const OrderHistory = ({ orders, cancelOrder }) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <Typography variant="h5" style={textStyle}>
        주문 내역
      </Typography>
      {orders?.map((order, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6" style={textStyle}>
            주문번호: {order.orderNumber}
          </Typography>
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
          <OrderItem
            key={index}
            order={order}
            cancelOrder={cancelOrder}
            isDelivered={false}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderHistory;
