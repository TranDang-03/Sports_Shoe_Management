import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";

import { auth } from "../../configs/FireBaseConfig/FireBaseConfig";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [emailHT, setEmailHT] = useState("");
  const [password, setPassword] = useState("");
  const [isError2, setIsError2] = useState(false);
  const [emailHT2, setEmailHT2] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [alertText, setAlertText] = useState("");

  auth.onAuthStateChanged((user) => {
    if (user != null && user.emailVerified) {
      axios
        .post("http://localhost:8080/tai-khoan/create", {
          uid: user.uid,
          ten: user.displayName,
          sdt: "",
          email: user.email,
          trangThai: true,
        })
        .then((res) => {
          window.location.href = "/";
          setOpen(false);
        });
    }
  });

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForgotPass = () => {
    try {
      const emailPropmt = prompt("hãy nhập email của bạn");
      if (emailPropmt) {
        sendPasswordResetEmail(auth, emailPropmt)
          .then(() => {
            toast("hãy kiểm tra hòm thư của bạn");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === "auth/email-already-in-use") {
              toast("Email này hiện đang được sử dụng bởi khách hàng khác");
            }
            if (errorCode === "auth/invalid-email") {
              toast("Email chưa đúng định dạng");
            }
            if (errorCode === "auth/user-not-found") {
              toast("Không tìm thấy người dùng");
            }
            if (errorCode === "auth/missing-email") {
              toast("Hãy nhập email");
            }
            console.log("Mã lỗi", errorCode);
            console.log("Tin nhắn lỗi", errorMessage);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = () => {
    setEmailHT("");
    setIsError(false);
    setEmailHT2("");
    setIsError2(false);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);

        if (user.emailVerified) {
          if (user.displayName == null) {
            setAlertText("Chào mừng bạn đến với cửa hàng FANTASTIC FOUR");
            axios
              .post("http://localhost:8080/tai-khoan/create", {
                uid: user.uid,
                ten: user.displayName,
                sdt: "",
                email: user.email,
                trangThai: true,
              })
              .then((res) => {
                setInterval(() => {
                  window.location.href = "/";
                }, 3000);
              });
          } else {
            setAlertText("Đăng nhập thành công người dùng " + user.displayName);
            axios
              .post("http://localhost:8080/tai-khoan/create", {
                uid: user.uid,
                ten: user.displayName,
                sdt: "",
                email: user.email,
                trangThai: true,
              })
              .then((res) => {
                setInterval(() => {
                  window.location.href = "/";
                }, 1000);
              });
          }
          handleClick2();
        } else {
          toast("Hãy xác thực email này để có thể mua hàng");
          setInterval(() => {
            sendEmailVerification(auth.currentUser);
          }, 4000);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          toast.error("Email hoặc mật khẩu không chính xác");
          return;
        }
        if (errorCode === "auth/invalid-email") {
          setEmailHT("Email không hợp lệ");
          setIsError(true);
          return;
        }
        if (errorCode === "auth/missing-email") {
          setEmailHT("Email không hợp lệ");
          setIsError(true);
          return;
        }
        if (errorCode === "auth/missing-password") {
          setEmailHT2("Mật khẩu trống, hãy nhập mật khẩu");
          setIsError2(true);
          return;
        }
        if (errorCode === "auth/too-many-requests") {
          toast("Hãy đợi 1 chút");

          return;
        }
        if (errorCode === "auth/wrong-password") {
          toast.error("Email hoặc mật khẩu không chính xác");

          return;
        }
        setAlertText("Đăng nhập không thành công lỗi " + errorMessage);

        console.log("Mã lỗi", errorCode);
        console.log("Tin nhắn lỗi", errorMessage);
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          toast("Email này hiện đang được sử dụng bởi khách hàng khác");
        }
        if (errorCode === "auth/invalid-email") {
          toast("Email chưa đúng định dạng");
        }
        if (errorCode === "auth/user-not-found") {
          toast("Không tìm thấy người dùng");
        }
        if (errorCode === "auth/missing-email") {
          toast("Hãy nhập email");
        }
      });
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };
  return (
    <>
      <Snackbar
        open={open2}
        autoHideDuration={6000}
        onClose={handleClose2}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose2} severity="info" sx={{ width: "100%" }}>
          {alertText}
        </Alert>
      </Snackbar>
      <Box px={3} pt={3}>
        <Button variant="text" size="large" onClick={handleClickOpen}>
          Đăng nhập
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ĐĂNG NHẬP</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hãy đăng nhập để có trải nhiệm tốt nhất
            </DialogContentText>
            <form>
              <TextField
                helperText={emailHT}
                error={isError}
                autoFocus
                margin="dense"
                id="name"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                autoComplete="user name"
                onChange={(e) => handleOnChangeEmail(e)}
              />

              <FormControl
                error={isError2}
                margin="dense"
                autoFocus
                id="paswwort"
                variant="standard"
                onChange={(e) => handleOnChangePassword(e)}
                fullWidth
                autoComplete="password"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Mật khẩu
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="standard-adornment-password">
                  {isError2 ? emailHT2 : ""}
                </FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <IconButton
              aria-label="google"
              color="primary"
              onClick={googleSignIn}
            >
              <GoogleIcon />
            </IconButton>
            <Button onClick={handleForgotPass}>Quên mật khẩu</Button>
            <Button onClick={() => handleSignIn()}>Đăng nhập</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default LoginForm;
