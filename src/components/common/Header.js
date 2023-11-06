import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const [userInfoAnchorEl, setUserInfoAnchorEl] = useState(null);
  const productOpen = Boolean(productAnchorEl);
  const userInfoOpen = Boolean(userInfoAnchorEl);
  const navigate = useNavigate();
  const handleProductClick = (event) => {
    setProductAnchorEl(event.currentTarget);
  };
  const handleProductClose = () => {
    setProductAnchorEl(null);
  };
  const handleUserClick = (event) => {
    setUserInfoAnchorEl(event.currentTarget);
  };
  const handleUserClose = () => {
    setUserInfoAnchorEl(null);
  };

  const handleMypage = () => {
    handleUserClose();
    navigate("/mypage");
  };
  const handleAdminpage = () => {
    handleUserClose();
    navigate("/admin-item");
  };
  const handlelogout = () => {
    handleUserClose();
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bottom: "auto", top: "0", bgcolor: "white", height: "60px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              <Typography variant="subtitle1">
                <img
                  style={{ width: "50%", height: "50%" }}
                  src="/page-logo.png"
                  alt="header-logo"
                />
              </Typography>
            </Link>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <Typography variant="subtitle1">Elice motors</Typography>
            </Link>
          </div>
          <div>
            <Button
              id="product-menu"
              aria-controls={productOpen ? "product-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={productOpen ? "true" : undefined}
              onClick={handleProductClick}
              sx={{
                color: "black",
                padding: "10px 20px",
                fontSize: "17px",
              }}
            >
              {productOpen ? `제품🔼` : `제품🔽`}
            </Button>
            <Menu
              anchorEl={productAnchorEl}
              open={productOpen}
              onClose={handleProductClose}
            >
              <MenuItem onClick={handleProductClose}>SUV/RV</MenuItem>
              <MenuItem onClick={handleProductClose}>세단</MenuItem>
              <MenuItem onClick={handleProductClose}>전기차</MenuItem>
            </Menu>
          </div>
          <Typography variant="subtitle1">
            <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
              장바구니(0)
            </Link>
          </Typography>
          <Typography variant="subtitle1">
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/orderslist"
            >
              주문내역
            </Link>
          </Typography>
          {localStorage.getItem("accessToken") ? (
            <div>
              <Avatar
                sx={{ cursor: "pointer" }}
                src="/broken-image.png"
                id="user-info"
                aria-controls={userInfoOpen ? "user-info" : undefined}
                aria-haspopup="true"
                aria-expanded={userInfoOpen ? "true" : undefined}
                onClick={handleUserClick}
              />
              <Menu
                anchorEl={userInfoAnchorEl}
                open={userInfoOpen}
                onClose={handleUserClose}
              >
                <MenuItem onClick={handleMypage}>계정정보</MenuItem>
                <MenuItem onClick={handleAdminpage}>관리자 페이지</MenuItem>
                <MenuItem onClick={handlelogout}>로그아웃</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variants="subtitle1"
                sx={{ bgcolor: "primary.main", color: "white" }}
              >
                로그인
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
