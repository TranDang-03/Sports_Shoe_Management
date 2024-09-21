import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Chip } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import HandshakeIcon from "@mui/icons-material/Handshake";
// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  return (
    <React.Fragment>
      <Title>Đơn hàng gần nhất</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày </TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Địa chỉ nhận hàng</TableCell>
            <TableCell>Kênh bán hàng</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.newOders.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.ngayTao}</TableCell>
              <TableCell>{row.sdtNhanHang}</TableCell>
              <TableCell>{row.diaChiCuThe}</TableCell>
              <TableCell>{row.loaiHoaDon ? "Online" : "Offline"}</TableCell>
              <TableCell align="right">
                {" "}
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
                  <Chip
                    icon={<CancelIcon />}
                    label="Đã hủy"
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
                {row.trangThai === 4 ? (
                  <Chip
                    icon={<PriceCheckIcon />}
                    label="Đã thanh toán"
                    variant="outlined"
                  />
                ) : (
                  ""
                )}
                {row.trangThai === 5 ? (
                  <Chip
                    icon={<DoneOutlineIcon />}
                    label="Đã hoàn thành"
                    variant="outlined"
                  />
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="http://localhost:3000/admin/orders"
        // onClick={preventDefault}
        sx={{ mt: 3 }}
      >
        Xem nhiều hơn
      </Link>
    </React.Fragment>
  );
}
