import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

function isTodayInRange(start, end) {
  const today = moment();
  const startDate = moment(start);
  const endDate = moment(end);

  return today.isBetween(startDate, endDate, null, "[]"); // '[]' để bao gồm cả ngày bắt đầu và kết thúc
}
// Hàm tính tổng số tiền
function tinhTongSoTien(danhSach) {
  let tongTien = 0;

  danhSach.forEach((doiTuong) => {
    tongTien += doiTuong.soLuong * doiTuong.giaSanPham;
  });

  return tongTien;
}

const PaymentAndMoney = (props) => {
  const {
    note,
    setNote,
    setCash,
    setBank,
    setOther,
    cash,
    orther,
    bank,
    voucher,
    setVoucher,
    feeShip,
  } = props;

  const [voucherTXT, setVoucherTXT] = useState({});
  const maxCharacters = 255;

  const remainingCharacters = maxCharacters - note.length;
  const tienKhuyenMai = voucher
    ? voucher.giamGiaPhanTram > 0
      ? (tinhTongSoTien(props.products) / 100) * voucher.giamGiaPhanTram
      : voucher.giamGiaTruThang
    : 0;

  const tienPhaiTra =
    tinhTongSoTien(props.products) - tienKhuyenMai + (props.feeShip || 0);

  const tienThua = tienPhaiTra - cash - bank - orther;
  const handleNoteChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxCharacters) {
      setNote(inputText);
    }
  };

  const handleCheckVoucher = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/voucher/" + voucherTXT
      );
      if (res.status === 200) {
        if (isTodayInRange(res.data.batDau, res.data.ketThuc)) {
          setVoucher(res.data);
          toast.success("Đã thêm mã khuyến mãi thành công");
          console.log("Khuyen mãi", res.data);
        } else {
          toast.warning("Mã không được sử dụng lúc này");
        }
      }
    } catch (error) {
      toast.error("Mã không còn sử dụng được");
    }
  };

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Tổng tiền </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" variant="subtitle1">
          {Intl.NumberFormat("vi-VN").format(
            tinhTongSoTien(props.products) + feeShip
          )}{" "}
          đ
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id="Voucher"
          type="text"
          label="Mã khuyến mãi"
          size="small"
          onChange={(e) => setVoucherTXT(e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={4} align="right">
        {voucher ? (
          <Button
            color="error"
            onClick={() => {
              setVoucher();
            }}
          >
            Bỏ khuyến mãi
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleCheckVoucher();
            }}
          >
            ÁP dụng
          </Button>
        )}
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Khuyến mãi</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" variant="subtitle1">
          {voucher ? voucher.ten : "Không có khuyến mãi"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Khách cần trả</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" variant="subtitle1">
          {Intl.NumberFormat("vi-VN").format(tienPhaiTra > 0 ? tienPhaiTra : 0)}{" "}
          đ
        </Typography>
      </Grid>

      <Grid item xs={12} align="right">
        <TextField
          id="Paymentmonay"
          type="number"
          size="small"
          variant="outlined"
          label="Tiền mặt"
          value={cash}
          onChange={(e) => {
            if (e.target.value < 0) {
              setCash(0);
              return;
            }
            setCash(e.target.value);
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} align="right">
        <TextField
          id="Paymentmonay"
          type="number"
          size="small"
          value={bank}
          variant="outlined"
          label="Chuyển khoản"
          onChange={(e) => {
            if (e.target.value < 0) {
              setBank(0);
              return;
            }
            setBank(e.target.value);
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} align="right">
        <TextField
          fullWidth
          id="Paymentmonay"
          type="number"
          size="small"
          value={orther}
          onChange={(e) => {
            if (e.target.value < 0) {
              setOther(0);
              return;
            }
            setOther(e.target.value);
          }}
          variant="outlined"
          label="Phương thức thanh toán khác"
        />
      </Grid>
      <Grid item xs={12} align="right">
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
      </Grid>

      <Grid item xs={6}>
        <Typography variant="subtitle1">
          {tienThua > 0 ? "Khách còn thiếu" : " Tiền thừa"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" variant="subtitle1">
          {Intl.NumberFormat("vi-VN").format(
            tienThua >= 0 ? tienThua : -1 * tienThua
          )}{" "}
          đ
        </Typography>
      </Grid>
    </Grid>
  );
};
export default PaymentAndMoney;
