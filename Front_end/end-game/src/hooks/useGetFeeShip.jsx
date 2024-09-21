import axios from "axios";
import { useEffect, useState } from "react";

const useShippingFeeCalculator = (props) => {
  const { province, district, ward, address, weight, value } = props;
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cors-anywhere.herokuapp.com/https://services.giaohangtietkiem.vn/services/shipment/fee?",
          {
            headers: {
              Token: "55a67c4b2f20fb67598709c539fbaec4fe59819a", // Điền giá trị token của bạn ở đây
            },
            params: {
              pick_province: "Hà Nội",
              pick_district: "Nam Từ Liêm",
              pick_ward: "Phương Canh",
              province: province,
              district: district,
              ward: ward,
              address: address,
              weight: weight,
              value: value,
              transport: "road", // road or fly
              deliver_option: "xteam", //none or xteam
              tags: [10, 13],
            },
          }
        );
        if (response.data.success) {
          setShippingFee(response.data.fee);
        } else {
          console.error("API request failed.");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    if (
      province === "" ||
      district === "" ||
      ward === "" ||
      address === "" ||
      value === "" ||
      weight === ""
    ) {
      console.log("đang có trường bị trống , không thực hiện req");
    } else {
      fetchData();
    }
  }, [province, district, ward, address, weight, value, shippingFee]);

  return { shippingFee };
};

export default useShippingFeeCalculator;
