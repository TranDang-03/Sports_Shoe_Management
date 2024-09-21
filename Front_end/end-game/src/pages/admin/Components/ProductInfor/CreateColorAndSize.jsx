import { Button, Grid, Link, TextField } from "@mui/material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateColorAndSize = (props) => {
  const auth = getAuth();
  const [isAddColor, setIsAddColor] = useState(false);
  const [isAddSize, setIsAddSize] = useState(false);

  const [color, setColor] = useState({ trangThai: true });
  const [size, setSize] = useState({ trangThai: true });

  const saveColor = async () => {
    if (!color.ten || !color.giaTri || color.ten.trim.lenght === 0) {
      toast.info("Màu sắc không hợp lệ");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/colors/create/" + auth.currentUser.uid,
        color
      );
      if (response.status === 201) {
        toast.success("Thêm màu sắc thành công");
      }

      console.log("màu sắc", response.data);
      setColor({ trangThai: true });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message || "Lưu thông tin Màu sắc không thành công"
      );
    }
    props.loadColor();
  };

  const saveSize = async () => {
    if (!size.giaTri || size.giaTri <= 0) {
      toast.info("Kích thước không hợp lệ");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/size/create/" + auth.currentUser.uid,
        size
      );
      if (response.status === 201) {
        toast.success("Thêm kích thước thành công");
      }
      setSize({ trangThai: true });
      console.log("kích thước", response.data);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Lưu thông tin kích thước không thành công"
      );
      console.error(error);
    }
    props.loadSize();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => setIsAddColor(!isAddColor)}
          >
            Thêm màu sắc
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={() => setIsAddSize(!isAddSize)}
          >
            Thêm kích thước
          </Button>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          {isAddColor ? (
            <>
              <TextField
                size="small"
                id="outlined-basic"
                label="Tên màu"
                variant="outlined"
                onChange={(e) => {
                  setColor({ ...color, ten: e.target.value });
                }}
              />
              <input
                type="color"
                style={{ height: "40px", marginLeft: "15px" }}
                onChange={(e) => {
                  setColor({ ...color, giaTri: e.target.value });
                }}
              />
              <Button
                variant="text"
                fullWidth
                size="small"
                onClick={() => saveColor()}
              >
                Lưu
              </Button>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={3}>
          {isAddSize ? (
            <>
              <TextField
                size="small"
                id="outlined-basic2"
                label="Kích thước"
                fullWidth
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setSize({ ...size, giaTri: e.target.value });
                }}
              />

              <Button
                variant="text"
                fullWidth
                size="small"
                onClick={() => saveSize()}
              >
                Lưu
              </Button>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </>
  );
};
export default CreateColorAndSize;
