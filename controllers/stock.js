const { deductStock } = require("../services/stockServices");
const Sale = require("../models/saler");

const deductStockController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await deductStock(productId, quantity);

    res.status(200).json({
      message: "Stock deducted successfully",
      remainingStock: product.stock,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createSaleController = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "Sale items are required",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const { productId, quantity, price } = item;

      if (!productId || quantity <= 0 || price <= 0) {
        throw new Error("Invalid sale item data");
      }

      await deductStock(productId, quantity);
      totalAmount += quantity * price;
    }

    const sale = await Sale.create({
      items,
      totalAmount,
    });

    res.status(201).json({
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  deductStockController,
  createSaleController,
};
