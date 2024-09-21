import {
  Box,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import CountUp from "react-countup";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const CartInfor = (props) => {
  const [cart, setCart] = useState(props.cart) || [];
  const [voucher, setVoucher] = useState({ giamGiaPhanTram: 0 });
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    setCart(props.cart);
  }, [props.cart]);

  const tinhTongTien = (danhSach) => {
    if (cart.length === 0) {
      return 0;
    }

    return danhSach.reduce((tongTien, doiTuong) => {
      const giaBan = doiTuong.sanPhamChiTiet.giaBan;
      const soLuong = doiTuong.soLuong;
      const tongTienDoiTuong = giaBan * soLuong;
      return tongTien + tongTienDoiTuong;
    }, 0);
  };
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
    if (code === "") {
      setHelperText("Hãy nhập mã ở đây");
      setIsError(true);
      setVoucher({ giamGiaPhanTram: 0 });
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/voucher/" + code);
      if (res.status === 200) {
        if (isTodayInRange(res.data.batDau, res.data.ketThuc)) {
          setVoucher(res.data);
          console.log("Đã lấy được khuyến mãi ", res.data);
          setHelperText("");
          setIsError(false);
        } else {
          setHelperText("Mã khuyến mãi này hiện không còn sử dụng được");
          setIsError(true);
          setVoucher({ giamGiaPhanTram: 0 });
        }
      }
    } catch (error) {
      setHelperText("Mã khuyến mãi không sử dụng được");
      setIsError(true);
      setVoucher({ giamGiaPhanTram: 0 });
      console.log(error);
    }
  };
  return (
    <>
      <Box p={1} component={Paper} elevation={2}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            id="outlined-basic"
            label="mã giảm giá"
            variant="outlined"
            size="small"
            error={isError}
            helperText={helperText}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              getVoucher();
            }}
          >
            Áp dụng mã
          </Button>
        </Stack>

        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Tạm tính :{" "}
          <CountUp
            start={12213 / 2}
            end={tinhTongTien(cart)}
            duration={1}
            separator=","
            decimal=","
            prefix=" "
            suffix=" ₫"
          />
        </Typography>

        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Giảm giá :{" "}
          {Intl.NumberFormat("vi-VN").format(
            voucher.giamGiaTruThang > 0
              ? voucher.giamGiaTruThang
              : voucher.giamGiaPhanTram
          )}{" "}
          {voucher.giamGiaTruThang > 0 ? " ₫" : " %"}
        </Typography>

        {}
        <hr />
        <Typography my={1} variant="button" fontWeight={"bolder"}>
          Tổng tiền :
          <CountUp
            start={12213 / 2}
            end={
              voucher.giamGiaTruThang > 0
                ? tinhTongTien(cart) - voucher.giamGiaTruThang
                : tinhTongTien(cart) -
                  (tinhTongTien(cart) / 100) * voucher.giamGiaPhanTram
            }
            duration={1}
            separator=","
            decimal=","
            prefix=" "
            suffix=" ₫"
          />
        </Typography>
        <hr />
        <Typography
          my={1}
          variant="caption"
          color="text.secondary"
          fontWeight={"bolder"}
        >
          ở đây đơn giản là thông báo một điều gì đó mà khách hàng có thể không
          biết
        </Typography>
        <hr />
        {props.cart.length > 0 ? (
          <Button
            style={{ width: "100%" }}
            variant="outlined"
            endIcon={<ArrowRightIcon />}
            href={
              "/payment" +
              (voucher.ma === undefined ? "" : "?voucher=" + voucher.ma)
            }
          >
            Thanh toán
          </Button>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
export default CartInfor;
