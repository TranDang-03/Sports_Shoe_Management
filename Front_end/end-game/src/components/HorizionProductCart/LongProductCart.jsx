import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import "./LongProductCart.css";
import RemoveIcon from "@mui/icons-material/Remove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import AnhCo from "../../pages/admin/Components/Arow/imgsx";
import axios from "axios";
import { toast } from "react-toastify";

const LongProductCart = (props) => {
  let product = props.item;
  const [price] = useState(product.sanPhamChiTiet.giaBan);
  const [quantity, setQuantity] = useState(product.soLuong);

  const addQuantity = () => {
    if (product.soLuong < product.sanPhamChiTiet.soLuong) {
      product.soLuong = quantity + 1;
      update();
    } else {
      toast.info("Số lượng đã đạt mức tối đa");
    }

    props.setCheck(props.check + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      product.soLuong = quantity - 1;
      update();
    }
    props.setCheck(props.check + 1);
  };

  const update = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/gio-hang/quantity",
        product
      );
      if (res.status === 200) {
        console.log("Đã thay đổi số lượng", res.data.soLuong);
        setQuantity(product.soLuong);
        props.loadCart();
      }
    } catch (error) {
      console.error(error);
      toast.error("Hủy không thành công");
    }
  };

  const removeProduct = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8080/api/gio-hang/delete/" + product.id,
        product
      );
      if (res.status === 200) {
        console.log("Đã xóa", product.id);
      }
      props.loadCart();
    } catch (error) {
      console.error(error);
      toast.error("xóa không thành công");
    }
  };

  return (
    <Box mb={3} component={Paper} elevation={2}>
      <Card sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box>
              <AnhCo id={product.sanPhamChiTiet.sanPham.id} h={"100%"} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {product.sanPhamChiTiet.sanPham.tenSanPham}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Màu sắc : {product.sanPhamChiTiet.mauSac.ten}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Kích thước : {product.sanPhamChiTiet.kichThuoc.giaTri}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Giá tiền :
                  <CountUp
                    start={price / 2}
                    end={price}
                    duration={1}
                    separator="."
                    // decimals={4}
                    decimal=","
                    prefix=" "
                    suffix="₫"
                  />
                </Typography>
                <Typography
                  component="div"
                  variant="subtitle1"
                  color="text.secondary"
                >
                  Số lượng : {quantity}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Thành tiền :
                  <CountUp
                    start={price / 2}
                    end={price * quantity}
                    duration={1}
                    separator="."
                    // decimals={4}
                    decimal=","
                    prefix=" "
                    suffix=" ₫"
                  />
                </Typography>
              </CardContent>
              <Box>
                <IconButton aria-label="remove" onClick={decreaseQuantity}>
                  <RemoveIcon />
                </IconButton>

                <IconButton aria-label="next" onClick={addQuantity}>
                  <AddIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={removeProduct}>
                  <DeleteIcon />
                </IconButton>
                <IconButton href="/product/2">
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ngăn cách giưa 2 block */}
      </Card>
    </Box>
  );
};
export default LongProductCart;
