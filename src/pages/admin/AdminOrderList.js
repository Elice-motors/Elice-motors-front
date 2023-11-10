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

  const handleOrderDelete = async (orderNumber) => {
    console.log("Order Number:", orderNumber);
    try {
      const response = await deleteOrder(orderNumber);
      if (response.status === 200) {
        orders = orders.filter((order) => order.orderNumber !== orderNumber);
        console.log(`Order ${orderNumber} deleted successfully.`);
      } else {
        console.log("Failed to delete order:", response.status);
      }
    } catch (error) {
      console.error("Order deletion failed", error);
    }
  };

  console.log("주문의 상품", orders);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        전체 주문 ({orders.length})
      </Typography>

      {/* 주문 완료 섹션 */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        주문 완료
      </Typography>
      {orders
        .filter((order) => order.status === "주문 완료")
        .map((order) => (
          <>
            <Typography variant="body1">
              <b>주문 번호: {order._id}</b>
            </Typography>
            <Select value={order.status}>
              <MenuItem value="주문 완료">주문 완료</MenuItem>
              <MenuItem value="주문 취소">주문 취소</MenuItem>
              <MenuItem value="배송중">배송중</MenuItem>
              <MenuItem value="배송 완료">배송 완료</MenuItem>
            </Select>
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
              <Typography variant="body1">
                이름 (배송지): {userName} ({order.address})
              </Typography>
              <Typography variant="body1">
                총 결제 금액: {order.totalAmount.toLocaleString()}원
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOrderDelete(order.orderNumber)}
              >
                주문 삭제
              </Button>
            </Box>
          </>
        ))}

      {/* 배송 완료 섹션 */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
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
              <Typography variant="body1">
                이름 (배송지): {userName} ({order.address})
              </Typography>
              <Typography variant="body1">
                총 결제 금액: {order.totalAmount.toLocaleString()}원
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOrderDelete(order.orderNumber)}
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
