import React from "react";
import Button from "@mui/material/Button";

const OrderCancelButton = ({ orderNumber, handleCancelOrder }) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => handleCancelOrder(orderNumber)}
      style={{ whiteSpace: "nowrap" }}
    >
      주문 취소
    </Button>
  );
};

export default OrderCancelButton;
