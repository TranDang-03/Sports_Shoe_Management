import { Box, Grid, Typography } from "@mui/material";

import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProductCard from "../../components/Product/ProductCard";
import SideBar from "../../components/SideBar/SideBar";
import Footer from "../../components/Layout/Footer/Footer";
import FillerProduct from "../../components/FillerProduct/FillerProduct";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SearchAll from "../../components/SearchAll/SearchAll";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Lấy URL hiện tại của trình duyệt
  const itemsPerPage = 12; // Số phần tử trên mỗi trang
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/available?" +
          (name !== null ? "&name=" + name : "") +
          (categories.length !== 0 ? "&categories=" + categories : "") +
          (brands.length !== 0 ? "&brands=" + brands : "") +
          (colors.length !== 0 ? "&colors=" + colors : "") +
          (sizes.length !== 0 ? "&sizes=" + sizes : "") +
          (minPrice !== 0 ? "&minPrice=" + minPrice : "") +
          (maxPrice !== 0 ? "&maxPrice=" + maxPrice : "")
      );

      console.log("danh sách sản phẩm đã tìm thấy ", response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));

      const indexOfLastItem = page * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = response.data.slice(
        indexOfFirstItem,
        indexOfLastItem
      );
      setProductList(currentItems);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách sản phẩm không tải được");
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        mt={3}
        mr={3}
        spacing={2}
        style={{ float: "right" }}
      >
        <SearchAll setName={setName} name={name} loadProducts={loadProducts} />
        <FillerProduct
          productList={productList}
          setProductList={setProductList}
          loadProducts={loadProducts}
        />
      </Stack>
      <Box minHeight={"100vh"} py={5}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <SideBar
                loadProducts={loadProducts}
                categories={categories}
                setCategories={setCategories}
                brands={brands}
                setBrands={setBrands}
                sizes={sizes}
                setSizes={setSizes}
                colors={colors}
                setColors={setColors}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
              />
            </Grid>
            <Grid item xs={10}>
              {productList.length === 0 ? (
                <Typography align="center" variant="h6">
                  Không có sản phẩm nào trùng khớp với lựa chọn của bạn
                </Typography>
              ) : (
                ""
              )}
              <Grid container spacing={3}>
                {productList.map((item) => {
                  return (
                    <Grid item xs={3} key={item.id}>
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
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      shape="rounded"
                      showFirstButton
                      showLastButton
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
export default Products;
