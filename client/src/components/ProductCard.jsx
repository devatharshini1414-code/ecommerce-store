import { Link } from "react-router-dom";

function ProductCard({
  id,
  name,
  price,
  rating = 4.5,
  category,
  image,
  stock
}) {
  return (
    <div className="product-card">

    <div style={{ position: "relative" }}>
  <img
    src={image}
    alt={name}
  />

  <span
    style={{
      position: "absolute",
      top: "10px",
      right: "10px",
      background:
        stock > 0 ? "green" : "red",
      color: "white",
      padding: "5px 10px",
      borderRadius: "8px",
      fontSize: "12px",
    }}
  >
    {stock > 0 ? "In Stock" : "Out of Stock"}
  </span>
</div>

      <h3>{name}</h3>

      <p>⭐ {rating || 4.5}</p>

<p>{category}</p>

      <h4>
        ₹{price.toLocaleString()}
      </h4>

      <Link
        to={`/product/${id}`}
      >
       <button disabled={stock === 0}>
  {stock === 0
    ? "Unavailable"
    : "View Details"}
</button>
      </Link>

    </div>
  );
}

export default ProductCard;