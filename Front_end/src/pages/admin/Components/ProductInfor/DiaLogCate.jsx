import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import RecyclingIcon from "@mui/icons-material/Recycling";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CateTable from "./DiaLGTableCate";
import CategoryIcon from "@mui/icons-material/Category";
function isCodeExists(newName, colorList) {
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

export default function CateDialoG() {
  const [open, setOpen] = React.useState(false);
  const [sizes, setSizes] = React.useState([]);
  const [selected, setSelected] = React.useState({
    id: -99,

    ten: "", // Giá trị mặc định cho màu
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
      const res = await axios.get("http://localhost:8080/danh-muc/get-all2");
      if (res.status === 200) {
        setSizes(res.data);
        setSelected({
          id: -99,

          ten: "",
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
        "http://localhost:8080/danh-muc/delete/" + selected.id
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
        "http://localhost:8080/danh-muc/recover/" + selected.id,
        {
          ten: selected.ten,
          trangThai: true,
        }
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
    if (selected.ten === "") {
      toast.warning("Hãy nhập tên");
      return;
    }
    if (isCodeExists(selected.giaTri, sizes)) {
      toast.warning("Hãy nhập tên khác");
      return;
    }
    if (selected.id === -99) {
      try {
        const res = await axios.post("http://localhost:8080/danh-muc/create", {
          ten: selected.ten,
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
          "http://localhost:8080/danh-muc/update/" + selected.id,
          {
            ten: selected.ten,
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

    setSelected((prevSColors) => ({ ...prevSColors, ten: newTen }));
  };

  return (
    <React.Fragment>
      <Tooltip title="Danh sách Danh mục">
        <Button
          onClick={handleClickOpen}
          size="medium"
          color="secondary"
          startIcon={<CategoryIcon />}
        >
          Danh mục
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Danh mục</DialogTitle>
        <DialogContent>
          <Paper elevation={2} sx={{ marginBottom: 2, padding: 2 }}>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  label="Danh mục"
                  id="outlined-size-small1"
                  value={selected ? selected.ten : ""}
                  size="small"
                  fullWidth
                  onChange={handleChangeTen}
                />
              </Grid>

              {selected.id !== -99 ? (
                selected.trangThai ? (
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
                    setSelected({ id: -99, ten: "" });
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
          <CateTable rows={sizes} selected={setSelected} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
