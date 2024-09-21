import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import axios from "axios";
import { useEffect } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Cancel from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ColorDialoG from "./DiaLogColor";
import SizeDialoG from "./DiaLogSize";
import BrandDialoG from "./DiaLogBrand";
import CateDialoG from "./DiaLogCate";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AdminProductDetail = (props) => {
  const [value, setValue] = React.useState(0);
  const [topSell, setTopSell] = React.useState([]);
  const [topSell2, setTopSell2] = React.useState([]);
  const [topQuantity, setTopQuantity] = React.useState([]);
  const [topQuantity2, setTopQuantity2] = React.useState([]);
  const [topX2, setTopX2] = React.useState([]);
  const [topX, setTopX] = React.useState([]);

  const [other, setOther] = React.useState([]);

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    switch (newAlignment) {
      case 1:
        props.setProductList(countProductsByStatus(1));
        break;
      case 0:
        props.setProductList(countProductsByStatus(0));
        break;
      case 2:
        props.loadProducts();

        break;

      default:
        props.loadProducts();
        break;
    }
    setAlignment(newAlignment);
  };

  function countProductsByStatus(status) {
    const filteredProducts = props.ls.filter(
      (product) => product.trangThai === status
    );

    return filteredProducts;
  }
  useEffect(() => {
    getAll();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getAll = async () => {
    await getTopSell();
    await getTopSell2();
    await getTopQuantiy();
    await getTopX();
    await getTopQuantiy2();
    getSoldGetCancel();
    getTopX2();
  };

  const getSoldGetCancel = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/allx");
      if (res.status === 200) {
        setOther(res.data);
        console.log("DDax ban", res.data);
      }
    } catch (error) {}
  };

  const getTopSell = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopSell");
      if (res.status === 200) {
        setTopSell(res.data);
        console.log("Top sản phẩm bán chạy", res.data);
      }
    } catch (error) {}
  };
  const getTopSell2 = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopNotSell");
      if (res.status === 200) {
        setTopSell2(res.data);
        console.log("Top sản phẩm bán ko chạy", res.data);
      }
    } catch (error) {}
  };

  const getTopQuantiy = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopQuantity");
      if (res.status === 200) {
        setTopQuantity(res.data);
        console.log("Top sản phẩm bán ế", res.data);
      }
    } catch (error) {}
  };
  const getTopQuantiy2 = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopNotQuantity");
      if (res.status === 200) {
        setTopQuantity2(res.data);
        console.log("Top sản phẩm bán không ế", res.data);
      }
    } catch (error) {}
  };
  const getTopX = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopNothing");
      if (res.status === 200) {
        setTopX(res.data);
        console.log("Top sản phẩm lời nhat", res.data);
      }
    } catch (error) {}
  };
  const getTopX2 = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/TopNotNothing");
      if (res.status === 200) {
        setTopX2(res.data);
        console.log("Top sản phẩm lỗ nhat", res.data);
      }
    } catch (error) {}
  };
  return (
    <Box pr={2}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{ marginBottom: "15px" }}
      >
        <ToggleButton value={2} aria-label="left aligned">
          Tất cả
        </ToggleButton>
        <ToggleButton value={1} aria-label="centered">
          Đang bán
        </ToggleButton>
        <ToggleButton value={0} aria-label="right aligned">
          Không bán
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        color="info"
        fullWidth
        variant="outlined"
        LinkComponent={Link}
        to="/admin/infor-product/new"
        startIcon={<AddBoxIcon />}
      >
        Thêm sản phẩm
      </Button>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <ColorDialoG />
        </Grid>
        <Grid item xs={6}>
          <SizeDialoG />
        </Grid>
        <Grid item xs={6}>
          <BrandDialoG />
        </Grid>
        <Grid item xs={6}>
          <CateDialoG />
        </Grid>
      </Grid>
      <hr />
      {other.map((item) => {
        return (
          <Box key={item[0]}>
            {item[0] === 5 ? (
              <Button size="large" color="success" startIcon={<TaskAltIcon />}>
                Bán thành công {item[1]}
              </Button>
            ) : (
              ""
            )}

            {item[0] === 6 ? (
              <Button size="large" color="error" startIcon={<Cancel />}>
                Đơn hủy {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 1 ? (
              <Button size="large" color="success" startIcon={<VerifiedIcon />}>
                Đã xác nhận {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 0 ? (
              <Button
                size="large"
                color="secondary"
                startIcon={<HourglassEmptyIcon />}
              >
                Chờ xác nhận {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 2 ? (
              <Button
                size="large"
                color="info"
                startIcon={<LocalShippingIcon />}
              >
                Đang giao {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 3 ? (
              <Button size="large" color="success" startIcon={<NoCrashIcon />}>
                Giao thành công {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 4 ? (
              <Button
                size="large"
                color="success"
                startIcon={<CreditScoreIcon />}
              >
                Đã thanh toán {item[1]}
              </Button>
            ) : (
              ""
            )}
            {item[0] === 7 ? (
              <Button
                size="large"
                color="success"
                startIcon={<HighlightOffIcon />}
              >
                Chờ xác nhận hủy {item[1]}
              </Button>
            ) : (
              ""
            )}
          </Box>
        );
      })}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          variant="scrollable"
          aria-label="basic tabs example"
        >
          <Tab label="Bán chạy nhất" {...a11yProps(0)} />
          <Tab label="Bán ế nhất" {...a11yProps(1)} />
          <Tab label="Tồn kho nhiều" {...a11yProps(2)} />
          <Tab label="Tồn kho ít" {...a11yProps(3)} />
          <Tab label="Lợi Nhuận cao" {...a11yProps(4)} />
          <Tab label="Lợi Nhuận thấp" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Đã bán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topSell.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Đã bán</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topSell2.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Tồn kho</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topQuantity.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Tồn kho</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topQuantity2.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Lợi nhuận (%) </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topX.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell align="right">Lợi nhuận (%) </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topX2.map((row, index) => (
              <TableRow
                onClick={() => {
                  window.location.href =
                    "http://localhost:3000/admin/infor-product/" + row[0];
                }}
                hover
                key={row[0]}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row[1]}</TableCell>
                <TableCell align="right">{row[2]} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTabPanel>
    </Box>
  );
};
export default AdminProductDetail;
