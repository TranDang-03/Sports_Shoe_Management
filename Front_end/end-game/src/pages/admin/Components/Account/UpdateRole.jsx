import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateRole = (props) => {
  const auth = getAuth();
  const [isManager, setIsManager] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = async () => {
    await checkIsmanaGer();
    if (isManager) {
      setOpen(true);
    }

    return;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Update = async (user, role) => {
    if (!auth.currentUser) {
      toast("xin hãy đợi 1 chút");
      setOpen(false);
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:8080/tai-khoan/update?uid=" +
          user.uid +
          "&role=" +
          role
      );
      if (res.status === 200) {
        setOpen(false);
        window.location.reload();
      }
      console.log(res.status);
    } catch (error) {
      if (error.response.status === 404) {
        setOpen(false);
        toast.warning("không thể sửa quyền của quản lý cuối cùng");
      }
      console.log("loi", error);
    }
  };

  const checkIsmanaGer = async () => {
    console.log("id nguowfi dungf ", auth.currentUser.uid);
    try {
      const res = await axios.get(
        "http://localhost:8080/tai-khoan/chuc-vu?uid=" + auth.currentUser.uid
      );
      if (res.data === 0) {
        setIsManager(true);
      } else {
        toast.warning("Bạn không phải quản lý");
        setIsManager(false);
      }
    } catch (error) {
      window.location.href = "http://localhost:3000/login";
    }
  };
  return (
    <>
      <Tooltip title="double click để Chỉnh sửa chức vụ">
        <IconButton onClick={handleClickOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cập nhật chức vụ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chỉnh sửa chức vụ cho tài khoản này
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => Update(props.user, 1)}>khách hàng</Button>
          <Button onClick={() => Update(props.user, 2)}>Nhân viên</Button>
          <Button onClick={() => Update(props.user, 0)}>Quản Lý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UpdateRole;
