import { Grid, Typography } from "@mui/material";

import ProductCard from "../../components/Product/ProductCard";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SearchPage = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    loadProducts();
  }, []);
  const urlParams = new URLSearchParams(window.location.search);

  // Lấy giá trị của tham số 'name'
  const nameParam = urlParams.get("search");

  // Kiểm tra xem tham số 'name' có tồn tại không
  if (nameParam !== null) {
    console.log('Giá trị của tham số "search" là:', nameParam);
  }
  const loadProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/Search?search=" + nameParam
      );
      setProductList(response.data);
      console.log("danh sách sản phẩm đã tìm thấy ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách sản phẩm không tải được");
    }
  };
  return (
    <>
      <Grid item xs={10} paddingLeft={5} pt={5}>
        <Typography variant="h6">
          Kết quả tìm kiếm của " {nameParam} "
        </Typography>
        <Grid container spacing={3}>
          {productList.map((item) => {
            return (
              <Grid item xs={2.4} key={item.id}>
                <ProductCard item={item} />
              </Grid>
            );
          })}

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default SearchPage;
