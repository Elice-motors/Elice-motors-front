import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
};

export const fetchUserInfo = (shortId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get(`/api/users/${shortId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response); // 직접 data를 반환합니다.
};

export const createPayment = (paymentData, accessToken) => {
  return axios
    .post("/api/payment", paymentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data); // 직접 data를 반환합니다.
};
