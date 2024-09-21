import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./Components/ListItems";
import { Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Button, Link } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      This Store have Fantastic Four
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [isManager, setIsManager] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [pageName, setPageName] = React.useState("Tổng quan");
  const [currentUserLoaded, setCurrentUserLoaded] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    switch (window.location.pathname) {
      case "/admin/products":
        setPageName("Quản trị sản phẩm");

        break;

      default:
        setPageName("Fantastic Four");
        break;
    }
  }, []);

  const auth = getAuth();

  React.useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        console.log("Người dùng hiện tại: " + user.uid);
        setCurrentUserLoaded(true);
      } else {
        console.log("Người dùng chưa được xác thực.");
      }
    };

    auth.onAuthStateChanged((user) => {
      checkAuth();
    });
  }, [auth]);
  React.useEffect(() => {
    if (currentUserLoaded) {
      checkIsmanaGer();
    }
  }, [currentUserLoaded]);

  const checkIsmanaGer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/tai-khoan/chuc-vu?uid=" + auth.currentUser.uid
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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {pageName}
            </Typography>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        {/* phần thân của trang */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* từ đây sẽ được thay đổi */}

          {isManager ? (
            <Outlet />
          ) : (
            <Button
              sx={{ height: "90dvh" }}
              fullWidth
              LinkComponent={Link}
              href="http://localhost:3000/"
              startIcon={<CircularProgress />}
            >
              Hãy sử dụng tài khoản của nhân viên hoặc kiểm tra kết nối mạng
            </Button>
          )}
          <Copyright />

          {/* đây là hết */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
