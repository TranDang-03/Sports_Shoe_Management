import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";

import { Copyright } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CustomPaginationActionsTable from "./ProductTableBill";
import IforOfflineBill from "./InforOflineBilll";
import PaymentAndMoney from "./PaymentAndMoney";
import OfflineSearch from "./SearchProduct";
import axios from "axios";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import DeleteBill from "./Action/DeleteBill";
import { toast } from "react-toastify";

function isValidPhoneNumber(phoneNumber) {
  // Biểu thức chính quy kiểm tra số điện thoại Việt Nam
  const telRegex = /^(0[0-9]{9}|84[0-9]{9})$/;

  // Kiểm tra sự trùng khớp
  return telRegex.test(phoneNumber);
}

function tinhTongSoTien(danhSach) {
  let tongTien = 0;

  danhSach.forEach((doiTuong) => {
    tongTien += doiTuong.soLuong * doiTuong.giaSanPham;
  });

  return tongTien;
}

const OfflineStorre = () => {
  const [billList, setBillList] = useState([]);
  const [products, setProducts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [note, setNote] = useState("");
  const [cash, setCash] = useState(0);
  const [bank, setBank] = useState(0);
  const [feeShip, setFeeShip] = useState(0);
  const [orther, setOther] = useState(0);

  const [adress, setAdress] = useState("");
  const [providerWard, setProviderWard] = useState("");

  const [guestName, setGuestname] = useState("Khách lẻ");
  const [numberPhone, setNumberPhone] = useState("");
  const [voucher, setVoucher] = useState();
  const [load, setLoad] = useState(0);
  const [crru, setCrru] = useState("");

  function isValidPhoneNumber(phoneNumber) {
    // Biểu thức chính quy kiểm tra số điện thoại Việt Nam
    const telRegex = /^(0[0-9]{9}|84[0-9]{9})$/;

    // Kiểm tra sự trùng khớp
    return telRegex.test(phoneNumber);
  }

  const auth = getAuth();

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        console.log("Người dùng hiện tại: " + user.uid);
        setCrru(user.uid);
      } else {
        console.log("Người dùng chưa được xác thực.");
      }
    };

    auth.onAuthStateChanged((user) => {
      checkAuth();
    });
  }, [auth]);

  const handleChange = async (event, newValue) => {
    await setTabIndex(newValue);
  };

  useEffect(() => {
    getBillData();
  }, []);

  useEffect(() => {
    getProductInBIll();
  }, [tabIndex]);

  const getBillData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/hoa-don/blankOffline/"
      );
      if (res.status === 200) {
        setBillList(res.data);
      }
      console.log("danh sách hóa  đơn ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewHd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/hoa-don/blank"
      );

      getBillData();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductInBIll = async () => {
    if (billList.length > 0) {
      console.log("Đã lấy sản phẩm của hóa đơn", billList[tabIndex]);
      try {
        const res = await axios.get(
          "http://localhost:8080/api/admin/hoa-don-chi-tiet?idHD=" +
            billList[tabIndex].id
        );
        if (res.status === 200) {
          setProducts(res.data);
        }
        console.log("danh sách sản phẩm hóa  đơn ", res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const tienKhuyenMai = voucher
    ? voucher.giamGiaPhanTram > 0
      ? (tinhTongSoTien(products) / 100) * voucher.giamGiaPhanTram
      : voucher.giamGiaTruThang
    : 0;

  const tienPhaiTra = tinhTongSoTien(products) - tienKhuyenMai + (feeShip || 0);

  const tienThua = tienPhaiTra - cash - bank - orther;

  const SaveDataToDb = async () => {
    if (!billList[tabIndex]) {
      toast.warning("hãy chọn hóa đơn");
      return;
    }
    if (!products.length > 0) {
      toast.warning("hãy chọn sản phẩm");
      return;
    }
    if (numberPhone !== "" && !isValidPhoneNumber(numberPhone)) {
      toast.warning("Hãy nhập số điện thoại hợp lệ");
      return;
    }

    if (adress !== "" && !isValidPhoneNumber(numberPhone)) {
      toast.warning("Giao hàng cần số điện thoại");
      return;
    }

    if (guestName && guestName.trim() === "") {
      toast.warning("hãy nhập tên khách hàng");
      return;
    }

    if (tienThua > 0) {
      toast.warning("Nếu khách đã trả đủ tiền hãy nhập số tiền khách đưa");
      return;
    }
    if (tienThua < 0) {
      if (!window.confirm("Đã trả đủ tiền thừa cho khách?")) {
        return;
      }
    }
    if (!window.confirm("Xác nhận thanh toán?")) {
      return;
    }

    try {
      const res = await axios.put("http://localhost:8080/api/admin/hoa-don", {
        id: billList[tabIndex].id,
        ghiChu: note || "Không có ghi chú",
        tenNguoiNhan: guestName || "khách lẻ",
        phiVanChuyen: feeShip,
        diaChiCuThe:
          adress === "" && providerWard === ""
            ? "Mua tai quay"
            : adress + ", " + providerWard,
        sdtNhanHang: numberPhone,
        trangThai: feeShip > 0 ? 1 : 5,
        taiKhoan: { uid: crru },
      });
      if (res.status === 200) {
        if (cash > 0) {
          await axios.post("http://localhost:8080/payment-bill/create", {
            hoaDon: { id: billList[tabIndex].id },
            thanhToan: { id: 4 },
            soTien: cash,
          });
        }
        if (bank > 0) {
          await axios.post("http://localhost:8080/payment-bill/create", {
            hoaDon: { id: billList[tabIndex].id },
            thanhToan: { id: 3 },
            soTien: bank,
          });
        }
        if (orther > 0) {
          await axios.post("http://localhost:8080/payment-bill/create", {
            hoaDon: { id: billList[tabIndex].id },

            thanhToan: { id: feeShip > 0 ? 1 : 2 },
            soTien: orther,
          });
        }

        console.log("Khuyen mai", voucher);
        if (voucher) {
          try {
            const res = await axios.post("http://localhost:8080/voucherBill", {
              hoaDon: { id: billList[tabIndex].id },

              khuyenMai: voucher,
            });

            if (res.status === 201) {
              setVoucher();
            }
          } catch (error) {
            console.error(error);
          }
        }
        setTabIndex(0);
        getBillData();

        toast("Đã thành công");
        setCash(0);
        setBank(0);
        setOther(0);
        setAdress("");
        setProviderWard("");

        setVoucher();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toolbar />

      <Grid container spacing={3} p={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <OfflineSearch
              hd={billList.length > 0 ? billList[tabIndex] : ""}
              load={load}
              getProductInBIll={getProductInBIll}
            />
            <hr />
            <Box sx={{ width: "100%" }}>
              <Tabs
                onChange={handleChange}
                value={tabIndex}
                aria-label="Tabs where each tab needs to be selected manually"
              >
                {billList.map((item, index) => {
                  return (
                    <Tab
                      key={item.id}
                      value={index}
                      label={"Hóa đơn " + (index + 1)}
                    />
                  );
                })}

                <Tab
                  value={billList.length}
                  onClick={() => {
                    if (billList.length <= 4) {
                      addNewHd();
                    }

                    getProductInBIll();
                    setTabIndex(billList.length);
                  }}
                  icon={<AddIcon />}
                />
              </Tabs>
            </Box>

            <CustomPaginationActionsTable
              rows={products}
              getProductInBIll={getProductInBIll}
              getBillData={getBillData}
              setLoad={setLoad}
              load={load}
            />
            <DeleteBill
              id={billList[tabIndex]}
              getProductInBIll={getProductInBIll}
              getBillData={getBillData}
              setLoad={setLoad}
              load={load}
            />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Stack direction={"column"} spacing={2}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                minheight: 240,
              }}
            >
              <IforOfflineBill
                bill={billList[tabIndex] || {}}
                tabIndex={tabIndex}
                getBillData={getBillData}
                setAdress={setAdress}
                setProviderWard={setProviderWard}
                setFeeShip={setFeeShip}
                feeShip={feeShip}
                guestName={guestName}
                setGuestname={setGuestname}
                numberPhone={numberPhone}
                setNumberPhone={setNumberPhone}
              />
            </Paper>

            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                minheight: 240,
              }}
            >
              <PaymentAndMoney
                products={products}
                setNote={setNote}
                note={note}
                orther={orther}
                bank={bank}
                feeShip={feeShip}
                cash={cash}
                setOther={setOther}
                setBank={setBank}
                setCash={setCash}
                voucher={voucher}
                setVoucher={setVoucher}
              />
            </Paper>

            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                SaveDataToDb();
              }}
            >
              Thanh toán
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ pt: 4 }} />
    </>
  );
};
export default OfflineStorre;
