import React, { useRef } from "react";
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
import ScrollToTop from "./components/common/ScrollToTop";
import NotFound from "./pages/NotFound";
const App = () => {
  const suvRef = useRef(null);
  const sedanRef = useRef(null);
  const elecRef = useRef(null);
  return (
    <>
      <BrowserRouter>
        <Header sedanRef={sedanRef} suvRef={suvRef} elecRef={elecRef} />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage sedanRef={sedanRef} suvRef={suvRef} elecRef={elecRef} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/directorder/:carId" element={<DirectOrder />} />
          <Route path="/orderslist" element={<OrdersList />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/car/:carId" element={<CarDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
