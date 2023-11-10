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

          <Grid item xs={6}>
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
