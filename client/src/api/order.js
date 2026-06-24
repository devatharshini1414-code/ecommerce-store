import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/orders`;

export const getOrders = () => {

  const token =
    localStorage.getItem("token");

  return axios.get(
    API_URL,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
};
export const placeOrder = () => {
  const token = localStorage.getItem("token");

  return axios.post(
    API_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};