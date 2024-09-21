import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "../pages/guest/Home";
import App from "../App";
import Products from "../pages/guest/Products";
import Product from "../pages/guest/Product";
import Cart from "../pages/guest/Cart";
import QR from "../test/GenQr";
import Oder from "../pages/guest/Oder";
import LocationSelector from "../test/TinhQuanHuyen";
import Payment from "../pages/guest/Payment";
import ShippingFeeCalculator from "../test/tinhTienShip";
import Login from "../pages/Login/Login";

import GiaoHangTest from "../test/GiaoHangNhanhTesst";
import SearchPage from "../pages/guest/Search";
import Dashboard from "../pages/admin/dashBoard";
import Adminhome from "../pages/admin/AdminHome";

import AdminProduct from "../pages/admin/AdminProduct";
import SanPhamTable from "../pages/admin/AdminOrders";

import CreateProduct from "../pages/admin/CreateProduct";

import AdminDetailOder from "../pages/admin/AdminDetailOder";
import LoginSdt from "../components/LoginForm/LoginSDT";
import Profile from "../pages/guest/Profile";

import ExcelImport from "../test/JsExxcel";
import AccountManager from "../pages/admin/Components/Account/account";
import OfflineStorre from "../pages/admin/OfflineBill/AdminOfflineBill";
import AdminVoucher from "../pages/admin/AdminVoucher";
import AdminReport from "../pages/admin/AdminReport";

const AppRoutes = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="Admin" element={<Dashboard />}>
            <Route index element={<Adminhome />} />

            <Route path="products" element={<AdminProduct />} />

            <Route path="orders" element={<SanPhamTable />} />
            <Route path="reports" element={<AdminReport />} />
            <Route path="infor-product/:id" element={<CreateProduct />} />
            <Route path="infor-bill/:id" element={<AdminDetailOder />} />
            <Route path="account" element={<AccountManager />} />
            <Route path="offline" element={<OfflineStorre />} />
            <Route path="promotion" element={<AdminVoucher />} />

            <Route path="cashier" element={<cashierView />} />
          </Route>

          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<Product />} />

            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="oder" element={<Oder />} />
            <Route path="profile" element={<Profile />} />

            <Route path="test1" element={<QR />} />
            <Route path="test2" element={<LocationSelector />} />
            <Route path="test3" element={<ShippingFeeCalculator />} />
            <Route path="test4" element={<GiaoHangTest />} />

            <Route path="ImportProduct" element={<ExcelImport />} />
          </Route>
          <Route path="test5" element={<LoginSdt />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default AppRoutes;
