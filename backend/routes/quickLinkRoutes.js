import { Router } from "express";
import QuickLink from "../models/QuickLink.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const links = await QuickLink.find({ isActive: true }).sort({ order: 1 }).limit(100);
  res.json(links);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const link = await QuickLink.create(req.body);
  res.status(201).json(link);
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const link = await QuickLink.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(link);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await QuickLink.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
