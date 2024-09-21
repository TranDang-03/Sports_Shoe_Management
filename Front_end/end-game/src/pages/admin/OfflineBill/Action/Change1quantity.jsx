import { IconButton, Link, Stack, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateQuantityBtn = (props) => {
  const quantityUp = async () => {
    if (!props.row.sanPhamChiTiet.soLuong > 0) {
      toast("Số lượng đã đến giới hạn");
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:8080/api/admin/hoa-don-chi-tiet/up?id=" + props.row.id
      );
      props.getProductInBIll();
      props.getBillData();
      props.setLoad(props.Load + 13);
      console.log(res.data);
    } catch (error) {}
  };
  const quantityDown = async () => {
    if (props.row.soLuong <= 1) {
      return;
    }
    try {
      const res = await axios.put(
        "http://localhost:8080/api/admin/hoa-don-chi-tiet/down?id=" +
          props.row.id
      );
      props.getProductInBIll();
      props.getBillData();
      props.setLoad(props.Load + 23);

      console.log(res.data);
    } catch (error) {}
  };
  return (
    <Stack direction={"column"} width={"20px"} sx={{ cursor: "pointer" }}>
      <Link color={"inherit"} size="small" onClick={() => quantityUp()}>
        <ExpandLessIcon fontSize="small" />
      </Link>

      <Link size="small" color={"inherit"} onClick={() => quantityDown()}>
        <ExpandMoreIcon fontSize="small" />
      </Link>
    </Stack>
  );
};
export default UpdateQuantityBtn;
