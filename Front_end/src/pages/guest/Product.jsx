import SliderProduct from "../../components/SliderProduct/SliderProduct";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InforProduct from "../../components/InforProduct/InforProduct";
import { Box, Typography } from "@mui/material";
import MiniProduct from "../../components/MiniProduct/MiniProduct";

import Slider from "react-slick";
import Footer from "../../components/Layout/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState();

  const settings = {
    dots: true,
    slidesToShow: products.length < 3 ? products.length : 3,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
  };

  useEffect(() => {
    getPRLikeBrand();
  }, [brand]);

  const getPRLikeBrand = async () => {
    if (!brand) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/products/brand/available/" + brand
      );
      setProducts(response.data);
      console.log("Sản phẩm cùng thuong hieu", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Sản phẩm cùng thuong hieu không tải được");
    }
  };

  return (
    <>
      <Container style={{ marginTop: 30, marginBottom: 50 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <SliderProduct />
          </Grid>
          <Grid item xs={4}>
            <InforProduct setBrand={setBrand} />
          </Grid>
        </Grid>
      </Container>
      <Box p={5}>
        <Typography variant="h4" color={"red"} fontWeight={"bold"}>
          Sản phẩm cùng thương hiệu!
        </Typography>
        <br />
        <Slider {...settings}>
          {products.map((item) => {
            return (
              <div key={item.id}>
                <MiniProduct item={item} />
              </div>
            );
          })}
        </Slider>
      </Box>

      <Footer />
    </>
  );
};
export default Product;
