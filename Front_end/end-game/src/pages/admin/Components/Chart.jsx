import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment/moment";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const [ChartData, setChartData] = useState([]);
  const currentDate = moment();
  const sevenDaysAgo = moment().subtract(7, "days");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/HomeChart?StartDate=" +
          sevenDaysAgo.format("YYYY-MM-DD") +
          "&EndDate=" +
          currentDate.format("YYYY-MM-DD")
      );
      let dataTemp = [];
      res.data.map((item) => {
        return dataTemp.push(createData(item.ngayTao, item.soLuongHoaDon));
      });
      dataTemp = dataTemp.sort((a, b) => moment(a.time) - moment(b.time));

      setChartData(dataTemp);
      console.log("Hóa đơn", res.data);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Title>Đơn hàng tuần này</Title>
      <ResponsiveContainer>
        <LineChart
          data={ChartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Số đơn
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
