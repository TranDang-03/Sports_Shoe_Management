import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../../../../configs/FireBaseConfig/FireBaseConfig";

const AddDetailProduct = (props) => {
  const [editQuantity, setEditQuantity] = useState(0);
  const [editGiaNhap, setEditGiaNhap] = useState(0.0);
  const [editGiaBan, setEditGiaBan] = useState(0.0);

  const idSP = props.id;
  // Sản phẩm chi tiết
  const [productList, setProductList] = useState([]);
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
  const [editProduct, setEditProduct] = useState(null);
  // Kích thước
  const [sizeList, setSizeList] = useState([]);
  const [newSize, setNewSize] = useState({});
  const [editSize, setEditSize] = useState(null);
  // Màu sắc
  const [colorList, setColorList] = useState([]);
  const [newColor, setNewColor] = useState({});
  const [editColor, setEditColor] = useState(null);

  let chiTietSanPhamCreate = {
    sanPhamChiTiets: [],
    userId: auth.currentUser.uid,
  };

  useEffect(() => {
    console.log("ID sản phẩm: ", idSP);
    // Tải danh sách kích thước và màu sắc từ API khi tải lại trang
    loadSize();
    loadColor();
    loadProduct();
  }, []);

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

  const createProduct = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/san-pham-chi-tiet",
        chiTietSanPhamCreate
      );

      if (res.status === 200) {
        // Xử lý thành công, ví dụ: load danh sách sản phẩm mới và reset newProduct
        loadProduct(); // Tải danh sách sản phẩm mới sau khi tạo
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
        console.error("Báo lỗi", res.data[0]);
      }
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 500) {
        // Xử lý lỗi từ phía máy chủ 500
        console.error("Lỗi từ máy chủ:", error.response.data[0]);

        console.error("Báo lỗi");
      }
      // Xử lý lỗi mạng hoặc lỗi không xác định

      toast.error("Thêm sản phẩm có lỗi");
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

  const handleCreateSize = async () => {
    try {
      await axios.post(
        "http://localhost:8080/size/create/" + auth.currentUser.uid,
        newSize
      );
      loadSize(); // Tải danh sách kích thước mới sau khi tạo
      setNewSize({ giaTri: 0, trangThai: false });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateColor = async () => {
    try {
      await axios.post(
        "http://localhost:8080/colors/create/" + auth.currentUser.uid,
        newColor
      );
      loadColor(); // Tải danh sách màu sắc mới sau khi tạo
      setNewColor({ giaTri: 0, ten: "", trangThai: false });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickAddDetailProductToListProduct = () => {
    if (productList[0].id === -1) {
      toast.warning("Hãy lưu sản phẩm vừa tạo trước khi tạo mới sản phẩm khác");
      return;
    }
    setNewProduct({
      ...newProduct,
      mauSac: colorList[0],
      kichThuoc: sizeList[0],
    });
    const updatedProducts = [...productList]; // Tạo một bản sao của danh sách sản phẩm hiện tại
    updatedProducts.unshift(newProduct); // Thêm bản ghi mới vào đầu danh sách sản phẩm

    // Cập nhật state với danh sách sản phẩm đã được cập nhật
    setProductList(updatedProducts);
  };

  const handleOnChangeQuantity = (event) => {
    setEditQuantity(event.target.value);
  };

  const handleOnChangeGiaNhap = (event) => {
    setEditGiaNhap(event.target.value);
  };

  const handleOnChangeGiaBan = (event) => {
    setEditGiaBan(event.target.value);
  };

  const handleOnSaveDetailProduct = () => {
    if (!editColor || !editSize) {
      toast.warning("Hãy chọn màu sắc và kích thước.");
      return;
    }

    if (isDuplicateProduct(newProduct.id, editSize.id, editColor.id)) {
      toast.error("Sản phẩm đã tồn tại với kích thước và màu sắc này.");
      return;
    }

    const updatedProduct = { ...newProduct };
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

  const isDuplicateProduct = (productId, sizeId, colorId) => {
    return productList.some((product) => {
      return (
        product.id !== productId &&
        product.kichThuoc.id === sizeId &&
        product.mauSac.id === colorId
      );
    });
  };

  const handleOnEditProduct = (id) => {
    const updatedProducts = [...productList];

    for (const product of updatedProducts) {
      if (product.id === id) {
        product.trangThai = 0;
        setEditSize(product.kichThuoc);
        setEditColor(product.mauSac);
        setEditQuantity(product.soLuong);
        setEditGiaNhap(product.giaNhap);
        setEditGiaBan(product.giaBan);
      }
    }

    setProductList(updatedProducts);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm chi tiết</h2>

      <Button
        variant="outlined"
        onClick={handleClickAddDetailProductToListProduct}
        startIcon={<AddIcon />}
      >
        Thêm
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Màu sắc</TableCell>
              <TableCell align="right">Kích thước</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá nhập</TableCell>
              <TableCell align="right">Giá bán</TableCell>
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
                  {row.trangThai === 0 ? (
                    <Autocomplete
                      id="combo-box-color"
                      options={colorList}
                      getOptionLabel={(option) => option.ten}
                      value={editColor}
                      onChange={(event, newValue) => {
                        setEditColor(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Màu sắc" />
                      )}
                    />
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Box
                        bgcolor={row.mauSac.giaTri}
                        width={"20px"}
                        height={"auto"}
                      ></Box>
                      &nbsp;
                      {row.mauSac.ten}
                    </Stack>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.trangThai === 0 ? (
                    <Autocomplete
                      id="combo-box-size"
                      options={sizeList}
                      getOptionLabel={(option) => option.giaTri.toString()}
                      value={editSize}
                      onChange={(event, newValue) => {
                        setEditSize(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Size" />
                      )}
                    />
                  ) : (
                    <Box>{row.kichThuoc.giaTri}</Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.trangThai === 0 ? (
                    <TextField
                      label="Số lượng"
                      value={editQuantity}
                      type="number"
                      sx={{ width: "100px" }}
                      onChange={handleOnChangeQuantity}
                    />
                  ) : (
                    <Box>{row.soLuong}</Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.trangThai === 0 ? (
                    <TextField
                      label="Giá nhập"
                      sx={{ width: "150px" }}
                      value={editGiaNhap}
                      type="number"
                      onChange={handleOnChangeGiaNhap}
                    />
                  ) : (
                    <Box>{row.giaNhap}</Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.trangThai === 0 ? (
                    <TextField
                      label="Giá bán"
                      sx={{ width: "150px" }}
                      value={editGiaBan}
                      type="number"
                      onChange={handleOnChangeGiaBan}
                    />
                  ) : (
                    <Box>{row.giaBan}</Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.trangThai === 0 ? (
                    <IconButton onClick={handleOnSaveDetailProduct()}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <Box>
                      <IconButton onClick={() => handleOnEditProduct(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteProduct(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AddDetailProduct;
