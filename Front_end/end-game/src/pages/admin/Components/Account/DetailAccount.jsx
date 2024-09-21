import { Grid, Link, Paper, Stack, Typography } from "@mui/material";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CustomPaginationActionsTable from "../../../../components/OderLeftSide/TableData";

import { LineChart } from "@mui/x-charts/LineChart";
import DataGridAccount from "../DataGridAccount/DataGridAccount";
import { getAuth } from "firebase/auth";
import { BarChart } from "@mui/x-charts";
import StaffView from "./Staffx";

import EmailIcon from "@mui/icons-material/Email";
import UpdateRole from "./UpdateRole";

function timGioHangCoSoLuongLonNhat(gioHang) {
  // Kiểm tra nếu giỏ hàng không tồn tại hoặc là mảng rỗng
  if (!gioHang || gioHang.length === 0) {
    return {};
  }

  // Tìm đối tượng giỏ hàng có số lượng lớn nhất
  let gioHangLonNhat = gioHang.reduce((maxSoLuong, sanPham) => {
    return sanPham.so_don > maxSoLuong.so_don ? sanPham : maxSoLuong;
  });

  return gioHangLonNhat;
}

function timGioHangGanNhatTheoThang(gioHang) {
  // Kiểm tra nếu giỏ hàng không tồn tại hoặc là mảng rỗng
  if (!gioHang || gioHang.length === 0) {
    return {};
  }

  // Lấy ngày hiện tại
  const ngayHienTai = new Date();

  // Tìm giỏ hàng có thang gần với ngày hiện tại nhất
  let gioHangGanNhat = gioHang.reduce(
    (ganNhat, sanPham) => {
      // Chuyển đổi thang thành đối tượng ngày
      const thangNgay = new Date(sanPham.ngayTao);

      // Tính khoảng cách thời gian
      const khoangCachThoiGian = Math.abs(ngayHienTai - thangNgay);

      // So sánh và cập nhật giỏ hàng có thang gần nhất
      if (khoangCachThoiGian < ganNhat.khoangCachThoiGian) {
        return {
          gioHang: sanPham,
          khoangCachThoiGian: khoangCachThoiGian,
        };
      }

      return ganNhat;
    },
    { gioHang: null, khoangCachThoiGian: Infinity }
  );

  return gioHangGanNhat.gioHang;
}

function createDataObjects(dataList) {
  let dataObjects = [];

  for (let item of dataList) {
    dataObjects.push({
      thang: item[0],
      so_don: item[1],
    });
  }
  dataObjects.sort((a, b) => {
    const dateA = new Date(a.thang);
    const dateB = new Date(b.thang);
    return dateA - dateB;
  });

  return dataObjects;
}

