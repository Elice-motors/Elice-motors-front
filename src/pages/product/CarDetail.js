import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailInfo from "../../components/product/DetailInfo";
import OptionCheck from "../../components/product/OptionCheck";
import { getCarDetail, getOptions } from "../../lib/api";

const CarDetail = () => {
  const { carId } = useParams();
  const [carItem, setCarItem] = useState({});
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const carResponse = await getCarDetail(carId);
      const optionResponse = await getOptions();
      if (carResponse.status === 200) {
        setCarItem({
          ...carResponse.data.car,
          basePrice: carResponse.data.car.carPrice,
        });
      } else if (carResponse.status === 404) {
        alert("조건에 일치하는 상품이 존재하지 않습니다.");
      } else if (carResponse.status === 500) {
        alert("상품 정보 검색 중 오류가 발생했습니다.");
      }
      if (optionResponse.status === 200) {
        setOptions(optionResponse.data.options);
      }
    };
    fetchData();
  }, [carId]);
  const handleOptionChange = (updatedCarItem) => {
    setCarItem(updatedCarItem);
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

          <Grid item xs={6} style={{ marginTop: "50px" }}>
            <OptionCheck
              car={carItem}
              options={options}
              onOptionChange={handleOptionChange}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default CarDetail;
