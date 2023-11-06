import React from "react";
import Button from "@mui/material/Button";

const OrderCancelButton = ({ cancelOrder, orderNumber }) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        if (window.confirm("정말로 주문을 취소할까요?")) {
          cancelOrder(orderNumber);
        }
      }}
      style={{ whiteSpace: "nowrap" }}
    >
      주문 취소
    </Button>
  );
};

export default OrderCancelButton;
