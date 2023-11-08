import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/product/MainPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CarDetail from "./pages/product/CarDetail";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Mypage from "./pages/user/Mypage";
import Cart from "./pages/cart/Cart";
import DirectOrder from "./pages/order/DirectOrder";
import OrdersList from "./pages/order/OrdersList";
import OrderSuccess from "./pages/order/OrderSuccess";
import Admin from "./pages/admin/Admin";
import AdminItem from "./pages/admin/admin-item/AdminItem";
import AdminOrderList from "./pages/admin/AdminOrderList";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:carId" element={<CarDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/directorder/:carId" element={<DirectOrder />} />
          <Route path="/orderslist" element={<OrdersList />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-item" element={<AdminItem />} />
          <Route path="/admin-orderlist" element={<AdminOrderList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
