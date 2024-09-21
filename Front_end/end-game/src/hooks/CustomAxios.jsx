import axios from "axios";

// Tạo hàm nhận vào token, URL, method và dữ liệu body, và trả về một Promise chứa response
const sendRequestWithToken = (token, url, method, data) => {
  console.log("token: ", token + " url: ", url);
  // Tạo một instance Axios cấu hình với token trong header
  const instance = axios.create({
    baseURL: url,
    headers: {
      // Thêm tham số "Token" vào header
      Token: token,
    },
  });

  if (method === "GET") {
    return instance
      .get() // Thay .get() bằng method tương ứng (get, post, put, delete, etc.)
      .then((response) => {
        // Trả về response
        return response;
      })
      .catch((error) => {
        // Xử lý lỗi (có thể thêm xử lý riêng cho các trường hợp lỗi)
        throw error;
      });
  } else if (method === "POST") {
    return instance
      .post(url, data) // Gửi dữ liệu trong request body khi là POST
      .then((response) => {
        // Trả về response
        return response;
      })
      .catch((error) => {
        // Xử lý lỗi (có thể thêm xử lý riêng cho các trường hợp lỗi)
        throw error;
      });
  }
};

export default sendRequestWithToken;
