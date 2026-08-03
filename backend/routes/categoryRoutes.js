import { Router } from "express";
import Category from "../models/Category.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ order: 1 }).limit(50);
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
