import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import OrderProducts from "./Components/Arow/Orders";
import { toast } from "react-toastify";
import EditOder from "./Components/EditOder";
import ExportPDF from "./Components/ExportPDF";
const steps = [
  { label: "Chờ xác nhận" },
  { label: "Đã xác nhận" },
  { label: "Đang giao hàng" },
  { label: "Giao thành công" },
  { label: "Đã Hoàn thành" },
];
const steps2 = [
  { label: "Chờ xác nhận" },
  { label: "Xác nhận" },
  { label: "Giao hàng" },
  { label: "Giao thành công" },
  { label: "Hoàn thành" },
];

const AdminDetailOder = () => {
  const { id } = useParams();
  const [bill, setBill] = useState({ trangThai: 0, chiTietHoaDonList: [] });
  const [paymentMethot, setPaymentMethot] = useState([]);
  const [voucherOfBill, setVoucherOfBill] = useState({});

  useEffect(() => {
    feachtData();
    getVoucher();
    getPaymentMethot();
  }, []);

  const ChangeBillStatus = async (id, tt) => {
    let cf = window.confirm("Xác nhận?");
    if (cf === false) {
      return;
    }
    try {
      await axios.put(
        "http://localhost:8080/api/updateBill?idHD=" + id + "&TT=" + tt
      );

      toast.success("Đã cập nhật thành công");
      feachtData();
    } catch (error) {
      console.error(error);
      toast.error("Hủy không thành công");
    }
  };

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
    <Box mt={10} mx={2} component={Paper} pt={3} pb={6} px={3}>
      {bill.trangThai === 6 ? (
        <Typography color={"red"} variant="h3" fontWeight="bold">
          Đã hủy
        </Typography>
      ) : bill.trangThai === 7 ? (
        <Typography color={"red"} variant="h3" fontWeight="bold">
          Khách hàng yêu cầu hủy đơn
        </Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Stepper
            activeStep={bill.trangThai === 5 ? 5 : bill.trangThai}
            alternativeLabel
          >
            {steps.map((items) => (
              <Step key={items.label}>
                <StepLabel>{items.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}

      <Grid container spacing={2} mt={3} pb={3}>
        <Grid item xs={3}>
          <Stack spacing={0}>
            <Typography variant="overline">
              <strong>Kênh bán hàng:</strong>{" "}
              {bill.loaiHoaDon ? "Online" : "Offline"}
            </Typography>
            <Typography variant="overline">
              <strong>Tên người nhận:</strong> {bill.tenNguoiNhan}
            </Typography>
            <Typography variant="overline">
              <strong>Ngày tạo:</strong>{" "}
              {moment(bill.ngayTao).format(" DD/MM/yyyy")}
            </Typography>
            <Typography variant="overline">
              <strong>Cập nhật lần cuối: </strong>
              {moment(bill.ngayCapNhat).format(" HH:mm  DD/MM/yyyy")}
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
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <Stack spacing={0}>
            <Typography variant="overline">
              <strong>Số điện thoại:</strong> {bill.sdtNhanHang}
            </Typography>
            <Typography variant="overline">
              <strong>Địa chỉ: </strong>
              {bill.diaChiCuThe || "Không có địa chỉ"}
            </Typography>
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
            <Typography variant="overline">
              <strong>Tiền khách phải trả : </strong>
              {Intl.NumberFormat("vi-VN").format(
                paymentMethot.reduce((tong, item) => tong + item.soTien, 0)
              )}{" "}
              ₫ (
              {paymentMethot.map((item, index) => {
                return (
                  item.thanhToan.ten +
                  " : " +
                  Intl.NumberFormat("vi-VN").format(item.soTien) +
                  " ₫  " +
                  (index >= 0 && index < paymentMethot.length - 1 ? "," : "")
                );
              })}
              )
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <Stack spacing={0.5}>
            {bill.trangThai < 2 ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => {
                    ChangeBillStatus(bill.id, 6);
                  }}
                >
                  Hủy
                </Button>
                <EditOder feachtData={feachtData} bill={bill} />
              </>
            ) : (
              ""
            )}
            {bill.trangThai === 7 ? (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => {
                    ChangeBillStatus(bill.id, 6);
                  }}
                >
                  Xác nhận hủy đơn hàng
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="info"
                  onClick={() => {
                    ChangeBillStatus(bill.id, 1);
                  }}
                >
                  Xác nhận không hủy đơn hàng
                </Button>
              </>
            ) : (
              ""
            )}
            {bill.trangThai < 5 ? (
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  ChangeBillStatus(
                    bill.id,
                    bill.trangThai === 3 ? 5 : bill.trangThai + 1
                  );
                }}
              >
                {steps2[bill.trangThai + 1].label}
              </Button>
            ) : (
              <ExportPDF id={bill.id} />
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            <strong>Mã đơn hàng: </strong>{" "}
            {getTextBetweenStars(bill.ghiChu || "")}
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
  );
};
export default AdminDetailOder;
