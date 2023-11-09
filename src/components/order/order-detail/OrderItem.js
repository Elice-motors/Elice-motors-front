import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import OrderCompleteButton from "./OrderCompleteButton";
import OrderCardContent from "./OrderCardContent";
import OrderCancelButton from "./OrderCancelButton";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const centerAlign = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
};

const OrderItem = ({ order, cancelOrder, isDelivered }) => {
  const isCompletedOrder = !isDelivered;
  return (
    <React.Fragment>
      {order?.products?.map((product) => (
        <OrderCardContent product={product} />
      ))}

      {isCompletedOrder && (
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
            cancelOrder={cancelOrder}
            orderNumber={order.orderNumber}
          />
        </div>
      )}
      <Divider sx={{ marginBottom: "20PX" }} />
    </React.Fragment>
  );
};

export default OrderItem;
