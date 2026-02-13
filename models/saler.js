const mongoose = require("mongoose");

const salerSchema = new mongoose.Schema(
  {
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

    // 🔥 Category now free text
    category: {
      type: String,
      trim: true,
      required: [true, "Please provide a category"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
      required: true,
    },

    orderitems: {
      type: Number,
      required: [true, "Please provide order items count"],
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Saler", salerSchema);
