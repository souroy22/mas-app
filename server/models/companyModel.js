const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: { type: String, unique: true, require: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    createdTime: { type: String, default: new Date() },
    updatedDate: { type: String, default: new Date() },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", schema);
