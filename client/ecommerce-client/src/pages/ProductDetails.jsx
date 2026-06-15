import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import {
createReview
}
from "../api/review";
import { getProductById } from "../api/product";
import { addToCart } from "../api/cart";
import { WishlistContext } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
const [rating,
setRating] =
useState(5);

const [comment,
setComment] =
useState("");
  const { addToWishlist } =
    useContext(WishlistContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } =
          await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      for (
        let i = 0;
        i < quantity;
        i++
      ) {
        await addToCart(product._id);
      }

      toast.success(
        "Added To Cart"
      );
    }catch (error) {
  console.error(error);
  toast.error("Please Login First");
}
  };
const handleReview =
async () => {

  try {

    await createReview({

      productId:
      product._id,

      rating,

      comment

    });

    toast.success(
      "Review Added"
    );

  } catch (error) {

    toast.error(
      error.response?.data?.message
    );

  }
};
  const handleWishlist = () => {
    addToWishlist(product);

    toast.success(
      "Added To Wishlist"
    );
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <ClipLoader size={50} />
      </div>
    );
  }

  if (!product) {
    return (
      <h2>
        Product Not Found
      </h2>
    );
  }

  const totalPrice =
    product.price * quantity;

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          width="350"
          style={{
            borderRadius: "10px",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "500px",
        }}
      >
        <h1>{product.name}</h1>

        <h2>
          ₹
          {product.price.toLocaleString()}
        </h2>

        <p>
          <strong>Category:</strong>{" "}
          {product.category}
        </p>

        <p>
          <strong>Rating:</strong>
          ⭐{" "}
          {product.rating || 4.5}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>
          {product.description}
        </p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock > 0
            ? `${product.stock} Available`
            : "Out Of Stock"}
        </p>

        <hr />
<hr />

<h2>
Write Review
</h2>

<select
value={rating}
onChange={(e)=>
setRating(
Number(
e.target.value
)
)}
>

<option value="5">
5 Stars
</option>

<option value="4">
4 Stars
</option>

<option value="3">
3 Stars
</option>

<option value="2">
2 Stars
</option>

<option value="1">
1 Star
</option>

</select>

<br /><br />

<textarea
placeholder="Review"
value={comment}
onChange={(e)=>
setComment(
e.target.value
)}
/>

<br /><br />

<button
onClick={
handleReview
}
>
Submit Review
</button>
        <h3>Quantity</h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() =>
              setQuantity(
                quantity > 1
                  ? quantity - 1
                  : 1
              )
            }
          >
            -
          </button>

          <span>
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(
                quantity + 1
              )
            }
          >
            +
          </button>
        </div>

        <h3>
          Total: ₹
          {totalPrice.toLocaleString()}
        </h3>

        <button
          disabled={
            product.stock === 0
          }
          onClick={
            handleAddToCart
          }
          style={{
            padding: "12px 20px",
            cursor: "pointer",
            marginTop: "15px",
            marginRight: "10px",
          }}
        >
          {product.stock > 0
            ? "Add To Cart"
            : "Out Of Stock"}
        </button>

        <button
          onClick={
            handleWishlist
          }
          style={{
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          ❤️ Add To Wishlist
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;