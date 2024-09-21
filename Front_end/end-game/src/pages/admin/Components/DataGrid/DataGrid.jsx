import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Chip, Container, Toolbar } from "@mui/material";
import AnhCo from "../Arow/imgsx";

const DataGrid = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: "Ảnh",
      size: 50,
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <AnhCo
            alt="avatar"
            height={30}
            src={row.original.avatar}
            loading="lazy"
            style={{ borderRadius: "50%" }}
            id={renderedCellValue}
          />
        </Box>
      ),
    },
    {
      accessorKey: "tenSanPham",
      header: "Tên sản phẩm",
    },
    {
      accessorKey: "thuongHieu.ten", //normal accessorKey
      header: "Thương hiệu",
    },
    {
      accessorKey: "ngayTao",
      header: "Ngày tạo",
    },
    {
      accessorKey: "trangThai",
      header: "Trạng thái",
      Cell: ({ cell }) => (
        <Chip
          sx={
            cell.getValue() === 1
              ? { background: "#66FFFF" }
              : { background: "#F08080" }
          }
          label={cell.getValue() === 1 ? "Đang bán" : "Không bán"}
        />
      ),
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
        props.setProduct(data[row.id]);
        console.info(event, row.id);
        console.log("San pham ", data[row.id]);
        window.location.href = "/admin/infor-product/" + data[row.id].id;
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return (
    <div className="table-container">
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 1, mb: 0 }}>
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </Container>
    </div>
  );
};

export default DataGrid;
