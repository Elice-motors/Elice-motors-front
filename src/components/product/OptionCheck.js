import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Typography,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
} from "@mui/material";

const OptionCheck = ({ car, options }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [directCart, setDirectCart] = useState([]);
  const handleChange = (event) => {
    setValue(event.target.value + "");
  };
  const findOptionMatchAndUpdate = () => {
    const selectedOption = options.find(
      (option) => option.additionalPrice === Number(value)
    );
    if (selectedOption) {
      const updatedCar = {
        ...car,
        carPrice: car.carPrice + selectedOption.additionalPrice,
        option: selectedOption.name,
      };
      return updatedCar;
    }
  };

  const handleCartClick = () => {
    const updatedCar = findOptionMatchAndUpdate();
    setCartItems([...cartItems, updatedCar]); // 선택된 옵션을 장바구니에 추가
  };

  const handleOrderClick = () => {
    const updatedCar = findOptionMatchAndUpdate();
    setDirectCart([...directCart, updatedCar]);
    navigate(`/directorder/${car.carId}`);
  };

  return (
    <>
      <Card
        sx={{
          padding: "20px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            옵션
          </Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              {options?.map((option) => (
                <React.Fragment key={option.name}>
                  <FormControlLabel
                    value={option.additionalPrice + ""}
                    control={<Radio />}
                    label={`${option.name} +${option.additionalPrice}`}
                  />
                </React.Fragment>
              ))}
            </RadioGroup>
          </FormControl>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            색상
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                backgroundColor: `${car.color}`,
              }}
            />
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", marginLeft: "20px" }}
            >
              {car.color}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "60px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "white",
                width: "30%",
                marginBottom: "20px",
              }}
              onClick={handleCartClick}
            >
              장바구니 담기
            </Button>
            <Button
              onClick={handleOrderClick}
              variant="contained"
              sx={{ bgcolor: "secondary.main", width: "30%" }}
            >
              주문하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OptionCheck;
