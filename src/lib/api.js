import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
};

export const signup = (userData) => {
  return axios.post("/api/signup", userData);
};

// 사용자 정보 가져오기
export const getUserInfo = (shortId, accessToken) => {
  return axios.get(`/api/users/${shortId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 사용자 정보 업데이트
export const updateUserInfo = (shortId, accessToken, updatedUserInfo) => {
  return axios.put(`/api/users/${shortId}`, updatedUserInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// 사용자 계정 삭제
export const deleteUserInfo = (shortId, accessToken) => {
  return axios.delete(`/api/users/${shortId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
