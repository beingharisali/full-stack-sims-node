const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierGroup: {
      type: String,
      required: [true, "Please provide supplier group"],
      maxlength: 50,
      minlength: 2,
      trim: true,
      index: true,
    },

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
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "pending", "suspended", "blacklisted"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Supplier", supplierSchema);
