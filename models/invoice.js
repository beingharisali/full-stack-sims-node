const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoice_number: {
      type: String,
      required: [true, "Please provide invoice number"],
      maxlength: 50,
      trim: true,
      index: true,
      unique: true, // important to prevent duplicates
    },

    customer_name: {
      type: String,
      required: [true, "Please provide customer name"],
      maxlength: 100,
      minlength: 2,
      trim: true,
    },

    customer_email: {
      type: String,
      required: [true, "Please provide customer email"],
      trim: true,
      lowercase: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },

        description: {
          type: String,
          required: true,
          trim: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        unit_price: {
          type: Number,
          required: true,
          min: 0,
        },

        total_price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    tax_amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    discount_amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total_amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue", "cancelled"],
      default: "draft",
    },

    issue_date: {
      type: Date,
      default: Date.now,
    },

    due_date: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdByName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Invoice", invoiceSchema);
