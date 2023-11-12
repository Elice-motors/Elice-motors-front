import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { getUserInfo, createPayment } from "../../lib/api";

const CartCheck = ({ cart }) => {
  const totalAmount = cart.reduce((total, car) => total + car.carPrice, 0);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleComplete = (data) => {
    setAddress(data.address);
    setPostcodeOpen(false);
  };

  const useSameAccount = () => {
    setName(user.userName);
    setAddress(user.address);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (e) {
        navigate("/login");
        if (e.response.message === "존재하지 않는 계정입니다.") {
          alert("존재하지 않는 계정입니다.");
        } else if (e.response.message === "토큰이 없습니다.") {
          alert("토큰이 없습니다.");
        } else if (e.response.message === "정상적인 토큰이 아닙니다.") {
          alert("정상적인 토큰이 아닙니다.");
        } else if (e.response.message === "토큰이 만료되었습니다.") {
          alert("토큰이 만료되었습니다.");
        } else if (e.response.message === "권한이 없습니다.") {
          alert("권한이 없습니다.");
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handlePayment = async () => {
    const userId = localStorage.getItem("userId");
    const paymentData = {
      products: cart.map((item) => ({
        carId: item._id,
        carName: item.carName,
        img: item.img,
        carPrice: item.carPrice,
        option: item.option,
        color: item.color,
      })),
      address: address,
      userId: userId,
    };
    try {
      const response = await createPayment(paymentData);
      console.log(response);
      if (response.status === 201) {
        navigate("/ordersuccess", { state: { value: response.data } });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error === "주문자 정보가 누락되었습니다.") {
        alert("주문자 정보가 누락되었습니다.");
      }
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

          <Divider style={{ padding: "15px" }} variant="middle" />
          <div
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <Typography variant="h5" style={{ fontWeight: "bold", flex: "1" }}>
              주문 정보
            </Typography>
            <Link onClick={useSameAccount}>계정 정보와 동일하게 적용</Link>
          </div>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            이름
            <br />
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={name ? name : ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            배송지 주소
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="배송지 주소를 입력하세요"
            margin="normal"
            value={address ? address : ""}
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

          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginTop: "50px" }}
            onClick={handlePayment}
          >
            결제하기
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default CartCheck;
