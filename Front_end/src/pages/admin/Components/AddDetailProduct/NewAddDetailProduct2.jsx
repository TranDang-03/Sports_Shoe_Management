import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const NewAddDetailProduct2 = (props) => {
  const [productList, setProductList] = useState([]);

  const idSP = props.id;

  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/type0?idSP=" + idSP
      );
      setProductList(response.data);
      props.getKTx();
      props.getTonKho();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi dữ liệu, chưa tải được dữ liệu");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.put("http://localhost:8080/api/RECOVER/" + id);
      loadProduct(); // Tải danh sách sản phẩm mới sau khi tạo
      toast.success("Khôi phục thành công");
    } catch (error) {
      console.error(error);
      toast.error("Khôi phục không thành công");
    }
  };

  return (
    <>
      <h2>Danh sách sản phẩm chi tiết không còn bán </h2>
      {productList.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Màu sắc</TableCell>
                <TableCell align="right">Kích thước</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Giá nhập (₫)</TableCell>
                <TableCell align="right">Giá bán (₫)</TableCell>
                <TableCell align="right">Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0, // Loại bỏ đường kẻ ở hàng cuối cùng
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row" spacing={2}>
                      <Box
                        bgcolor={row.mauSac.giaTri}
                        width={"20px"}
                        height={"auto"}
                        component={Paper}
                      ></Box>
                      &nbsp;
                      {row.mauSac.ten}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Box>{row.kichThuoc.giaTri}</Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box>{row.soLuong}</Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box>{Intl.NumberFormat("vi-VN").format(row.giaNhap)}</Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box> {Intl.NumberFormat("vi-VN").format(row.giaBan)}</Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Khôi phục sản phẩm">
                      <IconButton onClick={() => handleDeleteProduct(row.id)}>
                        <RestoreFromTrashIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h3>Không có sản phẩm nào </h3>
      )}
    </>
  );
};
export default NewAddDetailProduct2;
