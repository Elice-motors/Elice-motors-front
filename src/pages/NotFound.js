import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        페이지를 찾을 수 없습니다.
      </Typography>
      <Typography variant="body1" paragraph>
        죄송합니다. 요청하신 페이지가 존재하지 않습니다.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        홈으로 돌아가기
      </Button>
    </Box>
  );
};

export default NotFoundPage;
