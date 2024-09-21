import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Button,
  Chip,
  Collapse,
  Grid,
  TableHead,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AnhCo from "../../pages/admin/Components/Arow/imgsx";
import { Link } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const cancelBill = async (id) => {
    try {
      await axios.put(
        "http://localhost:8080/api/updateBill?idHD=" + id + "&TT=6"
      );

      toast.success("Đã hủy thành công");
      props.loadAllBill();
    } catch (error) {
      console.error(error);
      toast.error("Hủy không thành công");
    }
  };
  const cancelBill2 = async (id) => {
    try {
      await axios.put(
        "http://localhost:8080/api/updateBill?idHD=" + id + "&TT=7"
      );

      props.loadAllBill();
    } catch (error) {
      console.error(error);
      toast.error("Hủy không thành công");
    }
  };

  const huyclic = (id) => {
    let xacNhan = window.confirm("bạn có muốn hủy không?");

    // Kiểm tra giá trị trả về từ hộp thoại xác nhận
    if (xacNhan) {
      cancelBill(id);
    } else {
    }
  };
  const huyclic2 = (id) => {
    let xacNhan = window.confirm("bạn có muốn hủy không?");

    // Kiểm tra giá trị trả về từ hộp thoại xác nhận
    if (xacNhan) {
      cancelBill2(id);
    } else {
    }
  };

  function removeTextBetweenStars(inputString) {
    const regex = /\*.*?\*/g;
    return inputString.replace(regex, "");
  }

  return (
    <React.Fragment>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ngayTao}
        </TableCell>
        <TableCell align="right">{row.tenNguoiNhan}</TableCell>
        <TableCell align="right">{row.sdtNhanHang}</TableCell>
        <TableCell align="right" sx={{ maxWidth: "325px" }}>
          {row.diaChiCuThe || "Không có địa chỉ"}
        </TableCell>
        <TableCell align="right">
          {row.trangThai === 7 ? (
            <Chip
              icon={<HourglassEmptyIcon />}
              label="Chờ xác nhận hủy đơn"
              variant="outlined"
            />
          ) : (
            ""
          )}
          {row.trangThai === 0 ? (
            <Chip
              icon={<HourglassEmptyIcon />}
              label="Chờ xác nhận"
              variant="outlined"
            />
          ) : (
            ""
          )}
          {row.trangThai === 2 ? (
            <Chip
              icon={<LocalShippingIcon />}
              label="Đang giao"
              variant="outlined"
            />
          ) : (
            ""
          )}
          {row.trangThai === 3 ? (
            <Chip
              icon={<NoCrashIcon />}
              label="Giao thành công"
              variant="outlined"
            />
          ) : (
            ""
          )}
          {row.trangThai === 6 ? (
            <Chip icon={<CancelIcon />} label="Đã hủy" variant="outlined" />
          ) : (
            ""
          )}

          {row.trangThai === 5 ? (
            <Chip
              icon={<DoneOutlineIcon />}
              label="Hoàn thành"
              variant="outlined"
            />
          ) : (
            ""
          )}
          {row.trangThai === 1 ? (
            <Chip
              icon={<HandshakeIcon />}
              label="Đã xác nhận"
              variant="outlined"
            />
          ) : (
            ""
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={11}>
                  <Typography variant="h6" gutterBottom component="div">
                    Chi tiết đơn hàng
                  </Typography>
                  {row.ngayCapNhat
                    ? "Cập nhật mới nhất " +
                      moment(row.ngayCapNhat).format("DD/MM/YYYY HH:mm")
                    : "Chưa có cập nhật"}
                </Grid>
                <Grid item xs={1}>
                  {row.trangThai === 0 ? (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        huyclic(row.id);
                      }}
                    >
                      Hủy
                    </Button>
                  ) : (
                    ""
                  )}
                  {row.trangThai === 1 ? (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        huyclic2(row.id);
                        toast(
                          "Bên mình đã ghi nhận yêu cầu hủy đơn hàng xin vui lòng chờ xác nhận hoặc liên hệ với cửa hàng để biết thêm chi tiết"
                        );
                      }}
                    >
                      Hủy đơn
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="inherit" gutterBottom component="div">
                    Phí vận chuyển :{" "}
                    {Intl.NumberFormat("vi-VN").format(row.phiVanChuyen)} ₫
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    align="right"
                    variant="subtitle2"
                    gutterBottom
                    component="div"
                  >
                    {"Ghi chú: " + removeTextBetweenStars(row.ghiChu)}
                  </Typography>
                </Grid>
              </Grid>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell>Màu sắc / kích thước</TableCell>
                    <TableCell align="right">Đơn giá (vnđ)</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Thành tiền (vnđ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.chiTietHoaDonList.map((historyRow) => (
                    <TableRow key={historyRow.id} hover>
                      <TableCell component="th" scope="row">
                        <AnhCo id={historyRow.sanPhamChiTiet.sanPham.id} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          to={
                            "http://localhost:3000/product/" +
                            historyRow.sanPhamChiTiet.sanPham.id
                          }
                        >
                          {" "}
                          {historyRow.sanPhamChiTiet.sanPham.tenSanPham}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {historyRow.sanPhamChiTiet.mauSac.ten} /{" "}
                        {historyRow.sanPhamChiTiet.kichThuoc.giaTri}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {Intl.NumberFormat("vi-VN").format(
                          historyRow.giaSanPham
                        )}
                      </TableCell>
                      <TableCell align="right">{historyRow.soLuong}</TableCell>
                      <TableCell align="right">
                        {Intl.NumberFormat("vi-VN").format(
                          historyRow.giaSanPham * historyRow.soLuong
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}>&nbsp;</TableCell>

                    <TableCell align="right">
                      {Intl.NumberFormat("vi-VN").format(
                        row.chiTietHoaDonList.reduce(
                          (total, item) => total + item.soLuong,
                          0
                        )
                      )}{" "}
                      sản phẩm
                    </TableCell>
                    <TableCell align="right">
                      Tổng tiền :{" "}
                      {Intl.NumberFormat("vi-VN").format(
                        row.chiTietHoaDonList.reduce(
                          (total, item) =>
                            total + item.soLuong * item.giaSanPham,
                          0
                        )
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function CustomPaginationActionsTable(props) {
  const rows = [...props.rows];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead sx={{ background: "#1976d2" }}>
          <TableRow>
            <TableCell>
              {" "}
              <IconButton onClick={props.loadAllBill}>
                <CachedIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
            </TableCell>
            <TableCell sx={{ color: "white" }}>Ngày mua</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Người nhận
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Số điện thoại
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Địa chỉ
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Trạng thái
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.id} row={row} loadAllBill={props.loadAllBill} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
