import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const validateEmail = (e) => {
    setEmail(e.target.value);
    const re = /\S+@\S+\.\S+/;
    if (!re.test(e.target.value)) {
      setEmailError("이메일 형식이 잘못되었습니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = {
      email,
      password,
    };
    try {
      const response = await login(loginInfo);
      if (response.status === 200) {
        const accessToken = response.headers.get("Authorization").split(" ")[1];
        const shortId = response.data.user.shortId;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("shortId", shortId);
        localStorage.setItem("userId", response.data.user.userId);
        localStorage.setItem("role", response.data.user.role);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("이메일 또는 비밀번호를 확인해주세요.");
      } else if (error.response.status === 401) {
        alert("이메일, 비밀번호는 필수 요청 값입니다.");
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <h2 style={{ textAlign: "center" }}>로그인</h2>
          <form onSubmit={handleLoginSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  이메일
                </Typography>
                <TextField
                  fullWidth
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={validateEmail}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  비밀번호
                </Typography>
                <TextField
                  fullWidth
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  로그인
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Link
          to="/register"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          아직 계정이 없다면 회원가입해주세요!
        </Link>
      </Container>
    </div>
  );
};

export default Login;
