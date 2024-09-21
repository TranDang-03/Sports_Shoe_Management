import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { auth } from "../../configs/FireBaseConfig/FireBaseConfig";
import axios from "axios";

import { useEffect } from "react";

const AvatarHeader = () => {
  const [isManager, setIsManager] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    checkIsmanaGer();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLinkCart = () => {
    window.location.href = "/cart";
  };

  const handleLinkAdmin = () => {
    window.location.href = "/admin";
  };

  const logOut2 = () => {
    auth.signOut().then(() => (window.location.href = "/login"));
  };
  const user = auth.currentUser;

  let nameIcon = "";
  let imgIcon = "";

  try {
    nameIcon = user.displayName;
    imgIcon = user.photoURL;
  } catch {
    nameIcon = "";
    imgIcon = "";
  }

  const proFile = () => {
    window.location.href = "http://localhost:3000/profile";
  };

  const checkIsmanaGer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/tai-khoan/chuc-vu?uid=" + user.uid
      );

      if (res.data === 0 || res.data === 2) {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    } catch (error) {
      window.location.href = "http://localhost:3000/login";
    }
  };

  return (
    <Box ml={2}>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ mr: 2 }}
      >
        <Avatar alt={nameIcon} src={imgIcon} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={proFile}>
          <Avatar /> Hồ sơ
        </MenuItem>
        <MenuItem onClick={handleLinkCart}>
          <Avatar>
            <ShoppingCartIcon fontSize="small" />
          </Avatar>
          Giỏ hàng
        </MenuItem>
        {/* <MenuItem onClick={handleLinkOder}>
          <Avatar>
            <LocalShippingIcon fontSize="small" />
          </Avatar>
          Đơn hàng
        </MenuItem> */}
        {isManager ? (
          <MenuItem onClick={handleLinkAdmin}>
            <Avatar>
              <ManageAccountsIcon fontSize="small" />
            </Avatar>
            Nhân viên
          </MenuItem>
        ) : (
          ""
        )}

        <Divider />

        <MenuItem onClick={logOut2}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default AvatarHeader;
