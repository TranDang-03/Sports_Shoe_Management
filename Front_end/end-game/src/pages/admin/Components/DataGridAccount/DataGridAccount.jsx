import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Container, Toolbar } from "@mui/material";

const DataGridAccount = (props) => {
  const columns = useMemo(() => [
    {
      accessorKey: "ten",
      header: "Tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "trangThai", //normal accessorKey
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
  const enableTopToolbar = false;
  const enableStickyFooter = true;
  const enableStickyHeader = false;
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
        // console.info(event, row.id);
        console.log("Tài khoản", data[row.id]);
        props.setSelectACC(data[row.id]);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            boxShadow: "-5px 0 0 0 #3399FF",
            borderRadius: "5px",
          }}
        >
          <MaterialReactTable table={table} />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default DataGridAccount;
