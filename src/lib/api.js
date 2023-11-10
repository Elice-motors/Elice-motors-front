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
export const updateUserInfo = (updatedUserInfo) => {
  const accessToken = localStorage.getItem("accessToken");
  const shortId = localStorage.getItem("shortId");
  console.log(accessToken);
  return axios
    .put(`/api/users/${shortId}`, updatedUserInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

// 사용자 계정 삭제
export const deleteUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const shortId = localStorage.getItem("shortId");
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
  return axios.get("/api/cars?register=latest").then((response) => response);
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

export const fetchUserInfo = () => {
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

export const createPayment = (paymentData) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  return axios
    .post(`/api/payment/${userId}`, paymentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const getUserOrders = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  return axios
    .get(`/api/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const deleteUserOrder = (orderNumber) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  return axios
    .delete(`/api/orders/delete/${userId}?orderNumber=${orderNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

// 전체 상품 조회
export const getAllProducts = () => {
  return axios.get("/api/cars").then((response) => response);
};

// 상품 삭제
export const deleteProduct = (carId) => {
  return axios.delete(`/api/cars/${carId}`).then((response) => response);
};

// 상품 등록
export const addProduct = (productToformData) => {
  return axios({
    method: "post",
    url: "/api/carup",
    data: productToformData,
  }).then((response) => response);
};
