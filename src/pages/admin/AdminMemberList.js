import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { deleteUser, getAllUsers } from "../../lib/api";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // API 호출을 정의한 함수
    const fetchAllUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("사용자 정보", response);
        setUsers(response.data.users); // 상태 업데이트
      } catch (error) {
        if (error.response.status === 401) {
          alert("관리자 계정만 접근 가능합니다.");
        }
      }
    };
    fetchAllUsers(); // 함수 호출
  }, []);

  const handleDeleteUser = async (shortId) => {
    try {
      const response = await deleteUser(shortId);
      console.log("사용자 삭제 response", response);
      if (response.status === 204) {
        const updatedUsers = users.filter((user) => user.shortId !== shortId);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log("사용자 삭제 실패");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h6">전체 사용자 ({users.length})</Typography>
        <Stack spacing={2}>
          {users.map((user) => (
            <Card
              key={user.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                p: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: deepPurple[500], mr: 2 }}>
                  {user.userName}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {user.userName}{" "}
                    {user.role === "ADMIN" && (
                      <Chip label="관리자" size="small" color="primary" />
                    )}
                  </Typography>
                  <Typography variant="body2" component="span">
                    {user.email} · 전화번호: {user.phone}
                  </Typography>
                  <Typography variant="body2">
                    나이: {user.age} · 주소지: {user.address}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteUser(user.shortId)}
              >
                삭제
              </Button>
            </Card>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default AdminUserList;
