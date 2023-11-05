import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";

const CartCheck = ({ cart }) => {
  const totalAmount = cart.reduce((total, car) => total + car.price, 0);

  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [isUsingAccountAddress, setUsingAccountAddress] = useState(false);

  const handleComplete = (data) => {
    setPostcode(data.zonecode);
    setAddress(data.address);
    setPostcodeOpen(false); // Close the postcode popup
  };

  const useAccountAddress = () => {
    const accountAddressValue = "Account Address Here";

    setUsingAccountAddress(true);
    setAddress(accountAddressValue);
  };

  return (
    <>
      <Card sx={{ padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            총 결제 금액
          </Typography>
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", margin: "10px" }}
          >
            {totalAmount.toLocaleString()}원
          </Typography>
          <Divider variant="middle" />
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold", flex: "1" }}>
              주문 정보
            </Typography>
            <Link to="/account-address" onClick={useAccountAddress}>
              계정 정보와 동일하게 적용
            </Link>
          </div>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            이름
            <br />
          </Typography>
          <TextField variant="outlined" fullWidth margin="normal" />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            배송지 주소
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={isUsingAccountAddress ? address : `${postcode} ${address}`}
            onClick={() => setPostcodeOpen(true)}
          />
          <Dialog
            open={isPostcodeOpen}
            onClose={() => setPostcodeOpen(false)}
            sx={{ "& .MuiDialog-paper": { width: "80%", height: "80%" } }}
          >
            <DialogTitle>배송지 주소 입력</DialogTitle>
            <DialogContent>
              <DaumPostcode onComplete={handleComplete} />
            </DialogContent>
          </Dialog>
          <Link to="/ordersuccess">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
            >
              주문하기
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default CartCheck;
