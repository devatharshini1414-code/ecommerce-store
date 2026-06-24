import {
  createContext,
  useState,
  useEffect
} from "react";

import { getCart } from "../api/cart";

export const CartContext =
  createContext();

export function CartProvider({
  children
}) {
  const [cart, setCart] =
    useState([]);

  const fetchCart = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setCart([]);
      return;
    }

    try {
      const { data } =
        await getCart();

      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  const loadCart = async () => {
    await fetchCart();
  };

  loadCart();
}, []);

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}