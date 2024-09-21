import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import NewAddDetailProduct2 from "../AddDetailProduct/NewAddDetailProduct2";

const chartSetting = {
  xAxis: [
    {
      label: "Biểu đồ thể hiện số sản phẩm tồn kho ",
    },
  ],

  height: 400,
};

const valueFormatter = (value) => `${value}`;

function nhomVaTinhTongSoLuong(danhSachSanPham) {
  // Khởi tạo một đối tượng để lưu trữ thông tin về tổng số lượng theo tên sản phẩm
  const tongSoLuongTheoTen = {};

  // Duyệt qua danh sách sản phẩm để nhóm và tính tổng số lượng
  danhSachSanPham.forEach((sanPham) => {
    const { sanPhamChiTiet, soLuong } = sanPham.sanPhamChiTiet;
    const lable =
      sanPhamChiTiet.mauSac.ten + " / " + sanPhamChiTiet.kichThuoc.giaTri;
    // Nếu sản phẩm đã tồn tại trong đối tượng tổng số lượng, thì cộng thêm vào
    if (tongSoLuongTheoTen[lable]) {
      tongSoLuongTheoTen[lable] += soLuong;
    } else {
      // Nếu sản phẩm chưa tồn tại, thì tạo mới với giá trị là số lượng của sản phẩm hiện tại
      tongSoLuongTheoTen[lable] = soLuong;
    }
  });

  // Chuyển đối tượng tổng số lượng thành mảng các đối tượng {tenSanPham, soLuong}
  const ketQua = Object.keys(tongSoLuongTheoTen).map((tenSanPham) => ({
    tenSanPham,
    soLuong: tongSoLuongTheoTen[tenSanPham],
  }));

  return ketQua;
}

