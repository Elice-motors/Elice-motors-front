import React from "react";
import { Grid, Typography, CardContent, Card } from "@mui/material";
import { Link } from "react-router-dom";

const CommonCarCard = ({ car, actionComponent, card = false }) => {
  const content = (
    <>
      <Grid item xs={card ? 7 : 4}>
        <Link to={`/car/${car.carId}`}>
          <img
            src={car.img}
            alt={car.carName}
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Link>
        {card && (
          <Typography
            variant="h4"
            style={{ marginTop: "10px", fontWeight: "bold" }}
          >
            {car?.carName}
          </Typography>
        )}
      </Grid>
      <Grid item xs={card ? 7 : 4}>
        {!card ? (
          <Typography style={{ fontWeight: "bold" }}>
            제품명 : {car?.carName}
          </Typography>
        ) : null}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Typography>옵션 : {car?.option}</Typography>
          <Typography>색상 : {car?.color}</Typography>
          {card ? (
            <Typography
              variant="h5"
              style={{
                fontWeight: "bold",
                marginTop: "15px",
                display: "inline",
              }}
            >
              {`결제 금액: ${car?.carPrice?.toLocaleString()}원`}
            </Typography>
          ) : (
            <Typography
              style={{
                fontWeight: "bold",
                marginTop: "80px",
                display: "inline",
              }}
            >
              {`결제 금액: ${car?.carPrice?.toLocaleString()}원`}
            </Typography>
          )}
        </div>
      </Grid>
      {actionComponent && (
        <Grid item xs={card ? 12 : 2}>
          {actionComponent}
        </Grid>
      )}
    </>
  );
  return card ? (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {content}
        </Grid>
      </CardContent>
    </Card>
  ) : (
    <Grid container spacing={2}>
      {content}
    </Grid>
  );
};

export default CommonCarCard;
