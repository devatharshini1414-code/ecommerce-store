const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (
  req,
  res
) => {

  try {

    const cartItems =
      await Cart.find({
        user: req.user.id
      }).populate("product");

    if (
      cartItems.length === 0
    ) {
      return res.status(400).json({
        message: "Cart Empty"
      });
    }

    const totalAmount =
      cartItems.reduce(
        (acc, item) =>
          acc +
          (
            item.product.price *
            item.quantity
          ),
        0
      );

    const products =
      cartItems.map(
        (item) => ({
          product:
            item.product._id,
          quantity:
            item.quantity
        })
      );

    const order =
      await Order.create({
        user: req.user.id,
        products,
        totalAmount
      });

    await Cart.deleteMany({
      user: req.user.id
    });

    res.status(201).json(
      order
    );

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};
const getMyOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find({
        user: req.user.id
      })
      .populate(
        "products.product"
      );

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }
};
const getAllOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find()
      .populate("user")
      .populate("products.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const updateOrderStatus = async (
  req,
  res
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status =
      req.body.status;

    await order.save();

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports = {
  placeOrder,
   getMyOrders,
   getAllOrders,
  updateOrderStatus
};