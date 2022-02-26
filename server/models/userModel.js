const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, require: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: new Date() },
    updatedDate: { type: Date, default: new Date() },
    role: { type: String, default: "USER", enum: ["ADMIN", "COMPANY", "USER"] },
    status: { type: String, default: "active" },
    licenseInfo: { type: String, default: "unpaid" },
    allowedApps: { type: Array, default: [] },
    credits: { type: Number, default: 0 },
    accountType: { type: String, default: "secondary" },
    phone: { type: String },
    daysRemaining: { type: Date, default: null },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
