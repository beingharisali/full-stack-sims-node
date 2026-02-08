const Product = require("../models/Product");
const Invoice = require("../models/invoice");
const Customer = require("../models/customer");
const Supplier = require("../models/supplier");
const User = require("../models/User");
const Saler = require("../models/saler");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalStockAgg = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);
    const totalStock = totalStockAgg[0]?.total || 0;

    const totalInvoices = await Invoice.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalSuppliers = await Supplier.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalManagers = await User.countDocuments({ role: "manager" });
    const totalSalers = await Saler.countDocuments();

    res.status(200).json({
      totalProducts,
      totalStock,
      totalInvoices,
      totalCustomers,
      totalSuppliers,
      totalUsers,
      totalManagers,
      totalSalers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
