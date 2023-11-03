import React, { useState } from "react";
import { Container, TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

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

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <h2 style={{ textAlign: "center" }}>로그인</h2>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h7" sx={{ fontWeight: 'bold' }}>이메일</Typography>
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
              <Typography variant="h7" sx={{ fontWeight: 'bold' }}>비밀번호</Typography>
              <TextField
                fullWidth
                placeholder="비밀번호를 입력해주세요."
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Link to="/register" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        아직 계정이 없다면 회원가입해주세요!
      </Link>
    </Container>
  );
};

export default Login;
