import {
  useEffect,
  useState
} from "react";

import {
  getAnalytics
} from "../api/analytics";

import { ClipLoader }
from "react-spinners";
import "../styles/Analytics.css";
function Analytics() {

  const [data,
    setData] =
    useState(null);

  useEffect(() => {

    const fetchData =
      async () => {

      try {

        const res =
          await getAnalytics();

        setData(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

    fetchData();

  }, []);

  if (!data) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <ClipLoader size={50} />
    </div>
  );
}

  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h1>
        Analytics Dashboard
      </h1>

     <div className="analytics-grid">

  <div className="analytics-card">
    <h2>👥 Users</h2>
    <h1>{data.totalUsers}</h1>
  </div>

  <div className="analytics-card">
    <h2>📦 Products</h2>
    <h1>{data.totalProducts}</h1>
  </div>

  <div className="analytics-card">
    <h2>🛒 Orders</h2>
    <h1>{data.totalOrders}</h1>
  </div>

  <div className="analytics-card">
    <h2>💰 Revenue</h2>
    <h1>₹{data.totalRevenue}</h1>
  </div>

</div>
    </div>
  );
}

export default Analytics;