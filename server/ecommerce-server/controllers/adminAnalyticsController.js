const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getAnalytics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAnalytics
};