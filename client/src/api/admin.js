import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/products`;
export const getProducts = () => {
  return axios.get(API_URL);
};

export const deleteProduct = (id) => {
  return axios.delete(
    `${API_URL}/${id}`
  );
};

export const createProduct = (product) => {
  return axios.post(
    API_URL,
    product
  );
};

export const updateProduct = (
  id,
  product
) => {
  return axios.put(
    `${API_URL}/${id}`,
    product
  );
};