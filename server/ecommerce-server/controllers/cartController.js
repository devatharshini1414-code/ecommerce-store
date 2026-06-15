const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {

    const { productId } = req.body;

    const existingItem =
      await Cart.findOne({
        user: req.user.id,
        product: productId
      });

    if (existingItem) {

      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem =
      await Cart.create({
        user: req.user.id,
        product: productId,
        quantity: 1
      });

    res.status(201).json(cartItem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const getCart = async (
  req,
  res
) => {

  const cart =
    await Cart.find({
      user: req.user.id
    })
    .populate("product");

  res.json(cart);
};
const removeCartItem = async (
  req,
  res
) => {

  try {

    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Item Removed"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
const updateQuantity = async (
  req,
  res
) => {
  try {

    const item = await Cart.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    item.quantity = req.body.quantity;

    await item.save();

    res.json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  updateQuantity
};