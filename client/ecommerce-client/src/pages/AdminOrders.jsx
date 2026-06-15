import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import {
  getAllOrders,
  updateOrderStatus,
} from "../api/adminOrders";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const { data } =
        await getAllOrders();

      setOrders(data);
    } catch (error) {
      toast.error(
        "Failed To Load Orders"
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);
  const handleStatus = async (
    id,
    status
  ) => {
    try {
      await updateOrderStatus(
        id,
        status
      );

      toast.success(
        "Order Updated"
      );

      setOrders(
        orders.map((order) =>
          order._id === id
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      toast.error(
        "Failed To Update Order"
      );

      console.error(error);
    }
  };

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
        <h1>📦 No Orders Found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order Management</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border:
              "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>
              Order ID:
            </strong>{" "}
            {order._id}
          </p>

          <p>
            <strong>
              Total:
            </strong>{" "}
            ₹{order.totalAmount}
          </p>

          <p>
            <strong>
              Status:
            </strong>{" "}
            {order.status}
          </p>

          <select
            value={order.status}
            onChange={(e) =>
              handleStatus(
                order._id,
                e.target.value
              )
            }
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Delivered">
              Delivered
            </option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;