import {
  Box,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AccountDetail from "./DetailAccount";

function xuLyDanhSachHoaDon(chiTietHoaDonList) {
  return chiTietHoaDonList.map((hoaDon) => {
    // Xử lý loaiHoaDon

    // Xử lý trangThai
    switch (hoaDon.trangThai) {
      case false:
        hoaDon.trangThai = "Không hoạt động";
        break;
      case true:
        hoaDon.trangThai = "Còn hoạt động";
        break;

      default:
        hoaDon.trangThai = "Không xác định";
    }

    // Trả về đối tượng được xử lý
    return hoaDon;
  });
}

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectRole, setSelectRole] = useState(1);
  const [selectACC, setSelectACC] = useState({});

  const handleAlignment = (event, newAlignment) => {
    setSelectRole(newAlignment);
  };

  useEffect(() => {
    loadBills();
  }, [selectRole]);

  const loadBills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/tai-khoan?cv=" + selectRole
      );

      setAccounts(xuLyDanhSachHoaDon(response.data));
    } catch (error) {
      console.error(error);
      toast.error("Danh sách khách hàng");
    }
  };
  return (
    <>
      <div className="table-container">
        <Grid container spacing={2}>
          <Grid item xs={12} marginTop={8} ml={1}>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={selectRole}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              sx={{ marginBottom: "15px", background: "white" }}
            >
              <ToggleButton
                value={1}
                aria-label="left aligned"
                sx={{
                  boxShadow: "-5px 0 0 0 #6666FF",
                }}
              >
                khách hàng
              </ToggleButton>
              <ToggleButton value={2} aria-label="centered">
                Nhân Viên
              </ToggleButton>
              <ToggleButton value={0} aria-label="right aligned">
                Quản Lý
              </ToggleButton>
            </ToggleButtonGroup>
            <AccountDetail
              selectRole={selectRole}
              loadBills={loadBills}
              selectACC={selectACC}
              accounts={accounts}
              setSelectACC={setSelectACC}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AccountManager;
