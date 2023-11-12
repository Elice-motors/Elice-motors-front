import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "../../../lib/api";
import { Typography, Box, Button, Stack, Modal, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // MUI 아이콘 추가
import AdminItemAddModal from "./AdminItemAddModal";

const AdminItem = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response.data.car);
    });
  }, []);

  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      const response = await deleteProduct(productId);
      console.log(response);
      if (response.status === 204) {
        // Update products state after successful deletion
        const updatedProducts = products.filter(
          (product) => product.carId !== productId
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 404) {
        alert("상품 정보가 존재하지 않습니다.");
      }
    }
  };

  const handleAddProduct = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ flexWrap: "wrap" }}
      >
        <Typography variant="h5">관리자 상품 관리 페이지</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />} // 버튼에 아이콘 추가
          onClick={handleAddProduct}
          sx={{ alignSelf: "flex-end" }} // 버튼을 오른쪽 상단에 위치시킴
        >
          새로운 상품 등록
        </Button>
      </Stack>
      <Typography variant="subtitle1">전체 상품({products.length})</Typography>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AdminItemAddModal
          open={modalOpen}
          handleClose={handleCloseModal}
          setProducts={setProducts}
        />
      </Modal>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.carId} xs={12} sm={6} md={4}>
            <Box
              key={product.carId}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                width: 300,
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                mb: 2,
                position: "relative",
                height: "100%",
              }}
            >
              <img
                src={product.img}
                alt={product.carName}
                style={{
                  width: "150px", // 이미지 너비 설정
                  height: "100%",
                  objectFit: "cover", // 이미지 비율 유지
                  borderRadius: "8px 0 0 8px", // 왼쪽 상단과 하단의 둥근 모서리 설정
                }}
              />
              <Box
                sx={{
                  padding: "0 16px", // 패딩 설정
                  textAlign: "left", // 텍스트 왼쪽 정렬
                  display: "flex", // flexbox 레이아웃 사용
                  flexDirection: "column", // 세로 방향으로 항목 정렬
                  justifyContent: "space-between", // 내용을 상하로 균등 분포
                  width: "100%", // 나머지 공간을 모두 차지하도록 설정
                }}
              >
                {/* 상품 정보 */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.carName}
                  </Typography>
                  <Typography variant="subtitle2">
                    속도: {product.speed} km/h
                  </Typography>
                  <Typography variant="subtitle2">
                    주행거리: {product.mileage} km
                  </Typography>
                  <Typography variant="subtitle2">
                    연료: {product.fuel}
                  </Typography>
                  <Typography variant="subtitle2">
                    색상: {product.color}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "red", mt: 1, fontWeight: "bold" }}
                  >
                    결제 금액: {product.carPrice.toLocaleString()}원
                  </Typography>
                </Box>
                <Button
                  onClick={() => handleDeleteProduct(product.carId)}
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    "&:hover": { backgroundColor: "darkred" },
                    padding: "6px 16px",
                    fontSize: "0.75rem",
                    alignSelf: "flex-start", // 버튼을 박스의 시작 부분에 정렬
                    mt: 1, // 위쪽 마진 설정
                    mb: 1, // 아래쪽 마진 설정
                  }}
                >
                  상품 삭제
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdminItem;
