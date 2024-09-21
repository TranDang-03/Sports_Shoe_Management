import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Toolbar } from "@mui/material";

const DataGridBill = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: "ngayTao",
      header: "Ngày tạo",
    },
    {
      accessorKey: "sdtNhanHang",
      header: "Số điện thoại",
    },
    {
      accessorKey: "diaChiCuThe", //normal accessorKey
      header: "Địa chỉ giao hàng",
    },
    {
      accessorKey: "loaiHoaDon",
      header: "Kênh bán hàng",
    },
    {
      accessorKey: "trangThai",
      header: "Trạng thái",
    },
  ]);
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "light",
      },
    })
  );

  const data = props.data;
  const enableTopToolbar = true;
  const enableStickyFooter = true;
  const enableStickyHeader = true;
  const enableFullScreenToggle = false;
  const table = useMaterialReactTable({
    columns,
    data,

    enableTopToolbar,
    enableStickyFooter,
    enableStickyHeader,
    enableFullScreenToggle,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
        console.log("Hoa đơn", data[row.id]);
        window.location.href = "/admin/infor-bill/" + data[row.id].id;
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return (
    <>
      <Toolbar />
      <Container>
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </Container>
    </>
  );
};

export default DataGridBill;
