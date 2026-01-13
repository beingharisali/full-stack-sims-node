const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: [2, "Customer name must be at least 2 characters"],
    trim: true,
    index: true,
  },
  city: {
    type: String,
    maxlength: 50,
    minlength: [2, "Customer name must be at least 2 characters"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    minlength: 11,
    maxlength: 15,
  },
  status: {
    type: String,
    maxlength: 20,
    minlength: 3,
    trim: true,
  },
  category: {
    type: String,
    enum: ["wholesale", "individual"],
  },
  trim: true,
  required: [true, "Please provide a category"],
});

module.exports = mongoose.model("Customer", customerSchema);
