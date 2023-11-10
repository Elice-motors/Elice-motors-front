import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import {
  deleteOrder,
  fetchUserInfo,
  getAllOrders,
  getUserInfo,
  orderStatusChange,
} from "../../lib/api";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // API 호출을 정의한 함수
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log("주문 response", response);
        setOrders(response.data.allOrders); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUserName(response.data.user.userName);
        setUserId(response.data.user._id);
      } catch (error) {
        console.log("사용자 정보 조회 실패");
      }
    };

    fetchOrders(); // 함수 호출
    fetchUserInfo();
  }, []);

  console.log("userId", userId);

  const handleOrderDelete = async (userId, orderNumber) => {
    console.log("Order Number:", orderNumber);
    try {
      const response = await deleteOrder(userId, orderNumber);
      console.log("주문 삭제 response", response);
      if (response.status === 200) {
        // Update products state after successful deletion
        const updatedOrders = orders.filter(
          (order) => order.orderNumber !== orderNumber
        );
        setOrders(updatedOrders);
      } else {
        console.log("Failed to delete order:", response.status);
      }
    } catch (error) {
      console.error("Order deletion failed", error);
    }
  };

  console.log("주문의 상품", orders);

  // const handleStatusChange = (orderNumber) => (event) => {
  //   console.log("주문 번호", orderNumber);
  //   const newStatus = event.target.value;
  //   console.log("주문 상태", newStatus);
  // };

  const handleStatusChange = async (event, orderNumber) => {
    const newStatus = event.target.value;
    console.log("주문 상태", newStatus);
    console.log("주문번호", orderNumber);
    const newStatusData = {
      status: newStatus,
    };
    console.log("주문 상태 데이터", newStatusData);

    try {
      const response = await orderStatusChange(orderNumber, newStatusData);
      console.log("주문 상태 변경 response", response);
      if (response.status === 200) {
        const updatedOrders = orders.map((order) => {
          if (order.orderNumber === orderNumber) {
            return { ...order, status: newStatus }; // 주문 상태 업데이트
          }
          return order;
        });

        setOrders(updatedOrders);
      }
    } catch (error) {
      console.log("주문 상태 변경 실패");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
        전체 주문 ({orders.length})
      </Typography>

      {/* 주문 완료 섹션 */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        주문 완료
      </Typography>
      {orders
        .filter((order) => order.status === "주문 완료")
        .map((order) => (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                주문 번호: {order.orderNumber}
              </Typography>
              <Select
                value={order.status}
                onChange={(event) =>
                  handleStatusChange(event, order.orderNumber)
                }
                size="small"
                sx={{ ml: 2 }}
              >
                <MenuItem value="주문 완료">주문 완료</MenuItem>
                <MenuItem value="주문 취소">주문 취소</MenuItem>
                <MenuItem value="배송중">배송중</MenuItem>
                <MenuItem value="배송 완료">배송 완료</MenuItem>
              </Select>
            </Box>

            <Card
              key={order._id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {order.products.map((item) => (
                <Box key={item.productInfo.carId} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="body1">
                    {item.productInfo.carName}
                  </Typography>
                  <Typography variant="body2">
                    색상: {item.productInfo.color}
                  </Typography>
                  <Typography variant="body2">
                    가격: {item.productInfo.carPrice.toLocaleString()}원
                  </Typography>
                  <Divider />
                </Box>
              ))}
            </Card>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1" fontWeight="bold">
                이름 (배송지): {userName} ({order.address})
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                총 결제 금액: {order.totalAmount.toLocaleString()}원
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleOrderDelete(order.userId, order.orderNumber)
                }
              >
                주문 삭제
              </Button>
            </Box>
          </>
        ))}

      {/* 배송 완료 섹션 */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        배송 완료
      </Typography>
      {orders
        .filter((order) => order.status === "배송 완료")
        .map((order) => (
          <>
            <Card
              key={order._id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {order.products.map((item) => (
                <Box key={item.productInfo.carId} sx={{ mt: 1, mb: 1 }}>
                  <Typography variant="body1">
                    {item.productInfo.carName}
                  </Typography>
                  <Typography variant="body2">
                    색상: {item.productInfo.color}
                  </Typography>
                  <Typography variant="body2">
                    가격: {item.productInfo.carPrice.toLocaleString()}원
                  </Typography>
                  <Divider />
                </Box>
              ))}
            </Card>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1" fontWeight="bold">
                이름 (배송지): {userName} ({order.address})
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                총 결제 금액: {order.totalAmount.toLocaleString()}원
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleOrderDelete(order.userId, order.orderNumber)
                }
              >
                주문 삭제
              </Button>
            </Box>
          </>
        ))}
    </Box>
  );
};

export default AdminOrderList;
