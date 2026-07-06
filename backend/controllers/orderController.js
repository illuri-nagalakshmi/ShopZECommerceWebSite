
const Order = require("../models/Order");

// ===============================
// Create Order
// ===============================
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      customerName,
      address,
      phone,
      products,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      userId,
      customerName,
      address,
      phone,
      products,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Orders
// ===============================
// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({
//       createdAt: -1,
//     });

//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

const getOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      // Admin can see all orders
      orders = await Order.find().sort({
        createdAt: -1,
      });
    } else {
      // User can see only their own orders
      orders = await Order.find({
        userId: req.user.id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Update Order Status
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order Status Updated Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ===============================
// Cancel Order
// ===============================
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Only Pending Orders can be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order Cancelled Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  cancelOrder,
};
