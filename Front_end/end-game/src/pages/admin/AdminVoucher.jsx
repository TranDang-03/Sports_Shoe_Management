import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import moment from "moment";
import { auth } from "../../configs/FireBaseConfig/FireBaseConfig";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function filterPromotions(promotions, filterOption) {
  // Lấy ngày hiện tại
  const currentDate = moment();

  // Kiểm tra giá trị filterOption
  switch (filterOption) {
    case "1": // Trả về những khuyến mãi có ngày kết thúc bằng hoặc cũ hơn hôm nay
      return promotions.filter((promotion) =>
        moment(promotion.ketThuc).isSameOrBefore(currentDate, "day")
      );
    case "2": // Trả về danh sách có ngày bắt đầu trong tương lai
      return promotions.filter((promotion) =>
        moment(promotion.batDau).isAfter(currentDate, "day")
      );
    case "3": // Trả về danh sách có ngày bắt đầu trước hoặc bằng ngày hôm nay và ngày kết thúc sau ngày hôm nay
      return promotions.filter(
        (promotion) =>
          moment(promotion.batDau).isSameOrBefore(currentDate, "day") &&
          moment(promotion.ketThuc).isAfter(currentDate, "day")
      );
    default: // Trả về tất cả danh sách nếu filterOption không hợp lệ hoặc không được cung cấp
      return promotions;
  }
}

