const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id: { type: String, unique: true, require: true },
  projectName: { type: String, required: true },
  description: { type: String, default: "This is a default description" },
  createdTime: { type: Date, default: new Date() },
  updatedDate: { type: Date, default: new Date() },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  bugs: [{ type: Schema.Types.ObjectId, ref: "Bug", unique: true }]
});

module.exports = mongoose.model("Project", schema);
