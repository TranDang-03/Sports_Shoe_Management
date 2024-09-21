import { Box, Typography, Input, Grid, Slider, Stack } from "@mui/material";
import React, { useState } from "react";
import SwipeIcon from "@mui/icons-material/Swipe";
import CountUp from "react-countup";
const QuantityAndOder = (props) => {
  const selectSize = props.selectSize;

  const [value, setValue] = useState(1);
  const dis = selectSize.giaBan;
  const [thanhTien, setThanhTien] = useState(selectSize.giaBan);

  props.setQuantity(value);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setThanhTien(dis * newValue);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value === "" ? 0 : Number(event.target.value);
    setValue(newValue);
    setThanhTien(dis * newValue);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(1);
    } else if (value > selectSize.soLuong) {
      setValue(selectSize.soLuong);
    }
    setThanhTien(dis * value);
  };
  return (
    <>
      {selectSize.soLuong <= 0 || selectSize.trangThai === 0 ? (
        <h1>Sản phẩm này đã hết hàng</h1>
      ) : (
        <>
          <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
            Giá tiền
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={"bolder"}
              style={{ textDecoration: "line-through" }}
            >
              <CountUp
                start={-875.039}
                end={dis * 1.5}
                duration={1.5}
                separator=","
                // decimals={4}
                decimal=","
                // prefix="$ "
                suffix=""
              ></CountUp>
            </Typography>

            <Typography variant="h6" color="primary" fontWeight={"bolder"}>
              <CountUp
                start={0}
                end={selectSize.giaBan}
                duration={1}
                separator="."
                // decimals={4}
                decimal=","
                // prefix="$ "
                suffix="₫"
              ></CountUp>
            </Typography>
          </Stack>
          <Box>
            <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
              Số lượng
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SwipeIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  max={selectSize.soLuong} // số tối đa
                  min={1}
                  valueLabelDisplay="auto"
                  value={typeof value === "number" ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: selectSize.soLuong, // số tối đa
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
            Thành tiền
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={"bolder"}>
            <CountUp
              start={thanhTien / 2}
              end={thanhTien < 0 ? 0 : thanhTien}
              duration={1.5}
              separator="."
              // decimals={4}
              decimal=","
              // prefix="$ "
              suffix="₫"
            ></CountUp>
          </Typography>
        </>
      )}
    </>
  );
};
export default QuantityAndOder;
