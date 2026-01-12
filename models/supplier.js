const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierGroup: String,
  },
  {
    name: String,
  },
  {
    contactNumber: Number,
  },
  {
    category: String,
  },
  {
    status: String,
  }
);
module.exports = mongoose.model("Supplier", supplierSchema);
