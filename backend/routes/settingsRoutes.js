import { Router } from "express";
import SiteSettings from "../models/SiteSettings.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const settings = await SiteSettings.findOne().sort({ createdAt: -1 });
  res.json(settings || {});
});

router.put("/", requireAuth, requireAdmin, async (req, res) => {
  let settings = await SiteSettings.findOne().sort({ createdAt: -1 });
  if (settings) {
    Object.assign(settings, req.body);
    await settings.save();
  } else {
    settings = await SiteSettings.create(req.body);
  }
  res.json(settings);
});

export default router;
