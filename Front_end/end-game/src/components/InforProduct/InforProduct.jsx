import { Box, Button, Chip, Grid, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ColorProductBar from "../InforProductBar/ColorProductBar";
import SizeProductBar from "../InforProductBar/SizeProductBar";
import QuantityAndOder from "../InforProductBar/QuantityAndOder";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
const InforProduct = (props) => {
  const { id } = useParams();
  const auth = getAuth();

  const [selectColor, setSelectColor] = useState(null);
  const [product, setProduct] = useState({});
  const [selectSize, setSelectSize] = useState(null);
  const [listSizeOfColor, setListSizeOfColor] = useState([]);
  const [colors, setColors] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState([]);
  useEffect(() => {
    loadProduct();
    getSelectedCate();
    if (id) {
      loadColor();
    }
    console.log("ID", id);
  }, [id]);

  useEffect(() => {
    loadSize();
    setSelectSize(null);
  }, [selectColor]);

  const loadProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products/" + id);
      setProduct(response.data);
      console.log("SanPham", response.data);
      props.setBrand(response.data.thuongHieu.id);
    } catch (error) {
      console.error(error);
      toast.error("Sản phẩm không tải được");
    }
  };
  
  const getSelectedCate = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/san-pham-danh-muc/get-all-san-pham?idSP=" + id
      );
      if (res.status === 200) {
        setSelectedDanhMuc(res.data);
        console.log("Danh sách danh muc ", res.data);
      }
    } catch (error) {}
  };

  const loadColor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/getMSByIDSP/" + id
      );
      if (response.data) {
        setColors(response.data);
      }
      console.log("Màu sắc", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Màu sắcs không tải được");
    }
  };

  const loadSize = async () => {
    if (selectColor == null) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/SPAndMS?idSP=" +
          id +
          "&idMS=" +
          selectColor
      );
      if (response.data) {
        setListSizeOfColor(response.data);
      }
      console.log("Size", response.data);
    } catch (error) {
      console.error(error);
      toast.error("kích thước không tải được");
    }
  };

  const handleTakeProduct = () => {
    if (selectSize.trangThai === 0) {
      toast.warning("Sản phẩm này đã hết hàng");
    } else if (quantity > selectSize.soLuong || quantity <= 0) {
      alert("số lượng không hợp lệ vui lòng nhập lại");
    } else if (auth.currentUser) {
      createCart();
    } else {
      toast("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng");
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 2000);
    }
  };
  const handleTakeProduct2 = () => {
    if (selectSize.trangThai === 0) {
      toast.warning("Sản phẩm này đã hết hàng");
    } else if (quantity > selectSize.soLuong || quantity <= 0) {
      alert("số lượng không hợp lệ vui lòng nhập lại");
    } else if (auth.currentUser) {
      createCart2();
    } else {
      toast("Hãy đăng nhập để thêm sản phẩm vào giỏ hàng");
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 2000);
    }
  };

  const createCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/gio-hang/create?uid=" +
          auth.currentUser.uid +
          "&sp=" +
          selectSize.id +
          "&sl=" +
          quantity
      );
      if (response.status === 200) {
        toast("Đã thêm thành công vào giỏ hàng");
        loadProduct();
      }
      console.log("Da an them gio hang");
    } catch (error) {
      console.error(error);
      toast.error(
        "Số lượng sản phẩm trong giỏ hàng của bạn đã vượt quá số lượng cho phép"
      );
    }
  };
  const createCart2 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/gio-hang/create?uid=" +
          auth.currentUser.uid +
          "&sp=" +
          selectSize.id +
          "&sl=" +
          quantity
      );
      if (response.status === 200) {
        toast("Đã thêm thành công vào giỏ hàng");
        loadProduct();
        window.location.href = "http://localhost:3000/payment";
      }
      console.log("Da an them gio hang");
    } catch (error) {
      console.error(error);
      toast.error(
        "Số lượng sản phẩm trong giỏ hàng của bạn đã vượt quá số lượng cho phép"
      );
    }
  };
  return (
    <>
      <Box p={1} component={Paper} elevation={2}>
        <Typography variant="h3" color="initial" fontWeight={"bolder"}>
          {product.tenSanPham}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            {" "}
            <Typography variant="subtitle1" color="initial">
              Mã sản phẩm : {product.maSanPham || "Đang cập nhật mã"}
            </Typography>
          </Grid>
          <Grid item>
            {" "}
            <Typography variant="subtitle1" color="initial">
              Trạng thái :{" "}
              {product.trangThai === 1 ? "Đang bán" : "Hiện không còn bán"}
            </Typography>
          </Grid>
        </Grid>

        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Danh mục
        </Typography>
        <Grid container spacing={1}>
          {selectedDanhMuc.length > 0 ? (
            selectedDanhMuc.map((item) => {
              return (
                <Grid item>
                  <Chip
                    label={item.danhMuc.ten}
                    // component="a"
                    // href="#/category/{item.tenDanhMuc}"
                    variant="outlined"
                    clickable
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item>
              <Chip
                label={"Sản phẩm không có danh  mục"}
                // component="a"
                // href="#/category/{item.tenDanhMuc}"
                variant="outlined"
                clickable
              />
            </Grid>
          )}
        </Grid>
        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Thương hiệu
        </Typography>
        <Stack direction="row" spacing={1}>
          {product.thuongHieu ? (
            <Chip
              label={product.thuongHieu.ten}
              // component="a"
              // href="#/category/{item.tenThuongHieu}"
              variant="outlined"
              clickable
            />
          ) : (
            "Không thương  hiệu"
          )}
        </Stack>
        <hr />
        <Typography my={1} variant="caption" fontWeight={"bolder"}>
          Mô tả: {product.moTa}
        </Typography>
        <hr />
        <ColorProductBar
          mauSac={colors}
          selectColor={selectColor}
          setSelectColor={setSelectColor}
        />
        <hr />
        {selectColor !== null ? (
          <SizeProductBar
            listSizeOfColor={listSizeOfColor}
            sp={id}
            ms={selectColor}
            setSelectSize={setSelectSize}
            selectSize={selectSize}
          />
        ) : (
          ""
        )}

        <hr />
        {selectSize !== null ? (
          <>
            <QuantityAndOder
              setQuantity={setQuantity}
              selectSize={selectSize}
            />

            <hr />
            <Stack direction="row" spacing={5} my={2}>
              <Button
                variant="contained"
                startIcon={<ShoppingBagIcon />}
                onClick={handleTakeProduct2}
                size="small"
              >
                Thanh toán
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleTakeProduct}
              >
                Thêm vào giỏ hàng
              </Button>
            </Stack>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
export default InforProduct;
