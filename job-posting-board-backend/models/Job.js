const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experience: { type: String, required: true },
  emails: { type: [String], required: true },
  endDate: { type: Date, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
});

module.exports = mongoose.model("Job", JobSchema);
