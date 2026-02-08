const Product = require("../models/Product");
const inventoryService = require("./inventoryService");

/**
 * Create a product and automatically add it to inventory.
 * @param {Object} data - { name, description, category, price, supplier, stock }
 * @returns {Promise<Object>} Created product document
 */
async function createProduct(data) {
  const product = new Product({
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    supplier: data.supplier || null,
    stock: data.stock ?? 0,
  });
  await product.save();
  await product.populate("supplier");
  await inventoryService.addFromProduct(product);
  return product;
}

async function getAll() {
  return Product.find({}).populate("supplier", "name supplierGroup contactNumber category status");
}

async function getById(id) {
  const product = await Product.findById(id).populate("supplier", "name supplierGroup contactNumber category status");
  if (!product) throw new Error("Product not found");
  return product;
}

async function updateById(id, data) {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("supplier", "name supplierGroup contactNumber category status");
  if (!product) throw new Error("Product not found");
  return product;
}

async function deleteById(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
  return product;
}

module.exports = {
  createProduct,
  getAll,
  getById,
  updateById,
  deleteById,
};
