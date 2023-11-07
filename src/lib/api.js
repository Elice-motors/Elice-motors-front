import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
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
