const express =
  require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/orderController");

// User Routes
router.post(
  "/",
  protect,
  placeOrder
);

router.get(
  "/",
  protect,
  getMyOrders
);

// Admin Routes
router.get(
  "/all",
  protect,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

module.exports =
  router;