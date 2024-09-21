import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { IconButton, Tooltip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";

import { useState } from "react";

import { useReactToPrint } from "react-to-print";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";

import { useRef } from "react";
import { useEffect } from "react";
import OrderProducts from "./Arow/Orders";

export default function ExportPDF(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const conponentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Hóa đơn",
    onAfterPrint: () => alert("Không tìm thấy máy in, đã lưu trong PDF"),
  });

  const { id } = props;
  const [bill, setBill] = useState({ trangThai: 0, chiTietHoaDonList: [] });
  const [paymentMethot, setPaymentMethot] = useState([]);
  const [voucherOfBill, setVoucherOfBill] = useState({});

  useEffect(() => {
    feachtData();
    getVoucher();
    getPaymentMethot();
  }, []);

  const feachtData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/getOneBill/" + id);
      setBill(res.data);
      console.log("Hóa đơn đang có", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  function removeTextBetweenStars(inputString) {
    const regex = /\*.*?\*/g;
    return inputString.replace(regex, "");
  }
  function getTextBetweenStars(inputString) {
    const regex = /\*(.*?)\*/g;
    const matches = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  }

  const getVoucher = async () => {
    try {
      const res = await axios.get("http://localhost:8080/voucherBill/" + id);
      setVoucherOfBill(res.data);
      console.log("khuyến mãi ", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getPaymentMethot = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/payment-bill/bill/" + id
      );
      setPaymentMethot(res.data);
      console.log("Phương thức thanh toán ", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Tooltip title="Xuất hóa đơn">
        <IconButton
          onClick={handleClickOpen}
          sx={{ height: "100%", width: "100%" }}
        >
          <PictureAsPdfIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box
            ref={conponentPDF}
            mt={10}
            mx={2}
            component={Paper}
            pt={3}
            pb={6}
            px={3}
          >
            <Typography variant="h1" sx={{ fontWeight: "900" }} color={"blue"}>
              Fantastic Four
            </Typography>
            <Grid container spacing={2} mt={3} pb={3}>
              <Grid item xs={6}>
                <Stack spacing={0}>
                  <Typography variant="overline">
                    <strong>Kênh bán hàng:</strong>{" "}
                    {bill.loaiHoaDon ? "Online" : "Offline"}
                  </Typography>
                  <Typography variant="subtitle2">
                    <strong>Mã đơn hàng: </strong>{" "}
                    {getTextBetweenStars(bill.ghiChu || "")}
                  </Typography>
                  <Typography variant="overline">
                    <strong>Tên khách hàng:</strong> {bill.tenNguoiNhan}
                  </Typography>
                  <Typography variant="overline">
                    <strong>Ngày tạo:</strong> 13/13/2013
                  </Typography>
                  <Typography variant="overline">
                    <strong>Cập nhật lần cuối: </strong>
                    {moment(bill.ngayCapNhat).format(" HH:mm  DD/MM/yyyy")}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={0}>
                  <Typography variant="overline">
                    <strong>Phí vận chuyển:</strong>{" "}
                    {Intl.NumberFormat("vi-VN").format(bill.phiVanChuyen)} ₫
                  </Typography>
                  <Typography variant="overline">
                    <strong>Tổng tiền sản phẩm : </strong>
                    {Intl.NumberFormat("vi-VN").format(
                      bill.chiTietHoaDonList.reduce(
                        (total, item) => total + item.soLuong * item.giaSanPham,
                        0
                      ) + bill.phiVanChuyen
                    )}{" "}
                    ₫
                  </Typography>
                  <Tooltip
                    title={
                      voucherOfBill.khuyenMai
                        ? voucherOfBill.khuyenMai.batDau +
                          " đến " +
                          voucherOfBill.khuyenMai.ketThuc +
                          " " +
                          voucherOfBill.khuyenMai.moTa
                        : "Không có khuyến mãi"
                    }
                  >
                    <Typography variant="overline">
                      <strong>Mã giảm giá: </strong>
                      {voucherOfBill.khuyenMai
                        ? voucherOfBill.khuyenMai.ten
                        : "Không có khuyến mãi"}
                    </Typography>
                  </Tooltip>
                  <Typography variant="overline">
                    <strong>Tiền khách trả : </strong>
                    {Intl.NumberFormat("vi-VN").format(
                      paymentMethot.reduce(
                        (tong, item) => tong + item.soTien,
                        0
                      )
                    )}{" "}
                    ₫
                  </Typography>
                  <Typography variant="overline">
                    (
                    {paymentMethot.map((item, index) => {
                      return (
                        item.thanhToan.ten +
                        " : " +
                        Intl.NumberFormat("vi-VN").format(item.soTien) +
                        " ₫  " +
                        (index >= 0 && index < paymentMethot.length - 1
                          ? ","
                          : "")
                      );
                    })}
                    )
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="overline">
                  <strong>Số điện thoại:</strong> {bill.sdtNhanHang}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">
                  <strong>Địa chỉ: </strong>
                  {bill.diaChiCuThe || "Không có địa chỉ"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="overline">
                  <strong>Ghi chú: </strong>{" "}
                  {removeTextBetweenStars(bill.ghiChu || "")}
                </Typography>
              </Grid>
            </Grid>
            <OrderProducts newOders={bill.chiTietHoaDonList} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" onClick={generatePDF}>
            Xuất hóa đơn
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
