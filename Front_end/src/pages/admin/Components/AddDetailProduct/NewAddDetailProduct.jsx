import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../../../../configs/FireBaseConfig/FireBaseConfig";
import CreateColorAndSize from "../ProductInfor/CreateColorAndSize";
import FilePresentIcon from "@mui/icons-material/FilePresent";

const NewAddDetailProduct = (props) => {
  const [editQuantity, setEditQuantity] = useState(0);
  const [editGiaNhap, setEditGiaNhap] = useState(0.0);
  const [editGiaBan, setEditGiaBan] = useState(0.0);

  const [productList, setProductList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);

  const [editColor, setEditColor] = useState(null);
  const [editSize, setEditSize] = useState(null);
  const [id, setId] = useState(-999);

  const idSP = props.id;

  const [newProduct, setNewProduct] = useState({
    id: -1,
    soLuong: 0,
    trangThai: 0,
    mauSac: {},
    sanPham: {
      id: idSP,
    },
    kichThuoc: {},
    giaNhap: 0.0,
    giaBan: 0.0,
    ngayCapNhat: null,
  });

  let chiTietSanPhamCreate = {
    sanPhamChiTiets: [],
    userId: auth.currentUser.uid,
  };

  useEffect(() => {
    loadSize();
    loadColor();
    loadProduct();
  }, []);

  const createProduct = async () => {
    try {
      if (id < 0) {
        const res = await axios.post(
          "http://localhost:8080/api/admin/san-pham-chi-tiet",
          chiTietSanPhamCreate
        );
        if (res.status === 200) {
          // Xử lý thành công, ví dụ:
          //load danh sách sản phẩm mới và reset newProduct
          loadProduct();
          setId(-999);
          // Tải danh sách sản phẩm mới sau khi tạo
          setNewProduct({
            id: -1,
            soLuong: 0,
            trangThai: 0,
            mauSac: {},
            sanPham: {
              id: idSP,
            },
            kichThuoc: {},
            giaNhap: 0.0,
            giaBan: 0.0,
            ngayCapNhat: null,
          });
          toast("Đã thêm sản phẩm thành công");
        } else {
          console.error("Lỗi từ máy chủ:", res.data);
        }
      } else {
        const res = await axios.put(
          "http://localhost:8080/api/admin/san-pham-chi-tiet",
          chiTietSanPhamCreate
        );
        if (res.status === 200) {
          // Xử lý thành công, ví dụ:
          //load danh sách sản phẩm mới và reset newProduct
          loadProduct();
          setId(-999);
          // Tải danh sách sản phẩm mới sau khi tạo
          setNewProduct({
            id: -1,
            soLuong: 0,
            trangThai: 0,
            mauSac: {},
            sanPham: {
              id: idSP,
            },
            kichThuoc: {},
            giaNhap: 0.0,
            giaBan: 0.0,
            ngayCapNhat: null,
          });
          toast("Đã cập nhật sản phẩm thành công");
        } else {
          console.error("Lỗi từ máy chủ cập nhật:", res.data);
        }
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 500) {
        // Xử lý lỗi từ phía máy chủ 500
        console.error("Lỗi từ máy chủ:", error.response.data[0]);
      }
      // Xử lý lỗi mạng hoặc lỗi không xác định

      toast.error("Thêm sản phẩm có lỗi");
    }
  };

  const loadProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/type1?idSP=" + idSP
      );
      setProductList(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi dữ liệu, chưa tải được dữ liệu");
    }
  };

  const loadSize = async () => {
    try {
      const response = await axios.get("http://localhost:8080/size/available");
      setSizeList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadColor = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/colors/available"
      );
      setColorList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/" + id
      );
      loadProduct(); // Tải danh sách sản phẩm mới sau khi tạo
      toast.success("Đã xóa thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đã xóa thành công");
    }
  };

  const handleOnChangeQuantity = (event) => {
    if (event.target.value < 0) {
      setEditQuantity(0);
      return;
    }
    setEditQuantity(event.target.value);
  };

  const handleOnChangeGiaNhap = (event) => {
    if (event.target.value < 0) {
      setEditGiaNhap(0);
      return;
    }
    setEditGiaNhap(event.target.value);
  };

  const handleOnChangeGiaBan = (event) => {
    if (event.target.value < 0) {
      setEditGiaBan(0);
      return;
    }
    setEditGiaBan(event.target.value);
  };

  const handleOnSaveDetailProduct = () => {
    if (!editColor || !editSize) {
      toast.warning("Hãy chọn màu sắc và kích thước.");
      return;
    }

    if (isDuplicateProduct(editSize.id, editColor.id) && id < 0) {
      toast.error("Sản phẩm đã tồn tại với kích thước và màu sắc này.");
      return;
    }

    const updatedProduct = { ...newProduct };
    updatedProduct.id = id;
    updatedProduct.trangThai = 1;
    updatedProduct.mauSac = editColor;
    updatedProduct.kichThuoc = editSize;
    updatedProduct.soLuong = editQuantity;
    updatedProduct.giaNhap = editGiaNhap;
    updatedProduct.giaBan = editGiaBan;
    console.log("Sản phẩm đã thay đổi giá trị: ", updatedProduct);

    setNewProduct(updatedProduct);

    chiTietSanPhamCreate = {
      ...chiTietSanPhamCreate,
      sanPhamChiTiets: [updatedProduct],
    };

    createProduct();
  };
  const isDuplicateProduct = (sizeId, colorId) => {
    return productList.some((product) => {
      return product.kichThuoc.id === sizeId && product.mauSac.id === colorId;
    });
  };

  return (
    <>
      <Grid container spacing={2} mt={3} mb={0.5}>
        <Grid item xs={3}>
          <Autocomplete
            id="combo-box-color"
            autoHighlight={true}
            options={colorList}
            getOptionLabel={(option) => option.ten}
            value={editColor}
            onChange={(event, newValue) => {
              setEditColor(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Màu sắc" />}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            id="combo-box-size"
            options={sizeList}
            autoHighlight={true}
            getOptionLabel={(option) => option.giaTri.toString()}
            value={editSize}
            onChange={(event, newValue) => {
              setEditSize(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Size" />}
          />
        </Grid>
        <Grid item xs={1.5}>
          <TextField
            id="numberQuantity"
            label="Số lượng"
            variant="outlined"
            type="number"
            value={editQuantity}
            onChange={handleOnChangeQuantity}
          />
        </Grid>
        <Grid item xs={1.5}>
          <TextField
            id="GiaNhap"
            label="Giá nhập"
            variant="outlined"
            type="number"
            value={editGiaNhap}
            onChange={handleOnChangeGiaNhap}
          />
        </Grid>
        <Grid item xs={1.5}>
          <TextField
            id="GiaBan"
            label="Giá bán"
            variant="outlined"
            type="number"
            value={editGiaBan}
            onChange={handleOnChangeGiaBan}
          />
        </Grid>

        <Grid item xs={1.5}>
          <IconButton size="large" onClick={handleOnSaveDetailProduct}>
            {id < 0 ? <SaveIcon /> : <SaveAsIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <CreateColorAndSize loadSize={loadSize} loadColor={loadColor} />
      <h2>Danh sách sản phẩm chi tiết</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Màu sắc</TableCell>
              <TableCell align="right">Kích thước</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá nhập (₫)</TableCell>
              <TableCell align="right">Giá bán (₫)</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0, // Loại bỏ đường kẻ ở hàng cuối cùng
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Box
                      bgcolor={row.mauSac.giaTri}
                      width={"20px"}
                      height={"auto"}
                      component={Paper}
                    ></Box>
                    &nbsp;
                    {row.mauSac.ten}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Box>{row.kichThuoc.giaTri}</Box>
                </TableCell>
                <TableCell align="right">
                  <Box>{row.soLuong}</Box>
                </TableCell>
                <TableCell align="right">
                  <Box>{Intl.NumberFormat("vi-VN").format(row.giaNhap)}</Box>
                </TableCell>
                <TableCell align="right">
                  <Box> {Intl.NumberFormat("vi-VN").format(row.giaBan)}</Box>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <IconButton
                      onClick={() => {
                        setEditQuantity(row.soLuong);
                        setEditGiaNhap(row.giaNhap);
                        setEditGiaBan(row.giaBan);
                        setEditSize(row.kichThuoc);
                        setEditColor(row.mauSac);
                        setId(row.id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default NewAddDetailProduct;
