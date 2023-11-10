import React, { useState, useEffect } from "react";
import OrderHistory from "../../components/order/order-detail/OrderHistory";
import { Container } from "@mui/material";
import { getUserOrders } from "../../lib/api";

const OrdersList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserOrders();
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [orders, setOrders] = useState([]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ marginTop: "80px" }}>
        <OrderHistory orders={orders} />
      </Container>
    </div>
  );
};

export default OrdersList;
