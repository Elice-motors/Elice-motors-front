import React from "react";
import CommonCarCard from "../common/CommonCarCard";
const CartOne = ({ car }) => {
  return (
    <>
      <CommonCarCard car={car} card={true} />
    </>
  );
};
export default CartOne;
