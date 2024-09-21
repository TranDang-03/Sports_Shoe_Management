import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ReactQRCreter from "../../../test/CreateQRft";

export default function CreateQR(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Tạo mã QR">
        <IconButton
          onClick={handleClickOpen}
          sx={{ height: "100%", width: "100%" }}
        >
          <QrCodeIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mã QR của sản phẩm</DialogTitle>
        <DialogContent>
          <ReactQRCreter value={props.value} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
