import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props) {
  const handleChange = (event, newValue) => {
    if (newValue === null) {
      props.loadProducts();
      return;
    }
    if (newValue.year === 1994) {
      props.setProductList(sortByNameAscending(props.productList));
    }
    if (newValue.year === 1972) {
      props.setProductList(sortByNameDescending(props.productList));
    }
  };
  function sortByNameAscending(productList) {
    return [...productList].sort((a, b) =>
      a.tenSanPham.localeCompare(b.tenSanPham)
    );
  }

  function sortByNameDescending(productList) {
    return [...productList].sort((a, b) =>
      b.tenSanPham.localeCompare(a.tenSanPham)
    );
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Sắp xếp 🌪️" />}
      onChange={handleChange} // Thêm sự kiện onChange
    />
  );
}
const top100Films = [
  { label: "Tên từ A - Z", year: 1994 },
  { label: "Tên từ Z - A", year: 1972 },
  { label: "Số Lượng Đánh giá", year: 1974 },
  { label: "Số Lượng Yêu thích", year: 2008 },
];
