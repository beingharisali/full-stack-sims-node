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
      required: [true, "Please provide a category"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
    },

    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock quantity cannot be negative"],
    },

    isInStock: {
      type: Boolean,
      default: true,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: [0, "Low stock threshold cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function () {
  this.isInStock = this.stock > 0;
});

module.exports = mongoose.model("Product", productSchema);
