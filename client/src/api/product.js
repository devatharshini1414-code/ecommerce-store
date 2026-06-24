import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/products`;

export const getProducts = () => {
  return axios.get(API_URL);
};

export const getProductById = (id) => {
  return axios.get(
    `${API_URL}/${id}`
  );
};