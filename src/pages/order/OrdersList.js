import React, { useState } from "react";
import OrderHistory from "../../components/order/order-detail/OrderHistory";
import { Container } from "@mui/material";

const OrdersList = () => {
  const initialOrders = [
    {
      orderNumber: 1,
      userId: "dodo",
      carImage: "/car1.jpg",
      carName: "Car 1",
      option: "라이트",
      color: "Black",
      price: 10000000,
      status: "주문 완료",
    },
    {
      orderNumber: 2,
      userId: "hihi",
      carImage: "/car2.jpg",
      carName: "Car 2",
      option: "옵션2",
      color: "White",
      price: 10000000,
      status: "배송 완료",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  // 필터 함수를 사용하여 "주문 완료" 상태의 주문만 필터링
  const completedOrders = orders.filter(
    (order) => order.status === "주문 완료"
  );

  // "주문 완료" 주문의 총 결제 금액을 계산
  const totalAmount = completedOrders.reduce(
    (total, order) => total + order.price,
    0
  );

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
        <OrderHistory
          orders={orders}
          totalAmount={totalAmount}
          cancelOrder={cancelOrder}
        />
      </Container>
    </div>
  );
};

export default OrdersList;
