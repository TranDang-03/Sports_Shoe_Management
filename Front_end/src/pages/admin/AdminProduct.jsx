import { Grid, Paper } from "@mui/material";

import DataGrid from "./Components/DataGrid/DataGrid";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminProductDetail from "./Components/ProductInfor/AdminProductDetail";

const AdminProduct = (props) => {
  const [productList, setProductList] = useState([]);
  const [ls, setLs] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProductList(response.data);
      setLs(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách sản phẩm không tải được");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <DataGrid data={productList} setProduct={setProduct} />
        </Grid>
        <Grid item xs={3} component={Paper} marginTop={13}>
          <AdminProductDetail
            setProductList={setProductList}
            productList={productList}
            ls={ls}
            loadProducts={loadProducts}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default AdminProduct;
