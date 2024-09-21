import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton, Paper, Tooltip } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import StraightenIcon from "@mui/icons-material/Straighten";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import RecyclingIcon from "@mui/icons-material/Recycling";
import SizeTable from "./DiaLGTableSize";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

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

export default function SizeDialoG() {
  const [open, setOpen] = React.useState(false);
  const [sizes, setSizes] = React.useState([]);
  const [selected, setSelected] = React.useState({
    id: -99,

    giaTri: 0, // Giá trị mặc định cho màu
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
      const res = await axios.get("http://localhost:8080/size");
      if (res.status === 200) {
        setSizes(res.data);
        setSelected({
          id: -99,

          giaTri: 0,
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
        "http://localhost:8080/size/delete/" + selected.id
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
        "http://localhost:8080/size/recover/" + selected.id
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
    if (selected.giaTri <= 0) {
      toast.warning("Hãy nhập kích thước");
      return;
    }
    if (isCodeExists(selected.giaTri, sizes)) {
      toast.warning("Hãy nhập kích thước khác");
      return;
    }
    if (selected.id === -99) {
      try {
        const res = await axios.post("http://localhost:8080/size/create2", {
          giaTri: selected.giaTri,
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
          "http://localhost:8080/size/update2/" + selected.id,
          {
            giaTri: selected.giaTri,
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
    if (newTen < 0) {
      return;
    }
    setSelected((prevSColors) => ({ ...prevSColors, giaTri: newTen }));
  };

  return (
    <React.Fragment>
      <Tooltip title="Danh sách kích thước">
        <Button
          onClick={handleClickOpen}
          size="medium"
          color="warning"
          startIcon={<StraightenIcon />}
        >
          Kích thước
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>kích thước</DialogTitle>
        <DialogContent>
          <Paper elevation={2} sx={{ marginBottom: 2, padding: 2 }}>
            <Grid container>
              <Grid item xs={8}>
                <TextField
                  label="Kích thước"
                  id="outlined-size-small1"
                  value={selected ? selected.giaTri : ""}
                  size="small"
                  type="number"
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
                    setSelected({ id: -99, giaTri: 0 });
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
          <SizeTable rows={sizes} selected={setSelected} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
