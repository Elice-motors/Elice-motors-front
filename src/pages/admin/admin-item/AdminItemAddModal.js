import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
} from "@mui/material";
import { addProduct, fileUpload } from "../../../lib/api";

const AdminItemAddModal = ({ open, handleClose, setProducts }) => {
  const [product, setProduct] = useState({
    carId: Date.now(),
    carName: "",
    carPrice: null, // Initialize carPrice as 0
    img: "",
    speed: null, // Initialize speed as 0
    mileage: null, // Initialize mileage as 0
    fuel: null, // Initialize fuel as 0
    category: "",
    option: "",
    color: "",
  });

  const [uploadedImageName, setUploadedImageName] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImageName(file.name); // Update the state with the file name
      const fileData = new FormData();
      fileData.append("image", file); // Append the file to the form data

      await uploadFile(fileData); // Call fileUpload with the form data
    }
  };

  const uploadFile = async (fileData) => {
    try {
      const response = await fileUpload(fileData);
      console.log("파일 업로드 response", response);
      if (response.status === 201) {
        setUploadedUrl(response.data.img);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alert("업로드 중에 오류가 발생했습니다.");
      } else if (error.response.status === 413) {
        alert("파일 용량이 너무 큽니다.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProductData = {
      ...product,
      img: uploadedUrl,
    };

    try {
      const response = await addProduct(updatedProductData);
      console.log(response);
      if (response.status === 201) {
        alert("상품 등록 성공");
        setProducts((existingProducts) => [
          ...existingProducts,
          response.data.car,
        ]);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        alert(
          "상품 이름, 가격, 이미지, 최대속력, 주행거리, 연비, 옵션, 카테고리는 필수 요청 값입니다"
        );
      }
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
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" component="h2">
        새로운 상품 등록
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="차량 명칭"
              name="carName"
              value={product.carName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="가격(원)"
              type="number"
              name="carPrice"
              value={product.carPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              이미지 업로드
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {uploadedImageName && (
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                {uploadedImageName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="속도 (km/h)"
              type="number"
              name="speed"
              value={product.speed}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="주행거리 (km)"
              type="number"
              name="mileage"
              value={product.mileage}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="연비 (km/l, 숫자만)"
              type="number"
              name="fuel"
              value={product.fuel}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>카테고리</InputLabel>
              <Select
                label="카테고리"
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <MenuItem value="sedan">sedan</MenuItem>
                <MenuItem value="suv">SUV</MenuItem>
                <MenuItem value="electric">electric</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>옵션</InputLabel>
              <Select
                label="옵션"
                name="option"
                value={product.option}
                onChange={handleChange}
              >
                <MenuItem value="light">light</MenuItem>
                <MenuItem value="signature">signature</MenuItem>
                <MenuItem value="special">special</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>색상</InputLabel>
              <Select
                label="색상"
                name="color"
                value={product.color}
                onChange={handleChange}
              >
                <MenuItem value="white">white</MenuItem>
                <MenuItem value="black">black</MenuItem>
                <MenuItem value="gray">gray</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              새로운 상품 등록
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AdminItemAddModal;
