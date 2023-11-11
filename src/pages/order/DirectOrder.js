import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CartCheck from "../../components/cart/CartCheck";
import CartOne from "../../components/cart/CartOne";
import { useLocalForage } from "../../LocalForageContext";

const DirectOrder = () => {
  const [cart, setCart] = useState([{}]);
  const { getItem } = useLocalForage();
  useEffect(() => {
    getItem("directOrderItem")
      .then((items) => {
        if (items) {
          setCart(items);
        }
      })
      .catch((error) => {
        console.error("장바구니 항목 로드 중 오류 발생: ", error);
      });
  }, [getItem]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        marginTop: "20px",
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
