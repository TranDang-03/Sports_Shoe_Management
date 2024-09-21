import { Box, Grid, Paper } from "@mui/material";
import CustomPaginationActionsTable from "../../components/OderLeftSide/TableData";

const Oder = () => {
  return (
    <>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={8}>
          <h1>Danh sách Đơn hàng</h1>
          <CustomPaginationActionsTable />
        </Grid>
        <Grid item xs={4}>
          <h1>Thống kê cá nhân</h1>
          <Box component={Paper}>
            <img
              width={"100%"}
              src="https://d33v4339jhl8k0.cloudfront.net/docs/assets/5f98c44152faff0016af4458/images/5f9bcff746e0fb0017fc7228/file-83GkU3XDwW.png"
              alt="fake"
            />
            <img
              width={"100%"}
              src="https://beebot-sg-knowledgecloud.oss-ap-southeast-1.aliyuncs.com/kc/kc-media/kc-oss-1666279753153-image.png"
              alt="fake2"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Oder;
