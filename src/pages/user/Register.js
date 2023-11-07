import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signup } from "../../lib/api";

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
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [emailError, setEmailError] = useState("");
  const [shortId, setShortId] = useState("");

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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRegistration = async () => {
    if (emailError) {
      alert("이메일 형식이 올바르지 않습니다.");
      return; // 이메일 오류가 있으면 여기서 함수 실행을 중단합니다.
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return; // 비밀번호가 일치하지 않으면 여기서 함수 실행을 중단합니다.
    }

    // API 요청 데이터 준비
    const requestData = {
      userName: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await signup(requestData);
      if (response.status === 201) {
        // 회원가입 성공
        alert("회원가입에 성공했습니다.");
        // shortId 저장
        setShortId(response.data.user.shortId); // API 응답에서 shortId를 가져옵니다.

        // 로컬 스토리지에 shortId 저장
        localStorage.setItem("shortId", response.data.user.shortId);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.message === "이미 가입한 이메일입니다.") {
            alert("이미 가입한 이메일입니다.");
          } else if (
            error.response.data.message ===
            "이름, 이메일, 비밀번호는 필수입니다."
          ) {
            alert("이름, 이메일, 비밀번호는 필수입니다.");
          }
        } else {
          // 다른 HTTP 상태 코드에 대한 처리를 여기에 추가할 수 있습니다.
        }
      } else {
        console.error("API 요청 실패:", error);
        // 네트워크 오류나 기타 예상치 못한 오류 처리를 여기에 추가할 수 있습니다.
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
                <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  역할
                </Typography>
                <Select fullWidth value={role} onChange={handleRoleChange}>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleRegistration}
                >
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
