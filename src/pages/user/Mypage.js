import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DaumPostcode from "react-daum-postcode";
import { getUserInfo, updateUserInfo, deleteUserInfo } from "../../lib/api";

const Mypage = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    age: "",
    phone: "",
    address: "",
  });

  const shortId = localStorage.getItem("shortId");
  const accessToken = localStorage.getItem("accessToken");

  // useEffect에서 사용자 정보를 가져옵니다.
  useEffect(() => {
    if (accessToken && shortId) {
      getUserInfo(shortId, accessToken)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
        });
    }
  }, [accessToken, shortId]);

  // 사용자 정보 업데이트를 위한 핸들러
  const handleAccountUpdate = async () => {
    try {
      await updateUserInfo(shortId, accessToken, {
        userName: user.userName,
        email: user.email,
        age: user.age,
        phone: user.phone,
        address: user.address,
      });
      alert("계정 정보가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  // 사용자 계정 삭제를 위한 핸들러
  const handleAccountDelete = async () => {
    try {
      await deleteUserInfo(shortId, accessToken);
      alert("계정이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  const daum = window.daum;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [isUsingAccountAddress, setUsingAccountAddress] = useState(true);

  const handleComplete = (data) => {
    setPostcode(data.zonecode);
    setAddress(data.address);
    setPostcodeOpen(false);
    setUser({ ...user, address: data.address });
  };

  const handleOpenPostcode = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setUser({ ...user, address: fullAddress });
      },
    }).open();
  };

  const useAccountAddress = () => {
    const accountAddressValue = "Account Address Here";

    setUsingAccountAddress(true);
    setAddress(accountAddressValue);
    setUser({ ...user, address: accountAddressValue });
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "80px",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
          계정 정보 수정
        </Typography>
        <form>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            이름
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.userName}
            onChange={handleInputChange}
            name="userName"
          />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            이메일
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            나이
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.age}
            onChange={handleInputChange}
            name="age"
          />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            전화번호
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.phone}
            onChange={handleInputChange}
            name="phone"
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAccountUpdate}
              >
                계정 정보 변경
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleAccountDelete}
              >
                탈퇴하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Mypage;
