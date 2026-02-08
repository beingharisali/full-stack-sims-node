const salesService = require("../services/salesService");

const getSales = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    res.status(200).json({
      success: true,
      message: "Sales fetched successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch sales",
      error: error.message,
    });
  }
};

const createSale = async (req, res) => {
  try {
    const { productName, quantity, total } = req.body;
    if (!productName || quantity == null || total == null) {
      return res.status(400).json({
        success: false,
        message: "Product name, quantity, and total are required",
      });
    }
    const sale = await salesService.createOne({
      productName,
      quantity: Number(quantity),
      total: Number(total),
    });
    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create sale",
      error: error.message,
    });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSale = await salesService.updateById(id, {
      productName: req.body.productName,
      quantity: req.body.quantity,
      total: req.body.total,
    });
    res.status(200).json({
      success: true,
      message: "Sale updated successfully",
      data: updatedSale,
    });
  } catch (error) {
    if (error.message === "Sale not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to update sale",
      error: error.message,
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesService.deleteById(id);
    res.status(200).json({
      success: true,
      message: "Sale deleted successfully",
      data: deletedSale,
    });
  } catch (error) {
    if (error.message === "Sale not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to delete sale",
      error: error.message,
    });
  }
};

module.exports = {
  getSales,
  createSale,
  updateSale,
  deleteSale,
};
