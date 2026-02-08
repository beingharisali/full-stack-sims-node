const invoiceService = require("../services/invoiceService");

const createInvoice = async (req, res) => {
  try {
    const createdBy = req.body.createdBy || (req.user && req.user.userId) || null;
    const invoice = await invoiceService.createInvoice(req.body, null, createdBy);
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

const getAllInvoices = async (req, res) => {
  try {
    const invoices = await invoiceService.getAll();
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

const getSingleInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.getById(req.params.id);
    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    if (error.message === "Invoice not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.updateById(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    });
  } catch (error) {
    if (error.message === "Invoice not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await invoiceService.deleteById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: invoice,
    });
  } catch (error) {
    if (error.message === "Invoice not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getMonthlySalesSummary = async (req, res) => {
  try {
    const Invoice = require("../models/invoice");
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
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          totalSales: 1,
        },
      },
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

const getTotalSales = async (req, res) => {
  try {
    const Invoice = require("../models/invoice");
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
