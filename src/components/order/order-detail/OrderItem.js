import React from "react";
import { Button, Chip, Divider, Typography } from "@mui/material";
import OrderCardContent from "./OrderCardContent";

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

const OrderItem = ({ order }) => {
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
        {order.status === "주문 취소" ? (
          <Chip
            label="환불 요청 가능"
            sx={{
              bgcolor: "red",
              fontWeight: "bold",
              color: "white",
            }}
          />
        ) : null}
      </div>

      <Divider sx={{ marginBottom: "20PX" }} />
    </React.Fragment>
  );
};

export default OrderItem;
