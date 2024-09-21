import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, Container, Grid, TextField, Tooltip } from "@mui/material";

import { getAuth } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GiaoHangTest from "../../../test/GiaoHangNhanhTesst";

export default function EditOder(props) {
  const [isManager, setIsManager] = useState(false);
  const [open, setOpen] = useState(false);
  const [feeShip, setFeeShip] = useState(0);
  const [adress, setAdress] = useState("");
  const [providerWard, setProviderWard] = useState("");
  const [name, setName] = useState(props.bill.tenNguoiNhan || "");
  const [tel, setTel] = useState(props.bill.sdtNhanHang || "");
  const telRegex = /^(0[0-9]{9}|84[0-9]{9})$/;
  const [isUpdateFee, setIsUpdateFee] = useState(false);

  const auth = getAuth();
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
  const handleSubmit = () => {
    if (name.trim() === "") {
      toast.warning("Hãy nhập tên người nhận");
    } else if (tel.trim() === "") {
      toast.warning("Hãy nhập số điện thoại");
    } else if (!telRegex.test(tel.trim())) {
      toast.warning("Hãy nhập số điện thoại Việt Nam");
    } else if (adress.trim() === "") {
      toast.warning("Hãy nhập địa chỉ");
    } else {
      submidas();
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

  const submidas = async () => {
    try {
      const res = await axios.put("http://localhost:8080/api/admin/hoa-don", {
        id: props.bill.id,
        diaChiCuThe: adress + ", " + providerWard || props.bill.diaChiCuThe,
        phiVanChuyen: isUpdateFee ? feeShip : props.bill.phiVanChuyen,
        trangThai: props.bill.trangThai,
        sdtNhanHang: tel || props.bill.sdtNhanHang,
        tenNguoiNhan: name || props.bill.tenNguoiNhan,
      });
      if (res.status === 200) {
        toast.success("Lưu thành công");
        window.location.reload();
      } else {
        toast.warning("Lưu không thành công");
      }
    } catch (error) {}
  };
  const handleChange = (event) => {
    setIsUpdateFee(event.target.checked);
  };
  return (
    <React.Fragment>
      <Tooltip title="Chỉnh sửa thông tin đơn hàng (chỉ quản lý mới có quyền)">
        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={handleClickOpen}
          sx={{ height: "100%", width: "100%" }}
        >
          Chỉnh sửa
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thông tin hóa đơn </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ width: "500px" }} pt={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="outlined-required"
                label="Tên người nhận"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={props.bill.tenNguoiNhan}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type="tel"
                onChange={(e) => {
                  setTel(e.target.value);
                }}
                id="outlined-1"
                label="Số điện thoại"
                defaultValue={props.bill.sdtNhanHang}
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                checked={isUpdateFee}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />{" "}
              Cập nhật phí vận chuyển{" "}
              {Intl.NumberFormat("vi-VN").format(feeShip) + " ₫" || ""} ?
            </Grid>
          </Grid>

          <GiaoHangTest
            setFeeShip={setFeeShip}
            setAdress={setAdress}
            setProviderWard={setProviderWard}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
