import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              aria-controls={open ? "product-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "black", padding: "10px 20px", fontSize: "17px" }}
            >
              {open ? `제품🔼` : `제품🔽`}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>SUV/RV</MenuItem>
              <MenuItem onClick={handleClose}>세단</MenuItem>
              <MenuItem onClick={handleClose}>전기차</MenuItem>
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
          <Link to="/login">
            <Button
              variants="subtitle1"
              sx={{ bgcolor: "#035afc", color: "white" }}
            >
              로그인
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
