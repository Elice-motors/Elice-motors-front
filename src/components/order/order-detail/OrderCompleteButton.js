import React from "react";
import Button from "@mui/material/Button";

const OrderCompleteButton = ({ isDelivered }) => {
  return (
    <Button
      variant="contained"
      color={isDelivered ? "secondary" : "primary"}
      sx={{
        borderRadius: "20px",
        marginBottom: "20px",
        color: "white",
      }}
    >
      {isDelivered ? "배송 완료" : "주문 완료"}
    </Button>
  );
};

export default OrderCompleteButton;
