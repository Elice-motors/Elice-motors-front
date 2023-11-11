import React from "react";
import MainProductBanner from "../../components/product/MainProductBanner";
import CategorySUV from "../../components/product/CategorySUV";
import CategorySedan from "../../components/product/CategorySedan";
import CategoryElec from "../../components/product/CategoryElec";

const MainPage = ({ suvRef, sedanRef, elecRef }) => {
  return (
    <>
      <MainProductBanner />
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
        }}
      >
        <CategorySUV suvRef={suvRef} />
        <CategorySedan sedanRef={sedanRef} />
        <CategoryElec elecRef={elecRef} />
      </div>
    </>
  );
};

export default MainPage;
