import React, { useEffect, useState } from "react";
import axios from "axios";

function ShippingFeeCalculator(props) {
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
              pick_district: "Quận Hai Bà Trưng",
              province: "Hà nội",
              district: "Quận Cầu Giấy",
              address: "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
              weight: 700,
              value: 3000000,
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

    fetchData();
  }, []);

  return (
    <div>
      {shippingFee ? (
        <div>
          <h2>Thông tin phí vận chuyển:</h2>
          <p>Tên khu vực: {shippingFee.name}</p>
          <p>Phí vận chuyển: {shippingFee.fee} đ</p>
          <p>Phí bảo hiểm: {shippingFee.insurance_fee} đ</p>
          <p>Loại giao hàng: {shippingFee.delivery_type}</p>
          {/* Hiển thị phụ phí nếu có */}
          {shippingFee.extFees && shippingFee.extFees.length > 0 && (
            <div>
              <h3>Phụ phí:</h3>
              <ul>
                {shippingFee.extFees.map((fee, index) => (
                  <li key={index}>
                    {fee.title}: {fee.amount} đ
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
}

export default ShippingFeeCalculator;
