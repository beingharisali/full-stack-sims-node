const mongoose = require("mongoose");

const salerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: 50,
    minlength: 3,
    trim: true,
  },
  contactNumber: {
    type: String,
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
      "televison",
      "camera",
      "smartwatch",
      "accessories",
      "home-appliances",
    ],
  },
  status: {
    type: String,
    required: [true, "Please provide description"],
    maxlength: 10,
    minlength: 3,
    trim: true,
  },
  orderitems: {
    type: Number,
    required: [true, "Please provide order items count"],
    min: 0,
  },
});

module.exports = mongoose.model("Saler", salerSchema);
