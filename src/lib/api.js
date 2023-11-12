import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
};

export const signup = (userData) => {
  return axios.post("/api/signup", userData).then((response) => response);
};

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

export const getAllProducts = () => {
  return axios.get("/api/cars").then((response) => response);
};

export const deleteProduct = (carId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .delete(`/api/cars/${carId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const addProduct = (productData) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("상품 데이터", productData);

  return axios
    .post("/api/carup", productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// 전체 주문 조회
export const getAllOrders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get("/api/orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

// 주문 삭제
export const deleteOrder = (userId, orderNumber) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .delete(`/api/orders/delete/${userId}?orderNumber=${orderNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const getAllUsers = () => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get("/api/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const deleteUser = (shortId) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("shortId", shortId);
  console.log("accessToken", accessToken);
  return axios
    .delete(`/api/users/${shortId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const orderStatusChange = (orderNumber, newStatusData) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  console.log("userId", userId);
  console.log("api에서 newStatusData", newStatusData);
  return axios
    .put(`/api/orders/${userId}?orderNumber=${orderNumber}`, newStatusData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const fileUpload = (uploadedFile) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .post("/api/upload", uploadedFile, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};
