import React from "react";
import { Grid, Typography, Container, Paper } from "@mui/material";
const DetailInfo = ({ item }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h3">{item.name}</Typography>
          <Container sx={{ padding: "20px" }}>
            <Typography variant="body1">{`최대 속력: ${item.speed}km/h`}</Typography>
            <Typography variant="body1">{`주행 거리: ${item.mileage}km`}</Typography>
            <Typography variant="body1">{`연비: ${item.fuel}km/l`}</Typography>
          </Container>
          <img
            src={item.image}
            style={{ width: "500px", height: "450px" }}
            alt="제품 상세 사진"
          />
          <Typography
            sx={{ marginTop: "25px" }}
            variant="h4"
          >{`차량 가격: ${item.price.toLocaleString()}`}</Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default DetailInfo;
