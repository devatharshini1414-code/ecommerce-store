const Review =
  require("../models/Review");

const Product =
  require("../models/Product");

const createReview =
async (req, res) => {

  try {

    const {
      rating,
      comment,
      productId
    } = req.body;

    const existingReview =
      await Review.findOne({
        user: req.user.id,
        product: productId
      });

    if (existingReview) {
      return res.status(400).json({
        message:
        "Review already submitted"
      });
    }

    const review =
      await Review.create({
        user: req.user.id,
        product: productId,
        rating,
        comment
      });

    const reviews =
      await Review.find({
        product: productId
      });

    const average =
      reviews.reduce(
        (acc, item) =>
          acc + item.rating,
        0
      ) / reviews.length;

    await Product.findByIdAndUpdate(
      productId,
      {
        rating: average,
        numReviews:
          reviews.length
      }
    );

    res.status(201).json(
      review
    );

  } catch (error) {

    res.status(500).json({
      message:
      error.message
    });

  }

};

module.exports = {
  createReview
};