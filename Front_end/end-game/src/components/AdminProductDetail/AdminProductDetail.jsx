import {
  Box,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import SliderProduct from "../SliderProduct/SliderProduct";
import "./AdminProductDetail.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AdminProductDetail = (props) => {
  const data = props.product || {};
  return (
    <>
      <Toolbar />
      <Container
        elevation={2}
        component={Paper}
        maxWidth="lg"
        sx={{ mt: 3, mb: 0 }}
      >
        <SliderProduct id={0}></SliderProduct>
        <Typography variant="h3" color="initial" fontWeight={"bolder"}>
          {data.tenSanPham}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography my={2} variant="subtitle1" color="initial">
            Mã sản phẩm : {data.id}
          </Typography>
          <Typography my={2} variant="subtitle1" color="initial">
            Trạng thái : {data.trangThai === 1 ? "ngon" : "không ngon"}
          </Typography>
        </Stack>

        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Danh mục
        </Typography>
        <Stack direction="row" spacing={1}>
          {data.danhMuc.map((item, index) => {
            return (
              <Chip
                key={item.id}
                label={item.tenDanhMuc}
                component="a"
                href="#/category/{item.tenDanhMuc}"
                variant="outlined"
                clickable
              />
            );
          })}
          <IconButton aria-label="delete">
            <AddCircleOutlineIcon />
          </IconButton>
        </Stack>
        <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
          Thương hiệu
        </Typography>
        <Stack direction="row" spacing={1}>
          {data.thuongHieu.map((item, index) => {
            return (
              <Chip
                key={item.id}
                label={item.tenThuongHieu}
                component="a"
                href="#/category/{item.tenThuongHieu}"
                variant="outlined"
                clickable
              />
            );
          })}
        </Stack>
        <hr />
        <Box className="Mota">
          <Typography my={1} variant="caption">
            {data.moTa}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default AdminProductDetail;
