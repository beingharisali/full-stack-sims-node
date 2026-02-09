const mongoose = require("mongoose");

const Invoice = require("../models/invoice");
const Product = require("../models/Product");
const User = require("../models/User");
const salesService = require("./salesService");

/**
 * Get display name for a user id (firstName + lastName).
 * @param {string} userId - User ObjectId
 * @returns {Promise<string|null>}
 */
async function getCreatedByName(userId) {
  if (!userId) return null;
  const user = await User.findById(userId)
    .select("firstName lastName email")
    .lean();
  if (!user) return null;
  const parts = [user.firstName, user.lastName].filter(Boolean);
  return parts.length ? parts.join(" ") : user.email || null;
}

/**
 * Create an invoice with optional createdBy, then auto-generate sales from line items.
 * Sets createdByName from the User so "Created by" always shows the user's name.
 * @param {Object} data - Invoice data (customer_name, customer_email, items, subtotal, total_amount, etc.)
 * @param {string} [invoiceNumber] - Optional; will be generated if not provided
 * @param {string} [createdBy] - User id (ObjectId string) who created the invoice
 * @returns {Promise<Object>} Created invoice document
 */
async function createInvoice(data, invoiceNumber = null, createdBy = null) {
  const number = invoiceNumber || `INV-${Date.now()}`;
  const createdByName = await getCreatedByName(createdBy);

  const items = data.items || [];

  // 1️⃣ STOCK CHECK (pehle)
  for (const item of items) {
    if (!mongoose.Types.ObjectId.isValid(item.product)) {
      throw new Error("Invalid product ID sent");
    }
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
  }

  // 2️⃣ CREATE INVOICE
  const invoice = new Invoice({
    ...data,
    invoice_number: number,
    createdBy: createdBy || undefined,
    createdByName: createdByName || undefined,
  });

  await invoice.save();

  // 3️⃣ DEDUCT STOCK
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  // 4️⃣ CREATE SALES
  if (items.length > 0) {
    await salesService.createSalesFromInvoiceItems(items);
  }

  return invoice;
}

async function getAll() {
  return Invoice.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy", "firstName lastName email");
}

async function getById(id) {
  const invoice = await Invoice.findById(id).populate(
    "createdBy",
    "firstName lastName email",
  );
  if (!invoice) throw new Error("Invoice not found");
  return invoice;
}

async function updateById(id, data) {
  const invoice = await Invoice.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("createdBy", "firstName lastName email");
  if (!invoice) throw new Error("Invoice not found");
  return invoice;
}

async function deleteById(id) {
  const invoice = await Invoice.findByIdAndDelete(id);
  if (!invoice) throw new Error("Invoice not found");
  return invoice;
}

module.exports = {
  createInvoice,
  getAll,
  getById,
  updateById,
  deleteById,
};
