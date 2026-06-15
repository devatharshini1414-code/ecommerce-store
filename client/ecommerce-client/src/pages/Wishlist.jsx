import {
  useContext
} from "react";

import {
  WishlistContext
} from "../context/WishlistContext";

function Wishlist() {

  const {
    wishlist,
    removeFromWishlist
  } = useContext(
    WishlistContext
  );

  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h1>
        ❤️ Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p>
          No Wishlist Items
        </p>
      ) : (
        wishlist.map(
          (item) => (
            <div
              key={item._id}
              style={{
                border:
                  "1px solid #ddd",
                padding: "10px",
                margin:
                  "10px 0"
              }}
            >
              <h3>
                {item.name}
              </h3>

              <p>
                ₹{item.price}
              </p>

              <button
                onClick={() =>
                  removeFromWishlist(
                    item._id
                  )
                }
              >
                Remove
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Wishlist;