import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    whatsappNumber: { type: String, default: "" },
    companyName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
