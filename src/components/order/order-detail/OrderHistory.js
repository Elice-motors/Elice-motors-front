import React, { useState } from "react";
import { Chip, Typography } from "@mui/material";
import OrderItem from "./OrderItem";
import { deleteUserOrder } from "../../../lib/api";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const OrderHistory = ({ orders }) => {
  const [orderItems, setOrderItems] = useState(orders);
  const cancelOrder = async (orderNumber) => {
    try {
      const response = await deleteUserOrder(orderNumber);
      if (response.status === 200) {
        setOrderItems((prev) =>
          prev.filter((item) => item.orderNumber !== orderNumber)
        );
        alert("주문삭제 완료");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <Typography variant="h5" style={textStyle}>
        주문 내역
      </Typography>
      {orderItems?.map((order, index) => (
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
            isDelivered={false}
            cancelOrder={cancelOrder}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default OrderHistory;
