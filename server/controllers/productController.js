const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      image,
      price,
      stock,
      rating
    } = req.body;

    const product = await Product.create({
      name,
      description,
      category,
      image,
      price,
      stock,
      rating
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const deleteProduct = async (
  req,
  res
) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Product Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product Not Found",
      });
    }

    product.name =
      req.body.name ||
      product.name;

    product.price =
      req.body.price ||
      product.price;

    product.category =
      req.body.category ||
      product.category;

    product.image =
      req.body.image ||
      product.image;

    product.stock =
      req.body.stock ||
      product.stock;

    product.description =
      req.body.description ||
      product.description;

    const updated =
      await product.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};
module.exports = {
  getProducts,
  createProduct,
  getProductById,
   updateProduct,
  deleteProduct
};