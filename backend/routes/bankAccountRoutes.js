import { Router } from "express";
import BankAccount from "../models/BankAccount.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const accounts = await BankAccount.find({ isActive: true }).sort({ order: 1 }).limit(50);
  res.json(accounts);
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const acc = await BankAccount.create(req.body);
  res.status(201).json(acc);
});

router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const acc = await BankAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(acc);
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await BankAccount.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
