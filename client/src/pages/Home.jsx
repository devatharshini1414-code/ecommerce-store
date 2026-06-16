import { useEffect, useState } from "react";
import { getProducts } from "../api/product";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { ClipLoader } from "react-spinners";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Hero />

      <div className="filter-buttons">
        <button onClick={() => setCategory("All")}>
          All
        </button>

        <button onClick={() => setCategory("Mobiles")}>
          Mobiles
        </button>

        <button onClick={() => setCategory("Laptops")}>
          Laptops
        </button>

        <button
          onClick={() =>
            setCategory("Accessories")
          }
        >
          Accessories
        </button>
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            rating={product.rating}
             category={product.category}
            image={product.image}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;