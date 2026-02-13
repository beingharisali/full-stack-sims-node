const inventoryService = require("../services/inventoryService");

const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryService.getAll();
    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch inventory",
      error: error.message,
    });
  }
};

const createInventory = async (req, res) => {
  try {
    const setInventory = new (require("../models/inventory"))({
      productName: req.body.productName,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      supplier: req.body.supplier,
      quantity: req.body.quantity || 0,
      location: req.body.location,
    });
    await setInventory.save();

    res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      data: setInventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create inventory",
      error: error.message,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventory = await inventoryService.updateById(id, req.body);
    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      data: updatedInventory,
    });
  } catch (error) {
    if (error.message === "Inventory not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to update inventory",
      error: error.message,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventory = await inventoryService.deleteById(id);
    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
      data: deletedInventory,
    });
  } catch (error) {
    if (error.message === "Inventory not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to delete inventory",
      error: error.message,
    });
  }
};

const getSingleInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await inventoryService.getById(id);
    res.status(200).json({
      success: true,
      message: "Single inventory fetched successfully",
      data: inventory,
    });
  } catch (error) {
    if (error.message === "Inventory not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to fetch inventory",
      error: error.message,
    });
  }
};

module.exports = {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getSingleInventory,
};
