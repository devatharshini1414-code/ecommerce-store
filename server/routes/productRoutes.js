const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

// Public Routes
router.get("/", getProducts);

router.get("/:id", getProductById);

// Admin Routes
router.post(
  "/",
  protect,
  adminMiddleware,
  createProduct
);

router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  adminMiddleware,
  deleteProduct
);

module.exports = router;