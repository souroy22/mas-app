const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    id: { type: String, unique: true, require: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    createdTime: { type: Date, default: new Date() },
    updatedDate: { type: Date, default: new Date() },
    createdBy: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", schema);
