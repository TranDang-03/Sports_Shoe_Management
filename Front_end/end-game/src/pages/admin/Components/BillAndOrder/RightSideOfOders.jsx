import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function tinhPhiVanChuyenTrungBinh(danhSachHoaDon) {
  // Kiểm tra xem danh sách hóa đơn có rỗng hay không
  if (danhSachHoaDon.length === 0) {
    return 0; // Trả về 0 nếu danh sách hóa đơn rỗng
  }

  // Tính tổng phí vận chuyển từ danh sách hóa đơn
  const tongPhiVanChuyen = danhSachHoaDon.reduce((tong, hoaDon) => {
    return tong + hoaDon.phiVanChuyen;
  }, 0);

  // Tính phí vận chuyển trung bình
  const phiVanChuyenTrungBinh = tongPhiVanChuyen / danhSachHoaDon.length;

  return phiVanChuyenTrungBinh;
}

function demSoLuongHoaDonTheoTrangThai(danhSachHoaDon, trangThaiCanDem) {
  // Sử dụng filter để lọc ra các hóa đơn có trạng thái truyền vào
  const hoaDonTheoTrangThai = danhSachHoaDon.filter(
    (hoaDon) => hoaDon.trangThai === trangThaiCanDem
  );

  // Đếm số lượng hóa đơn có trạng thái truyền vào
  const soLuongHoaDon = hoaDonTheoTrangThai.length;

  return soLuongHoaDon;
}
const OderDetail = (props) => {
  const Oders = [...props.billList];
  const [value, setValue] = React.useState(0);

  const handleChange = async (event, newValue) => {
    switch (newValue) {
      case 0:
        props.loadBills();
        break;
      case 1:
        props.setBillList(filterObjectsByType(props.fullList, "Online"));

        break;
      case 2:
        props.setBillList(filterObjectsByType(props.fullList, "Offline"));
        break;
      default:
        props.loadBills();
        break;
    }

    setValue(newValue);
  };

  function filterObjectsByType(objectList, filterType) {
    const filteredList = objectList.filter(
      (obj) => obj.loaiHoaDon === filterType
    );
    return filteredList;
  }

  return (
    <Box>
      <Box px={2}>
        <Typography variant="h6" gutterBottom align="center">
          Thông tin về đơn hàng
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Đa kênh" {...a11yProps(0)} />
          <Tab label="Online" {...a11yProps(1)} />
          <Tab label="Offline" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Trạng thái</TableCell>
            <TableCell align="right">Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Chờ xác nhận
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(props.billList, "Chờ xác nhận")}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Đã xác nhận
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(props.billList, "Đã xác nhận")}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Đang giao
            </TableCell>
            <TableCell align="right">
              {" "}
              {demSoLuongHoaDonTheoTrangThai(props.billList, "Đang giao")}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Giao thành công
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(
                props.billList,
                "Đã giao thành công"
              )}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Đã hoàn tất
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(props.billList, "Đã hoàn tất")}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell component="th" scope="row">
              Yêu cầu hủy
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(
                props.billList,
                "Chờ xác nhận hủy đơn"
              )}
            </TableCell>
          </TableRow>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Đã hủy
            </TableCell>
            <TableCell align="right">
              {demSoLuongHoaDonTheoTrangThai(props.billList, "Đã hủy")}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Tổng số đơn hàng
            </TableCell>
            <TableCell align="right">{Oders.length}</TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TableRow
            hover
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography>Phí vận chuyển trung bình{": "}</Typography>
            </TableCell>
            <TableCell align="right">
              {Intl.NumberFormat("vi-VN").format(
                tinhPhiVanChuyenTrungBinh(props.billList).toFixed(0)
              )}{" "}
              (₫)
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};
export default OderDetail;
