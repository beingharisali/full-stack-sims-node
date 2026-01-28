const Product = require("../models/Product");

const deductStock = async (productId, quantity) => {
  if (!productId || quantity <= 0) {
    throw new Error("Invalid product or quantity");
  }
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId, stock: { $gte: quantity } },
    { $inc: { stock: -quantity } },
    { new: true },
  );

  if (!updatedProduct) {
    throw new Error("Product not found or insufficient stock");
  }

  return updatedProduct;
};

module.exports = { deductStock };
