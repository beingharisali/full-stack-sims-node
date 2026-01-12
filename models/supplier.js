const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierGroup: {
    type: String,
    required: [true, "Please provide supplier name"],
    maxlength: 100,
    minlength: [2, "Product name must be at least 2 characters"],
    trim: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 150,
    minlength: 3,
    trim: true,
  },
  contactNumber: {
    type: Number,
    required: [true, "Contact number is required"],
    minlength: 11,
    maxlength: 15,
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Please provide a category"],
    enum: [
      "mobile",
      "laptop",
      "headphones",
      "tablet",
      "television",
      "camera",
      "headphones",
      "smartwatch",
      "accessories",
      "home-appliances",
    ],
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Please provide description"],
    maxlength: 150,
    minlength: 3,
    trim: true,
  },
});
module.exports = mongoose.model("Supplier", supplierSchema);
