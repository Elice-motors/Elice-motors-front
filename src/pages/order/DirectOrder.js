import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CartCheck from "../../components/cart/CartCheck";
import CartOne from "../../components/cart/CartOne";
import { useParams } from "react-router-dom";
import { getCarDetail } from "../../lib/api";

const DirectOrder = () => {
  const { carId } = useParams();
  const [cart, setCart] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCarDetail(carId);
        if (response.status === 200) {
          setCart([response.data.car]);
        }
      } catch (e) {
        throw new Error("실패");
      }
    };
    fetchData();
  }, [carId]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          즉시 결제
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CartOne car={cart[0]} />
          </Grid>

          <Grid item xs={6}>
            <CartCheck cart={cart} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DirectOrder;