const AdminVoucher = () => {
  const [selected, setSelected] = useState({
    ten: "",
    ma: "",
    moTa: "",
    batDau: "",
    ketThuc: "",
    giamGiaPhanTram: 0,
    giamGiaTruThang: 0,
  });
  const [data, setData] = useState([{}, {}]);
  const [dataAll, setDataAll] = useState([{}, {}]);
  const [isShowCode, setIsShowCode] = useState(-99);

  const [tab, setTab] = useState(1);
  const [radio, setRadio] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setRadio(newValue);
    setData(filterPromotions(dataAll, newValue));
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/voucher");
      if (res.status === 200) {
        setData(res.data);
        setDataAll(res.data);
        setRadio(0);
        console.log("Danh sach khuyen mai", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async () => {
    if (selected.giamGiaTruThang > 0 && selected.giamGiaPhanTram > 0) {
      if (tab === 0) {
        setSelected({
          ...selected,
          giamGiaPhanTram: 0,
        });
      } else {
        setSelected({
          ...selected,
          giamGiaTruThang: 0,
        });
      }
    }
    if (selected.giamGiaPhanTram > 100) {
      setSelected({
        ...selected,
        giamGiaPhanTram: 100,
      });
    }
  };

  const newData = async () => {
    if (selected.ten.trim() === "") {
      toast.warning("Tên không được để trống");
      return;
    }
    if (selected.ma.trim() === "") {
      toast.warning("Mã không được để trống");
      return;
    }

    if (selected.batDau.trim() === "") {
      toast.warning("Ngày bắt đầu không được để trống");
      return;
    }
    if (selected.ketThuc.trim() === "") {
      toast.warning("Ngày kết thúc không được để trống");
      return;
    }
    if (selected.giamGiaPhanTram <= 0 && selected.giamGiaTruThang <= 0) {
      toast.warning("Giảm giá không được để trống");
      return;
    }

    if (selected.giamGiaPhanTram <= 0 && tab === 1) {
      toast.warning("Hãy chọn loại giảm giá");
      return;
    }
    if (selected.giamGiaTruThang <= 0 && tab === 0) {
      toast.warning("Hãy chọn loại giảm giá");
      return;
    }

    if (selected.giamGiaTruThang > 0 && selected.giamGiaPhanTram > 0) {
      if (tab === 0) {
        setSelected({
          ...selected,
          giamGiaPhanTram: 0,
        });
      } else {
        setSelected({
          ...selected,
          giamGiaTruThang: 0,
        });
      }
    }
    const startDate = new Date(selected.batDau);
    const endDate = new Date(selected.ketThuc);

    // So sánh ngày kết thúc có lớn hơn ngày bắt đầu ít nhất 1 ngày hay không
    if (endDate > startDate) {
      // Ngày kết thúc là sau ngày bắt đầu ít nhất 1 ngày
      console.log("Ngày kết thúc hợp lệ");
    } else {
      toast.warning("Ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày");
      return;
    }
    validate();
    try {
      const res = await axios.post(
        "http://localhost:8080/voucher/" + tab,
        selected
      );
      if (res.status === 201) {
        console.log("khuyen mai", res.data);
        toast("Lưu khuyến mãi thành công");
        setSelected({
          id: "",
          ten: "",
          ma: "",
          moTa: "",
          batDau: "",
          ketThuc: "",
          giamGiaPhanTram: 0,
          giamGiaTruThang: 0,
        });
        getData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Thêm không thành công");
      }
      if (error.response.status === 500) {
        toast.error("Thêm không thành công");
      }
    }
  };

  const newData2 = async () => {
    if (window.confirm("Xác nhận?") === false) {
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:8080/voucher/" + selected.id
      );
      if (res.status === 201) {
        console.log("khuyen mai", res.data);
        toast("Sửa khuyến mãi thành công");
        setSelected({
          id: "",
          ten: "",
          ma: "",
          moTa: "",
          batDau: "",
          ketThuc: "",
          giamGiaPhanTram: 0,
          giamGiaTruThang: 0,
        });
        getData();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("không thành công");
      }
      if (error.response.status === 500) {
        toast.error("không thành công");
      }
    }
  };
  const deletes = async () => {
    if (window.confirm("Xác nhận?") === false) {
      return;
    }
    try {
      const res = await axios.delete(
        "http://localhost:8080/voucher/delete/" + selected.id
      );
      if (res.status === 200) {
        console.log("khuyen mai", res.data);
        toast("Xóa khuyến mãi thành công");
        setSelected({
          id: "",
          ten: "",
          ma: "",
          moTa: "",
          batDau: "",
          ketThuc: "",
          giamGiaPhanTram: 0,
          giamGiaTruThang: 0,
        });
        getData();
      }
    } catch (error) {
      console.log(error);

      toast.error("không thành công");
    }
  };

  const [isManager, setIsManager] = useState(false);

  const user = auth.currentUser;
  useEffect(() => {
    checkIsmanaGer();
  }, []);
  const checkIsmanaGer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/tai-khoan/chuc-vu?uid=" + user.uid
      );

      if (res.data === 0) {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    } catch (error) {
      window.location.href = "http://localhost:3000/login";
    }
  };
  return (
    <>
      {isManager ? (
        <Grid container spacing={3} mt={10} px={3} mb={2}>
          <Grid item xs={8}>
            <FormControl sx={{ padding: "3px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Danh sách khuyến mãi
              </FormLabel>
              <RadioGroup
                row
                value={radio}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChange2}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio />}
                  label="Tất cả"
                />
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Hết hạn"
                />
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Sắp tới"
                />
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label="Đang hoạt động"
                />
              </RadioGroup>
            </FormControl>

            {data.length < 1 ? (
              "Danh sách trống"
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên khuyến mãi</TableCell>
                      <TableCell align="right">Mã giảm giá</TableCell>
                      <TableCell align="right">Mô tả</TableCell>
                      <TableCell align="right">Ngày bắt đầu</TableCell>
                      <TableCell align="right">Ngày kết thúc</TableCell>
                      <TableCell align="right">Giảm giá</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow
                        key={index}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.ten}
                        </TableCell>
                        <Tooltip
                          title="Nháy đúp để hiển thị mã"
                          placement="left"
                        >
                          <TableCell
                            align="right"
                            sx={{ cursor: "zoom-out" }}
                            onDoubleClick={() => {
                              if (isShowCode === index) {
                                setIsShowCode(-99);
                                return;
                              }
                              setIsShowCode(index);
                            }}
                          >
                            {isShowCode === index ? row.ma : "********"}
                          </TableCell>
                        </Tooltip>
                        <TableCell align="right">{row.moTa}</TableCell>
                        <TableCell align="right">{row.batDau}</TableCell>
                        <TableCell align="right">{row.ketThuc}</TableCell>
                        <TableCell align="right">
                          {row.giamGiaTruThang > 0
                            ? Intl.NumberFormat("vi-VN").format(
                                row.giamGiaTruThang
                              ) + " đ"
                            : Intl.NumberFormat("vi-VN").format(
                                row.giamGiaPhanTram
                              ) + " %"}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => {
                              setSelected(row);
                              if (row.giamGiaPhanTram > 0) {
                                setTab(1);
                              } else {
                                setTab(0);
                              }
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
          <Grid item xs={4}>
            <Box component={Paper} variant="h1" elevation={5} p={2}>
              <Stack spacing={2}>
                <TextField
                  id="outlined-1"
                  label="Tên khuyến mãi"
                  variant="outlined"
                  fullWidth
                  value={selected && selected.ten ? selected.ten : ""}
                  onChange={(e) => {
                    setSelected({ ...selected, ten: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-12"
                  label="Mã khuyến mãi"
                  value={selected && selected.ma ? selected.ma : ""}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setSelected({ ...selected, ma: e.target.value });
                  }}
                />
                <TextField
                  id="outlined-13"
                  label="Mô tả"
                  variant="outlined"
                  multiline
                  value={selected && selected.moTa ? selected.moTa : ""}
                  maxRows={4}
                  fullWidth
                  onChange={(e) => {
                    setSelected({ ...selected, moTa: e.target.value });
                  }}
                />
                <FormControl variant="outlined">
                  Ngày bắt đầu
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    type="date"
                    fullWidth
                    value={selected && selected.batDau ? selected.batDau : ""}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    onChange={(e) => {
                      setSelected({ ...selected, batDau: e.target.value });
                    }}
                  />
                </FormControl>
                <FormControl variant="outlined">
                  Ngày kết thúc
                  <OutlinedInput
                    id="outlined-adornment-1"
                    type="date"
                    value={selected && selected.ketThuc ? selected.ketThuc : ""}
                    fullWidth
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                    onChange={(e) => {
                      setSelected({ ...selected, ketThuc: e.target.value });
                    }}
                  />
                </FormControl>

                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      centered
                      value={tab}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Giảm giá trừ thẳng" {...a11yProps(0)} />
                      <Tab label="Giảm giá phần trăm" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={tab} index={0}>
                    <TextField
                      id="outlined-123"
                      label="Giảm giá trừ thẳng (vnđ)"
                      variant="outlined"
                      value={
                        selected && selected.giamGiaTruThang
                          ? selected.giamGiaTruThang
                          : ""
                      }
                      type="number"
                      fullWidth
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          giamGiaTruThang: e.target.value,
                        });
                      }}
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={tab} index={1}>
                    <TextField
                      id="outlined-123"
                      label="Giảm giá phần trăm (%)"
                      variant="outlined"
                      type="number"
                      value={
                        selected && selected.giamGiaPhanTram
                          ? selected.giamGiaPhanTram
                          : ""
                      }
                      max={100}
                      min={0}
                      fullWidth
                      onChange={(e) => {
                        if (e.target.value > 100) {
                          setSelected({
                            ...selected,
                            giamGiaPhanTram: 100,
                          });
                        }
                        setSelected({
                          ...selected,
                          giamGiaPhanTram: e.target.value,
                        });
                      }}
                    />
                  </CustomTabPanel>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Button
                    onClick={() =>
                      setSelected({
                        id: "",
                        ten: "",
                        ma: "",
                        moTa: "",
                        batDau: "",
                        ketThuc: "",
                        giamGiaPhanTram: 0,
                        giamGiaTruThang: 0,
                      })
                    }
                  >
                    Làm mới
                  </Button>

                  {selected.id === "" ? (
                    ""
                  ) : (
                    <>
                      {" "}
                      <Button
                        color="warning"
                        onClick={() => {
                          newData2();
                        }}
                      >
                        Kết thúc khuyến mãi
                      </Button>
                      <Button
                        color="error"
                        onClick={() => {
                          deletes();
                        }}
                      >
                        Xóa khuyến mãi
                      </Button>
                    </>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => newData()}
                  >
                    Lưu thông tin
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Button sx={{ height: "90dvh" }} fullWidth>
          Bạn không có quyền chỉnh sửa khuyến mãi
        </Button>
      )}
    </>
  );
};
export default AdminVoucher;
