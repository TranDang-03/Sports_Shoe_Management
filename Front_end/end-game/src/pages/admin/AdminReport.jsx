import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function MyBarChart({ danhSachHoaDon }) {
  // Tính toán dữ liệu cho biểu đồ
  danhSachHoaDon = danhSachHoaDon.sort(
    (a, b) => new Date(a.ngayCapNhat) - new Date(b.ngayCapNhat)
  );

  const duLieuBieuDo = danhSachHoaDon.map((hoaDon) => ({
    ngayTao: new Date(hoaDon.ngayCapNhat).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  // Tạo đối tượng để lưu trữ số lượng hóa đơn mỗi giờ
  const soLuongHoaDonMoiGio = {};

  // Đếm số lượng hóa đơn cho mỗi giờ
  duLieuBieuDo.forEach((item) => {
    const gio = item.ngayTao;
    soLuongHoaDonMoiGio[gio] = (soLuongHoaDonMoiGio[gio] || 0) + 1;
  });

  // Chuyển đổi dữ liệu để phù hợp với Recharts
  const dataForChart = Object.keys(soLuongHoaDonMoiGio).map((gio) => ({
    gio,
    soLuong: soLuongHoaDonMoiGio[gio],
  }));

  return (
    <BarChart width={700} height={300} data={dataForChart}>
      <XAxis dataKey="gio" />
      <YAxis />
      <Tooltip />

      <Bar dataKey="soLuong" label="Số lượng" fill="#8884d8" />
    </BarChart>
  );
}
const uData = [45, 50, 55, 60, 70, 80, 90, 100, 110, 120, 130, 140];

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

const AdminReport = () => {
  const [data, setData] = useState([]);

  const [account, setAccount] = useState([]);
  const [voucher, setVoucher] = useState([]);

  useEffect(() => {
    getData();

    getData3();
    getData4();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/allOffBill");
      if (res.status === 200) {
        setData(res.data);
      }
      console.log("Dữ liệu test", res.data);
    } catch (error) {}
  };

  const getData3 = async () => {
    try {
      const res = await axios.get("http://localhost:8080/test/staff/7i");
      if (res.status === 200) {
        setAccount(res.data);
      }
      console.log("Dữ liệu test3", res.data);
    } catch (error) {}
  };
  const getData4 = async () => {
    try {
      const res = await axios.get("http://localhost:8080/test/staff/8i");
      if (res.status === 200) {
        setVoucher(res.data);
      }
      console.log("Dữ liệu test4", res.data);
    } catch (error) {}
  };

  function layDonHangHomNay(danhSachDonHang) {
    // Lấy ngày hôm nay dưới dạng chuỗi "YYYY-MM-DD"
    const ngayHienTai = moment().format("YYYY-MM-DD");

    // Lọc những đơn hàng có ngày tạo là ngày hôm nay
    const donHangHomNay = danhSachDonHang.filter(
      (donHang) => moment(donHang.ngayTao).format("YYYY-MM-DD") === ngayHienTai
    );

    return donHangHomNay;
  }

  function layDonHangHomQua(danhSachDonHang) {
    // Lấy ngày hôm qua dưới dạng chuỗi "YYYY-MM-DD"
    const ngayHomQua = moment().subtract(1, "days").format("YYYY-MM-DD");

    // Lọc những đơn hàng có ngày tạo là ngày hôm qua
    const donHangHomQua = danhSachDonHang.filter(
      (donHang) => moment(donHang.ngayTao).format("YYYY-MM-DD") === ngayHomQua
    );

    return donHangHomQua;
  }

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

  function layDonHangTrongThang(danhSachDonHang) {
    // Lấy ngày bắt đầu và kết thúc của tháng hiện tại
    const ngayBatDauThang = moment().startOf("month").format("YYYY-MM-DD");
    const ngayKetThucThang = moment().endOf("month").format("YYYY-MM-DD");

    // Lọc những đơn hàng có ngày tạo trong tháng này
    const donHangTrongThang = danhSachDonHang.filter((donHang) => {
      const ngayTao = moment(donHang.ngayTao).format("YYYY-MM-DD");
      return moment(ngayTao).isBetween(
        ngayBatDauThang,
        ngayKetThucThang,
        null,
        "[]"
      );
    });

    return donHangTrongThang;
  }

  function layDonHangTrongThangTruoc(danhSachDonHang) {
    // Lấy ngày bắt đầu và kết thúc của tháng trước
    const ngayBatDauThangTruoc = moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    const ngayKetThucThangTruoc = moment()
      .subtract(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD");

    // Lọc những đơn hàng có ngày tạo trong tháng trước
    const donHangTrongThangTruoc = danhSachDonHang.filter((donHang) => {
      const ngayTao = moment(donHang.ngayTao).format("YYYY-MM-DD");
      return moment(ngayTao).isBetween(
        ngayBatDauThangTruoc,
        ngayKetThucThangTruoc,
        null,
        "[]"
      );
    });

    return donHangTrongThangTruoc;
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

  function layTaiKhoanBanNhieuNhat(danhSachHoaDon) {
    // Khởi tạo một đối tượng để lưu trữ thông tin về số lượng hóa đơn của từng tài khoản
    const soLuongHoaDonTheoTaiKhoan = {};

    // Duyệt qua danh sách hóa đơn để đếm số lượng hóa đơn của từng tài khoản
    danhSachHoaDon.forEach((hoaDon) => {
      const taiKhoanId = hoaDon.taiKhoan
        ? hoaDon.taiKhoan.ten
        : "Trần Tiến Việt";

      // Kiểm tra trạng thái của hóa đơn là 5
      if (hoaDon.trangThai === 5) {
        // Nếu tài khoản đã tồn tại trong đối tượng, thì cộng thêm vào
        if (soLuongHoaDonTheoTaiKhoan[taiKhoanId]) {
          soLuongHoaDonTheoTaiKhoan[taiKhoanId]++;
        } else {
          // Nếu tài khoản chưa tồn tại, thì tạo mới với giá trị là 1
          soLuongHoaDonTheoTaiKhoan[taiKhoanId] = 1;
        }
      }
    });

    // Tìm tài khoản có số lượng hóa đơn nhiều nhất
    let taiKhoanBanNhieuNhat;
    let soLuongHoaDonMax = 0;

    for (const taiKhoanId in soLuongHoaDonTheoTaiKhoan) {
      if (soLuongHoaDonTheoTaiKhoan[taiKhoanId] > soLuongHoaDonMax) {
        soLuongHoaDonMax = soLuongHoaDonTheoTaiKhoan[taiKhoanId];
        taiKhoanBanNhieuNhat = taiKhoanId;
      }
    }

    // Trả về thông tin tài khoản bán nhiều hóa đơn nhất
    return {
      taiKhoanId: taiKhoanBanNhieuNhat,
      soLuongHoaDon: soLuongHoaDonMax,
    };
  }
  return (
    <Grid container mt={10} mb={3} px={3} spacing={3}>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #7B66FF;",
          }}
        >
          <Typography sx={{ color: "#7B66FF" }} variant="subtitle1">
            Số đơn hàng hôm nay
          </Typography>
          <Typography variant="h6">
            {layDonHangHomNay(data).length} đơn
          </Typography>
          <Typography variant="body2">
            Hôm qua {layDonHangHomQua(data).length} đơn{" "}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #FFA732;",
          }}
        >
          <Typography sx={{ color: "#FFA732" }} variant="subtitle1">
            Số sản phẩm lên đơn hôm nay
          </Typography>
          <Typography variant="h6">
            {tinhTongSoLuongTrongDanhSachHoaDon(layDonHangHomNay(data))} sản
            phẩm
          </Typography>
          <Typography variant="body2">
            Hôm qua {tinhTongSoLuongTrongDanhSachHoaDon(layDonHangHomQua(data))}{" "}
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
            boxShadow: "-5px 0 0 0 #994D1C",
          }}
        >
          <Typography sx={{ color: "#994D1C" }} variant="subtitle1">
            Doanh số hôm nay
          </Typography>
          <Typography variant="h6">
            {" "}
            {Intl.NumberFormat("vi-VN").format(
              tinhTongTien(layDonHangHomNay(data))
            )}{" "}
            đ
          </Typography>
          <Typography variant="body2">
            Hôm qua{" "}
            {Intl.NumberFormat("vi-VN").format(
              tinhTongTien(layDonHangHomQua(data))
            )}{" "}
            đ
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #1976d2;",
          }}
        >
          <Typography sx={{ color: "#FF3333" }} variant="subtitle1">
            Nhân viên bán nhiều nhất tháng này
          </Typography>
          <Typography variant="h6">
            {layTaiKhoanBanNhieuNhat(layDonHangTrongThang(data)).taiKhoanId}
          </Typography>
          <Typography variant="body2">
            Bán thành công{" "}
            {
              layTaiKhoanBanNhieuNhat(
                layDonHangTrongThang(data.filter((e) => e.trangThai === 5))
              ).soLuongHoaDon
            }{" "}
            đơn
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #8884d8;",
          }}
        >
          <MyBarChart danhSachHoaDon={layDonHangHomNay(data)} />
          <Typography align="center" variant="subtitle2">
            Đơn hàng trong ngày
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={5}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #CE5A67;",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: layDonHangTrongThang(
                      data.filter((e) => e.loaiHoaDon)
                    ).length,
                    label: "Online",
                    color: "#FF8F8F",
                  },
                  {
                    id: 1,
                    value: layDonHangTrongThang(
                      data.filter((e) => !e.loaiHoaDon)
                    ).length,
                    label: "Offline",
                    color: "#0766AD",
                  },
                ],
              },
            ]}
            height={300}
          />
          <Typography align="center" variant="subtitle2">
            Tương quan hai kênh bán hàng tháng này
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #BE3144;",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2">
                {" "}
                Số đơn đã bán tháng này
              </Typography>
              <Typography variant="h4">
                {layDonHangTrongThang(data).length} đơn
              </Typography>
              <Typography variant="subtitle2" color={"green"}>
                {layDonHangTrongThang(data).length -
                  layDonHangTrongThangTruoc(data).length >
                0
                  ? "↑ Tăng " +
                    (layDonHangTrongThang(data).length -
                      layDonHangTrongThangTruoc(data).length)
                  : "↓ Giảm " +
                    (layDonHangTrongThang(data).length -
                      layDonHangTrongThangTruoc(data).length)}{" "}
                đơn
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2"> Doanh số tháng này</Typography>
              <Typography variant="h4">
                {Intl.NumberFormat("vi-VN").format(
                  tinhTongTien(layDonHangTrongThang(data))
                )}{" "}
                đ
              </Typography>
              <Typography variant="subtitle1" color={"green"}>
                {tinhTongTien(layDonHangTrongThang(data)) -
                  tinhTongTien(layDonHangTrongThangTruoc(data)) >
                0
                  ? "↑ Tăng " +
                    Intl.NumberFormat("vi-VN").format(
                      tinhTongTien(layDonHangTrongThang(data)) -
                        tinhTongTien(layDonHangTrongThangTruoc(data))
                    )
                  : "↓ Giảm " +
                    Intl.NumberFormat("vi-VN").format(
                      tinhTongTien(layDonHangTrongThang(data)) -
                        tinhTongTien(layDonHangTrongThangTruoc(data))
                    )}
                {"  đ"}
              </Typography>
            </Grid>
          </Grid>

          <LineChart
            height={300}
            series={[
              {
                data: countInvoicesPerMonth(data),
                label: "Thực tế",
                color: "red",
              },
              { data: uData, label: "Mục tiêu đặt ra" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
          <Typography align="center" variant="subtitle2">
            Mục tiêu đặt ra trong năm nay
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #ED5AB3;",
          }}
        >
          Danh sách nhân viên bán nhiều nhất từ trước đến nay
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên Nhân viên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Số đơn đã bán</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {account.map((row, index) => (
                <TableRow
                  hover
                  key={row.taiKhoan.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.taiKhoan.ten}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.taiKhoan.email}
                  </TableCell>

                  <TableCell align="right">{row.soLuongHoaDon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-5px 0 0 0 #860A35;",
          }}
        >
          Danh sách khuyến mãi sử dụng nhiều nhất
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            height={200}
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tên khuyến mãi</TableCell>
                <TableCell align="right">Số lần sử dụng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voucher.map((row, index) => (
                <TableRow
                  hover
                  key={row.khuyenMai.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.khuyenMai.ten}</TableCell>
                  <TableCell align="right">{row.soLuongHoaDon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default AdminReport;
