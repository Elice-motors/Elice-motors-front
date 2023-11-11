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
import { deepOrange } from "@mui/material/colors";
import { logout } from "../../lib/api";
import { useLocalForage } from "../../LocalForageContext";

const Header = ({ sedanRef, suvRef, elecRef }) => {
  const [productAnchorEl, setProductAnchorEl] = useState(null);
  const [userInfoAnchorEl, setUserInfoAnchorEl] = useState(null);
  const productOpen = Boolean(productAnchorEl);
  const userInfoOpen = Boolean(userInfoAnchorEl);
  const navigate = useNavigate();
  const { clear } = useLocalForage();

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
  const handleSuvClick = () => {
    handleProductClose();
    navigate("/");
    if (suvRef.current) {
      suvRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSedanClick = () => {
    handleProductClose();
    navigate("/");
    if (sedanRef.current) {
      sedanRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleElecClick = () => {
    handleProductClose();
    navigate("/");
    if (elecRef.current) {
      elecRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleMypage = () => {
    handleUserClose();
    navigate("/mypage");
  };
  const handleAdminpage = () => {
    handleUserClose();
    navigate("/admin");
  };
  const handlelogout = async () => {
    handleUserClose();
    try {
      const response = await logout();
      if (response.status === 204) {
        localStorage.clear();
        clear().then(() => navigate("/"));
      }
    } catch (e) {
      if (e.response.status === 404) {
        alert("unknown error");
      }
    }
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
              제품
            </Button>
            <Menu
              anchorEl={productAnchorEl}
              open={productOpen}
              onClose={handleProductClose}
            >
              <MenuItem onClick={handleSuvClick}>SUV/RV</MenuItem>
              <MenuItem onClick={handleSedanClick}>세단</MenuItem>
              <MenuItem onClick={handleElecClick}>전기차</MenuItem>
            </Menu>
          </div>
          <Typography variant="subtitle1">
            <Link style={{ textDecoration: "none", color: "black" }} to="/cart">
              장바구니
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
                sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
                id="user-info"
                aria-controls={userInfoOpen ? "user-info" : undefined}
                aria-haspopup="true"
                aria-expanded={userInfoOpen ? "true" : undefined}
                onClick={handleUserClick}
              >
                U
              </Avatar>
              <Menu
                anchorEl={userInfoAnchorEl}
                open={userInfoOpen}
                onClose={handleUserClose}
              >
                <MenuItem onClick={handleMypage}>계정정보</MenuItem>
                {localStorage.getItem("role") === "ADMIN" ? (
                  <MenuItem onClick={handleAdminpage}>관리자 페이지</MenuItem>
                ) : null}
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
