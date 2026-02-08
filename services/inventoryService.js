const Inventory = require("../models/inventory");

/**
 * Create an inventory record from a product document (e.g. after adding a product).
 * @param {Object} product - Product doc with name, description, category, price, supplier, stock
 * @returns {Promise<Object>} Created inventory document
 */
async function addFromProduct(product) {
  if (!product || !product.name) {
    throw new Error("Product is required with at least name");
  }
  const supplierName =
    product.supplier && typeof product.supplier === "object"
      ? product.supplier.name || product.supplier.supplierGroup || ""
      : String(product.supplier || "");
  const inventory = new Inventory({
    productName: product.name,
    description: product.description || product.name,
    category: product.category || "",
    price: product.price ?? 0,
    supplier: supplierName,
    quantity: product.stock ?? 0,
  });
  await inventory.save();
  return inventory;
}

/**
 * Get all inventory items.
 */
async function getAll() {
  return Inventory.find({}).sort({ createdAt: -1 });
}

/**
 * Get single inventory by id.
 */
async function getById(id) {
  const item = await Inventory.findById(id);
  if (!item) throw new Error("Inventory not found");
  return item;
}

/**
 * Update inventory by id.
 */
async function updateById(id, data) {
  const item = await Inventory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new Error("Inventory not found");
  return item;
}

/**
 * Delete inventory by id.
 */
async function deleteById(id) {
  const item = await Inventory.findByIdAndDelete(id);
  if (!item) throw new Error("Inventory not found");
  return item;
}

module.exports = {
  addFromProduct,
  getAll,
  getById,
  updateById,
  deleteById,
};
