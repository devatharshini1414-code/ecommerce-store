import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "../styles/Admin.css";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../api/admin";
import {
  updateProduct
}
from "../api/admin";
function Admin() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    description: "",
  });
const [editingProduct,
  setEditingProduct] =
  useState(null);
  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const loadProducts = async () => {
    await fetchProducts();
  };

  loadProducts();
}, []);
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
const handleAddProduct = async (e) => {
  e.preventDefault();

  try {

    if (editingProduct) {

      await updateProduct(
        editingProduct._id,
        newProduct
      );

      toast.success(
        "Product Updated"
      );

    } else {

      await createProduct(
        newProduct
      );

      toast.success(
        "Product Added"
      );
    }

    fetchProducts();

    setEditingProduct(null);

    setNewProduct({
      name: "",
      price: "",
      category: "",
      image: "",
      stock: "",
      description: ""
    });

  } catch (error) {

    toast.error(
      "Operation Failed"
    );

    console.error(error);
  }
};
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      toast.success("Product Deleted");

      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
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
const handleEdit = (product) => {

  setEditingProduct(product);

  setNewProduct({
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    stock: product.stock,
    description: product.description,
  });
};
  return (
    <div className="admin-page">
      <h1 className="admin-title">
  Admin Dashboard
</h1>
<Link to="/analytics">
  <button
    style={{
      marginBottom: "20px"
    }}
  >
    View Analytics Dashboard
  </button>
</Link>
<form
  className="admin-form"
  onSubmit={handleAddProduct}
>        <input
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="image"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
  {editingProduct
    ? "Update Product"
    : "Add Product"}
</button>
      </form>

      <hr />

      <h2>Products</h2>

<div className="table-wrapper">
    <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Stock</th>
<th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
            <td>
  <img
    src={product.image}
    alt={product.name}
    width="60"
  />
</td>

<td>{product.name}</td>

<td>{product.category}</td>

<td>₹{product.price}</td>

<td
  style={{
    color:
      product.stock < 5
        ? "red"
        : "green",
    fontWeight: "bold",
  }}
>
  {product.stock}
</td>

<td>

  <button
    onClick={() =>
      handleEdit(product)
    }
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(product._id)
    }
  >
    Delete
  </button>

</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
    </div>
  );
}

export default Admin;