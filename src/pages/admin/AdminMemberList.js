import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { deleteUserInfo, getAllUsers } from "../../lib/api";

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
        console.error("Error fetching users:", error);
      }
    };
    fetchAllUsers(); // 함수 호출
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await deleteUserInfo(userId);
      console.log("사용자 삭제 response", response);
    } catch (error) {
      console.log("사용자 삭제 실패");
    }
  };

  return (
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
                    <span style={{ color: "blue" }}>(관리자)</span>
                  )}
                </Typography>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="body2">전화번호: {user.phone}</Typography>
                <Typography variant="body2">나이: {user.age}</Typography>
                <Typography variant="body2">{user.address}</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteUser(user._id)}
            >
              삭제
            </Button>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminUserList;
