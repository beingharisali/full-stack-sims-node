const Product = require("../models/Product");
const Sale = require("../models/saler");
const Invoice = require("../models/invoice");
const Customer = require("../models/customer");
const Supplier = require("../models/supplier");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalStockAgg = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);
    const totalStock = totalStockAgg[0]?.total || 0;

    const totalSalesAgg = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    const totalInvoices = await Invoice.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalProducts,
      totalStock,
      totalSales,
      totalInvoices,
      totalCustomers,
      totalSuppliers,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
