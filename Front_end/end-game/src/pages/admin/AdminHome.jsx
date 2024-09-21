import { Container, Grid, Paper, Toolbar } from "@mui/material";
import Chart from "./Components/Chart";
import Deposits from "./Components/Deposits";
import Orders from "./Components/Orders";
import { Copyright } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Adminhome = () => {
  const [newOders, setNewOders] = useState([]);
  useEffect(() => {
    getOders();
  }, []);

  const getOders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/allOffBill");
      setNewOders(response.data.slice(0, 5));
      console.log("Top hóa đơn gần nhất", response.data);
    } catch (error) {
      console.error(error);
      toast.error("TOp hóa đơn gần nhất không tải được");
    }
  };
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
                boxShadow: "-5px 0 0 0 #3366CC;",
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
                boxShadow: "-5px 0 0 0 #0099FF;",
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-5px 0 0 0 #63bcef;",
              }}
            >
              <Orders newOders={newOders} />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </>
  );
};
export default Adminhome;
