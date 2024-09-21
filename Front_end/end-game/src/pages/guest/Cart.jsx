import { Button, Container, Grid } from "@mui/material";
import LongProductCart from "../../components/HorizionProductCart/LongProductCart";
import CartInfor from "../../components/CartInformation/CartInfor";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false);
  const auth = getAuth();
  const [check, setCheck] = useState(0);

  useEffect(() => {
    const checkAuth = () => {
      const user = auth.currentUser;
      if (user) {
        console.log("Người dùng hiện tại: " + user.uid);
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
      loadCart();
    }
  }, [currentUserLoaded]);

  const loadCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/gio-hang/" + auth.currentUser.uid
      );

      setCart(response.data);
      console.log("Danh sách giỏ hàng: ", response.data);
    } catch (error) {
      console.error(error);
      toast.error("Danh sách giỏ hàng không tải được");
    }
  };

  return (
    <>
      {" "}
      {currentUserLoaded ? (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h1>Danh sách sản phẩm</h1>
              {cart.length === 0 ? (
                <h3>Không có sản phẩm nào trong giỏ hàng</h3>
              ) : (
                ""
              )}
              {cart.map((item) => {
                return (
                  <LongProductCart
                    key={item.id}
                    item={item}
                    loadCart={loadCart}
                    setCheck={setCheck}
                    check={check}
                  />
                );
              })}
            </Grid>
            <Grid item xs={4}>
              <h1>Thông tin giỏ hàng</h1>
              <CartInfor cart={cart} check={check} />
            </Grid>
          </Grid>
        </Container>
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
export default Cart;
