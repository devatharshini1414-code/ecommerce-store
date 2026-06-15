import { createContext, useState } from "react";

export const WishlistContext =
  createContext();

export function WishlistProvider({
  children,
}) {
  const [wishlist, setWishlist] =
    useState(
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || []
    );

  const addToWishlist = (
    product
  ) => {
    const exists =
      wishlist.find(
        (item) =>
          item._id === product._id
      );

    if (exists) return;

    const updated = [
      ...wishlist,
      product,
    ];

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  const removeFromWishlist = (
    id
  ) => {
    const updated =
      wishlist.filter(
        (item) =>
          item._id !== id
      );

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}