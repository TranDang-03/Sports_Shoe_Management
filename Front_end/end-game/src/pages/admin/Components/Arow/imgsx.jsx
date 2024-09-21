import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { storage } from "../../../../configs/FireBaseConfig/FireBaseConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";

const AnhCo = (props) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);
  const loadFiles = async () => {
    const listRef = ref(storage, "SP/" + props.id + "/"); // 'files' là đường dẫn trong Storage
    try {
      const fileRefs = await listAll(listRef);
      const urls = await Promise.all(fileRefs.items.map(getDownloadURL));
      setFileList(urls);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách tệp");
      console.error(error);
    }
  };

  return (
    <>
      <CardMedia
        component="img"
        height={props.h || "80"}
        image={
          fileList[0] ||
          "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt="Paella dish"
      />
    </>
  );
};
export default AnhCo;
