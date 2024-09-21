import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Box, Container, Paper } from "@mui/material";
import "./SliderProduct.css";

import { useParams } from "react-router-dom";
import { storage } from "../../configs/FireBaseConfig/FireBaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";

const SliderProduct = (props) => {
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const loadFiles = async () => {
    const listRef = ref(
      storage,
      "SP/" + (props.id != null ? props.id : id) + "/"
    ); // 'files' là đường dẫn trong Storage
    try {
      const fileRefs = await listAll(listRef);
      const urls = await Promise.all(fileRefs.items.map(getDownloadURL));
      setFileList(urls);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tệp");
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles(); // Tải danh sách tệp khi tải lại trang
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        {fileList.length === 0 ? (
          <img
            src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            alt=""
          />
        ) : (
          ""
        )}
        <Box component={Paper} elevation={5}>
          {props.id != null ? (
            <Slider
              asNavFor={nav2}
              ref={slider1}
              arrows={false}
              fade={true}
              speed={2000}
            >
              {fileList.map((item, index) => {
                return (
                  <div className="bigImg2" key={item}>
                    <img src={item} alt="122" className="imgBig2" />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <Slider
              asNavFor={nav2}
              ref={slider1}
              arrows={false}
              fade={true}
              speed={2000}
            >
              {fileList.map((item, index) => {
                return (
                  <div className="bigImg" key={item}>
                    <img src={item} alt="122" className="imgBig" />
                  </div>
                );
              })}
            </Slider>
          )}

          {props.id != null ? (
            <Slider
              asNavFor={nav1}
              ref={slider2}
              slidesToShow={1}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
              autoplay={true}
              autoplaySpeed={4000}
            >
              {fileList.map((item, index) => {
                return (
                  <div className="smallImg2" key={item}>
                    <img src={item} alt="ảnh nhỏ" className="imgBig2" />
                  </div>
                );
              })}
            </Slider>
          ) : (
            <Slider
              asNavFor={nav1}
              ref={slider2}
              slidesToShow={fileList.length < 4 ? fileList.length : 4}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
              autoplay={true}
              autoplaySpeed={4000}
            >
              {fileList.map((item, index) => {
                return (
                  <div className="smallImg" key={item}>
                    <img src={item} alt="ảnh nhỏ" className="imgBig" />
                  </div>
                );
              })}
            </Slider>
          )}
        </Box>
      </Container>
    </>
  );
};
export default SliderProduct;
