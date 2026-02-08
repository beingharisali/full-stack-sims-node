const Sale = require("../models/sale");

/**
 * Create sale records from invoice line items (one sale per item).
 * Called automatically when an invoice is created.
 * @param {Array} items - Invoice items: [{ description, quantity, unit_price, total_price }]
 * @returns {Promise<Object[]>} Created sale documents
 */
async function createSalesFromInvoiceItems(items) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return [];
  }
  const sales = [];
  for (const item of items) {
    const productName = item.description || "Item";
    const quantity = Number(item.quantity) || 1;
    const total = Number(item.total_price) ?? Number(item.unit_price) * quantity;
    const sale = new Sale({
      productName,
      quantity,
      total,
    });
    await sale.save();
    sales.push(sale);
  }
  return sales;
}

async function getAll() {
  return Sale.find({}).sort({ createdAt: -1 });
}

async function createOne(data) {
  const sale = new Sale({
    productName: data.productName,
    quantity: data.quantity,
    total: data.total,
  });
  await sale.save();
  return sale;
}

async function updateById(id, data) {
  const sale = await Sale.findByIdAndUpdate(
    id,
    {
      productName: data.productName,
      quantity: data.quantity,
      total: data.total,
    },
    { new: true, runValidators: true }
  );
  if (!sale) throw new Error("Sale not found");
  return sale;
}

async function deleteById(id) {
  const sale = await Sale.findByIdAndDelete(id);
  if (!sale) throw new Error("Sale not found");
  return sale;
}

module.exports = {
  createSalesFromInvoiceItems,
  getAll,
  createOne,
  updateById,
  deleteById,
};
