const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

   rating: {
  type: Number,
  default: 0,
},

numReviews: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Product", productSchema);