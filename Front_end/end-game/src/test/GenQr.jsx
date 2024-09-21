import axios from "axios";
import { useEffect } from "react";

const QR = () => {
  useEffect(() => {
    axios.get("https://api.vietqr.io/v2/banks").then((res) => {
      console.log("data >>>", res.data); //lấy danh sach ngân hàng
    });
  }, []);
  return (
    <>
      <img
        alt="QR payment"
        src="https://img.vietqr.io/image/970418-21210001021600-print.png?amount=100000&addInfo=CHUYEN%20TIEN%20Cho%20Viet&accountName=TRAN%20TIEN%20VIET"
      />
    </>
  );
};
export default QR;
//https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
