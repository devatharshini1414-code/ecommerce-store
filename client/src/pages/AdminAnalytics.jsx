import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "../api/analytics";
import SalesChart from "../components/SalesChart";
function AdminAnalytics() {
  const [stats, setStats] =
    useState(null);
const cardStyle = {
  padding: "20px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.1)",
};
  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const { data } =
            await getAnalytics();

          setStats(data);
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, []);

  if (!stats) {
    return (
      <h2>
        Loading Analytics...
      </h2>
    );
  }

  return (
    <div
    style={cardStyle}
    >
      <h1>
        📊 Admin Analytics
      </h1>

      <div
        style={cardStyle}
      >
        <div
        style={cardStyle}
        >
          <h2>
            📦 Products
          </h2>

          <h1>
            {
              stats.totalProducts
            }
          </h1>
        </div>

        <div
         style={cardStyle}
        >
          <h2>
            👥 Users
          </h2>

          <h1>
            {stats.totalUsers}
          </h1>
        </div>
<div
  style={{
    marginTop: "50px",
  }}
>
  <h2>Business Overview</h2>

  <SalesChart stats={stats} />
  <hr
  style={{
    margin: "40px 0"
  }}
/>

<h2>Recent Orders</h2>

{
  stats.recentOrders?.map(
    (order) => (
      <div
        key={order._id}
        style={{
          border:
            "1px solid #ddd",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px"
        }}
      >
        <p>
          <strong>ID:</strong>
          {" "}
          {order._id}
        </p>

        <p>
          <strong>Total:</strong>
          ₹
          {order.totalAmount}
        </p>

        <p>
          <strong>Status:</strong>
          {" "}
          {order.status}
        </p>
      </div>
    )
  )
}
</div>
        <div
          style={cardStyle}
        >
          <h2>
            📑 Orders
          </h2>

          <h1>
            {stats.totalOrders}
          </h1>
        </div>

        <div
        style={cardStyle}
        >
          <h2>
            💰 Revenue
          </h2>

          <h1>
            ₹{stats.totalRevenue.toLocaleString()}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;