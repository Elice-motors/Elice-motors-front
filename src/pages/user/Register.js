import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CenteredLink = (props) => (
  <Link
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    }}
    {...props}
  />
);

const CenteredTitle = (props) => (
  <h2
    style={{
      textAlign: "center",
    }}
    {...props}
  />
);

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const validatePassword = (e) => {
    setPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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
          <CenteredTitle>회원가입</CenteredTitle>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  이름
                </Typography>
                <TextField fullWidth value={name} onChange={handleNameChange} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  이메일
                </Typography>
                <TextField
                  fullWidth
                  onChange={validateEmail}
                  error={!!emailError}
                  value={email}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  비밀번호
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  onChange={validatePassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  비밀번호 확인
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={validateConfirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  회원가입
                </Button>
              </Grid>
            </Grid>
          </form>
          <CenteredLink to="/login">
            이미 가입한 계정이 있다면 로그인해주세요!
          </CenteredLink>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
