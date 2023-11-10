import React from "react";
import { Divider, Typography } from "@mui/material";
import OrderCardContent from "./OrderCardContent";
import OrderCancelButton from "./OrderCancelButton";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const OrderItem = ({ order, cancelOrder }) => {
  return (
    <React.Fragment>
      {order?.products?.map((product) => (
        <OrderCardContent product={product} />
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h6" style={textStyle}>
          총 결제금액: {order.totalAmount.toLocaleString()} 원
        </Typography>
        <OrderCancelButton
          orderNumber={order.orderNumber}
          handleCancelOrder={cancelOrder}
        />
      </div>

      <Divider sx={{ marginBottom: "20PX" }} />
    </React.Fragment>
  );
};

export default OrderItem;
