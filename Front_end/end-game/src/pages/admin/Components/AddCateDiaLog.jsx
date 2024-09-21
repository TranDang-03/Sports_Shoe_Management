import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormDialogAddCate(props) {
  const [open, setOpen] = React.useState(false);
  const [brand, setBrand] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addBrand = async () => {
    if (brand.length > 50) {
      toast.warning("Độ dài tên không được quá 50 kí tự");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/thuong-hieu/create", {
        ten: brand.trim(),
        trangThai: true,
      });
      if (res.status === 201) {
        if (res.data === null) {
          toast.warning("Tên thương hiệu này đã tồn tại");
          return;
        }
        toast("Đã thêm thương hiệu thành công");
        handleClose();
        props.getBrands();
      }
    } catch (error) {
      toast.error(error.response.data.message || "Lưu thông không thành công");
      console.error("Lỗi:", error);
    }
  };
  return (
    <React.Fragment>
      <Tooltip title="Thêm thương hiệu mới">
        <IconButton
          onClick={handleClickOpen}
          sx={{ height: "100%", width: "100%" }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm thương hiệu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn hãy nhập tên thương hiệu ở ô bên dưới .
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={addBrand}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
