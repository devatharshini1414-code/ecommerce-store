import { useEffect, useState } from "react";
import { getOrders } from "../api/order";
import { ClipLoader } from "react-spinners";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
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

  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <h1>📦 No Orders Yet</h1>
        <p>Place your first order.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "15px 0",
            borderRadius: "10px",
          }}
        >
          <h3>Order ID</h3>
          <p>{order._id}</p>

          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;