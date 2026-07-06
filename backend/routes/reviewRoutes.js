const express = require("express");

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

const router = express.Router();

// Add Review
router.post("/", addReview);

// Get Reviews for a Product
router.get("/:productId", getReviews);

module.exports = router;