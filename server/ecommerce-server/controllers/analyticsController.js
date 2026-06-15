const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getAnalytics = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders =
      await Order.find();

    const totalRevenue =
      orders.reduce(
        (acc, item) =>
          acc + item.totalAmount,
        0
      );

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getAnalytics
};