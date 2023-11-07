import axios from "axios";

export const login = (loginInfo) => {
  return axios.post("/api/signin", loginInfo).then((response) => response);
};

export const signup = (userData) => {
  return axios.post("api/signup", userData).then((response) => response);
};
