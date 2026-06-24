import { useEffect, useState, useContext } from "react";
import { ClipLoader } from "react-spinners";
import "../styles/Cart.css";
import {
  getCart,
  removeCartItem,
  updateQuantity
} from "../api/cart";
import { CartContext } from "../context/CartContext";

function Cart() {
  const [loading, setLoading] = useState(true);

  const {
    cart,
    setCart,
    fetchCart
  } = useContext(CartContext);

  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);

      setCart((prevCart) =>
        prevCart.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (
    id,
    currentQty,
    action
  ) => {
    const newQty =
      action === "increase"
        ? currentQty + 1
        : currentQty - 1;

    if (newQty < 1) return;

    try {
      await updateQuantity(id, newQty);

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const load = async () => {
      await fetchCart();
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="loader-box">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>🛒 Cart Empty</h1>
        <p>Start Shopping</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">
        My Cart ({cart.length})
      </h1>

      <div className="cart-layout">
        <div className="cart-left">
          {cart.map((item) => (
            <div
              key={item._id}
              className="cart-card"
            >
              <img
                className="cart-image"
                src={item.product.image}
                alt={item.product.name}
              />

              <div className="cart-details">
                <h3 className="cart-product-name">
                  {item.product.name}
                </h3>

                <p className="cart-price">
                  ₹{item.product.price}
                </p>

                <div className="quantity-box">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantity(
                        item._id,
                        item.quantity,
                        "decrease"
                      )
                    }
                  >
                    -
                  </button>

                  <span className="qty-number">
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantity(
                        item._id,
                        item.quantity,
                        "increase"
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    handleRemove(item._id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-right">
          <div className="cart-summary">
            <div className="summary-title">
              PRICE DETAILS
            </div>

            <div className="cart-total">
              ₹{total}
            </div>

            <button className="checkout-btn">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;