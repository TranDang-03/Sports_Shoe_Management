import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import MiniProduct from "../MiniProduct/MiniProduct";
import Typography from "@mui/material/Typography";
import "./HomeBanner.css";
import MiniBanner from "../MiniBanner/MiniBanner";
import Container from "@mui/material/Container";
import productListHome from "../../data/HomeData";

import axios from "axios";
import { toast } from "react-toastify";
const HomeBanner = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    loadProducts();
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/products/available"
      );
      setProductList(response.data.filter((item, index) => index < 5));
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách sản phẩm không tải được");
    }
  };

  return (
    <Container maxWidth="lg">
      <br />
      <Slider
        asNavFor={nav2}
        ref={slider1}
        arrows={false}
        fade={true}
        speed={2000}
      >
        {productListHome.map((item) => {
          return (
            <div key={item.id}>
              <MiniBanner item={item} />
            </div>
          );
        })}
      </Slider>
      <Typography variant="h5" my={2} style={{ fontWeight: "bold" }}>
        Sản phẩm đề xuất
      </Typography>
      <Slider
        asNavFor={nav1}
        ref={slider2}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
        autoplay={true}
        autoplaySpeed={5000}
      >
        {productList.map((item) => {
          return (
            <div key={item.id}>
              <MiniProduct item={item} />
            </div>
          );
        })}
      </Slider>
    </Container>
  );
};

export default HomeBanner;
