import { placeOrder } from "../api/order";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      await placeOrder();
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Checkout</h1>
      <p>Confirm your order</p>

      <button onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;