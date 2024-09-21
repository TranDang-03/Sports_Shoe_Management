import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { Logout } from "@mui/icons-material";
import { auth } from "../../../configs/FireBaseConfig/FireBaseConfig";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
const logOut2 = () => {
  auth.signOut().then(() => (window.location.href = "/login"));
};
export const mainListItems = (
  <React.Fragment>
    <ListItemButton LinkComponent={Link} to="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Tổng quan" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to="/admin/offline">
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="Bán hàng" />
    </ListItemButton>

    <ListItemButton LinkComponent={Link} to="/admin/orders">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to="/admin/account">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to="/admin/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Báo cáo" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to="/admin/products">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to="/admin/promotion">
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
      <ListItemText primary="Khuyến mãi" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton
      onClick={() => {
        logOut2();
      }}
    >
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Đăng xuất" />
    </ListItemButton>
  </React.Fragment>
);
