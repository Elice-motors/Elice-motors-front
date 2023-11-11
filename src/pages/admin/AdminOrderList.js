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
import { deleteOrder, getAllOrders, orderStatusChange } from "../../lib/api";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderDelete = async (userId, orderNumber) => {
    try {
      const response = await deleteOrder(userId, orderNumber);
      if (response.status === 200) {
        const updatedOrders = orders.filter(
          (order) => order.orderNumber !== orderNumber
        );
        setOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Order deletion failed", error);
      if (error.response.status === 400) {
        alert("주문을 삭제하는 중에 오류가 발생하였습니다.");
      } else if (
        error.response.error ===
        "주문을 삭제하는 동안 오류가 발생했습니다: 주문을 찾을 수 없습니다."
      ) {
        alert(
          "주문을 삭제하는 동안 오류가 발생했습니다: 주문을 찾을 수 없습니다."
        );
      } else if (
        error.response.error ===
        "결제 실패 및 주문 생성 실패: 정보 누락으로 주문 저장에 실패하였습니다."
      ) {
        alert(
          "결제 실패 및 주문 생성 실패: 정보 누락으로 주문 저장에 실패하였습니다."
        );
      }
    }
  };

  const handleStatusChange = async (event, orderNumber) => {
    const newStatus = event.target.value;
    try {
      const response = await orderStatusChange(orderNumber, {
        status: newStatus,
      });
      if (response.status === 200) {
        const updatedOrders = orders.map((order) => {
          if (order.orderNumber === orderNumber) {
            return { ...order, status: newStatus };
          }
          return order;
        });

        setOrders(updatedOrders);
      }
    } catch (error) {
      console.log("주문 상태 변경 실패");
    }
  };

  const renderOrderSection = (statusLabel) => {
    return orders
      .filter((order) => order.status === statusLabel)
      .map((order) => (
        <React.Fragment key={order._id}>
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
              onChange={(event) => handleStatusChange(event, order.orderNumber)}
              size="small"
              sx={{ ml: 2 }}
            >
              <MenuItem value="주문 완료">주문 완료</MenuItem>
              <MenuItem value="주문 취소">주문 취소</MenuItem>
              <MenuItem value="배송 중">배송 중</MenuItem>
              <MenuItem value="배송 완료">배송 완료</MenuItem>
            </Select>
          </Box>

          <Card
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
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" fontWeight="bold">
              (배송지): ({order.address})
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              총 결제 금액: {order.totalAmount.toLocaleString()}원
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOrderDelete(order.userId, order.orderNumber)}
            >
              주문 삭제
            </Button>
          </Box>
        </React.Fragment>
      ));
  };

  return (
    <Box style={{ minHeight: "100vh" }}>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
        전체 주문 ({orders.length})
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        주문 완료
      </Typography>
      {renderOrderSection("주문 완료")}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        배송중
      </Typography>
      {renderOrderSection("배송 중")}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        주문 취소
      </Typography>
      {renderOrderSection("주문 취소")}

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }} fontWeight="bold">
        배송 완료
      </Typography>
      {renderOrderSection("배송 완료")}
    </Box>
  );
};

export default AdminOrderList;
