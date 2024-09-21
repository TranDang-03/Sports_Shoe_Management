import { useState } from "react";
import { storage } from "../../configs/FireBaseConfig/FireBaseConfig";
import { Button, Stack, TextField } from "@mui/material";
import {
  sendPasswordResetEmail,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateProfile = (props) => {
  const auth = props.auth;
  const user = props.user;

  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");

  const [countDown, setCountDown] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [image, setImage] = useState();
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    // Đây chỉ là một ví dụ đơn giản, bạn có thể sử dụng biểu thức chính quy phức tạp hơn để kiểm tra email.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let urls = user.photoURL;

    // Kiểm tra trống các trường
    if (!displayName || !email) {
      setError("Tên và Email là bắt buộc");
      return;
    }

    // Kiểm tra định dạng email
    if (!validateEmail(email)) {
      setError("Định dạng email không hợp lệ.");
      return;
    }
    if (image && image.name) {
      if (user.photoURL && user.providerData[0].providerId !== "google.com") {
        const desertRef = ref(storage, user.photoURL);

        // Delete the file
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            console.log("10%");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });
      }

      const fileRef = ref(
        storage,
        "User/" +
          user.uid +
          "/" +
          image.name +
          Math.floor(Math.random() * 90000) +
          10000
      );

      await uploadBytes(fileRef, image);

      const listRef = ref(storage, "User/" + user.uid + "/");
      try {
        const fileRefs = await listAll(listRef);
        console.log("haha ", fileRefs);
        urls = await getDownloadURL(fileRefs.items[0]);
      } catch (error) {
        toast.error("Lỗi khi tải lên ảnh");
        console.error(error);
      }
    }

    // Kiểm tra số điện thoại Việt Nam

    console.log("Link hình ảnh ", urls);

    updateProfile(auth.currentUser, {
      displayName: displayName,

      photoURL: urls,
    })
      .then(() => {
        if (user.email !== email) {
          updateEmail(auth.currentUser, email)
            .then(() => {
              toast("Đã gửi email xác nhận về địa chỉ email của bạn");
            })
            .catch((error) => {
              if (error.code === "auth/requires-recent-login") {
                auth.signOut().then(() => (window.location.href = "/login"));
              }
              if (error.code === "auth/email-already-in-use") {
                toast.warning("Email này đang có người sử dụng");
              }
              console.log(error);
            });
        } else {
          toast("Đã cập nhật thành công");
        }
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const sendResetPasswordx = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        toast.success("Hãy kiểm tra email của bạn");
        initiateCountdown();
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === "auth/too-many-requests") {
          toast.error(
            "Bạn đã gửi quá nhiều lần, xin vui lòng đợi trong chục phút rồi thử lại sau"
          );
        }
        // ..
      });
  };

  const startCountdown = () => {
    setIsCounting(true);
  };

  // Hàm này có thể được gọi từ nơi khác để bắt đầu countdown
  const initiateCountdown = () => {
    setCountDown(60); // Thiết lập lại giá trị countdown nếu cần
    startCountdown();
  };

  useEffect(() => {
    let intervalId;

    if (isCounting) {
      intervalId = setInterval(() => {
        setCountDown((prevCount) => {
          const newCount = prevCount > 0 ? prevCount - 1 : 0;
          if (newCount === 0) {
            setIsCounting(false); // Dừng countdown khi countDown đạt đến 0
          }
          return newCount;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isCounting]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ marginBottom: "10px" }}
          required
          id="outlined-required3"
          label="Tên"
          type="text"
          size="small"
          value={displayName}
          fullWidth
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <TextField
          sx={{ marginBottom: "10px" }}
          required
          id="outlined-required1"
          label="Email"
          size="small"
          type="email"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />

        <Stack spacing={2} direction={"row"}>
          <label htmlFor="fileInput">
            <input type="file" id="fileInput" onChange={handleImageChange} />
          </label>
          <Button variant="outlined" fullWidth type="submit">
            Cập nhật
          </Button>
        </Stack>

        {!isCounting ? (
          <Button
            size="small"
            onClick={sendResetPasswordx}
            sx={{ float: "right" }}
          >
            Đổi mật khẩu
          </Button>
        ) : (
          countDown
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
};
export default UpdateProfile;
