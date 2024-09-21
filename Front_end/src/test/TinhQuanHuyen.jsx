import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Button } from "@mui/material";

import useGetFeeShipHandler from "../hooks/useGetFeeShip";

function LocationSelector() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  // Lấy danh sách tỉnh/thành phố từ API
  useEffect(() => {
    async function fetchProvinces() {
      try {
        const response = await axios.get(
          "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
        );
        setProvinces(response.data.data.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh/thành phố:", error);
      }
    }

    fetchProvinces();
  }, []);

  // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố được chọn
  useEffect(() => {
    async function fetchDistricts() {
      if (selectedProvince) {
        try {
          const response = await axios.get(
            `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${selectedProvince.code}&limit=-1`
          );
          setDistricts(response.data.data.data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách quận/huyện:", error);
        }
      }
    }

    fetchDistricts();
  }, [selectedProvince]);

  // Lấy danh sách xã/phường dựa trên quận/huyện được chọn
  useEffect(() => {
    async function fetchWards() {
      if (selectedDistrict) {
        try {
          const response = await axios.get(
            `https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${selectedDistrict.code}&limit=-1`
          );
          setWards(response.data.data.data);
        } catch (error) {
          console.error("Lỗi khi tải danh sách xã/phường:", error);
        }
      }
    }

    fetchWards();
  }, [selectedDistrict]);

  const handleProvinceChange = (event, newValue) => {
    setSelectedProvince(newValue);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleDistrictChange = (event, newValue) => {
    setSelectedDistrict(newValue);
    setSelectedWard(null);
  };

  const handleWardChange = (event, newValue) => {
    setSelectedWard(newValue);
  };

  const handleConfirmClick = () => {
    const selectedProvinceName = selectedProvince?.name || "";
    const selectedDistrictName = selectedDistrict?.name || "";
    const selectedWardName = selectedWard?.name || "";

    const message = `Bạn đã chọn: Tỉnh/Thành phố - ${selectedProvinceName}, Quận/Huyện - ${selectedDistrictName}, Xã/Phường - ${selectedWardName}`;
    alert(message);
  };

  const fee = useGetFeeShipHandler({
    province: selectedProvince?.name || "", // Thay thế bằng tỉnh/thành phố cần truyền
    district: selectedDistrict?.name || "", // Thay thế bằng quận/huyện cần truyền
    ward: selectedWard?.name || "", // Thay thế bằng xã/phường cần truyền
    address: "không có ở đâu cỏa", // Thay thế bằng địa chỉ cần truyền
    weight: 500, // Thay thế bằng trọng lượng cần truyền
    value: 0, // Thay thế bằng giá trị cần truyền
  });

  const handleConfirmClick2 = () => {
    console.log(fee);
  };

  return (
    <div>
      <div>
        <label>Tỉnh/Thành phố:</label>
        <Autocomplete
          options={provinces}
          getOptionLabel={(option) => option.name}
          value={selectedProvince}
          onChange={handleProvinceChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      {selectedProvince && (
        <div>
          <label>Quận/Huyện:</label>
          <Autocomplete
            options={districts}
            getOptionLabel={(option) => option.name}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      )}

      {selectedDistrict && (
        <div>
          <label>Xã/Phường:</label>
          <Autocomplete
            options={wards}
            getOptionLabel={(option) => option.name}
            value={selectedWard}
            onChange={handleWardChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
      )}

      <Button onClick={handleConfirmClick} variant="contained" color="primary">
        Xác nhận
      </Button>
      <Button onClick={handleConfirmClick2} variant="contained" color="primary">
        tính phí vận chuyển
      </Button>
    </div>
  );
}

export default LocationSelector;
