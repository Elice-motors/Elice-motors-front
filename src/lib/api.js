import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
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

export const fetchUserInfo = (shortId) => {
  const accessToken = localStorage.getItem("accessToken");
  return axios
    .get(`/api/users/${shortId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response);
};

export const createPayment = (paymentData, accessToken) => {
  return axios
    .post("/api/payment", paymentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};
