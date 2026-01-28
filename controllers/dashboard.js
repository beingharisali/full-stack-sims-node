const Product = require("../models/Product");
const Sale = require("../models/saler");
const Invoice = require("../models/invoice");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalStock = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);

    const totalSales = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const invoices = await Invoice.countDocuments();

    res.status(200).json({
      totalProducts,
      totalStock: totalStock[0]?.total || 0,
      totalSales: totalSales[0]?.total || 0,
      invoices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
