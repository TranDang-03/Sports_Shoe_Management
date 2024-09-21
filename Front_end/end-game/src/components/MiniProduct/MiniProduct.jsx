import Grid from "@mui/material/Grid";
import "./MiniProduct.css";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { storage } from "../../configs/FireBaseConfig/FireBaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const MiniProduct = (props) => {
  const item = props.item;
  const [fileList, setFileList] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadFiles();
    loadPrice();
  }, []);

  const loadFiles = async () => {
    const listRef = ref(storage, "SP/" + item.id + "/"); // 'files' là đường dẫn trong Storage
    try {
      const fileRefs = await listAll(listRef);
      const urls = await Promise.all(fileRefs.items.map(getDownloadURL));
      setFileList(urls);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tệp  " + item.id);
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

  return (
    <>
      <Grid className="miniProductcontai" container>
        <Grid item xs={4}>
          <img
            src={
              fileList[0] ||
              "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            className="miniProductImg"
            alt="ảnh sản phẩm"
          />
        </Grid>
        <Grid className="miniProductText" item xs={7}>
          <Typography
            variant="h4"
            mt={2}
            ml={2}
            style={{ fontWeight: "bolder" }}
          >
            {item.tenSanPham}
          </Typography>
          <Typography
            variant="button"
            mt={2}
            ml={2}
            style={{ fontWeight: "400" }}
          >
           
            {price}
            <Button
              variant="Text"
              fullWidth
              endIcon={<ChevronRightIcon />}
              href={"/product/" + item.id}
            >
              Xem ngay
            </Button>
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
};
export default MiniProduct;
