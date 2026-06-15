import axios from "axios";

const API_URL =
  "http://localhost:5000/api/cart";

export const addToCart = (productId) => {
  const token =
    localStorage.getItem("token");

  return axios.post(
    API_URL,
    { productId },
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
};

export const getCart = () => {
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
export const removeCartItem =
(id) => {

  const token =
    localStorage.getItem("token");

  return axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization:
        `Bearer ${token}`
      }
    }
  );
};
export const updateQuantity =
(id, quantity) => {

  const token =
    localStorage.getItem("token");

  return axios.put(
    `${API_URL}/${id}`,
    { quantity },
    {
      headers: {
        Authorization:
        `Bearer ${token}`
      }
    }
  );
};