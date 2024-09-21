import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { storage } from "../../../../configs/FireBaseConfig/FireBaseConfig";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import NewAddDetailProduct from "../AddDetailProduct/NewAddDetailProduct";
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Step2 = (props) => {
  const [files, setFiles] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [fileList, setFileList] = useState([]);

  const loadFiles = async () => {
    const listRef = ref(storage, "SP/" + props.sanPham.id + "/"); // 'files' là đường dẫn trong Storage
    try {
      const fileRefs = await listAll(listRef);
      const urls = await Promise.all(fileRefs.items.map(getDownloadURL));
      setFileList(urls);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tệp");
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles(); // Tải danh sách tệp khi tải lại trang
  }, []);

  const handleUpload = async () => {
    setIsButtonDisabled(true);

    if (files && files.length > 0) {
      // Xử lý từng file trong danh sách
      for (const file of files) {
        const fileRef = ref(
          storage,
          "SP/" +
            props.sanPham.id +
            "/" +
            props.sanPham.tenSanPham +
            file.name +
            Math.floor(Math.random() * 90000) +
            10000
        );

        try {
          await uploadBytes(fileRef, file);
        } catch (error) {
          setIsButtonDisabled(false);
          toast.error("Lỗi khi tải lên tệp");
          console.error(error);
        }
      }

      // Đặt lại giá trị của files thành một mảng rỗng để chuẩn bị cho việc chọn file mới
      setFiles([]);
      toast.success("Tải lên thành công");
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
      // Tải danh sách tệp mới sau khi tải lên
      loadFiles();
    } else {
      setIsButtonDisabled(false);
      toast.warning("Hãy chọn tệp trước khi tải lên");
    }
  };

  const handleDelete = async (url) => {
    const fileRef = ref(storage, url); // 'files' là đường dẫn trong Storage
    try {
      await deleteObject(fileRef);
      toast.success("Xóa thành công");
      loadFiles(); // Tải danh sách tệp mới sau khi xóa
    } catch (error) {
      toast.error("Lỗi khi xóa tệp");
      console.error(error);
    }
    // Tải danh sách tệp mới sau khi xóa
  };
  //xóa

  //thay doi anh
  const handleOnChangeFile = (event) => {
    setFiles(event.target.files);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={2}>
            {fileList.map((url, id) => (
              <Grid
                item
                key={id}
                xs={3}
                sx={{ objectFit: "cover", position: "relative" }}
              >
                <img
                  src={url}
                  width={"100%"}
                  height={"auto"}
                  alt="Ảnh sản phẩm"
                  loading="lazy"
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(url)}
                  disabled={isButtonDisabled}
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "-10px",
                  }}
                >
                  <DisabledByDefaultIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>

          <input
            id="anh-san-pham"
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onChange={handleOnChangeFile}
            type="file"
            multiple
            accept=".webp, .jpg, .jpeg, .png, .avif"
          />

          <Button
            component="label"
            variant="contained"
            sx={{ marginTop: "2px" }}
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
            disabled={isButtonDisabled}
          >
            Tải lên
          </Button>

          <NewAddDetailProduct id={props.sanPham.id} />
        </Paper>
      </Container>
    </>
  );
};
export default Step2;
