const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const {
  getAnalytics
} = require(
  "../controllers/adminAnalyticsController"
);

const {
  createProduct,
  deleteProduct
} = require(
  "../controllers/productController"
);

// Analytics
router.get(
  "/",
  protect,
  adminMiddleware,
  getAnalytics
);

// Create Product
router.post(
  "/products",
  protect,
  adminMiddleware,
  createProduct
);

// Delete Product
router.delete(
  "/products/:id",
  protect,
  adminMiddleware,
  deleteProduct
);

//update product
router.put(
  "/products/:id",
  protect,
  adminMiddleware,
  updateProduct
);
module.exports =
  router;