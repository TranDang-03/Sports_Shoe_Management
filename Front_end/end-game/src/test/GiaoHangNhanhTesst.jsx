import { Autocomplete, Box, TextField } from "@mui/material";
import sendRequestWithToken from "../hooks/CustomAxios";
import { useEffect, useState } from "react";
import GetFeeShip from "../hooks/GetFeeShip";

const GiaoHangTest = (props) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const token = "0dd5c3e5-2a73-11ee-af43-6ead57e9219a"; // Thay token bằng giá trị thực tế
  // Thay URL bằng URL thực tế
  useEffect(() => {
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
    sendRequestWithToken(token, apiUrl, "GET")
      .then((response) => {
        // Xử lý response ở đây

        setProvinces(response.data.data);
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // theo dõi tỉnh đang chọn
    if (selectedProvince !== null) {
      console.log("Đã chọn tỉnh", selectedProvince.ProvinceID);
      const requestData = { province_id: selectedProvince.ProvinceID };
      const apiUrl =
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
      sendRequestWithToken(token, apiUrl, "POST", requestData)
        .then((response) => {
          // Xử lý response ở đây

          setDistricts(response.data.data);
        })
        .catch((error) => {
          // Xử lý lỗi ở đây
          console.error(error);
        });
    } else {
      console.log("chưa chọn tỉnh nào");
    }
  }, [selectedProvince]);

  useEffect(() => {
    // theo dõi huyện đang chọn
    if (selectedDistrict !== null) {
      console.log("Đã chọn Huyện", selectedDistrict.DistrictID);
      const requestData = { district_id: selectedDistrict.DistrictID };
      const apiUrl =
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
      sendRequestWithToken(token, apiUrl, "POST", requestData)
        .then((response) => {
          // Xử lý response ở đây

          setWards(response.data.data);
        })
        .catch((error) => {
          // Xử lý lỗi ở đây
          console.error(error);
        });
    } else {
      console.log("chưa chọn Huyện nào");
    }
  }, [selectedDistrict]);
  useEffect(() => {
    if (selectedWard !== null) {
      console.log("đã chọn xã: ", selectedWard);
    } else console.log("chưa chọn xã nào");
  }, [selectedWard]);

  const handleProvinceChange = (event, newValue) => {
    setSelectedProvince(newValue);

    setSelectedDistrict(null);
    setSelectedWard(null);
  };
  const handleDistrictChange = (event, newValue) => {
    if (newValue.DistrictID === 3451) {
      alert("Quận này hiện đang cập nhật");
      setSelectedDistrict(null);
    } else {
      setSelectedDistrict(newValue);
      setSelectedWard(null);
    }
  };
  const handleWardChange = (event, newValue) => {
    setSelectedWard(newValue);
    getFee(newValue);
  };

  const getFee = async (newValue) => {
    props.setProviderWard(
      newValue.WardName +
        ", " +
        selectedDistrict.DistrictName +
        ", " +
        selectedProvince.ProvinceName
    );
    try {
      const fee = await GetFeeShip(
        token,
        selectedDistrict.DistrictID,
        newValue.WardId
      );
      // Xử lý phí vận chuyển ở đây
      console.log("Phí vận chuyển:", fee);
      props.setFeeShip(fee);
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error("Lỗi khi tính phí vận chuyển:", error);
    }
  };
  const handleInputChange = (event, value, reason) => {
    // Kiểm tra xem giá trị nhập vào có rỗng không
    if (reason === "clear") {
      props.setFeeShip(0);
      props.setProviderWard("");
      props.setAdress("");
    }
  };
  return (
    <Box marginTop={2}>
      <h3>Địa chỉ nhận hàng </h3>
      {provinces.length !== 0 ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={provinces}
          getOptionLabel={(option) => option.ProvinceName}
          renderInput={(params) => (
            <TextField {...params} label="Tỉnh/Thành phố" />
          )}
          onChange={handleProvinceChange}
          onInputChange={handleInputChange}
        />
      ) : (
        <h1>Đang tải danh sách tỉnh</h1>
      )}

      {selectedProvince && (
        <div>
          <br />
          <Autocomplete
            options={districts}
            clearIcon={false}
            getOptionLabel={(option) => option.DistrictName}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            renderInput={(params) => (
              <TextField {...params} label="Quận/Huyện" />
            )}
          />
        </div>
      )}

      {selectedDistrict && (
        <div>
          <br />
          <Autocomplete
            options={wards}
            clearIcon={false}
            getOptionLabel={(option) => option.WardName}
            value={selectedWard}
            onChange={handleWardChange}
            renderInput={(params) => (
              <TextField {...params} label="Xã/Phường" />
            )}
          />
        </div>
      )}

      {selectedWard && (
        <>
          <br />
          <TextField
            id="outlined-basic"
            label="Địa chỉ cụ thể"
            variant="outlined"
            inputMode="text"
            fullWidth
            onChange={(e) => {
              props.setAdress(e.target.value);
            }}
          />
        </>
      )}
    </Box>
  );
};
export default GiaoHangTest;
