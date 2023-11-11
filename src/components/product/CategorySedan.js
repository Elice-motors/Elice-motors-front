import React, { useEffect, useState } from "react";
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
import { getCategorySedan } from "../../lib/api";

const CategorySedan = ({ sedanRef }) => {
  const [sedanItems, setSedanItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategorySedan();
        if (response.status === 200) {
          setSedanItems(response.data.category);
        }
      } catch (e) {
        throw new Error("불러오기 실패");
      }
    };
    fetchData();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container ref={sedanRef} maxWidth="lg" sx={{ marginBottom: "30px" }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "10px" }}
      >
        Sedan
      </Typography>
      <Slider {...settings}>
        {sedanItems.map((item) => (
          <React.Fragment key={item.carId}>
            <Link
              to={`/car/${item.carId}`}
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
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                  subtitle={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      <span>{`최대속력: ${item.speed}km/h`}</span>
                      <span
                        style={{ marginTop: "8px" }}
                      >{`주행 거리: ${item.mileage}km`}</span>
                      <span
                        style={{ marginTop: "8px" }}
                      >{`연비: ${item.fuel}km/l`}</span>
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
  );
};

export default CategorySedan;
