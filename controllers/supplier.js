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

module.exports = {
  createSupplier,
  getSupplier,
};
