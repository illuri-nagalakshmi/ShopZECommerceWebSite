const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  searchProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/:id", getProductById);

// Admin Protected Routes
router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;