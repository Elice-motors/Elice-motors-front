import React from "react";
import { Button, Chip, Divider, Typography } from "@mui/material";
import OrderCardContent from "./OrderCardContent";

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
        {order.status === "주문 완료" || order.status === "주문 취소" ? (
          <Button
            variant="contained"
            color="error"
            onClick={() => cancelOrder(order.orderNumber)}
            style={{ whiteSpace: "nowrap" }}
          >
            주문 취소
          </Button>
        ) : (
          <Chip
            label="주문 취소 불가"
            sx={{
              bgcolor: "red",
              fontWeight: "bold",
              color: "white",
            }}
          />
        )}
      </div>

      <Divider sx={{ marginBottom: "20PX" }} />
    </React.Fragment>
  );
};

export default OrderItem;
