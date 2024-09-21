import { Container, Grid, Stack, TextField } from "@mui/material";

import PaymentInfor from "../../components/PaymentInfor/PaymentInfor";

import { useState } from "react";
import GiaoHangTest from "../../test/GiaoHangNhanhTesst";

const Payment = () => {
  const [feeShip, setFeeShip] = useState(0);
  const [adress, setAdress] = useState("");
  const [providerWard, setProviderWard] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [HTname, setHTName] = useState("");
  const [HTtel, setHTTel] = useState("");
  const [isErrorTel, setIsErrorTel] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1>Thông tin đơn hàng </h1>

          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Tên người nhận"
              variant="outlined"
              inputMode="text"
              error={isErrorName}
              helperText={HTname}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              inputMode="tel"
              helperText={HTtel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
              error={isErrorTel}
            />
          </Stack>

          <GiaoHangTest
            setFeeShip={setFeeShip}
            setAdress={setAdress}
            setProviderWard={setProviderWard}
          />
        </Grid>
        <Grid item xs={4}>
          <h1>Thông tin Đơn Hàng</h1>
          <PaymentInfor
            feeShip={feeShip}
            tel={tel}
            name={name}
            providerWard={providerWard}
            address={adress}
            setIsErrorName={setIsErrorName}
            setHTName={setHTName}
            setHTTel={setHTTel}
            setIsErrorTel={setIsErrorTel}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default Payment;
