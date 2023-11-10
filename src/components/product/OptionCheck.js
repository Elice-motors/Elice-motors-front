import React, { useEffect, useState } from "react";
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
import { useLocalForage } from "../../LocalForageContext";

const OptionCheck = ({ car, options, onOptionChange }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [directCart, setDirectCart] = useState([]);
  const { getItem, setItem } = useLocalForage();
  useEffect(() => {
    getItem("CartList")
      .then((items) => {
        if (items) {
          setCartItems(items);
        }
      })
      .catch((error) => {
        console.error("장바구니 항목 로드 중 오류 발생: ", error);
      });
  }, [getItem]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setItem("CartList", cartItems).catch((error) =>
        console.error("장바구니 저장 중 오류 발생: ", error)
      );
    }
    if (directCart.length > 0) {
      setItem("directOrderItem", directCart).catch((error) =>
        console.error("즉시 주문 저장 중 오류 발생 ", error)
      );
      navigate(`/directorder/${car.carId}`);
    }
  }, [cartItems, setItem, directCart, car.carId, navigate]);

  const handleChange = (event) => {
    const selectedValue = event.target.value + "";
    setValue(selectedValue);

    const updatedCar = findOptionMatchAndUpdate(selectedValue);
    if (updatedCar) {
      onOptionChange(updatedCar);
    }
  };
  const findOptionMatchAndUpdate = (selectedValue) => {
    const selectedOption = options.find(
      (option) => option.additionalPrice === Number(selectedValue)
    );
    if (selectedOption) {
      const updatedCar = {
        ...car,
        carPrice: car.basePrice + selectedOption.additionalPrice,
        option: selectedOption.name,
      };
      return updatedCar;
    }
  };

  const handleCartClick = () => {
    const updatedCar = findOptionMatchAndUpdate(value);
    if (updatedCar) {
      setCartItems((prevCartItems) => [...prevCartItems, updatedCar]);
    }
  };

  const handleOrderClick = () => {
    const updatedCar = findOptionMatchAndUpdate(value);
    if (updatedCar) {
      setDirectCart((prevdirectCartItem) => [
        ...prevdirectCartItem,
        updatedCar,
      ]);
    }
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
