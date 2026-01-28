const { deductStock } = require("../services/stockServices");

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

module.exports = {
  deductStockController,
};