function tinhTongSoLuong(gioHang) {
  // Kiểm tra nếu giỏ hàng không tồn tại hoặc là mảng rỗng
  if (!gioHang || gioHang.length === 0) {
    return 0;
  }

  // Sử dụng reduce để tính tổng số lượng
  const tongSoLuong = gioHang.reduce((tong, sanPham) => {
    // Kiểm tra nếu thuộc tính "so_luong" tồn tại trong sản phẩm
    if (sanPham.hasOwnProperty("soLuong")) {
      return tong + sanPham.soLuong;
    }
    return tong;
  }, 0);

  return tongSoLuong;
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

function tinhTongSoLuongTrongHoaDon(hoaDon) {
  // Kiểm tra nếu hoá đơn không tồn tại hoặc không có chi tiết hoá đơn
  if (
    !hoaDon ||
    !hoaDon.chiTietHoaDonList ||
    hoaDon.chiTietHoaDonList.length === 0
  ) {
    return 0;
  }

  // Sử dụng reduce để tính tổng số lượng từ danh sách chi tiết hoá đơn
  const tongSoLuong = hoaDon.chiTietHoaDonList.reduce((tong, chiTietHoaDon) => {
    // Kiểm tra nếu thuộc tính "soLuong" tồn tại trong chi tiết hoá đơn
    if (chiTietHoaDon.hasOwnProperty("soLuong")) {
      return tong + chiTietHoaDon.soLuong;
    }
    return tong;
  }, 0);

  return tongSoLuong;
}

const AccountDetail = (props) => {
  const [rows, setRow] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadChartData();
    loadAllBill();
    loadCart();
  }, [props.selectACC]);

  const loadAllBill = async () => {
    if (!props.selectACC) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/hoa-don?idKH=" + props.selectACC.uid
      );

      setRow(response.data);

      console.log("Danh sách hóa đơn: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Thông tin chi tiết");
    }
  };

  const loadChartData = async () => {
    if (!props.selectACC) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/hoa-don/soluongtheothang/" +
          props.selectACC.uid
      );

      setChartData(createDataObjects(response.data));

      console.log("Danh sách dữ liệu table: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Thông tin chi tiết table");
    }
  };

  const loadCart = async () => {
    if (!props.selectACC) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/gio-hang/" + props.selectACC.uid
      );

      setCart(response.data);

      console.log("Danh sách giỏ hàng: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Thông tin chi tiết table");
    }
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DataGridAccount
            data={props.accounts}
            setSelectACC={props.setSelectACC}
          />
        </Grid>

        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #FF66FF;",
            }}
          >
            {" "}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">
                  Tài khoản: {props.selectACC.ten || "Chưa chọn tài khoản"}
                </Typography>
                <Link
                  href={
                    "mailto:" +
                    props.selectACC.email +
                    "?subject=Khách%20hàng%20shop%20giày&body=Nội%20dung"
                  }
                  underline="none"
                >
                  <Typography variant="caption" mt={2} ml={3}>
                    <EmailIcon style={{ fontSize: "1em" }} /> Gửi mail
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={1}>
                {props.selectACC.uid ? (
                  <UpdateRole user={props.selectACC} />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {props.selectACC.chucVu === 0 || props.selectACC.chucVu === 2 ? (
            <StaffView selectACC={props.selectACC} />
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #009900;",
            }}
          >
            <Typography sx={{ color: "#009900" }} variant="subtitle1">
              Số sản phẩm trong giỏ hàng
            </Typography>
            <Typography variant="h6">{cart.length}</Typography>
            <Typography variant="body2">Khách hàng này tuyệt vời</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #f6c23e;",
            }}
          >
            <Typography sx={{ color: "#f6c23e" }} variant="subtitle1">
              Số đơn hàng đã mua
            </Typography>
            <Typography variant="h6">
              {rows.length || "không có dữ liệu"}
            </Typography>
            <Typography variant="body2">
              Tổng {tinhTongSoLuongTrongDanhSachHoaDon(rows)} sản phẩm
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #FF3399;",
            }}
          >
            <Typography sx={{ color: "#FF3399" }} variant="subtitle1">
              Tháng mua nhiều đơn hàng nhất
            </Typography>{" "}
            <Typography variant="h6">
              {timGioHangCoSoLuongLonNhat(chartData).thang ||
                "Không có dữ liệu"}
            </Typography>
            <Typography variant="body2">
              Tổng {timGioHangCoSoLuongLonNhat(chartData).so_don || 0} đơn hàng
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #FF3333;",
            }}
          >
            <Typography sx={{ color: "#FF3333" }} variant="subtitle1">
              Lần mua hàng gần nhất
            </Typography>{" "}
            <Typography variant="h6">
              {timGioHangGanNhatTheoThang(rows).ngayTao || "Không có dữ liệu"}
            </Typography>
            <Typography variant="body2">
              Có{" "}
              {tinhTongSoLuongTrongHoaDon(timGioHangGanNhatTheoThang(rows)) ||
                0}{" "}
              sản phẩm
            </Typography>
          </Paper>
        </Grid>

        {chartData.length > 0 ? (
          <Grid item xs={12}>
            <Paper
              sx={{
                boxShadow: "-5px 0 0 0 #77d5d4; ",
                paddingBottom: "10px",
              }}
            >
              <BarChart
                dataset={chartData}
                series={[{ dataKey: "so_don", label: "Số đơn hàng" }]}
                height={350}
                xAxis={[{ scaleType: "band", dataKey: "thang" }]}
              />
              <Typography align="center" gutterBottom variant="subtitle2">
                Thống kê số đơn hàng khách hàng đã đặt
              </Typography>
            </Paper>
          </Grid>
        ) : (
          ""
        )}

        {chartData.length > 0 ? (
          <Grid item xs={12}>
            <Paper
              sx={{
                boxShadow: "-5px 0 0 0 #1976d2;",
              }}
            >
              <CustomPaginationActionsTable
                rows={rows}
                loadAllBill={loadAllBill}
              />
            </Paper>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default AccountDetail;
