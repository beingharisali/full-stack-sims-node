const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
      unique: true,
      trim: true,
      minlength: [3, "Invoice number must be at least 3 characters"],
    },

    client: {
      name: {
        type: String,
        required: [true, "Client name is required"],
        trim: true,
        minlength: [2, "Client name must be at least 2 characters"],
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
        minlength: [7, "Phone number is too short"],
      },
      address: {
        type: String,
        trim: true,
      },
    },

    items: {
      type: [
        {
          description: {
            type: String,
            required: [true, "Item description is required"],
            trim: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
          },
          price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"],
          },
          total: {
            type: Number,
            required: true,
            min: [0, "Total cannot be negative"],
          },
        },
      ],
      validate: [
        (val) => val.length > 0,
        "Invoice must have at least one item",
      ],
    },

    subTotal: {
      type: Number,
      required: true,
      min: [0, "Sub total cannot be negative"],
    },

    tax: {
      type: Number,
      default: 0,
      min: [0, "Tax cannot be negative"],
    },

    grandTotal: {
      type: Number,
      required: true,
      min: [0, "Grand total cannot be negative"],
      validate: {
        validator: function (value) {
          return value >= this.subTotal + this.tax;
        },
        message: "Grand total must be equal to or greater than subTotal + tax",
      },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "paid", "cancelled"],
        message: "Status must be pending, paid, or cancelled",
      },
      default: "pending",
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > this.invoiceDate;
        },
        message: "Due date must be after invoice date",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
