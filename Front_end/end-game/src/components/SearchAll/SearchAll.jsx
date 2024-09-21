import * as React from "react";
import TextField from "@mui/material/TextField";

export default function SearchAll(props) {
  const { name, setName } = props;

  const handleOnchange = (e) => {
    setName(e.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      props.loadProducts();
    }
  };

  const handleOnBlur = () => {
    props.loadProducts();
  };
  return (
    <>
      <TextField
        id="outlined-basic23"
        value={name}
        label="Tìm kiếm theo tên 🔍"
        onChange={(e) => handleOnchange(e)}
        onKeyDown={handleEnterPress}
        onBlur={handleOnBlur}
        variant="outlined"
      />
    </>
  );
}
