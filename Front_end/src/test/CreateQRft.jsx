import { Box } from "@mui/material";
import QRCode from "react-qr-code";

const ReactQRCreter = (props) => {
  const onImageCownload = () => {
    const svg = document.getElementById("QRCode"); //id của cái thẻ muốn tải về
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  return (
    <Box width={550}>
      <QRCode
        id="QRCode"
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={props.value}
        viewBox={`0 0 256 256`}
      />
      <button onClick={onImageCownload}>Tải xuống</button>
    </Box>
  );
};
export default ReactQRCreter;
