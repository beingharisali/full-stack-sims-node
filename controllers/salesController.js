const Sales = require("../models/Sales");

// Create Sales
exports.createSales = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No items provided" });
    }

    const sales = await Sales.create({ items, totalAmount });

    res.status(201).json({
      success: true,
      message: "Sales record created successfully",
      data: sales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
