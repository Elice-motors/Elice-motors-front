import React, { useState, useEffect } from "react";
import { Chip, Container, Typography } from "@mui/material";
import { getUserOrders } from "../../lib/api";
import OrderItem from "../../components/order/order-detail/OrderItem";
import { useNavigate } from "react-router";

const textStyle = {
  fontWeight: "bold",
  marginBottom: "20px",
};

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await getUserOrders();
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error(error);
        if (error.status === 400) {
          alert("구매 내역을 찾을 수 없습니다.");
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        marginTop: "90px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" style={textStyle}>
        나의 주문 내역
      </Typography>
      <Container maxWidth="sm">
        {orders?.map((order, index) => (
          <React.Fragment key={index}>
            <Chip
              style={{
                pading: "10px 20px",
                fontWeight: "bold",
                marginBottom: "20px",
                fontSize: "15px",
              }}
              label={`주문번호 : ${order.orderNumber}`}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={textStyle}>
                배송지: {order.address}
              </Typography>
              <Chip
                label={order.status}
                sx={{
                  bgcolor: "primary.main",
                  fontWeight: "bold",
                  color: "white",
                }}
              />
            </div>
            <OrderItem key={index} order={order} />
          </React.Fragment>
        ))}
      </Container>
    </div>
  );
};

export default OrdersList;
