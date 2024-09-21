import Grid from "@mui/material/Grid";
import "./MiniBanner.css";
import Typography from "@mui/material/Typography";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EastIcon from "@mui/icons-material/East";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
const MiniBanner = (props) => {
  const item = props.item;
  return (
    <Grid className="moi09098sa77189231" container>
      <Grid item xs={12} sm={7} md={7} lg={8} className="miniBannerText">
        <Link href="tel:+8435279376" underline="none">
          <Typography variant="caption" mt={2}>
            <LocalPhoneIcon style={{ fontSize: "1em" }} /> +84 35279376
          </Typography>
        </Link>
        <Link
          href="mailto:Trantienviet03@gmail.com?subject=Khách%20hàng%20shop%20giày&body=Nội%20dung"
          underline="none"
        >
          <Typography variant="caption" mt={2} ml={3}>
            <EmailIcon style={{ fontSize: "1em" }} />{" "}
            Fantsicforuns90012@gmail.com
          </Typography>
        </Link>

        <Typography variant="h1" mt={2} style={{ fontWeight: "bolder" }}>
          {item.title1}
        </Typography>
        <Typography variant="button" mt={5} style={{ fontWeight: "400" }}>
          {item.title2}
        </Typography>

        <Stack mt={4} spacing={2}>
          <Link href="products">
            <Button
              variant="contained"
              endIcon={<ShoppingBagIcon />}
              size="large"
            >
              Bắt đầu ngay
            </Button>
          </Link>
          <Link href="#31">
            <Button variant="text" endIcon={<EastIcon />}>
              Liên hệ với chúng tôi
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={5} md={5} lg={4}>
        <img
          src={item.images[0]}
          className="miniProductImg"
          alt="ảnh sản phẩm"
        />
      </Grid>
    </Grid>
  );
};

export default MiniBanner;
