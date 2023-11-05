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

const OptionCheck = ({ car }) => {
  const [value, setValue] = useState("라이트");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleCartClick = () => {
    navigate("/cart");
  };
  const handleOrderClick = () => {
    navigate("/directorder");
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
              <FormControlLabel
                value="라이트"
                control={<Radio />}
                label="라이트"
              />
              <FormControlLabel
                value="시그니처"
                control={<Radio />}
                label="시그니처"
              />
              <FormControlLabel
                value="스페셜"
                control={<Radio />}
                label="스페셜"
              />
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
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
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
