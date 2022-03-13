const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    id: { type: String, unique: true, require: true },
    subject: { type: String, required: true },
    testSteps: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    classification: { type: String, required: true },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: Array },
    status: { type: String },
    severity: { type: String },
    plainDescription: { type: String },
    dueDate: { type: Date, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bug", bugSchema);
