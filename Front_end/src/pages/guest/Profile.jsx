import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import CustomPaginationActionsTable from "../../components/OderLeftSide/TableData";
import axios from "axios";
import { toast } from "react-toastify";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import NoCrashIcon from "@mui/icons-material/NoCrash";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProfile from "../../components/UpdateProfile/update";
import { Link } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";

const Profile = () => {
  const [rows, setRow] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [rows2, setRow2] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        console.log("Người dùng hiện tại: ", user);
        setCurrentUserLoaded(true);
      } else {
        console.log("Người dùng chưa được xác thực.");
      }
    };

    auth.onAuthStateChanged((user) => {
      checkAuth();
    });
  }, [auth]);

  useEffect(() => {
    if (currentUserLoaded) {
      loadAllBill();
      getFavorites();
    }
  }, [currentUserLoaded]);

  const loadAllBill = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/hoa-don?idKH=" + auth.currentUser.uid
      );

      setRow(response.data);
      setRow2(response.data);

      console.log("Danh sách hóa đơn: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách hóa đơn không tải được");
    }
  };
  function filterHoaDonByTrangThai(chiTietHoaDonList, trangThaiCanLoc) {
    // Sử dụng phương thức filter để lọc ra các hóa đơn có trạng thái bằng số truyền vào
    setRow(
      chiTietHoaDonList.filter(function (hoaDon) {
        return hoaDon.trangThai === trangThaiCanLoc;
      })
    );
  }
  function demSoHoaDonTheoTrangThai(chiTietHoaDonList, trangThaiCanDem) {
    // Sử dụng phương thức filter để lọc ra các hóa đơn có trạng thái bằng số truyền vào
    var hoaDonDaLoc = chiTietHoaDonList.filter(function (hoaDon) {
      return hoaDon.trangThai === trangThaiCanDem;
    });

    // Sử dụng thuộc tính length để đếm số lượng hóa đơn đã lọc
    var soLuongHoaDon = hoaDonDaLoc.length;

    return soLuongHoaDon;
  }

  function tinhTongChiTietHoaDon(danhSachHoaDon) {
    let tongChiTiet = 0;

    // Kiểm tra xem danh sách hóa đơn có tồn tại không
    if (danhSachHoaDon && danhSachHoaDon.length > 0) {
      // Duyệt qua từng hóa đơn trong danh sách
      for (let i = 0; i < danhSachHoaDon.length; i++) {
        // Kiểm tra xem hóa đơn có thuộc tính chiTietHoaDonList không
        if (danhSachHoaDon[i].chiTietHoaDonList) {
          // Cộng dồn độ dài của chiTietHoaDonList của mỗi hóa đơn
          tongChiTiet += danhSachHoaDon[i].chiTietHoaDonList.length;
        }
      }
    }

    return tongChiTiet;
  }
  const getFavorites = async () => {
    // Lấy danh sách yêu thích từ localStorage và chuyển đổi thành mảng.
    console.log(JSON.parse(localStorage.getItem("favorites")));
    const ls = JSON.parse(localStorage.getItem("favorites")) || [];
    try {
      const res = await axios.get(
        "http://localhost:8080/products/getByIds?ls=" + ls
      );
      if (res.status === 200) {
        setFavorites(res.data);
        console.log("Danh sách yêu thích  ", res.data);
      }
    } catch (error) {}
  };

  return (
    <>
      {currentUserLoaded ? (
        <Grid container spacing={3} mt={3} px={5}>
          <Grid item xs={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Box align={"start"}>
                      <Tooltip title="chỉnh sửa thông tin" placement="top">
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => setIsEdit(!isEdit)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box align={"center"}>
                      <Avatar
                        alt={auth.currentUser.displayName || "Không xác định"}
                        src={auth.currentUser.photoURL}
                        sx={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{ fontSize: 15 }}
                      color="text.secondary"
                      gutterBottom
                      align={"center"}
                    >
                      {auth.currentUser.displayName || "Khách hàng yêu dấu"}{" "}
                    </Typography>
                    <Typography variant="body2" align={"center"}>
                      {auth.currentUser.email || "Chưa có email"}
                      {auth.currentUser.emailVerified ? (
                        <sup>
                          <Tooltip title="Email đã được xác nhận">
                            <VerifiedIcon fontSize="inherit" />
                          </Tooltip>
                        </sup>
                      ) : (
                        <sup>
                          <Tooltip title="Email chưa được xác nhận">
                            <NewReleasesIcon fontSize="inherit" />
                          </Tooltip>
                        </sup>
                      )}
                    </Typography>
                    <Typography
                      sx={{ mt: 1.5 }}
                      variant="body2"
                      align={"center"}
                    >
                      Cảm ơn bạn đã sử dụng dịch vụ của FANTASTIC FOUR
                    </Typography>
                  </Grid>
                  <Grid item xs={6} pl={4}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Tooltip title="Tất cả đơn hàng" placement="top">
                          <Button
                            variant="outlined"
                            color="warning"
                            size="large"
                            startIcon={<ReceiptLongIcon fontSize="small" />}
                            onClick={() => loadAllBill()}
                          >
                            {rows2.length}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Sản phẩm đã mua" placement="top">
                          <Button
                            variant="outlined"
                            color="inherit"
                            size="large"
                            startIcon={<Inventory2Icon fontSize="small" />}
                            onClick={() => loadAllBill()}
                          >
                            {tinhTongChiTietHoaDon(rows2)}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Chờ xác nhận" placement="top">
                          <Button
                            variant="outlined"
                            color="info"
                            size="large"
                            startIcon={<HourglassEmptyIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows, 0)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 0)}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Đã xác nhận" placement="top">
                          <Button
                            variant="outlined"
                            color="info"
                            size="large"
                            startIcon={<HandshakeIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows2, 1)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 1)}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Đang giao" placement="top">
                          <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            startIcon={<LocalShippingIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows2, 2)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 2)}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Đã giao thành công" placement="top">
                          <Button
                            variant="outlined"
                            color="info"
                            size="large"
                            startIcon={<NoCrashIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows2, 3)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 3)}
                          </Button>
                        </Tooltip>
                      </Grid>

                      <Grid item xs={6}>
                        <Tooltip title="Hoàn thành" placement="top">
                          <Button
                            variant="outlined"
                            color="success"
                            size="large"
                            startIcon={<DoneOutlineIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows2, 5)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 5)}
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6}>
                        <Tooltip title="Đã hủy" placement="top">
                          <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            startIcon={<CancelIcon fontSize="small" />}
                            onClick={() => filterHoaDonByTrangThai(rows2, 6)}
                          >
                            {demSoHoaDonTheoTrangThai(rows2, 6)}
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {isEdit ? (
              <Card>
                <CardContent>
                  <UpdateProfile user={auth.currentUser} auth={auth} />
                </CardContent>
              </Card>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={8}>
            <CustomPaginationActionsTable
              rows={rows}
              loadAllBill={loadAllBill}
            />
          </Grid>
          {favorites.length > 0 ? (
            <Typography
              color="text.secondary"
              gutterBottom
              variant="h6"
              align={"center"}
              mt={5}
              px={3}
            >
              Danh sách sản phẩm yêu thích
            </Typography>
          ) : (
            <Typography
              color="text.secondary"
              gutterBottom
              variant="h6"
              align={"center"}
              mt={5}
              px={3}
            >
              Không có sản phẩm yêu thích
            </Typography>
          )}
          <Grid container spacing={2} px={3}>
            {favorites.map((item) => {
              return (
                <Grid item xs={2} key={item.id}>
                  <ProductCard item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ) : (
        <Button
          color="inherit"
          size="large"
          LinkComponent={Link}
          fullWidth
          sx={{ height: "90vh" }}
          to={"http://localhost:3000/login"}
        >
          Hãy đăng nhập để có thể xem thông tin tài khoản
        </Button>
      )}
    </>
  );
};
export default Profile;
