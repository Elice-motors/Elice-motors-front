import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode";
import {
  getUserInfo,
  updateUserInfo,
  deleteUserInfo,
  logout,
} from "../../lib/api";
import { useLocalForage } from "../../LocalForageContext";

const Mypage = () => {
  const navigate = useNavigate();
  const { clear } = useLocalForage();
  const [isPostcodeOpen, setPostcodeOpen] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    age: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfo();
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (e) {
        throw new Error("실패");
      }
    };
    fetchData();
  }, []);

  const handlelogout = async () => {
    try {
      const response = await logout();
      if (response.status === 204) {
        localStorage.clear();
        clear().then(() => navigate("/"));
      }
    } catch (e) {
      throw new Error("실패");
    }
  };

  // 사용자 정보 업데이트
  const handleUpdate = async () => {
    try {
      const response = await updateUserInfo(user);
      if (response.status === 200) {
        alert("계정 정보 수정 성공");
        navigate("/");
      }
    } catch (e) {
      console.error("실패", e);
    }
  };

  // 사용자 계정 삭제
  const handleDelete = async () => {
    try {
      const response = await deleteUserInfo();
      if (response.status === 204) {
        alert("계정이 삭제되었습니다.");
        handlelogout();
      }
    } catch (error) {
      console.error("계정 삭제에 실패: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleComplete = (data) => {
    setPostcodeOpen(false);
    setUser({ ...user, address: data.address });
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "70px",
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
            value={user.age ? user.age : ""}
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
            value={user.phone ? user.phone : ""}
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
            value={user.address ? user.address : ""}
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
                onClick={handleUpdate}
              >
                계정 정보 변경
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleDelete}
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
