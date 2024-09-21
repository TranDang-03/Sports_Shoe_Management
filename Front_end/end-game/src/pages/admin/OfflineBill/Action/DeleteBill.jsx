import { Button } from "@mui/material";
import axios from "axios";

const DeleteBill = (props) => {
  const handleDeleteX = async () => {
    if (window.confirm("Xác nhận xóa")) {
      try {
        const res = await axios.delete(
          "http://localhost:8080/api/admin/hoa-don/deleteOfflione/" +
            props.id.id
        );
        props.getProductInBIll();
        props.getBillData();
        props.setLoad(props.Load + 1);
      } catch (error) {}
    }
  };
  return (
    <Button
      size="small"
      onClick={() => {
        handleDeleteX();
      }}
      sx={{ width: "150px", marginTop: "10px" }}
      color="error"
    >
      Xoá đơn hàng này
    </Button>
  );
};
export default DeleteBill;
