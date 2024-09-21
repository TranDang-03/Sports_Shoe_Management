import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Tooltip from "@mui/material/Tooltip";

function tinhTongTien(danhSachHoaDon) {
  let tongTien = 0;

  danhSachHoaDon.forEach((hoaDon) => {
    hoaDon.chiTietHoaDonList.forEach((chiTietHoaDon) => {
      tongTien += chiTietHoaDon.giaSanPham * chiTietHoaDon.soLuong;
    });
  });

  return tongTien;
}

function tinhSoLuong(danhSachHoaDon) {
  let tongTien = 0;

  danhSachHoaDon.forEach((hoaDon) => {
    hoaDon.chiTietHoaDonList.forEach((chiTietHoaDon) => {
      tongTien += chiTietHoaDon.soLuong;
    });
  });

  return tongTien;
}
export default function Deposits() {
  const [ChartData, setChartData] = useState([]);
  const [ChartData2, setChartData2] = useState([]);
  const currentDate = moment();
  const sevenDaysAgo = moment().subtract(7, "days");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/HomeChart2?StartDate=" +
          sevenDaysAgo.format("YYYY-MM-DD") +
          "&EndDate=" +
          currentDate.format("YYYY-MM-DD")
      );
      const filteredNumbers = res.data.filter(
        (number) => number.trangThai === 5
      );
      setChartData(filteredNumbers);
      setChartData2(res.data);
      console.log("Hóa đơn đã lấy", res.data);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <Title>Doanh số tuần này</Title>

      <Tooltip title="Tổng doanh thu">
        <Typography component="p" variant="h6">
          Tổng :
          <CountUp
            start={12213 / 2}
            end={tinhTongTien(ChartData2)}
            duration={1}
            separator="."
            decimal=","
            prefix=" "
            suffix="₫"
          />
        </Typography>
      </Tooltip>
      <Tooltip title="Tiền đơn hàng đã thanh toán">
        <Typography component="p" variant="inherit">
          Đơn đã xong :
          <CountUp
            start={12213 / 2}
            end={tinhTongTien(ChartData)}
            duration={1}
            separator="."
            decimal=","
            prefix=" "
            suffix="₫"
          />
        </Typography>
      </Tooltip>

      <Tooltip title="Đơn hàng chưa thanh toán">
        <Typography variant="inherit">
          Đơn chưa hoàn tất :
          <CountUp
            start={12213 / 2}
            end={tinhTongTien(ChartData2) - tinhTongTien(ChartData)}
            duration={1}
            separator="."
            decimal=","
            prefix=" "
            suffix="₫"
          />
        </Typography>
      </Tooltip>

      <Typography color="text.secondary">
        Tổng đơn hàng :
        <CountUp
          start={12213 / 2}
          end={ChartData2.length}
          duration={1}
          separator="."
          decimal=","
          prefix=" "
          suffix=""
        />
      </Typography>
      <Typography color="text.secondary">
        Đã hoàn tất :
        <CountUp
          start={1289 / 2}
          end={ChartData.length}
          duration={1}
          separator="."
          decimal=","
          prefix=" "
          suffix=""
        />
      </Typography>
      {/* <Typography color="text.secondary">
        Số sản phẩm đã bán :
        <CountUp
          start={12213 / 2}
          end={tinhSoLuong(ChartData2)}
          duration={1}
          separator="."
          decimal=","
          prefix=" "
          suffix=""
        />
      </Typography> */}
      <Link
        color="primary"
        href="http://localhost:3000/admin/reports"
        // onClick={preventDefault}
      >
        Xem nhiều hơn
      </Link>
    </React.Fragment>
  );
}
