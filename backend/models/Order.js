import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: {
      type: String,
      enum: ["pending", "processing", "customization", "with_courier", "delivered"],
      default: "pending",
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
