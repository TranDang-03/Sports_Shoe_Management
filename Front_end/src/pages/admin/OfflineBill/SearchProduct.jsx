import { Autocomplete, Box, Grid, IconButton, TextField } from "@mui/material";

import { useState } from "react";
import AnhCo from "../Components/Arow/imgsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const OfflineSearch = (props) => {
  const [products, setProduct] = useState([]);
  const [value, setValue] = useState(products[0]);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    getProduct();
  }, [props.load]);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet"
      );
      if (res.status === 200) {
        setProduct(res.data);

        console.log("Danh sách sản phẩm", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    if (!value) {
      toast.warning("Hãy chọn sản phẩm");
      return;
    }
    if (props.hd === "") {
      return;
    }
    if (value.soLuong < 1) {
      toast.warning("Sản phẩm đã hết hàng");
      return;
    }
    toast(props.hd);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/hoa-don-chi-tiet/" + props.hd.id,
        {
          sanPhamChiTiet: value,
          hoaDon: props.hd,
          ghiChu: "khong co ghi chu",
          soLuong: quantity,
          giaSanPham: value.giaBan,
        }
      );

      props.getProductInBIll();
      getProduct();
    } catch (error) {
      toast.warning("Sản phẩm hoặc số lượng sản phẩm không hợp lệ ");
      console.log(error);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: "100%" }}
          options={products}
          onChange={(event, newValue) => {
            setQuantity(1);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          autoHighlight
          getOptionLabel={(option) =>
            option.sanPham.tenSanPham +
            " " +
            "(" +
            option.mauSac.ten +
            " / " +
            option.kichThuoc.giaTri +
            ")"
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0, height: "40px" } }}
              {...props}
            >
              <Box height={"60px"} width={"60px"}>
                {" "}
                <AnhCo id={option.sanPham.id} h={"100%"} />{" "}
              </Box>
              {option.sanPham.tenSanPham} ({option.mauSac.ten} /
              {option.kichThuoc.giaTri}) - còn lại {option.soLuong}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="hãy tìm kiếm sản phẩm 🔍"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Số lượng"
          type="number"
          value={quantity}
          onChange={(e) => {
            if (e.target.value <= 0) {
              setQuantity(1);
              return;
            }
            if (value) {
              if (e.target.value > value.soLuong) {
                setQuantity(value.soLuong);
                toast("Đã đạt số lượng tối đa");
                return;
              }
            }
            setQuantity(e.target.value);
          }}
        />
      </Grid>

      <Grid item xs={1}>
        <IconButton
          onClick={() => {
            getProduct();
          }}
        >
          <RestartAltIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          onClick={() => {
            addProduct();
          }}
        >
          <AddShoppingCartIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default OfflineSearch;
