import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axios from "axios";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function BasicAccordion(props) {
  const { categories = [], setCategories } = props;
  const { brands = [], setBrands } = props;
  const { sizes = [], setSizes } = props;
  const { colors = [], setColors } = props;
  const [hight, setHight] = React.useState(0);

  const [categoryList, setCategoryList] = React.useState([]);
  const [colorList, setColorList] = React.useState([]);
  const [sizeList, setSizeList] = React.useState([]);
  const [BrandList, setBrandList] = React.useState([]);

  const [value, setValue] = React.useState([0, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setMaxPrice(newValue[1]);
    props.setMinPrice(newValue[0]);
  };

  useEffect(() => {
    hightPrice();
    loadCategory();
    loadBrand();
    loadColor();
    loadSize();
  }, []);

  const loadCategory = async () => {
    const res = await axios.get("http://localhost:8080/danh-muc/get-all");
    if (res.status === 200) {
      setCategoryList(res.data);
      console.log("danh muc: ", res.data);
    }
  };
  const loadBrand = async () => {
    const res = await axios.get("http://localhost:8080/thuong-hieu/get-all");
    if (res.status === 200) {
      setBrandList(res.data);
      console.log("thương hiệu: ", res.data);
    }
  };
  const loadColor = async () => {
    const res = await axios.get("http://localhost:8080/colors/available");
    if (res.status === 200) {
      setColorList(res.data);
      console.log("màu sắc: ", res.data);
    }
  };
  const loadSize = async () => {
    const res = await axios.get("http://localhost:8080/size");
    if (res.status === 200) {
      setSizeList(res.data);
      console.log("kích thước: ", res.data);
    }
  };

  const locValue = () => {
    props.loadProducts();
  };

  const hightPrice = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/hightPrice/1234d"
      );
      setHight(response.data.giaBan);
      console.log("Giá lớn nhất", response.data.giaBan);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCate = (id) => {
    const newCategories = categories.includes(id)
      ? categories.filter((item) => item !== id)
      : [...categories, id];

    setCategories(newCategories);
  };

  const handleToggleBrand = (id) => {
    const newBrands = brands.includes(id)
      ? brands.filter((item) => item !== id)
      : [...brands, id];

    setBrands(newBrands);
  };

  const handleToggleColor = (id) => {
    const newBrands = colors.includes(id)
      ? colors.filter((item) => item !== id)
      : [...colors, id];

    setColors(newBrands);
  };

  const handleToggleSize = (id) => {
    const newX = sizes.includes(id)
      ? sizes.filter((item) => item !== id)
      : [...sizes, id];

    setSizes(newX);
  };

  return (
    <div>
      <Typography variant="h6">DANH MỤC SẢN PHẨM</Typography>
      <Button
        variant="outlined"
        style={{ width: "100%" }}
        onClick={() => locValue()}
      >
        Lọc
      </Button>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Danh mục</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categoryList.map((item) => (
              <FormControlLabel
                key={item.id}
                id={`checkbox-${item.id}`}
                control={<Checkbox />}
                label={item.ten}
                checked={categories.includes(item.id)}
                onChange={() => handleToggleCate(item.id)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content2"
          id="panel1a-header2"
        >
          <Typography>Thương hiệu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {BrandList.map((item) => (
              <FormControlLabel
                key={item.id}
                id={`checkbox3-${item.id}`}
                control={<Checkbox />}
                label={item.ten}
                checked={brands.includes(item.id)}
                onChange={() => handleToggleBrand(item.id)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content21"
          id="panel1a-header21"
        >
          <Typography>Màu sắc</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {colorList.map((item) => (
              <FormControlLabel
                key={item.id}
                id={`checkbox1-${item.id}`}
                control={<Checkbox />}
                label={item.ten}
                checked={colors.includes(item.id)}
                onChange={() => handleToggleColor(item.id)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content23"
          id="panel1a-header23"
        >
          <Typography>Kích thước</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {sizeList.map((item) => (
              <FormControlLabel
                key={item.id}
                id={`checkbox2-${item.id}`}
                control={<Checkbox />}
                label={item.giaTri}
                checked={sizes.includes(item.id)}
                onChange={() => handleToggleSize(item.id)}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ width: "100%" }} mt={3}>
        <Typography variant="body2">Lọc theo giá tiền</Typography>
        <Slider
          min={0}
          step={1000}
          max={hight}
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  );
}
