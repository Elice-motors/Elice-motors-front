import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    age: "",
    phone: "",
    address: "",
  });

  const shortId = localStorage.getItem("shortId");
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      // 사용자 정보를 서버에서 가져옵니다.
      axios
        .get(`/users/${shortId}`, {
          // shortId를 URL에 포함
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            console.log(user);
          }
        })
        .catch((error) => {
          console.error("사용자 정보 가져오기 실패:", error);
        });
    }
  }, []);

  const handleAccountUpdate = () => {
    // 변경된 사용자 정보를 수집
    const updatedUserInfo = {
      userName: user.name,
      email: user.email,
      age: user.age,
      phone: user.phoneNumber,
      address: user.address,
    };

    const apiUrl = `/users/${shortId}`; // shortId를 어떻게 얻는지에 따라 동적으로 생성

    // API 요청 헤더 설정

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // API 요청 본문 준비
    const requestBody = updatedUserInfo;

    // API 요청 보내기
    axios
      .put(apiUrl, requestBody, { headers })
      .then((response) => {
        if (response.status === 200) {
          // 계정 정보 변경에 성공하면 성공 메시지를 표시하거나 다른 조치를 취할 수 있습니다.
          alert("계정 정보가 성공적으로 변경되었습니다.");
        }
      })
      .catch((error) => {
        console.error("API 호출 실패:", error);
        // 에러 처리를 수행하거나 에러 메시지를 표시할 수 있습니다.
      });
  };

  const handleLogout = () => {
    // 로그아웃 로직을 구현합니다.
    // 이 예제에서는 localStorage에서 토큰을 제거하여 로그아웃하는 것으로 가정합니다.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("shortId");

    // 다음으로, 사용자를 로그인 페이지 또는 다른 적절한 페이지로 리디렉션할 수 있습니다.
  };

  const handleAccountDelete = () => {
    // 사용자 정보를 서버에서 삭제합니다.
    axios
      .delete(`/users/${shortId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          // 계정 삭제에 성공하면 성공 메시지를 표시하거나 다른 조치를 취할 수 있습니다.
          alert("계정이 성공적으로 삭제되었습니다.");
          handleLogout();
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            alert("존재하지 않는 계정입니다.");
          } else if (error.response.status === 400) {
            alert("토큰이 없습니다. 로그인이 필요합니다.");
          } else {
            alert("탈퇴 중에 문제가 발생했습니다.");
          }
        } else {
          alert("탈퇴 중에 문제가 발생했습니다.");
        }
      });
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
            name="name"
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
            name="phoneNumber"
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
