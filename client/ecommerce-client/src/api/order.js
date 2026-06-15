import axios from "axios";

const API_URL =
  "http://localhost:5000/api/orders";

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