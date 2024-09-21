import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";

const LoginSdt = () => {
  const [OTP, setOTP] = useState("");
  const [sdt, setSdt] = useState("");
  const [isSDT, setIsSDT] = useState(false);
  const [helptxt, setHelptxt] = useState("");
  const [isSentOTP, setIsSentOTP] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(true);

  const auth = getAuth();
  auth.useDeviceLanguage();
  const vietnamesePhoneNumberRegex = /^\+84\d{9,10}$/;

  const SendOTP = () => {
    if (!vietnamesePhoneNumberRegex.test("+84" + sdt)) {
      setHelptxt("Số điện thoại chưa đúng định dạng");
      setIsSDT(true);
      return;
    }

    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {});
      signInWithPhoneNumber(auth, "+84" + sdt, recaptcha)
        .then((res) => {
          window.confirmation = res.confirm;
          toast("Đã gửi OTP");
          setHelptxt("");
          setIsSDT(false);
          setIsSentOTP(true);
          setShowRecaptcha(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/invalid-phone-number") {
            setHelptxt("Số điện thoại chưa đúng định dạng");
            setIsSDT(true);
          }
          if (errorCode === "auth/too-many-requests") {
            setHelptxt("");
            setIsSDT(false);
            toast("Xin hãy đợi một chút trước khi thử lại");
          }
          console.log("Mã lỗi", errorCode);
          console.log("Tin nhắn lỗi", errorMessage);
        });
    } catch (error) {}
  };

  const CheckOTP = () => {
    if (OTP && window.confirmationResult) {
      window.confirmationResult
        .confirm(OTP)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("Đã đăng nhập thành công");
          setIsVerified(true);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.error("Mã OTP không hợp lệ");
        });
    } else {
      // Handle the case where OTP is not set or confirmation is not available
      console.error("Invalid OTP or confirmation not available");
    }
  };

  const SetPassword = () => {
    // Thực hiện xác nhận mật khẩu và lưu mật khẩu vào cơ sở dữ liệu
    // ở đây chúng ta chỉ hiển thị thông báo alert với mật khẩu, bạn có thể thay thế bằng thao tác lưu vào cơ sở dữ liệu thực tế.
    alert("Mật khẩu đã được cài đặt: " + OTP);
    setIsPasswordSet(true);
  };

  return (
    <Box width={"300px"} component={Paper} p={3}>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Số điện thoại"
        type="tel"
        fullWidth
        variant="standard"
        autoComplete="tel"
        error={isSDT}
        helperText={helptxt}
        onChange={(e) => setSdt(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">+84</InputAdornment>,
        }}
      />
      {showRecaptcha && <div id="recaptcha-container"></div>}

      {isSentOTP && (
        <>
          <FormControl
            margin="dense"
            autoFocus
            id="paswwort"
            variant="standard"
            fullWidth
            autoComplete="password"
          >
            <InputLabel htmlFor="standard-adornment-password">OTP</InputLabel>
            <Input
              id="standard-adornment-password"
              type="text"
              onChange={(e) => setOTP(e.target.value)}
              value={OTP}
            />
          </FormControl>

          {isVerified ? (
            <>
              {" "}
              <FormControl
                margin="dense"
                autoFocus
                id="password"
                variant="standard"
                fullWidth
                autoComplete="new-password"
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Mật khẩu
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type="password"
                  onChange={(e) => setOTP(e.target.value)}
                  value={OTP}
                />
              </FormControl>
              <Button variant="outlined" fullWidth onClick={SetPassword}>
                Cài mật khẩu
              </Button>
            </>
          ) : (
            <Button variant="outlined" fullWidth onClick={CheckOTP}>
              Đăng nhập
            </Button>
          )}
        </>
      )}

      {!isSentOTP && (
        <Button variant="outlined" fullWidth onClick={SendOTP}>
          Gửi OTP
        </Button>
      )}
    </Box>
  );
};

export default LoginSdt;
