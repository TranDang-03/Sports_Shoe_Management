import sendRequestWithToken from "./CustomAxios";

const GetFeeShip = async (token, toDistrictId, toWardCode, priceItems) => {
  let shipFee = 0;
  try {
    const priceItem = priceItems || 0;
    const requestData = {
      service_type_id: 2, //2 giao rẻ hơn 5
      from_district_id: 3440,
      to_district_id: toDistrictId,
      to_ward_code: toWardCode,
      height: 10,
      length: 10,
      weight: 1000,
      width: 10,
      insurance_value: priceItem,
      coupon: null,
      items: [
        {
          name: "TEST1",
          quantity: 1,
          height: 0,
          weight: 1000,
          length: 0,
          width: 0,
        },
      ],
    };
    const apiUrl =
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
    const response = await sendRequestWithToken(
      token,
      apiUrl,
      "POST",
      requestData
    );

    // Xử lý response ở đây
    console.log(response.data);
    shipFee = response.data.data.total;
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error(error);
    throw error;
  }
  return shipFee;
};

export default GetFeeShip;
