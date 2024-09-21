import { Stack, TextField, Typography } from "@mui/material";
import GiaoHangTest from "../../../test/GiaoHangNhanhTesst";
import { useEffect } from "react";

const IforOfflineBill = (props) => {
  const {
    setAdress,
    setProviderWard,
    setFeeShip,
    feeShip,
    guestName,
    setGuestname,
    numberPhone,
    setNumberPhone,
  } = props;

  useEffect(() => {
    if (props.bill) {
      setGuestname(props.bill.tenNguoiNhan || "");
      setNumberPhone(props.bill.sdtNhanHang || "");
      return;
    }
  }, [props.bill]);

  return (
    <Stack spacing={1.5}>
      <TextField
        id="guestName"
        type="text"
        label="Tên khách hàng"
        size="small"
        onChange={(e) => {
          setGuestname(e.target.value);
        }}
        value={guestName}
        variant="outlined"
      />
      <TextField
        id="numberPhone"
        size="small"
        value={numberPhone}
        onChange={(e) => {
          setNumberPhone(e.target.value);
        }}
        type="tel"
        label="Số điện thoại"
        variant="outlined"
      />

      <GiaoHangTest
        setFeeShip={setFeeShip}
        setAdress={setAdress}
        setProviderWard={setProviderWard}
      />

      <Typography variant="caption">
        {feeShip
          ? "phí vận chuyển " +
            Intl.NumberFormat("vi-VN").format(feeShip) +
            " đ"
          : "  *Bỏ trống địa chỉ nếu không cần ship"}
      </Typography>
    </Stack>
  );
};
export default IforOfflineBill;
