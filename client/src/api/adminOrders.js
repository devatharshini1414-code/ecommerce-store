import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/cart`;
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