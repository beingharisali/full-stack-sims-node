const Invoice = require("../models/invoice");

const createInvoice = async (req, res) => {
  try {
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = new Invoice({
      ...req.body,
      invoice_number: invoiceNumber,
    });

    await invoice.save();

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
    const invoices = await Invoice.find().sort({ createdAt: -1 });
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
    const invoice = await Invoice.findById(req.params.id);

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
const getMonthlySalesSummary = async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      // 1️⃣ Only paid invoices
      { $match: { status: "paid" } },
      // 2️⃣ Group by year + month
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalSales: { $sum: "$total_amount" },
        },
      },
      // 3️⃣ Sort by year & month
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      // 4️⃣ Format the output
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
    const result = await Invoice.aggregate([
      {
        $match: { status: "paid" },
      },
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
