import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true },
    accountTitle: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    iban: { type: String, default: "" },
    branch: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("BankAccount", bankAccountSchema);
