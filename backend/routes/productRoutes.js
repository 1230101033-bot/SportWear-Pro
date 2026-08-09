import { Router } from "express";
import Product from "../models/Product.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { upload } from "../config/cloudinary.js"; // 1. Cloudinary upload import

const router = Router();

// GET /api/products?category=<id>
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST - Naya Product add karne ke liye (Cloudinary image upload ke sath)
router.post("/", requireAuth, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const productData = { ...req.body };

    // Agar image file form se aayi hai toh Cloudinary URL assign ho jaye ga
    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Product update karne ke liye (Agar nayi image upload karein toh)
router.put("/:id", requireAuth, requireAdmin, upload.single("image"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Agar nayi image upload ki gayi hai toh naya Cloudinary URL save hoga
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;