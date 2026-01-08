const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
      minlength: [2, "Product name must be at least 2 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 150,
      minlength: 3,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    supplier: {
      type: String,
      required: [true, "Please provide supplier name"],
      maxlength: 50,
      minlength: 3,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be in negative numbers"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
