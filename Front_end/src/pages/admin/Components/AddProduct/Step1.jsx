import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { auth } from "../../../../configs/FireBaseConfig/FireBaseConfig";
import FormDialogAddCate from "../AddCateDiaLog";
import FormDialogAddCate2 from "../AddBrandDiaLog";
import CreateQR from "../CretateQR";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Step1 = (props) => {
  const [san_pham, setSan_Pham] = useState(props.sanPham);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [thuong_hieus, setThuong_hieus] = useState([]);
  const [danh_mucs, setDanh_mucs] = useState([]);
  const [selectedDanhMuc, setSelectedDanhMuc] = useState([]);
  const [isSPError, setIsSPError] = useState(false);
  const [isSPHT, setIsSPEHT] = useState("");
  const [isMaError, setIsMaError] = useState(false);
  const [isMaHT, setIsMaEHT] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDanhMuc(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setSan_Pham(props.sanPham);
    getBrands();
    getCate();
    setTimeout(() => {
      getSelectedCate();
    }, 1000);
  }, [props.sanPham]);

  const handleTenSanPhamChange = (event) => {
    setSan_Pham({ ...san_pham, tenSanPham: event.target.value });
  };
  const handleMaSanPhamChange = (event) => {
    setSan_Pham({ ...san_pham, maSanPham: event.target.value });
  };
  const handleMotaChange = (event) => {
    setSan_Pham({ ...san_pham, moTa: event.target.value });
  };

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setSan_Pham({ ...san_pham, thuongHieu: newValue });
    }
  };

  const handleChange2 = (event) => {
    if (san_pham.trangThai === 1) {
      setSan_Pham({ ...san_pham, trangThai: 0 });
    } else {
      setSan_Pham({ ...san_pham, trangThai: 1 });
    }
  };
  const validateSanPham = (san_pham) => {
    const errors = {};

    // Kiểm tra tên sản phẩm không được trống
    if (!san_pham.tenSanPham.trim()) {
      errors.tenSanPham = "Tên sản phẩm không được trống";
      setIsSPEHT("Tên sản phẩm không được trống!");
      setIsSPError(true);
    }

    if (san_pham.tenSanPham.trim().length > 50) {
      errors.tenSanPham = "Tên sản phẩm quá số lượng kí tự cho phép";
      setIsSPEHT("Tên sản phẩm quá số lượng kí tự cho phép");
      setIsSPError(true);
    }
    if (san_pham.maSanPham.trim().length > 50) {
      errors.tenSanPham = "Mã sản phẩm quá số lượng kí tự cho phép";
      setIsMaError(true);
      setIsMaEHT("Mã sản phẩm quá số lượng kí tự cho phép!");
    }

    // Kiểm tra id thương hiệu không được trống
    if (san_pham.thuongHieu.id === -1) {
      errors.thuongHieu = "Thương hiệu không được trống";
      toast.warning("Thương hiệu không được trống!");
    }
    if (san_pham.moTa.trim().length > 1000) {
      errors.moTa = "Độ dài mô tả không được quá 1000 kí tự";
      toast.warning("Độ dài mô tả không được quá 1000 kí tự!");
    }

    return errors;
  };

  const fetchData = async () => {
    setIsSPEHT("");
    setIsSPError(false);
    setIsMaError(false);
    setIsMaEHT("");
    try {
      if (props.sanPham.id !== "") {
        const response = await axios.put(
          "http://localhost:8080/products/update/" + auth.currentUser.uid,
          san_pham
        );
        const data = await response;
        console.log(data);
        if (data.status === 201) {
          toast.success("Đã hoàn thành lưu thông tin!");
          resetCate();
          props.setSanPham(data.data);
        } else {
          toast.error("có lỗi ở phía server!");
        }
      } else {
        const response = await axios.post(
          "http://localhost:8080/products/create/" + auth.currentUser.uid,
          san_pham
        );
        const data = await response;
        console.log(data);
        if (data.status === 201) {
          toast.success("Đã hoàn thành lưu thông tin!");
          resetCate();
          props.setSanPham(data.data);
        } else {
          toast.error("có lỗi ở phía server!");
        }
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Lưu thông tin sản phẩm không thành công"
      );
      console.error("Lỗi:", error);
    }
  };
  const getBrands = async () => {
    try {
      const res = await axios.get("http://localhost:8080/thuong-hieu/get-all");
      if (res.status === 200) {
        setThuong_hieus(res.data);
        console.log("Danh sách thương hiệu", res.data);
      }
    } catch (error) {}
  };

  const getSelectedCate = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/san-pham-danh-muc/get-all-san-pham?idSP=" +
          props.sanPham.id || 3
      );
      if (res.status === 200) {
        const s = res.data.map((item) => item.danhMuc.ten);
        setSelectedDanhMuc(s);
        console.log("Danh sách danh muc da chon", s);
      }
    } catch (error) {}
  };

  const getCate = async () => {
    try {
      const res = await axios.get("http://localhost:8080/danh-muc/get-all");
      if (res.status === 200) {
        const s = res.data.map((item) => item.ten);

        setDanh_mucs(s);
        console.log("Danh sách danh muc", res.data);
      }
    } catch (error) {}
  };

  const resetCate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/san-pham-danh-muc/create/" + san_pham.id,
        selectedDanhMuc
      );
      if (res.status === 200) {
        console.log("Đã cập nhật danh sách danh mục");
      }
    } catch (error) {}
  };

  const deletex = async () => {
    if (!window.confirm("Xác nhận xóa?")) {
      return;
    }
    try {
      const res = await axios.delete(
        "http://localhost:8080/products/delete/" + san_pham.id
      );
      if (res.status === 200) {
        window.location.reload();
        console.log("Đã cập nhật danh sách danh mục");
      }
    } catch (error) {}
  };
  const handleClickDone = () => {
    setIsButtonDisabled(true);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
    console.log("Sản phẩm", san_pham);
    console.log("Người dùng hiện tại", auth.currentUser.uid);

    const errors = validateSanPham(san_pham);

    if (Object.keys(errors).length === 0) {
      // Dữ liệu hợp lệ, tiến hành xử lý hoặc gửi dữ liệu lên server
      fetchData();
    } else {
      // Dữ liệu không hợp lệ, hiển thị thông báo lỗi hoặc thực hiện các hành động khác
      toast.warning("Thêm chưa thành công!");
      console.log("Có lỗi:", errors);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            id="ten-san-pham"
            label="Tên sản phẩm *"
            fullWidth
            variant="outlined"
            value={san_pham.tenSanPham || ""}
            onChange={handleTenSanPhamChange}
            error={isSPError}
            helperText={isSPHT}
          />
          <Grid container>
            <Grid item xs={10.5}>
              <TextField
                fullWidth
                id="ma-san-pham"
                label="Mã sản phẩm"
                variant="outlined"
                sx={{ marginTop: "20px" }}
                value={san_pham.maSanPham || ""}
                onChange={handleMaSanPhamChange}
                error={isMaError}
                helperText={isMaHT}
              />
            </Grid>
            <Grid item xs={1.5}>
              <CreateQR value={san_pham.maSanPham} />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={10.5}>
              <Autocomplete
                value={
                  thuong_hieus.find(
                    (film) => film.id === san_pham.thuongHieu.id
                  ) || null
                }
                clearIcon={false}
                onChange={handleAutocompleteChange}
                disablePortal
                id="thuong-hieu"
                options={thuong_hieus}
                getOptionLabel={(option) => option.ten}
                getOptionKey={(option) => option.id}
                sx={{ marginTop: "20px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Thương hiệu *" />
                )}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginTop: "20px" }}>
              <FormDialogAddCate getBrands={getBrands} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10.5}>
              <FormControl sx={{ marginTop: "20px", width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Danh mục
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedDanhMuc}
                  onChange={handleChange}
                  input={<OutlinedInput label="Danh mục" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {danh_mucs.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={selectedDanhMuc.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1.5} sx={{ marginTop: "20px" }}>
              <FormDialogAddCate2 getCate={getCate} />
            </Grid>
          </Grid>

          <TextField
            id="mo-ta"
            label="Mô tả"
            sx={{ marginTop: "20px" }}
            multiline
            maxRows={4}
            variant="outlined"
            onChange={handleMotaChange}
            value={san_pham.moTa || ""}
          />
          <FormControlLabel
            value={san_pham.trangThai}
            control={
              <Checkbox
                checked={san_pham.trangThai === 1 ? true : false || false}
                onChange={handleChange2}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Đang bán?"
            labelPlacement="end"
          />

          <Button
            sx={{ marginTop: "20px" }}
            onClick={handleClickDone}
            variant="outlined"
            disabled={isButtonDisabled}
          >
            Lưu thông tin sản phẩm
          </Button>
          {props.sanPham.id ? (
            <Button
              sx={{ marginTop: "10px" }}
              color="error"
              onClick={deletex}
              variant="outlined"
              disabled={isButtonDisabled}
            >
              Xóa sản phẩm
            </Button>
          ) : (
            ""
          )}
        </Paper>
      </Container>
    </>
  );
};
export default Step1;
