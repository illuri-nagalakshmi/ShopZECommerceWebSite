
const Review = require("../models/Review");
const Order = require("../models/Order");

// ===========================
// Add Review
// ===========================
const addReview = async (req, res) => {
  try {
    const {
      product,
      userId,
      userName,
      rating,
      comment,
    } = req.body;

    // Check whether the user purchased this product
    const purchased = await Order.findOne({
      userId,
      "products.productId": product,
      status: "Delivered",
    });

    if (!purchased) {
      return res.status(400).json({
        message:
          "You can review only products you have purchased and received.",
      });
    }

    // Prevent duplicate reviews
    const alreadyReviewed = await Review.findOne({
      product,
      userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product.",
      });
    }

    const review = await Review.create({
      product,
      userId,
      userName,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review Added Successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===========================
// Get Reviews
// ===========================
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
};

