const Product = require("../models/Product");
const Sale = require("../models/saler");

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
const createSale = async (items) => {
  if (!items || items.length === 0) {
    throw new Error("Sale items are required");
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

  return sale;
};

module.exports = {
  deductStock,
  createSale,
};
