import {
  useContext
} from "react";

import {
  WishlistContext
} from "../context/WishlistContext";

import "../styles/Wishlist.css";
import { CartContext } from "../context/CartContext";
function Wishlist() {

  const {
  wishlist,
  removeFromWishlist
} = useContext(WishlistContext);

const { addToCart } = useContext(CartContext);
  return (
  <div className="wishlist-container">
    <h1>❤️ Wishlist</h1>

    {wishlist.length === 0 ? (
      <p>No items in wishlist</p>
    ) : (
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div className="wishlist-card" key={item._id}>
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

           <button
  className="wishlist-cart-btn"
  onClick={() => addToCart(item)}
>
  Add to Cart
</button>
          <button
  className="wishlist-remove-btn"
  onClick={() => removeFromWishlist(item._id)}
>
  Remove
</button>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default Wishlist;