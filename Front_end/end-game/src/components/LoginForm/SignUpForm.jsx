import {
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
} from "@mui/material";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

const SignUpForm = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const [open, setOpen] = useState(false);

  const auth = getAuth();
  auth.useDeviceLanguage();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email2) => {
    if (email2.trim === "") {
      return false;
    }
    // Sử dụng regular expression để kiểm tra định dạng email
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setHelperTextPassword("");
    setIsPass(false);
    setOpen(false);
  };

  const handleSubmit = (text) => {
    setHelperText("");
    setIsEmail(false);
    if (validateEmail(text)) {
      if (password.length < 8 || rePassword.length < 8) {
        setHelperTextPassword("Mật khẩu nhập chưa đủ 8 kí tự");
        setIsPass(true);
      } else if (!/(?=.*[A-Z])/.test(password) || !/(?=.*\d)/.test(password)) {
        setHelperTextPassword(
          "Mật khẩu phải chứa ít nhất 1 kí tự in hoa và 1 số"
        );
        setIsPass(true);
      } else if (password !== rePassword) {
        setHelperTextPassword("Mật khẩu nhập lại không trùng khớp");
        setIsPass(true);
      } else {
        createUserWithEmailAndPassword(auth, text, password)
          .then(() => {
            sendEmailVerification(auth.currentUser);
            toast(
              "Chúng tôi vừa gửi cho bạn email để xác thực địa chỉ email này"
            );
            setOpen(false);
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
            if (errorCode === "auth/missing-email") {
              toast("Hãy nhập email");
            }
            if (errorCode === "auth/too-many-requests") {
              toast("hãy đợi 1 chút");
            }
            console.log("Mã lỗi", errorCode);
            console.log("Tin nhắn lỗi", errorMessage);
            setOpen(false);
          });
        setHelperTextPassword("");
        setIsPass(false);
      }
    } else {
      setHelperText("Email định dạng chưa chính xác");
      setIsEmail(true);
    }
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleOnChangeRePassword = (e) => {
    setRePassword(e.target.value);
  };

  return (
    <>
      <Box px={3}>
        <Button variant="text" size="large" onClick={handleClickOpen}>
          Đăng ký
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Đăng kí</DialogTitle>
          <DialogContent>
            <form>
              <DialogContentText>
                Hãy điền đầy đủ thông tin bên dưới
              </DialogContentText>

              <FormControl
                autoComplete="Mailx"
                autoFocus
                margin="dense"
                id="EmailSDT"
                variant="standard"
                onChange={(e) => {
                  handleOnChangeEmail(e);
                }}
                fullWidth
                error={isEmail}
              >
                <InputLabel htmlFor="standard-adornment-Email">
                  Email
                </InputLabel>
                <Input
                  id="standard-adornment-Email"
                  type="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="  visibility">
                        <AttachEmailIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="email-helper-text">
                  {isEmail ? helperText : ""}
                </FormHelperText>
              </FormControl>

              <FormControl
                autoComplete="pass"
                autoFocus
                margin="dense"
                id="paswwort"
                variant="standard"
                onChange={(e) => handleOnChangePassword(e)}
                fullWidth
                error={isPass}
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
                <FormHelperText id="email-helper-text">
                  {isPass ? helperTextPassword : ""}
                </FormHelperText>
              </FormControl>
              <FormControl
                autoFocus
                margin="dense"
                id="paswwort"
                variant="standard"
                onChange={(e) => {
                  handleOnChangeRePassword(e);
                }}
                fullWidth
                autoComplete="password"
                error={isPass}
              >
                <InputLabel htmlFor="standard-adornment-password2">
                  Nhập lại mật khẩu
                </InputLabel>
                <Input
                  id="standard-adornment-password2"
                  type={showPassword2 ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="email-helper-text">
                  {isPass ? helperTextPassword : ""}
                </FormHelperText>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button id="sign-in-button" onClick={() => handleSubmit(email)}>
              Đăng ký
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default SignUpForm;
