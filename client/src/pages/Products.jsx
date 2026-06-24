import { useEffect, useState } from "react";
import { getProducts } from "../api/product";
import { ClipLoader } from "react-spinners";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ClipLoader size={50} />;
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />

          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h2>₹{product.price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;