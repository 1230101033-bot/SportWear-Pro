import { Router } from "express";
import Order from "../models/Order.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

function generateTrackingId() {
  return (
    "T" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 8).toUpperCase()
  );
}

// Create an order (used after customer confirms a payment method)
router.post("/", async (req, res) => {
  try {
    const { userId = null, metadata = {} } = req.body;
    const trackingId = generateTrackingId();
    const order = await Order.create({ trackingId, user: userId, metadata });
    res.status(201).json({ trackingId: order.trackingId, order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public tracking lookup
router.get("/track/:trackingId", async (req, res) => {
  const order = await Order.findOne({ trackingId: req.params.trackingId });
  if (!order) return res.status(404).json({ message: "No order found for this Tracking ID" });
  res.json(order);
});

// Admin: list all orders
router.get("/", requireAuth, requireAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Admin: update order status
router.put("/:trackingId/status", requireAuth, requireAdmin, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOneAndUpdate(
    { trackingId: req.params.trackingId },
    { status },
    { new: true }
  );
  res.json(order);
});

export default router;
