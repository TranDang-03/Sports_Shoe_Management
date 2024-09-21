import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import ColorTable from "./DiaLGTable";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import RecyclingIcon from "@mui/icons-material/Recycling";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ColorLensIcon from "@mui/icons-material/ColorLens";

function isNameExists(newName, colorList) {
  // Kiểm tra từng mục trong danh sách màu sắc
  for (let i = 0; i < colorList.length; i++) {
    // So sánh tên cần kiểm tra với tên trong danh sách
    if (colorList[i].ten === newName) {
      // Nếu tên đã tồn tại, trả về true
      return true;
    }
  }
  // Nếu không tìm thấy tên, trả về false
  return false;
}

function isCodeExists(newName, colorList) {
  // Kiểm tra từng mục trong danh sách màu sắc
  for (let i = 0; i < colorList.length; i++) {
    // So sánh tên cần kiểm tra với tên trong danh sách
    if (colorList[i].giaTri === newName) {
      // Nếu tên đã tồn tại, trả về true
      return true;
    }
  }
  // Nếu không tìm thấy tên, trả về false
  return false;
}

export default function ColorDialoG() {
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState([]);
  const [scolors, setSColors] = React.useState({
    id: -99,
    ten: "",
    giaTri: "#000000", // Giá trị mặc định cho màu
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getColors();
  }, []);

  const getColors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/colors");
      if (res.status === 200) {
        setColors(res.data);
        setSColors({
          id: -99,
          ten: "",
          giaTri: "#000000",
        });
      }
    } catch (error) {
      toast.error(error.response.data.message || "Lưu thông không thành công");
      console.error("Lỗi:", error);
    }
  };

  const deleteColors = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8080/colors/delete/" + scolors.id
      );
      if (res.status === 200) {
        toast("Cập nhật thành công");
      }
      getColors();
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.message || "xóa không thành công");
      console.error("Lỗi:", error);
    }
  };

  const reCoverColors = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/colors/recover/" + scolors.id
      );
      if (res.status === 200) {
        toast("Cập nhật thành công");
      }
      console.log(res);
      getColors();
    } catch (error) {
      toast.error(error.response.data.message || "khôi phục không thành công");
      console.error("Lỗi:", error);
    }
  };

  const createColor = async () => {
    if (scolors.ten.trim() === "") {
      toast.warning("Hãy nhập tên màu sắc");
      return;
    }

    if (scolors.id === -99) {
      if (isNameExists(scolors.ten, colors)) {
        toast.warning("tên này đã tồn tại");
        return;
      }
      if (isCodeExists(scolors.giaTri, colors)) {
        if (!window.confirm("Màu này đã tồn tại")) {
          return;
        }
      }
      try {
        const res = await axios.post("http://localhost:8080/colors/create2/", {
          ten: scolors.ten,
          giaTri: scolors.giaTri,
          trangThai: true,
        });
        if (res.status === 201) {
          toast("Thêm mới thành công");
        }
        console.log(res);
        getColors();
      } catch (error) {
        toast.error(error.response.data.message || "không thành công");
        console.error("Lỗi:", error);
      }
    } else {
      try {
        const res = await axios.put(
          "http://localhost:8080/colors/update2/" + scolors.id,
          {
            ten: scolors.ten,
            giaTri: scolors.giaTri,
            trangThai: true,
          }
        );
        if (res.status === 200) {
          toast("Cập nhật thành công");
        }
        console.log(res);
        getColors();
      } catch (error) {
        toast.error(error.response.data.message || "không thành công");
        console.error("Lỗi:", error);
      }
    }
  };

  const handleChangeTen = (event) => {
    const newTen = event.target.value;
    setSColors((prevSColors) => ({ ...prevSColors, ten: newTen }));
  };

  const handleChangeGiaTri = (event) => {
    const newGiaTri = event.target.value;
    setSColors((prevSColors) => ({ ...prevSColors, giaTri: newGiaTri }));
  };
  return (
    <React.Fragment>
      <Tooltip title="Danh sách màu sắc">
        <Button
          onClick={handleClickOpen}
          size="medium"
          color="success"
          startIcon={<ColorLensIcon />}
        >
          màu sắc
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Màu sắc</DialogTitle>
        <DialogContent>
          <Paper elevation={2} sx={{ marginBottom: 2, padding: 2 }}>
            <Grid container>
              <Grid item xs={7}>
                <TextField
                  label="Tên màu"
                  id="outlined-size-small1"
                  value={scolors ? scolors.ten : ""}
                  size="small"
                  fullWidth
                  onChange={handleChangeTen}
                />
              </Grid>
              <Grid item xs={2}>
                <input
                  type="color"
                  id="outlined-size-small2"
                  value={scolors ? scolors.giaTri : ""}
                  style={{ height: "40px" }}
                  onChange={handleChangeGiaTri}
                />
              </Grid>
              {scolors.id !== -99 ? (
                scolors.trangThai ? (
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => {
                        deleteColors();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                ) : (
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => {
                        reCoverColors();
                      }}
                    >
                      <RecyclingIcon />
                    </IconButton>
                  </Grid>
                )
              ) : (
                ""
              )}
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    setSColors({ id: -99, ten: "", giaTri: 0 });
                  }}
                >
                  <NoteAddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    createColor();
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <ColorTable rows={colors} setSColors={setSColors} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
