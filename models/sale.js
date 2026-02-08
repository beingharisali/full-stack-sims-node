const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 100,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 1,
    },
    total: {
      type: Number,
      required: [true, "Total amount is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
