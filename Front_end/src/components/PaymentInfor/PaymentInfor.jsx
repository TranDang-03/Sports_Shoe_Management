import {
  Box,
  Typography,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  TextField,
  Link,
} from "@mui/material";

import PropTypes from "prop-types";
import CountUp from "react-countup";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import SimpleDialog from "../QRdialog/QRdialog";
import React, { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

class HoaDon {
  constructor(
    ngayTao,
    ghiChu,
    tenNguoiNhan,
    ngayCapNhat,
    trangThai,
    loaiHoaDon,
    diaChiCuThe,
    phiVanChuyen,
    sdtNhanHang,
    taiKhoan,
    chiTietHoaDonList
  ) {
    this.ngayTao = ngayTao;
    this.ghiChu = ghiChu;
    this.tenNguoiNhan = tenNguoiNhan;
    this.ngayCapNhat = ngayCapNhat;
    this.trangThai = trangThai;
    this.loaiHoaDon = loaiHoaDon;
    this.diaChiCuThe = diaChiCuThe;
    this.phiVanChuyen = phiVanChuyen;
    this.sdtNhanHang = sdtNhanHang;
    this.taiKhoan = taiKhoan;
    this.chiTietHoaDonList = chiTietHoaDonList;
  }
}

const PaymentInfor = (props) => {
  const [voucherCodex, setVoucherCodex] = useState({ giamGiaTruThang: 0 });
  const [open, setOpen] = useState(false);

  const [payment, setPayment] = useState(1);
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");
  const [hoaDonExample, setHoaDonExample] = useState({});
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);
  const auth = getAuth();
  const maxCharacters = 255;

  useEffect(() => {
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
  useEffect(() => {
    if (currentUserLoaded) {
      loadCart();
      getVoucher();
    }
  }, [currentUserLoaded]);

  const loadCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/gio-hang/" + auth.currentUser.uid
      );

      setCart(response.data);
      console.log("Danh sách giỏ hàng: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách giỏ hàng không tải được");
    }
  };

  const tinhTongTien = (danhSach) => {
    if (danhSach === 0) {
      return;
    }

    return danhSach.reduce((tongTien, doiTuong) => {
      const giaBan = doiTuong.sanPhamChiTiet.giaBan;
      const soLuong = doiTuong.soLuong;
      const tongTienDoiTuong = giaBan * soLuong;
      return tongTien + tongTienDoiTuong;
    }, 0);
  };

  const handleClickOpenQR = () => {
    console.log(
      "Đơn hàng đang có: tên người nhận",
      props.name + " , sdt",
      props.tel + " , feeship",
      props.feeShip + " , địa chỉ",
      props.address + " , ",
      props.providerWard + " , ghi chú " + note
    );

    const errors = validateInformation(props);

    if ("name" in errors) {
      props.setIsErrorName(true);
      props.setHTName(errors.name);
    } else {
      props.setIsErrorName(false);
      props.setHTName("");
    }

    if ("tel" in errors) {
      props.setIsErrorTel(true);
      props.setHTTel(errors.tel);
    } else {
      props.setIsErrorTel(false);
      props.setHTTel("");
    }

    if ("address" in errors) {
      toast.info("Hãy nhập địa chỉ ");
    }

    if (Object.keys(errors).length === 0) {
      props.setIsErrorName(false);
      props.setHTName("");
      props.setIsErrorTel(false);
      props.setHTTel("");
      setHoaDonExample(
        new HoaDon(
          new Date(), // Replace with the appropriate value for ngayTao
          note,
          props.name,
          new Date(), // Replace with the appropriate value for ngayCapNhat
          0, // Replace with the appropriate value for trangThai
          true, // Replace with the appropriate value for loaiHoaDon
          props.address + "," + props.providerWard,
          props.feeShip, // Replace with the appropriate value for phiVanChuyen
          props.tel, // Replace with the appropriate value for sdtNhanHang
          { uid: auth.currentUser.uid, email: auth.currentUser.email } // Replace with an instance of TaiKhoan
        )
      );
      setTimeout(setOpen(true), 2000);
    }
  };

  function validateInformation(props) {
    const errors = {};

    // Kiểm tra trường 'name'
    if (!props.name || props.name.trim() === "") {
      errors.name = "Vui lòng nhập tên người nhận ";
    }
    if (props.name.trim().length > 69) {
      errors.name = "Vui lòng nhập tên ngắn gọn hơn";
    }

    // Kiểm tra trường 'tel'
    const telRegex = /^(0[0-9]{9}|84[0-9]{9})$/;
    if (!telRegex.test(props.tel)) {
      errors.tel =
        "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.";
    }

    // Kiểm tra trường 'adress'
    if (!props.address || props.address.trim() === "") {
      errors.address = "Vui lòng nhập địa chỉ";
    }

    // Kiểm tra trường 'providerWard'
    if (!props.providerWard || props.providerWard.trim() === "") {
      errors.providerWard = "Vui lòng chọn xã/phường";
    }

    return errors;
  }

  const handleCloseQR = (value) => {
    setOpen(false);
  };
  const feeShip = props.feeShip;

  // const HoanTatDatHang = () => {};
  function isTodayInRange(startDate, endDate) {
    // Lấy ngày hôm nay
    const today = moment();

    // Chuyển đổi ngày bắt đầu và kết thúc thành đối tượng moment
    const start = moment(startDate);
    const end = moment(endDate);

    // Kiểm tra xem ngày hôm nay có nằm trong khoảng không
    const isInRange = today.isBetween(start, end, null, "[]");

    return isInRange;
  }

  const getVoucher = async () => {
    const urlParams = new URLSearchParams(window.location.search);

    const voucherCode = urlParams.get("voucher");
    console.log("Mã km ", voucherCode);
    if (voucherCode !== null) {
      try {
        const res = await axios.get(
          "http://localhost:8080/voucher/" + voucherCode
        );
        if (res.status === 200) {
          if (isTodayInRange(res.data.batDau, res.data.ketThuc)) {
            setVoucherCodex(res.data);
          } else {
            toast("Khuyến mãi không khả dụng");
            setVoucherCodex({ giamGiaTruThang: 0 });
          }
        }
      } catch (error) {
        console.log(error);
        toast("Khuyến mãi không khả dụng");
        setVoucherCodex({ giamGiaTruThang: 0 });
      }
    }
  };

  const handleNoteChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxCharacters) {
      setNote(inputText);
    }
  };
  const remainingCharacters = maxCharacters - note.length;
  return (
    <>
      <SimpleDialog
        price={
          (tinhTongTien(cart) -
            (voucherCodex.ma !== undefined
              ? voucherCodex.giamGiaTruThang > 0
                ? voucherCodex.giamGiaTruThang
                : (tinhTongTien(cart) / 100) * voucherCodex.giamGiaPhanTram
              : 0) <
          0
            ? 0
            : tinhTongTien(cart) -
              (voucherCodex.ma !== undefined
                ? voucherCodex.giamGiaTruThang > 0
                  ? voucherCodex.giamGiaTruThang
                  : (tinhTongTien(cart) / 100) * voucherCodex.giamGiaPhanTram
                : 0)) + feeShip
        }
        open={open}
        payment={payment}
        onClose={handleCloseQR}
        hoaDon={hoaDonExample}
        voucherCodex={voucherCodex}
      />
      <Box p={1} component={Paper} elevation={2}>
        <Typography variant="subtitle2"> Danh sách sản phẩm </Typography>
        {cart.map((item) => {
          return (
            <Box key={item.id}>
              <Typography my={1} variant="overline">
                {item.sanPhamChiTiet.sanPham.tenSanPham} (
                {item.sanPhamChiTiet.mauSac.ten} /{" "}
                {item.sanPhamChiTiet.kichThuoc.giaTri})
                <CountUp
                  start={12213 / 2}
                  end={item.soLuong}
                  duration={1}
                  separator=","
                  decimal=","
                  prefix=" x"
                  suffix=""
                  style={{ fontWeight: "bold", float: "right" }}
                />
              </Typography>
            </Box>
          );
        })}

        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Mã khuyến mãi :{" "}
          {voucherCodex ? voucherCodex.ten : "Không có khuyến mãi"}
        </Typography>
        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Phí vận chuyển :
          <CountUp
            start={feeShip / 2}
            end={feeShip}
            duration={1}
            separator=","
            decimal=","
            prefix=" "
            suffix=" vnđ"
          />
        </Typography>
        <hr />
        <Typography
          my={1}
          variant="button"
          fontSize={"1.2em"}
          fontWeight={"bolder"}
        >
          Tổng Tiền :
          <CountUp
            start={100}
            end={
              (tinhTongTien(cart) -
                (voucherCodex.ma !== undefined
                  ? voucherCodex.giamGiaTruThang > 0
                    ? voucherCodex.giamGiaTruThang
                    : (tinhTongTien(cart) / 100) * voucherCodex.giamGiaPhanTram
                  : 0) <
              0
                ? 0
                : tinhTongTien(cart) -
                  (voucherCodex.ma !== undefined
                    ? voucherCodex.giamGiaTruThang > 0
                      ? voucherCodex.giamGiaTruThang
                      : (tinhTongTien(cart) / 100) *
                        voucherCodex.giamGiaPhanTram
                    : 0)) + feeShip
            }
            duration={1}
            separator=","
            decimal=","
            prefix=" "
            suffix=" vnđ"
          />
        </Typography>
        <hr />

        <TextField
          id="outlined-multiline-flexible"
          label={`Ghi chú (${remainingCharacters} ký tự còn lại)`}
          multiline
          fullWidth
          maxRows={4}
          inputProps={{ maxLength: maxCharacters }}
          value={note}
          onChange={handleNoteChange}
        />
        <hr />

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={1}
            name="radio-buttons-group"
            onChange={(e) => {
              setPayment(e.target.value);
            }}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Thanh toán khi nhận hàng"
              name="PayMentType"
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Thanh toán qua MOMO"
              name="PayMentType"
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="Chuyển khoản ngân hàng"
              name="PayMentType"
            />
          </RadioGroup>
        </FormControl>
        <hr />
        <Button
          style={{ width: "100%" }}
          variant="outlined"
          endIcon={<ArrowRightIcon />}
          onClick={handleClickOpenQR}
        >
          Đặt hàng
        </Button>

        <Button
          size="small"
          LinkComponent={Link}
          href="http://localhost:3000/cart"
        >
          quay lại giỏ hàng
        </Button>
      </Box>
    </>
  );
};
export default PaymentInfor;
