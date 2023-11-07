import React from "react";
import { Grid, Typography, CardContent, Card, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";

const CommonCarCard = ({
  car,
  actionComponent,
  card = false,
  checkbox = false,
}) => {
  const content = (
    <>
      {checkbox && (
        <Grid item xs={1}>
          <Checkbox defaultChecked />
        </Grid>
      )}
      <Grid item xs={card ? 7 : 3}>
        <Link to={`/${car.id}`}>
          <img src={car.image} alt={car.name} style={{ width: "100%" }} />
        </Link>
        {card && (
          <Typography
            variant="h6"
            style={{ marginTop: "10px", fontWeight: "bold" }}
          >
            {car.name}
          </Typography>
        )}
      </Grid>
      <Grid item xs={card ? 7 : 3}>
        <Typography>옵션: {car.option}</Typography>
        <Typography>색상: {car.color}</Typography>
        <Typography style={{ fontWeight: "bold", display: "inline" }}>
          {`결제 금액: ${car.price.toLocaleString()} `}
        </Typography>
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