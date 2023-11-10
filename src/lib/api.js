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

// 전체 상품 조회
export const getAllProducts = () => {
  return axios.get("/api/cars").then((response) => response);
};

// 상품 삭제
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

// 상품 등록
// export const addProduct = (productToformData) => {
//   return axios
//     .post(`/api/carup`, productToformData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU0NjVlYTgxYjk2ZmFmYjkwMzNhNTQwIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNjk5NTk3MDg2LCJpYXQiOjE2OTk1MTA2ODZ9.fRpSRhvMpovFdPMdqGx_6xcuJX9bXXEGIGqmqmgE5LQ`,
//       },
//     })
//     .then((response) => response);
// };

export const addProduct = (productData) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("상품 데이터", productData);

  return axios
    .post("/api/carup", productData, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 실제 토큰으로 대체하세요
      },
    })
    .then((response) => {
      console.log("Response:", response); // 이제 응답을 콘솔에 출력할 것입니다.
      return response;
    })
    .catch((error) => {
      console.error("Error:", error); // 여기서 오류를 콘솔에 출력할 것입니다.
      throw error; // 오류를 다시 throw하여 호출자에게 전달할 수 있습니다.
    });
};

// 전체 주문 조회
export const getAllOrders = () => {
  return axios
    .get("/api/orders", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU0NjVlYTgxYjk2ZmFmYjkwMzNhNTQwIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNjk5NTk3MDg2LCJpYXQiOjE2OTk1MTA2ODZ9.fRpSRhvMpovFdPMdqGx_6xcuJX9bXXEGIGqmqmgE5LQ`,
      },
    })
    .then((response) => response);
};

// 주문 삭제
export const deleteOrder = (userId, orderNumber) => {
  console.log("주문번호", orderNumber);
  console.log("유저 아이디", userId);
  return axios
    .delete(`/api/orders/delete/${userId}?orderNumber=${orderNumber}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU0NjVlYTgxYjk2ZmFmYjkwMzNhNTQwIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNjk5NTk3MDg2LCJpYXQiOjE2OTk1MTA2ODZ9.fRpSRhvMpovFdPMdqGx_6xcuJX9bXXEGIGqmqmgE5LQ`,
      },
    })
    .then((response) => response);
};

// 모든 사용자 조회
export const getAllUsers = () => {
  return axios
    .get("/api/users", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU0NjVlYTgxYjk2ZmFmYjkwMzNhNTQwIiwicm9sZSI6IkFETUlOIiwiZXhwIjoxNjk5NTk3MDg2LCJpYXQiOjE2OTk1MTA2ODZ9.fRpSRhvMpovFdPMdqGx_6xcuJX9bXXEGIGqmqmgE5LQ`,
      },
    })
    .then((response) => response);
};

// 관리자 사용자 삭제
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

// 관리자 주문 상태 변경
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

// 관리자 파일 업로드
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
