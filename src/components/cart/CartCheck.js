import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { fetchUserInfo, createPayment } from "../../lib/api";

const CartCheck = ({ cart, userId, setUserId }) => {
  const totalAmount = cart.reduce((total, car) => total + car.price, 0);

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
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
    if (user) {
      // 'user' 객체에 저장된 계정 주소와 이름을 사용합니다.
      setUsingAccountAddress(true);
      setAddress(user.address);
      setName(user.userName);
    } else {
      console.log("사용자 정보가 없습니다.");
      // 여기에서 로그인 페이지로 리다이렉트하거나 사용자에게 알림을 줄 수 있습니다.
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchUserInfo(shortId);
  //     console.log(response);
  //   };
  //   fetchData();
  // }, []);

  // POST 요청을 보내는 함수
  // const handlePayment = () => {
  //   // API 요청에 필요한 데이터를 구성
  //   const paymentData = {
  //     products: cart.map((item) => ({
  //       productInfo: {
  //         name: item.name,
  //         color: item.color,
  //         option: item.option,
  //         price: item.price,
  //       },
  //       quantity: item.quantity,
  //     })),
  //     amountInfo: totalAmount,
  //     userId: userId,
  //     address: address,
  //     status: "주문 완료",
  //   };

  //   if (accessToken) {
  //     createPayment(paymentData, accessToken)
  //       .then((data) => {
  //         console.log("결제 성공", data);
  //         // 여기에 성공 시 로직을 추가하세요. 예: 페이지 리다이렉트 등
  //       })
  //       .catch((error) => {
  //         console.error("Payment API Error:", error);
  //       });
  //   }
  // };

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
            <Link onClick={useAccountAddress}>계정 정보와 동일하게 적용</Link>
          </div>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            이름
            <br />
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={isUsingAccountAddress ? user.userName : name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            배송지 주소
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={
              isUsingAccountAddress ? user.address : `${postcode} ${address}`
            }
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
            {/* <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
              onClick={handlePayment} // 결제 함수 연결
            >
              결제하기
            </Button> */}
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default CartCheck;
