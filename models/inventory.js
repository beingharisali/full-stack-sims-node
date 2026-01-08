const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        productName: {
            type: String,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        },
        price: {
            type: Number,
        },
        supplier: {
            type: String,
        },
        quantity: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Inventory", inventorySchema);
