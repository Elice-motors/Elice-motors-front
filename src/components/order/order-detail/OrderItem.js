import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
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
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" style={textStyle}>
            주문번호: {order.orderNumber}
          </Typography>
        </Grid>
        <Grid item>
          <div style={{ flex: 1 }}></div>
          <OrderCompleteButton isDelivered={isDelivered} />
        </Grid>
      </Grid>

      <OrderCardContent order={order} />

      {isCompletedOrder && (
        <div style={centerAlign}>
          <div style={{ flex: 1 }}></div>
          <OrderCancelButton
            cancelOrder={cancelOrder}
            orderNumber={order.orderNumber}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderItem;
