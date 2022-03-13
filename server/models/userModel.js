const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: { type: String, unique: true, require: true },
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: String, default: new Date() },
    updatedDate: { type: String, default: new Date() },
    role: { type: String, default: "USER", enum: ["ADMIN", "USER"] },
    status: { type: String, default: "active" },
    licenseInfo: { type: String, default: "unpaid" },
    allowedApps: { type: Array, default: [] },
    credits: { type: Number, default: 0 },
    accountType: { type: String, default: "secondary" },
    phone: { type: String },
    daysRemaining: { type: Date, default: null },
    email: { type: String, required: true, unique: true },
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    assignedProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    password: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
