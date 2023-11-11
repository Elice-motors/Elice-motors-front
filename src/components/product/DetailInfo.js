import React from "react";
import { Grid, Typography, Container, Card, CardContent } from "@mui/material";
const DetailInfo = ({ car }) => {
  return (
    <>
      <Card sx={{ marginTop: "10px" }}>
        <CardContent>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {car?.carName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <img
                src={car?.img}
                alt={car?.carName}
                style={{
                  width: "100%",
                  marginBttom: "10px",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Container sx={{ marginTop: "20px" }}>
              <Typography variant="h6">{`최대 속력: ${car.speed}km/h`}</Typography>
              <Typography variant="h6">{`주행 거리: ${car.mileage}km`}</Typography>
              <Typography variant="h6">{`연비: ${car.fuel}km/l`}</Typography>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                {`결제 금액: ${car?.carPrice?.toLocaleString()}원`}
              </Typography>
            </Container>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default DetailInfo;
