import { Grid, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router";
import DetailInfo from "../../components/product/DetailInfo";

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
    color: "Black",
    image: "/car1.jpg",
    price: 50000000,
    option: [
      { light: 10000000 },
      { signature: 16000000 },
      { special: 19000000 },
    ],
  };
  return (
    <>
      <div
        style={{
          padding: "16px",
          marginTop: "100px",
        }}
      >
        <Grid container spacing={2}>
          <DetailInfo item={carItem} />

          {/* 오른쪽 영역 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h5">오른쪽 영역</Typography>
              <p>
                이 곳에 오른쪽 영역의 내용을 추가하세요. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CarDetail;
