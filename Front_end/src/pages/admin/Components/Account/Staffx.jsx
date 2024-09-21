import { Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function tinhTongSoLuongTrongDanhSachHoaDon(danhSachHoaDon) {
  // Kiểm tra nếu danh sách hóa đơn không tồn tại hoặc là mảng rỗng
  if (!danhSachHoaDon || danhSachHoaDon.length === 0) {
    return 0;
  }

  // Sử dụng reduce để tính tổng số lượng từ danh sách hóa đơn
  const tongSoLuong = danhSachHoaDon.reduce((tong, hoaDon) => {
    // Kiểm tra nếu hóa đơn có danh sách chi tiết hóa đơn và danh sách không rỗng
    if (hoaDon.chiTietHoaDonList && hoaDon.chiTietHoaDonList.length > 0) {
      // Sử dụng reduce để tính tổng số lượng từ danh sách chi tiết hóa đơn
      const tongSoLuongChiTiet = hoaDon.chiTietHoaDonList.reduce(
        (tongChiTiet, chiTietHoaDon) => {
          // Kiểm tra nếu thuộc tính "soLuong" tồn tại trong chi tiết hóa đơn
          if (chiTietHoaDon.hasOwnProperty("soLuong")) {
            return tongChiTiet + chiTietHoaDon.soLuong;
          }
          return tongChiTiet;
        },
        0
      );

      return tong + tongSoLuongChiTiet;
    }

    return tong;
  }, 0);

  return tongSoLuong;
}

function tinhTongTien(danhSachHoaDon) {
  // Kiểm tra nếu danh sách hóa đơn không tồn tại hoặc là mảng rỗng
  if (!danhSachHoaDon || danhSachHoaDon.length === 0) {
    return 0;
  }

  // Sử dụng reduce để tính tổng số lượng từ danh sách hóa đơn
  const tongSoLuong = danhSachHoaDon.reduce((tong, hoaDon) => {
    // Kiểm tra nếu hóa đơn có danh sách chi tiết hóa đơn và danh sách không rỗng
    if (hoaDon.chiTietHoaDonList && hoaDon.chiTietHoaDonList.length > 0) {
      // Sử dụng reduce để tính tổng số lượng từ danh sách chi tiết hóa đơn
      const tongSoLuongChiTiet = hoaDon.chiTietHoaDonList.reduce(
        (tongChiTiet, chiTietHoaDon) => {
          // Kiểm tra nếu thuộc tính "soLuong" tồn tại trong chi tiết hóa đơn
          if (chiTietHoaDon.hasOwnProperty("soLuong")) {
            return (
              tongChiTiet + chiTietHoaDon.soLuong * chiTietHoaDon.giaSanPham
            );
          }
          return tongChiTiet;
        },
        0
      );

      return tong + tongSoLuongChiTiet;
    }

    return tong;
  }, 0);

  return tongSoLuong;
}

function getInvoicesByStatus(invoices, status) {
  return invoices.filter(
    (invoice) => !invoice.loaiHoaDon && invoice.trangThai === status
  );
}
function getInvoicesByStatus2(invoices, status) {
  return invoices.filter(
    (invoice) => !invoice.loaiHoaDon && invoice.trangThai !== status
  );
}

function countInvoicesPerMonth(invoices) {
  // Tạo một đối tượng để lưu trữ số hóa đơn cho mỗi tháng
  let invoiceCountPerMonth = {};

  // Lặp qua danh sách hóa đơn
  invoices.forEach((invoice) => {
    // Lấy tháng từ ngày tạo hóa đơn
    const month = new Date(invoice.ngayTao).getMonth() + 1;

    // Tăng giá trị tương ứng cho tháng trong đối tượng
    invoiceCountPerMonth[month] = (invoiceCountPerMonth[month] || 0) + 1;
  });

  // Tạo mảng với 12 phần tử, mỗi phần tử là số hóa đơn của tháng tương ứng
  const result = Array.from(
    { length: 12 },
    (_, index) => invoiceCountPerMonth[index + 1] || 0
  );
  console.log("danh sách theo 12 tháng", result);
  return result;
}

function getInvoicesThisMonth(invoices) {
  // Lấy ngày hiện tại
  let currentDate = new Date();

  // Lấy tháng và năm hiện tại
  let currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  let currentYear = currentDate.getFullYear();

  // Lọc danh sách hóa đơn theo tháng và năm hiện tại
  let invoicesThisMonth = invoices.filter((invoice) => {
    let invoiceDate = new Date(invoice.ngayTao);
    return (
      invoiceDate.getFullYear() === currentYear &&
      invoiceDate.getMonth() === currentMonth - 1 // Lưu ý: Tháng trong JavaScript là từ 0 đến 11
    );
  });

  return invoicesThisMonth;
}

function getCountThisMonth(invoices) {
  // Lấy ngày hiện tại
  let currentDate = new Date();

  // Lấy tháng và năm hiện tại
  let currentMonth = currentDate.getMonth() + 1; // Tháng trong JavaScript là từ 0 đến 11
  let currentYear = currentDate.getFullYear();

  // Lọc danh sách hóa đơn theo tháng và năm hiện tại, sau đó đếm số lượng hóa đơn
  let countThisMonth = invoices.reduce((count, invoice) => {
    let invoiceDate = new Date(invoice.ngayTao);
    if (
      invoiceDate.getFullYear() === currentYear &&
      invoiceDate.getMonth() === currentMonth - 1 // Lưu ý: Tháng trong JavaScript là từ 0 đến 11
    ) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  return countThisMonth;
}

function countInvoicesByStatus(invoices, status) {
  let count = 0;

  for (let i = 0; i < invoices.length; i++) {
    if (invoices[i].loaiHoaDon === status) {
      count++;
    }
  }

  return count;
}

const StaffView = (props) => {
  const [chartData, setChartData] = useState([1, 2, 3]);

  const [data, setData] = useState([]);

  useEffect(() => {
    loadChartData();
  }, [props.selectACC]);

  const loadChartData = async () => {
    if (!props.selectACC) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/hoa-don?idKH=" + props.selectACC.uid
      );

      setData(response.data);

      console.log("Danh sách dữ liệu của tai lhjp: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Thông tin chi tiết table");
    }
  };

  const xLabels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",

            boxShadow: "-5px 0 0 0 #CC3300;",
          }}
        >
          <Typography sx={{ color: "#CC3300" }} variant="subtitle1">
            Số đơn hàng đã tạo
          </Typography>
          <Typography variant="h6">
            {countInvoicesByStatus(data, false) || "Không có dữ liệu"}
          </Typography>
          <Typography variant="body2">
            Đã lên đơn{" "}
            {tinhTongSoLuongTrongDanhSachHoaDon(
              data.filter((invoice) => !invoice.loaiHoaDon)
            )}{" "}
            sản phẩm
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",

            boxShadow: "-5px 0 0 0 #00CC00;",
          }}
        >
          <Typography sx={{ color: "#00CC00" }} variant="subtitle1">
            Số đơn hàng thành công
          </Typography>
          <Typography variant="h6">
            {data.filter((item) => !item.loaiHoaDon && item.trangThai === 5)
              .length || "không có dữ liệu"}
          </Typography>
          <Typography variant="body2">
            Đã bán{" "}
            {tinhTongSoLuongTrongDanhSachHoaDon(
              data.filter((item) => !item.loaiHoaDon && item.trangThai === 5)
            )}{" "}
            sản phẩm
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",

            boxShadow: "-5px 0 0 0 #CD853F;",
          }}
        >
          <Typography sx={{ color: "#CD853F" }} variant="subtitle1">
            Số đơn hàng thất bại
          </Typography>{" "}
          <Typography variant="h6">
            {" "}
            {data.filter((item) => !item.loaiHoaDon && item.trangThai === 6)
              .length || "không có dữ liệu"}
          </Typography>
          <Typography variant="body2">
            {" "}
            Đơn bị hủy có{" "}
            {tinhTongSoLuongTrongDanhSachHoaDon(
              data.filter((item) => !item.loaiHoaDon && item.trangThai === 6)
            )}{" "}
            sản phẩm
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",

            boxShadow: "-5px 0 0 0 #009ACD;",
          }}
        >
          <Typography sx={{ color: "#009ACD" }} variant="subtitle1">
            Doanh số tháng này
          </Typography>{" "}
          <Typography variant="h6">
            {Intl.NumberFormat("vi-VN").format(
              tinhTongTien(
                getInvoicesThisMonth(
                  data.filter(
                    (item) => !item.loaiHoaDon && item.trangThai === 5
                  )
                )
              )
            )}{" "}
            đ
          </Typography>
          <Typography variant="body2">
            {" "}
            Đã bán{" "}
            {getCountThisMonth(
              data.filter((item) => !item.loaiHoaDon && item.trangThai === 5)
            )}{" "}
            đơn hàng
          </Typography>
        </Paper>
      </Grid>
      {chartData.length > 0 ? (
        <Grid item xs={12}>
          <Paper
            sx={{
              boxShadow: "-5px 0 0 0 #8ACDD7; ",
              paddingBottom: "10px",
            }}
          >
            <BarChart
              height={300}
              series={[
                {
                  data: countInvoicesPerMonth(getInvoicesByStatus(data, 5)),
                  label: "Đã hoàn thành",
                  id: "pvId",
                  stack: "total",
                  color: "#00CC33",
                },

                {
                  data: countInvoicesPerMonth(getInvoicesByStatus2(data, 5)),
                  label: "Khác",
                  id: "uvId",
                  stack: "total",
                },
              ]}
              xAxis={[{ data: xLabels, scaleType: "band" }]}
            />
            <Typography align="center" gutterBottom variant="subtitle2">
              Thống kê số đơn hàng của nhân viên này theo tháng
            </Typography>
          </Paper>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};
export default StaffView;
