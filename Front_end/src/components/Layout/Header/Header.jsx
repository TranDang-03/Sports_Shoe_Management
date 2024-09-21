import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import AvatarHeader from "../../AvatarHeader/AvatarHeader";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../configs/FireBaseConfig/FireBaseConfig";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      window.location.href =
        "http://localhost:3000/search?search=" + searchValue;
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const [user] = useAuthState(auth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" ml={2} component="div" sx={{ flexGrow: 1 }}>
            FANTASTIC FOUR
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm"
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onKeyDown={handleEnterPress}
              onChange={handleInputChange}
            />
          </Search>
          <NavLink to={"/"} style={{ color: "white", marginLeft: "20px" }}>
            <Button color="inherit">Trang chủ</Button>
          </NavLink>
          <NavLink to={"/products"} style={{ color: "white" }}>
            <Button color="inherit">Sản phẩm</Button>
          </NavLink>

          {!user ? (
            <NavLink to={"/login"} style={{ color: "white" }}>
              <Button color="inherit">Đăng nhập</Button>
            </NavLink>
          ) : (
            <AvatarHeader />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