const Step3 = (props) => {
  const [productList, setProductList] = useState([]);
  const [tonKho, setTonKho] = useState([[0], [0]]);
  const [daBan, setDaBan] = useState([[0], [0]]);
  const [bestKT, setBestKT] = useState([[{ giaTri: "Không có" }], [[]]]);
  const [bestMS, setBestMS] = useState([[{ ten: "Không có" }], [[]]]); //bestKT[0][1]
  const [data1, setData1] = useState([{ ten: "", soLuong: 0 }]);
  const [data2, setData2] = useState([
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ]);

  useEffect(() => {
    getTonKho();
    getDaBan();
    getMS();
    getKT();
    getKTx();
    getData2();
  }, []);
  const getTonKho = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/tonKho/" + props.sanPham.id
      );
      if (res.status === 200) {
        setTonKho(res.data);
      }
    } catch (error) {}
  };
  const getDaBan = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/daBan/" + props.sanPham.id
      );
      if (res.status === 200) {
        setDaBan(res.data);
        console.log("daban ", res.data);
      }
    } catch (error) {}
  };
  const getMS = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/mauHot/" + props.sanPham.id
      );
      if (res.status === 200) {
        setBestMS(res.data);
        console.log("bms ", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getKT = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/ktHot/" + props.sanPham.id
      );
      if (res.status === 200) {
        setBestKT(res.data);
        console.log("bkt ", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getData2 = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/3x/" + props.sanPham.id
      );
      if (res.status === 200) {
        const danhSachTongTien = res.data.map((spct) => ({
          id: spct[0].id,
          value: spct[1],
          label: spct[0].mauSac.ten + " / " + spct[0].kichThuoc.giaTri,
          color: spct[0].mauSac.giaTri,
        }));
        setData2(danhSachTongTien);
        console.log("sxData2 ", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getKTx = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/san-pham-chi-tiet/type1?idSP=" +
          props.sanPham.id
      );
      if (res.status === 200) {
        const danhSachTongTien = res.data.map((spct) => ({
          ten: spct.mauSac.ten + "/" + spct.kichThuoc.giaTri,
          soLuong: spct.soLuong,
        }));
        setData1(danhSachTongTien);
        console.log("data1 ", res.data);
        setProductList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function tinhTyLeLoiNhuan(giaBan, giaNhap) {
    const loiNhuan = giaBan - giaNhap;
    const tyLeLoiNhuan = (loiNhuan / giaNhap) * 100;
    if (tyLeLoiNhuan === 0) {
      return 0;
    }
    return tyLeLoiNhuan.toFixed(2); // Làm tròn đến 2 chữ số thập phân
  }
  return (
    <Box sx={{ mt: 4, mb: 4, px: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #0077cc;",
            }}
          >
            <Typography sx={{ color: "#0077cc" }} variant="subtitle1">
              Tổng sản phẩm tồn kho
            </Typography>
            <Typography variant="h6">{tonKho[0][0]} </Typography>
            <Typography variant="body2">
              Trị giá {Intl.NumberFormat("vi-VN").format(tonKho[0][1])} ₫
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #1c966c;",
            }}
          >
            <Typography sx={{ color: "#1c966c" }} variant="subtitle1">
              Tổng sản phẩm đã bán
            </Typography>
            <Typography variant="h6">{daBan[0][0]} </Typography>
            <Typography variant="body2">
              Tổng tiền thu về {Intl.NumberFormat("vi-VN").format(daBan[0][1])}{" "}
              ₫
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #328d9c;",
            }}
          >
            <Typography sx={{ color: "#328d9c" }} variant="subtitle1">
              Màu sắc bán chạy nhất
            </Typography>{" "}
            {bestMS.length === 0 ? (
              <>
                {" "}
                <Typography variant="h6">Không có dữ liệu</Typography>
                <Typography variant="body2">Tổng đã bán 0</Typography>
              </>
            ) : (
              <>
                {" "}
                <Typography variant="h6">{bestMS[0][0].ten}</Typography>
                <Typography variant="body2">
                  Tổng đã bán {bestMS[0][1] || 0}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #f6c23e;",
            }}
          >
            <Typography sx={{ color: "#f6c23e" }} variant="subtitle1">
              Kích thước bán chạy nhất
            </Typography>{" "}
            {bestKT.length === 0 ? (
              <>
                <Typography variant="h6">Không có dữ liệu</Typography>
                <Typography variant="body2">Tổng đã bán 0</Typography>
              </>
            ) : (
              <>
                {" "}
                <Typography variant="h6">
                  {bestKT[0][0].giaTri}{" "}
                </Typography>{" "}
              </>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",

              boxShadow: "-5px 0 0 0 #02b2af;",
            }}
          >
            <BarChart
              margin={{
                left: 120,
              }}
              dataset={data1}
              yAxis={[{ scaleType: "band", dataKey: "ten" }]}
              series={[
                {
                  dataKey: "soLuong",
                  label: "Số sản phẩm tồn",
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-5px 0 0 0 #FF0066;",
              height: "430px",
            }}
          >
            <Typography sx={{ color: "#FF0066" }} variant="subtitle1">
              Tương quan số sản phẩm phẩm bán ra
            </Typography>
            {data2.length > 0 ? (
              ""
            ) : (
              <Typography variant="h6">Chưa bán ra sản phẩm nào</Typography>
            )}
            <PieChart
              height={300}
              series={[
                {
                  data: data2,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-5px 0 0 0 #996666;",
            }}
          >
            <>
              <h2>Tỷ lệ lợi nhuận từng sản phẩm </h2>
              {productList.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>sản phẩm</TableCell>
                        <TableCell align="right">Còn lại</TableCell>

                        <TableCell align="right">Chênh lệch (₫)</TableCell>

                        <TableCell align="right">Tỷ lệ lợi nhuận(%)</TableCell>
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
                              {row.mauSac.ten} /{row.kichThuoc.giaTri}
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <Box>{row.soLuong}</Box>
                          </TableCell>
                          <TableCell align="right">
                            <Box>
                              {Intl.NumberFormat("vi-VN").format(
                                row.giaBan - row.giaNhap
                              )}
                            </Box>
                          </TableCell>

                          <TableCell align="right">
                            <Box>
                              {tinhTyLeLoiNhuan(row.giaBan, row.giaNhap)}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h3>Không có sản phẩm nào </h3>
              )}
            </>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              boxShadow: "-5px 0 0 0 #FF3300;",
            }}
          >
            <NewAddDetailProduct2
              getKTx={getKTx}
              getTonKho={getTonKho}
              id={props.sanPham.id}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Step3;
