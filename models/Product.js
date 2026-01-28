const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
      minlength: [2, "Product name must be at least 2 characters"],
      trim: true,
      index: true,
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
      enum: [
        "mobile",
        "laptop",
        "headphones",
        "tablet",
        "televison",
        "camera",
        "headphones",
        "smartwatch",
        "accessories",
        "home-appliances",
      ],
      required: [true, "Please provide a category"],
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
      min: [0, "Stock quantity cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Product", productSchema);
