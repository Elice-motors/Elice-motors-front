import React from "react";
import {
  Container,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// 임시 데이터
const electricItems = [
  {
    id: 1543623,
    carName: "Electric T10",
    img: "/car3.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 232543623,
    carName: "Electric T10",
    img: "/car3.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 3352236,
    carName: "Electric T10",
    img: "/car3.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 52236,
    carName: "Electric T10",
    img: "/car3.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
  {
    id: 652236,
    carName: "Electric T10",
    img: "/car3.jpg",
    speed: 225,
    mileage: 403,
    fuel: 5.1,
  },
];
const CategoryElec = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: "30px" }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Electric Car
        </Typography>
        <Slider {...settings}>
          {electricItems.map((item) => (
            <React.Fragment key={item.id}>
              <Link
                to={`/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
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
              </Link>
            </React.Fragment>
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default CategoryElec;
