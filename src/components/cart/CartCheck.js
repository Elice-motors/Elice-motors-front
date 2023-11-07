import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

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
    const accountAddressValue = "Account Address Here";

    setUsingAccountAddress(true);
    setAddress(accountAddressValue);
  };

  const accessToken = localStorage.getItem("accessToken");
  const shortId = localStorage.getItem("shortId");

  const fetchUserInfo = async () => {
    if (!accessToken) {
      console.log("사용자가 로그인하지 않았습니다.");
      // 로그인 페이지로 리다이렉트하는 로직을 추가할 수 있습니다.
      return;
    }

    try {
      const response = await axios.get(`/api/users/${shortId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 여기에 사용자 정보를 처리하는 로직을 추가하세요.
      console.log(response.data.user);
      setUser(response.data.user);
      setUserId(response.data.user.id);
      // 예를 들어, 사용자 정보를 state에 저장하거나 다른 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error.response || error);
      // 사용자에게 오류가 발생했음을 알리거나 로그인 페이지로 리다이렉트할 수 있습니다.
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // POST 요청을 보내는 함수
  const handlePayment = async () => {
    // API 요청에 필요한 데이터를 구성
    const paymentData = {
      products: cart.map((item) => ({
        productInfo: {
          name: item.name,
          color: item.color,
          option: item.option,
          price: item.price,
        },
        quantity: item.quantity,
      })),
      amountInfo: totalAmount,
      userId: userId,
      address: address,
      status: "주문 완료",
    };

    try {
      // API에 POST 요청을 보냅니다
      const response = await axios.post("/api/payment", paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 성공적으로 응답이 온 경우 처리
      console.log(response.data);
      // 여기에 성공 시 로직을 추가하세요. 예: 페이지 리다이렉트 등
    } catch (error) {
      // 오류 처리
      console.error("Payment API Error:", error);
      // 사용자에게 오류가 발생했음을 알리는 로직을 추가하세요.
    }
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
            <Button
              variant="contained"
              color="primary"
              style={{ width: "100%" }}
              onClick={handlePayment} // 결제 함수 연결
            >
              결제하기
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );
};

export default CartCheck;
