const supplierModel = require("../models/supplier");
const createSupplier = async (req, res) => {
  try {
    const createSupplier = new supplierModel({
      supplierGroup: req.body.supplierGroup,
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      category: req.body.category,
      status: req.body.status,
    });
    await createSupplier.save();

    res.status(201).json({
      success: true,
      message: "Supplier has been created successfully",
      data: createSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create supplier",
      data: error.message,
    });
  }
};
const getSupplier = async (req, res) => {
  try {
    const products = await supplierModel.find({});
    res.status(200).json({
      success: true,
      message: "Suppliers fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch Supplier. Error occured",
      data: error.message,
    });
  }
};
const getSingleSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await supplierModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch supplier",
      error: error.message,
    });
  }
};
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await supplierModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedSupplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier has been updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update supplier",
      error: error.message,
    });
  }
};
const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSupplier = await supplierModel.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier has been deleted successfully",
      data: deletedSupplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete supplier",
      error: error.message,
    });
  }
};

module.exports = {
  createSupplier,
  getSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
};
