import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
};

export const signup = (userData) => {
  return axios.post("/api/signup", userData).then((response) => response);
};

// 사용자 정보 가져오기
export const getUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const shortId = localStorage.getItem("shortId");
  return axios
    .get(`/api/users/${shortId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

// 사용자 정보 업데이트
export const updateUserInfo = (shortId, accessToken, updatedUserInfo) => {
  return axios
    .put(`/api/users/${shortId}`, updatedUserInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

// 사용자 계정 삭제
export const deleteUserInfo = (shortId, accessToken) => {
  return axios
    .delete(`/api/users/${shortId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};
export const logout = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .post(
      "/api/signout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response);
};

export const getBannerProduct = () => {
  return axios.get("/api/cars/2").then((response) => response);
};

export const getCategorySedan = () => {
  return axios.get("/api/category/sedan").then((response) => response);
};

export const getCategorySuv = () => {
  return axios.get("/api/category/suv").then((response) => response);
};

export const getCategoryElectric = () => {
  return axios.get("/api/category/electric").then((response) => response);
};

export const getCarDetail = (carId) => {
  return axios.get(`/api/cars/${carId}`).then((response) => response);
};

export const getOptions = () => {
  return axios.get("/api/car-options").then((response) => response);
};
