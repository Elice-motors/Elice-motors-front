import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "../../../lib/api";
import { Typography, Box, Button } from "@mui/material";
import AdminItemAddModal from "./AdminItemAddModal";

const AdminItem = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 화면 진입 시 전체 상품 조회
    getAllProducts().then((response) => {
      setProducts(response.data.car);
    });
  }, []);

  // 상품 삭제
  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    try {
      const response = await deleteProduct(productId);
      console.log(response);
      if (response.status === 200) {
        // Update products state after successful deletion
        const updatedProducts = products.filter(
          (product) => product.carId !== productId
        );
        setProducts(updatedProducts);
      } else {
        alert("상품 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography>관리자 상품 관리 페이지</Typography>
      <Typography variant="subtitle1">전체 상품({products.length})</Typography>
      <Button onClick={handleAddProduct}>새로운 상품 등록</Button>
      {open && <AdminItemAddModal open={open} handleClose={handleClose} />}
      {products.map((product) => (
        <Box
          key={product.carId}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={product.img}
            alt={product.carName}
            style={{ width: "150px", height: "100px" }}
          />
          <Typography variant="subtitle1">{product.carName}</Typography>
          <Typography variant="subtitle2">속도: {product.speed}</Typography>
          <Typography variant="subtitle2">
            주행거리: {product.milege}
          </Typography>
          <Typography variant="subtitle2">연료: {product.fuel}</Typography>
          <Typography variant="subtitle2">색상: {product.color}</Typography>
          <Button onClick={() => handleDeleteProduct(product.carId)}>
            상품 삭제
          </Button>
        </Box>
      ))}
    </>
  );
};

export default AdminItem;
