import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1 from "./Components/AddProduct/Step1";
import Step3 from "./Components/AddProduct/Step3";
import Step2 from "./Components/AddProduct/Step2";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../configs/FireBaseConfig/FireBaseConfig";

const steps = ["Thông tin cơ bản", "Sản phẩm", "Thông tin thống kê"];

export default function CreateProduct() {
  const { id } = useParams();
  const [sanPham, setSanPham] = React.useState({
    id: "",
    ngay_tao: "",
    tenSanPham: "",
    maSanPham: "",
    trangThai: 1,
    ngayCapNhat: null,
    thuongHieu: { ten: "Không tồn tại", id: -1, trangThai: true },
    moTa: "",
  });

  React.useEffect(() => {
    loadProduct();
  }, []);

  const [isManager, setIsManager] = React.useState(false);

  const user = auth.currentUser;
  React.useEffect(() => {
    checkIsmanaGer();
  }, []);
  const checkIsmanaGer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/tai-khoan/chuc-vu?uid=" + user.uid
      );

      if (res.data === 0) {
        setIsManager(true);
      } else {
        setIsManager(false);
      }
    } catch (error) {
      window.location.href = "http://localhost:3000/login";
    }
  };

  const loadProduct = async () => {
    if (id === "new") {
      return;
    }
    try {
      const res = await axios.get("http://localhost:8080/products/" + id);
      setSanPham(res.data);
      console.log("Sản phẩm đang có", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (sanPham.id === "" && activeStep === 0) {
      toast.warning("Hãy tạo thành công sản phẩm trước khi qua bước kế tiếp");
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("Bạn không thể bỏ qua bước này.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      {isManager ? (
        <Box sx={{ width: "100%", marginTop: "100px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Tùy chọn</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Button
                fullWidth
                sx={{ mt: 2, mb: 1, height: "300px", fontSize: "50px" }}
              >
                Gửi báo cho quản lý
              </Button>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Quay lại</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}></Typography>
              {/* Để màn hình ở đây */}
              {activeStep === 0 ? (
                <Step1 sanPham={sanPham} setSanPham={setSanPham} />
              ) : (
                ""
              )}
              {activeStep === 1 ? <Step2 sanPham={sanPham} /> : ""}
              {activeStep === 2 ? <Step3 sanPham={sanPham} /> : ""}
              {/* Để màn hình ở đây */}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Quay lại
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Bỏ qua
                  </Button>
                )}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Xem tiếp" : "Tiếp tục"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      ) : (
        <Button sx={{ height: "90dvh" }} fullWidth>
          Bạn không có quyền chỉnh sửa sản phẩm
        </Button>
      )}
    </>
  );
}
