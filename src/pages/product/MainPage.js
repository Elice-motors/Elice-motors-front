import React from "react";
import MainProductBanner from "../../components/product/MainProductBanner";
import CategorySUV from "../../components/product/CategorySUV";
import CategorySedan from "../../components/product/CategorySedan";
import CategoryElec from "../../components/product/CategoryElec";

const MainPage = () => {
  return (
    <>
      <MainProductBanner />
      <div
        style={{
          marginTop: "120px",
          padding: "20px",
        }}
      >
        <CategorySUV />
        <CategorySedan />
        <CategoryElec />
      </div>
    </>
  );
};

export default MainPage;
