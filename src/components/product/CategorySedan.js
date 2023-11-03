import React from "react";
import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

const sedanItems = [
  {
    id: 1231241,
    carName: "SEDAN T10",
    img: "/car2.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 232151254,
    carName: "SEDAN T10",
    img: "/car2.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 3643543,
    carName: "SEDAN T10",
    img: "/car2.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
];

const CategorySedan = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: "30px" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Sedan
        </Typography>
        <ImageList sx={{ display: "flex" }}>
          {sedanItems.map((item) => (
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

export default CategorySedan;
