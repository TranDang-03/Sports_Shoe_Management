import { Button, Dialog, DialogTitle } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function SimpleDialog(props) {
  const { onClose, price, open } = props;
  const currentDateTime = encodeString(); // đây là đoạn mã tạo ngẫu nhiên
  const handleClose = () => {
    onClose();
  };
  function encodeString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  const handleListItemClick = () => {
    createBill();
    onClose();
  };

  const createBill = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/hoa-don/" + currentDateTime,
        props.hoaDon
      );
      if (res.status === 200) {
        toast("Đã đặt hàng thành công");
        console.log("Đã đặt hàng xong", res.data);
        createPayment(res.data);
        createBillVoudhcet(res.data);
        setTimeout(() => {
          window.location.href = "http://localhost:3000/profile";
        }, 1000);
      }
    } catch (error) {
      toast.info("Sản phẩm bạn mua đã hết hàng");
      console.error(error);
    }
  };
  const createPayment = async (bill) => {
    console.log("Phương thức thanh toán trước khi gửi đi: ", {
      hoaDon: bill,
      thanhToan: { id: props.payment },
      soTien: price,
    });
    try {
      const res = await axios.post(
        "http://localhost:8080/payment-bill/create",
        { hoaDon: bill, thanhToan: { id: props.payment }, soTien: price }
      );
      if (res.status === 200) {
        console.log("30% ", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const createBillVoudhcet = async (bill) => {
    if (props.voucherCodex.id) {
      try {
        const res = await axios.post("http://localhost:8080/voucherBill", {
          hoaDon: bill,
          khuyenMai: { id: props.voucherCodex.id },
        });
        if (res.status === 200) {
          console.log("40% ", res.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Hóa đơn không hợp lệ");
      }
    }
  };
  const imageUrl = `https://img.vietqr.io/image/970418-21210001021600-print.png?amount=${price}&addInfo=Thanh%20Toan%20Don%20Hang%20${currentDateTime}&accountName=TRAN%20TIEN%20VIET`;

  return (
    <Dialog onClose={handleClose} open={open}>
      {props.payment === "3" ? (
        <>
          <DialogTitle>QR chuyển khoản</DialogTitle>
          <img alt="QR payment" src={imageUrl} />{" "}
        </>
      ) : (
        <DialogTitle>Xác nhận thanh toán</DialogTitle>
      )}

      <Button onClick={handleListItemClick} variant="contained">
        Xác Nhận đã Hoàn thành thanh toán
      </Button>
    </Dialog>
  );
}
export default SimpleDialog;
