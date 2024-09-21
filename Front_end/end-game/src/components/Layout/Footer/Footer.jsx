import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box textAlign={"center"} bgcolor={"#1976d2"} py={2}>
        <Typography variant="button"> @ 2023 Copyright </Typography>
        <Link href="#" color="white" underline="hover" variant="body2">
          trandang601@gmail.com
        </Link>
      </Box>
    </>
  );
};
export default Footer;
