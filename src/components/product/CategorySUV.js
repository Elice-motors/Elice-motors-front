import React from "react";
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

const suvItems = [
  {
    id: 15436,
    carName: "SUV T10",
    img: "/car1.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 2325436,
    carName: "SUV T10",
    img: "/car1.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 335236,
    carName: "SUV T10",
    img: "/car1.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
];

const CategorySUV = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: "30px" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          SUV/RV
        </Typography>
        <ImageList sx={{ display: "flex" }}>
          {suvItems.map((item) => (
            <React.Fragment key={item.id}>
              <ImageListItem sx={{ marginRight: "10px" }}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt="차 로고"
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.carName}
                  subtitle={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      <span>{`최대속력: ${item.speed}km/h`}</span>
                      <span>{`주행 거리: ${item.mileage}km`}</span>
                      <span>{`연비: ${item.fuel}km/l`}</span>
                    </div>
                  }
                  position="below"
                />
              </ImageListItem>
            </React.Fragment>
          ))}
        </ImageList>
      </Container>
    </>
  );
};

export default CategorySUV;
