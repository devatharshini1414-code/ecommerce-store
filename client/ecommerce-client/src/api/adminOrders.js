import axios from "axios";

const API_URL =
  "http://localhost:5000/api/orders";

export const getAllOrders = () => {
  return axios.get(
    `${API_URL}/admin/all`
  );
};

export const updateOrderStatus = (
  id,
  status
) => {
  return axios.put(
    `${API_URL}/admin/${id}`,
    { status }
  );
};