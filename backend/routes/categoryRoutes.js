import { Router } from "express";
import Category from "../models/Category.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js"; // 1. Cloudinary upload import kiya

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

// POST - Nayi Category add karne ke liye (Cloudinary image ke sath)
router.post("/", requireAuth, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const categoryData = { ...req.body };

    // Agar image file upload hui hai toh Cloudinary URL save ho jaye ga
    if (req.file) {
      categoryData.image = req.file.path;
      categoryData.imageUrl = req.file.path;
    }

    const category = await Category.create(categoryData);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Category update karne ke liye
router.put("/:id", requireAuth, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Agar nayi image upload ki gayi hai toh naya link save ho ga
    if (req.file) {
      updateData.image = req.file.path;
      updateData.imageUrl = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;