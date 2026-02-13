const invoiceService = require("../services/invoiceService");
const Invoice = require("../models/invoice");

// =============================
// CREATE INVOICE
// =============================
const createInvoice = async (req, res) => {
  try {
    const createdBy = req.user?.userId || req.body.createdBy || null;

    if (!createdBy) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const invoice = await invoiceService.createInvoice(
      req.body,
      null,
      createdBy,
    );

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Create Invoice Error:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Unable to create invoice",
    });
  }
};

// =============================
// GET ALL INVOICES
// =============================
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// =============================
// GET SINGLE INVOICE
// =============================
const getSingleInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "createdBy",
      "firstName lastName",
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// =============================
// UPDATE INVOICE
// =============================
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// DELETE INVOICE
// =============================
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// =============================
// MONTHLY SALES SUMMARY
// =============================
const getMonthlySalesSummary = async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$total_amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate monthly sales summary",
      error: error.message,
    });
  }
};

// =============================
// TOTAL SALES
// =============================
const getTotalSales = async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$total_amount" },
        },
      },
    ]);

    const totalSales = result.length > 0 ? result[0].totalSales : 0;

    res.status(200).json({
      success: true,
      totalSales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate total sales",
      error: error.message,
    });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  getTotalSales,
  getMonthlySalesSummary,
};
