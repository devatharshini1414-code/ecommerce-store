import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  getCart,
  removeCartItem,
  updateQuantity
} from "../api/cart";

function Cart() {

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = async (id) => {
    try {

      await removeCartItem(id);

      setCart(
        cart.filter(
          (item) => item._id !== id
        )
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

    let newQty =
      action === "increase"
        ? currentQty + 1
        : currentQty - 1;

    if (newQty < 1) return;

    try {

      await updateQuantity(
        id,
        newQty
      );

      setCart(
        cart.map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: newQty
              }
            : item
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  const total = cart.reduce(
    (acc, item) =>
      acc +
      item.product.price *
      item.quantity,
    0
  );

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const { data } =
          await getCart();

        setCart(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchCart();

  }, []);

 if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px"
      }}
    >
      <ClipLoader size={50} />
    </div>
  );
}
if (cart.length === 0) {
  return (
    <div
      style={{
        textAlign:"center",
        marginTop:"100px"
      }}
    >
      <h1>🛒 Cart Empty</h1>

      <p>
        Start Shopping
      </p>
    </div>
  );
}
  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is Empty</h2>
      ) : (
        <>
          {cart.map((item) => (

            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px"
              }}
            >
              <h3>
                {item.product.name}
              </h3>

              <p>
                ₹{item.product.price}
              </p>

              <div>
                <button
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

                <span
                  style={{
                    margin: "0 10px"
                  }}
                >
                  {item.quantity}
                </span>

                <button
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
                onClick={() =>
                  handleRemove(item._id)
                }
                style={{
                  marginTop: "10px"
                }}
              >
                Remove
              </button>
            </div>

          ))}

          <hr />

          <h2>
            Total: ₹{total}
          </h2>
        </>
      )}
    </div>
  );
}

export default Cart;