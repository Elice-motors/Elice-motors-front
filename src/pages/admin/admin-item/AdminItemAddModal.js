import React, { useState } from "react";
import { Box, TextField, Button, Select } from "@mui/material";
import { addProduct } from "../../../lib/api";
import { nanoid } from "nanoid";

const AdminItemAddModal = ({ open, handleClose }) => {
  const [product, setProduct] = useState({
    carId: Date.now(),
    carName: "",
    carPrice: 0, // Initialize carPrice as 0
    img: "",
    speed: 0, // Initialize speed as 0
    mileage: 0, // Initialize mileage as 0
    fuel: 0, // Initialize fuel as 0
    category: "",
    option: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue =
      name === "carPrice" ||
      name === "speed" ||
      name === "mileage" ||
      name === "fuel"
        ? parseInt(value)
        : value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // FormData 인스턴스 생성
    const formData = new FormData();
    // 폼 데이터에 텍스트 필드 추가
    formData.append("carId", product.carId);
    formData.append("carName", product.carName);
    formData.append("carPrice", product.carPrice);
    formData.append("speed", product.speed);
    formData.append("mileage", product.mileage);
    formData.append("fuel", product.fuel);
    formData.append("category", product.category);
    formData.append("option", product.option);

    // 이미지 파일이 있으면 폼 데이터에 파일 추가
    if (product.img) {
      console.log("이미지 파일 있음");
      formData.append("img", product.img);
      console.log("product", product);
    }

    // 폼 데이터와 함께 API 요청 처리
    handleAddProduct(formData);
  };

  // 상품 등록
  const handleAddProduct = async (productToformData) => {
    try {
      const response = await addProduct(productToformData);
      if (response.status === 201) {
        // 성공적으로 상품이 등록되었을 때의 처리
        handleClose(); // 모달 닫기
      } else {
        // 상품 등록 실패
        console.log(product);
        alert("상품 등록에 실패했습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <h2>새로운 상품 등록</h2>
      <form method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <TextField
          label="차량 명칭"
          name="carName"
          value={product.carName}
          onChange={handleChange}
        />
        <TextField
          label="가격(원)"
          type="number"
          name="carPrice"
          value={product.carPrice}
          onChange={handleChange}
        />
        <input
          type="file"
          onChange={(event) => {
            console.log("이벤트 객체", event.target.files[0]);
            setProduct((prevProduct) => ({
              ...prevProduct,
              img: event.target.files[0].name,
            }));
          }}
        />
        <TextField
          label="속도"
          type="number"
          name="speed"
          value={product.speed}
          onChange={handleChange}
        />
        <TextField
          label="주행거리"
          type="number"
          name="mileage"
          value={product.mileage}
          onChange={handleChange}
        />
        <TextField
          label="연비"
          type="number"
          name="fuel"
          value={product.fuel}
          onChange={handleChange}
        />
        <Select
          label="카테고리"
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          <option value="sedan">sedan</option>
          <option value="suv">SUV</option>
          <option value="electric">electric</option>
        </Select>
        <Select
          label="색상"
          name="option"
          value={product.option}
          onChange={handleChange}
        >
          <option value="white">white</option>
          <option value="black">black</option>
          <option value="gray">gray</option>
        </Select>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          새로운 상품 등록
        </Button>
      </form>
    </Box>
  );
};

export default AdminItemAddModal;
