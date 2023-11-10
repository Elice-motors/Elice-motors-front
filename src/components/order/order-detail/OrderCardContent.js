import React from "react";
import { Card, CardContent, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const cardStyle = {
  marginBottom: "20px",
  border: "none",
  background: "#f5f5f5",
};

const OrderCardContent = ({ product }) => {
  return (
    <Card style={cardStyle}>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={3}>
            <img
              src={product.productInfo.img}
              alt={product.productInfo.carName}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {product.productInfo.carName}
            </Typography>
            <Typography>옵션: {product.productInfo.option}</Typography>
            <Typography>색상: {product.productInfo.color}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="h7" style={{ fontWeight: "bold" }}>
              결제 금액
            </Typography>
            <Typography variant="h7" style={{ fontWeight: "bold" }}>
              {product.productInfo.carPrice.toLocaleString()}원
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCardContent;
