import React from "react";

import { Grid, Paper } from "@mui/material";

import DataGridBill from "./Components/DataGridBill/DataGrid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OderDetail from "./Components/BillAndOrder/RightSideOfOders";

function SanPhamTable() {
  const [billList, setBillList] = useState([]);
  const [fullList, setFullList] = useState([]);
  function xuLyDanhSachHoaDon(chiTietHoaDonList) {
    return chiTietHoaDonList.map((hoaDon) => {
      // Xử lý loaiHoaDon
      hoaDon.loaiHoaDon = hoaDon.loaiHoaDon ? "Online" : "Offline";

      // Xử lý trangThai
      switch (hoaDon.trangThai) {
        case 0:
          if (hoaDon.loaiHoaDon === "Offline") {
            hoaDon.trangThai = "Hóa đơn chờ";
            break;
          }
          hoaDon.trangThai = "Chờ xác nhận";
          break;
        case 1:
          hoaDon.trangThai = "Đã xác nhận";
          break;
        case 2:
          hoaDon.trangThai = "Đang giao";
          break;
        case 3:
          hoaDon.trangThai = "Đã giao thành công";
          break;
        case 6:
          hoaDon.trangThai = "Đã hủy";
          break;
        case 4:
          hoaDon.trangThai = "Đã thanh toán";
          break;
        case 5:
          hoaDon.trangThai = "Đã hoàn tất";
          break;
        case 7:
          hoaDon.trangThai = "Chờ xác nhận hủy đơn";
          break;
        default:
          hoaDon.trangThai = "Không xác định";
      }

      // Trả về đối tượng được xử lý
      return hoaDon;
    });
  }

  useEffect(() => {
    loadBills();
    loadBills2();
  }, []);

  const loadBills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/allOffBill");

      setBillList(
        xuLyDanhSachHoaDon(
          response.data.sort((a, b) => {
            if (a.trangThai === 7) return -1; // Số 7 đứng đầu
            if (b.trangThai === 7) return 1; // Số 7 đứng đầu
            return a.trangThai - b.trangThai; // Sắp xếp tăng dần cho các số khác 7
          })
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Danh sách hóa đơn không tải được 1");
    }
  };
  const loadBills2 = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/allOffBill");

      setFullList(
        xuLyDanhSachHoaDon(
          response.data.sort((a, b) => a.trangThai - b.trangThai)
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Danh sách hóa đơn không tải được 2");
    }
  };
  return (
    <div className="table-container">
      <Grid container>
        <Grid item xs={9}>
          <DataGridBill data={billList} />
        </Grid>
        <Grid item xs={3} component={Paper} marginTop={8}>
          <OderDetail
            billList={billList}
            setBillList={setBillList}
            loadBills={loadBills}
            fullList={fullList}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default SanPhamTable;
