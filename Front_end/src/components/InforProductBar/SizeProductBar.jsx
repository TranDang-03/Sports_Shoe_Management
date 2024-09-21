import { Badge, Button, Grid, Typography } from "@mui/material";

const SizeProductBar = (props) => {
  const listSizeOfColor = props.listSizeOfColor;

  const clickSize = (item) => {
    if (item.soLuong === 0) {
      props.setSelectSize(null);
    }
    props.setSelectSize(item);
    console.log(props.selectSize);
  };

  return (
    <>
      <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
        Kích thước
      </Typography>
      <Grid container spacing={2} mb={2}>
        {listSizeOfColor.map((item) => {
          return (
            <Grid key={item.kichThuoc.id} item xs={3}>
              <Badge
                badgeContent={item.trangThai !== 0 ? item.soLuong : 0}
                color={
                  item.soLuong <= 10 && item.soLuong > 0
                    ? "error"
                    : item.soLuong >= 10 && item.soLuong < 100
                    ? "secondary"
                    : item.soLuong >= 100 && item.soLuong < 200
                    ? "success"
                    : item.soLuong >= 200 && item.soLuong < 500
                    ? "warning"
                    : "primary"
                }
              >
                <Button
                  color="info"
                  size="small"
                  variant={
                    props.selectSize
                      ? props.selectSize.kichThuoc.id === item.kichThuoc.id
                        ? "contained"
                        : "outlined"
                      : "outlined"
                  }
                  onClick={() => clickSize(item)}
                >
                  {item.kichThuoc.giaTri}
                </Button>
              </Badge>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default SizeProductBar;
