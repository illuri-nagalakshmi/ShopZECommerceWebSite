const express = require("express");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", protect, getOrders);
// Update Order Status (Admin)
router.put("/:id", updateOrderStatus);

// Cancel Order (User)
router.put("/cancel/:id", cancelOrder);

module.exports = router;