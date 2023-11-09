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
  const cancelOrder = (orderNumber) => {
    const updatedOrders = orders.filter(
      (order) => order.orderNumber !== orderNumber
    );

    setOrders(updatedOrders);

    alert(`주문 번호 ${orderNumber}가 취소되었습니다.`);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ marginTop: "80px" }}>
        <OrderHistory orders={orders} cancelOrder={cancelOrder} />
      </Container>
    </div>
  );
};

export default OrdersList;
