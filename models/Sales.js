const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: String, required: true },
      description: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unit_price: { type: Number, required: true, min: 0 },
      total_price: { type: Number, required: true, min: 0 },
    },
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sales", salesSchema);
