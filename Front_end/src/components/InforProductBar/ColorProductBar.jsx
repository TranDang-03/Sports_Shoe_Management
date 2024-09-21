import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";

const ColorProductBar = (props) => {
  const mauSac = props.mauSac;

  const clickColor = (id) => {
    props.setSelectColor(id);
  };

  return (
    <>
      <Typography my={1} variant="subtitle2" fontWeight={"bolder"}>
        Màu sắc
      </Typography>

      <Grid container spacing={2} mb={2}>
        {mauSac.map((item, index) => {
          return (
            <Tooltip key={item.id} title={item.ten}>
              <Grid item xs={3}>
                <Button
                  style={{ backgroundColor: item.giaTri }}
                  variant="text"
                  onClick={() => clickColor(item.id)}
                  component={Paper}
                >
                  &nbsp;
                  {props.selectColor === item.id ? "👟" : ""}
                </Button>
              </Grid>
            </Tooltip>
          );
        })}
      </Grid>
    </>
  );
};
export default ColorProductBar;
