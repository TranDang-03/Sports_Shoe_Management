import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";

import AnhCo from "./imgsx";

// Generate Order Data

export default function OrderProducts(props) {
  return (
    <React.Fragment>
      <Title>Danh sách sản phẩm</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Ảnh </TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Màu sắc / kích thước</TableCell>
            <TableCell>Giá bán (vnđ)</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell align="right">Thành tiền (vnđ)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.newOders.map((row) => (
            <TableRow hover key={row.id}>
              <TableCell>
                <AnhCo id={row.sanPhamChiTiet.sanPham.id} />
              </TableCell>
              <TableCell>{row.sanPhamChiTiet.sanPham.tenSanPham}</TableCell>
              <TableCell>
                {row.sanPhamChiTiet.mauSac.ten} /{" "}
                {row.sanPhamChiTiet.kichThuoc.giaTri}
              </TableCell>

              <TableCell>
                {Intl.NumberFormat("vi-VN").format(row.giaSanPham)}
              </TableCell>
              <TableCell>{row.soLuong}</TableCell>
              <TableCell align="right">
                {Intl.NumberFormat("vi-VN").format(
                  row.soLuong * row.giaSanPham
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
