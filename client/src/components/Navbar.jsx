import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";
import {
  WishlistContext
} from "../context/WishlistContext";
function Navbar({ search = "", setSearch = () => {} }) {
const {
  cartCount
} = useContext(CartContext);
  const token = localStorage.getItem("token");

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    toast.success("Logged Out Successfully");

    window.location.href = "/";
  };
const {
  wishlist
} = useContext(
  WishlistContext
);
  return (
    <nav className="navbar">
      <h2 className="logo">
        TechStore
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-input"
      />

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>
{token && (
  <>
    <Link to="/orders">Orders</Link>

    {userInfo.role === "admin" && (
      <>
        <Link to="/admin">Admin</Link>
        <Link to="/analytics">Analytics</Link>
      </>
    )}
  </>
)}
        <Link to="/cart">
          <FaShoppingCart />
          {" "}
         ({cartCount})
        </Link>
<Link to="/wishlist">
  ❤️ ({wishlist.length})
</Link>

        {token ? (
          <>
            <span>
              {userInfo.email}
            </span>

            <button
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;