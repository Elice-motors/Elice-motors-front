import { Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import DetailInfo from "../../components/product/DetailInfo";
import OptionCheck from "../../components/product/OptionCheck";

const CarDetail = () => {
  const { carId } = useParams();

  // 제품 상세관련 임시 데이터
  // 나중에 useParams를 통해 가져온 carId 값으로 차량 상세 api 호출 후 데이터 사용 예정
  const carItem = {
    id: carId,
    name: "SUV Model I30",
    speed: 225,
    mileage: 403,
    fuel: 5.7,
    color: "black",
    image: "/car1.jpg",
    price: 50000000,
    option: "light",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DetailInfo car={carItem} />
          </Grid>

          <Grid item xs={6}>
            <OptionCheck car={carItem} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CarDetail;
