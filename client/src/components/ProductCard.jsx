import { Link } from "react-router-dom";

function ProductCard({
  id,
  name,
  price,
  rating = 4.5,
  category,
  image,
}) {
  return (
    <div className="product-card">

      <img
        src={image}
        alt={name}
      />

      <h3>{name}</h3>

      <p>⭐ {rating || 4.5}</p>

<p>{category}</p>

      <h4>
        ₹{price.toLocaleString()}
      </h4>

      <Link
        to={`/product/${id}`}
      >
        <button>
          View Details
        </button>
      </Link>

    </div>
  );
}

export default ProductCard;