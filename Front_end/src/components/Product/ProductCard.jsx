import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import "./ProductCard.css";
import { Paper } from "@mui/material";
import { storage } from "../../configs/FireBaseConfig/FireBaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProductCard(props) {
  const item = props.item;

  const [fileList, setFileList] = React.useState([]);
  // thông báo
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    loadFiles();
    loadPrice();

    isProductInFavorites(item.id);
  }, []);

  const loadFiles = async () => {
    const listRef = ref(storage, "SP/" + item.id + "/"); // 'files' là đường dẫn trong Storage
    try {
      const fileRefs = await listAll(listRef);
      const urls = await Promise.all(fileRefs.items.map(getDownloadURL));
      setFileList(urls);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tệp");
      console.error(error);
    }
  };

  const loadPrice = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/SPXX1243/v1/getPrice/" + item.id
      );
      setPrice(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi giá sản phẩm có id bằng " + item.id);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //copy đường dẫn
  // Lấy đường dẫn hiện tại

  const copyToClipboard = () => {
    const textToCopy = "http://localhost:3000/product/" + item.id;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    handleClick();
  };

  const addToFavorites = (productId) => {
    // Lấy danh sách yêu thích từ localStorage (nếu đã có).
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa.
    const productIndex = favorites.indexOf(productId);

    if (productIndex === -1) {
      // Thêm sản phẩm vào danh sách yêu thích nếu chưa tồn tại.
      favorites.push(productId);
      toast("Đã thêm vào danh sách yêu thích");
    } else {
      // Xóa sản phẩm khỏi danh sách yêu thích nếu đã tồn tại.
      favorites.splice(productIndex, 1);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    }

    // Lưu danh sách yêu thích mới vào localStorage.
    localStorage.setItem("favorites", JSON.stringify(favorites));

    getFavorites();
    isProductInFavorites(item.id);
  };

  const isProductInFavorites = (productId) => {
    // Lấy danh sách yêu thích từ localStorage (nếu đã có).
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setIsFavorite(favorites.includes(productId));
    // Kiểm tra xem sản phẩm có trong danh sách yêu thích không.
    return isFavorite;
  };

  function getFavorites() {
    console.log(JSON.parse(localStorage.getItem("favorites")));
    // Lấy danh sách yêu thích từ localStorage và chuyển đổi thành mảng.
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }

  return (
    <Card sx={{ maxWidth: 345 }} component={Paper} elevation={1}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {item.thuongHieu.ten}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.tenSanPham}
        subheader={item.ngayTao}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          fileList[0] ||
          "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt="Paella dish"
      />
      <CardContent>
        <div className="text-container">
          <Typography variant="body2" color="text.secondary">
            {item.moTa || "Sản phẩm chưa có mô tả chi tiết"}
          </Typography>
        </div>

        <Stack direction="row" spacing={1.5} mt={0.5}>
          <Typography variant="body1" color="primary" fontWeight={"bold"}>
            {price || 0}
          </Typography>
          <Typography
            style={{ textDecoration: "line-through" }}
            variant="body1"
            color="text.secondary"
          >
            {0}₫
          </Typography>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Thêm vào danh sách yêu thích" arrow placement="top">
          <IconButton
            aria-label="Thêm vào danh sách yêu thích"
            onClick={() => addToFavorites(item.id)}
          >
            {isFavorite ? <FavoriteIcon color="info" /> : <FavoriteIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Chia sẻ" arrow placement="top">
          <IconButton aria-label="Chia sẻ" onClick={copyToClipboard}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mua ngay" arrow placement="top">
          <IconButton
            aria-label="Mua Ngay"
            style={{ marginLeft: "auto" }}
            href={"/product/" + item.id}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Đã copy vào clip board"
        />
      </div>
    </Card>
  );
}
