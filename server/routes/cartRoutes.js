const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  removeCartItem,
  updateQuantity
} = require("../controllers/cartController");

router.post(
  "/",
  protect,
  addToCart
);

router.get(
  "/",
  protect,
  getCart
);

router.delete(
  "/:id",
  protect,
  removeCartItem
);

router.put(
  "/:id",
  protect,
  updateQuantity
);

module.exports = router;