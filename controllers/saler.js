const salerModel = require("../models/saler");

const createSaler = async (req, res) => {
  try {
    const { supplierGroup, name, contactNumber, category, status } = req.body;

    if (!name || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Name and contact number are required",
      });
    }

    const saler = new salerModel({
      salerGroup: supplierGroup,
      name,
      contactNumber,
      category,
      status,
    });

    await saler.save();

    res.status(201).json({
      success: true,
      message: "Saler has been created successfully",
      data: saler,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create saler",
      error: error.message,
    });
  }
};

const getSaler = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const salers = await salerModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Salers fetched successfully",
      count: salers.length,
      data: salers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch salers",
      error: error.message,
    });
  }
};

const getSingleSaler = async (req, res) => {
  try {
    const { id } = req.params;

    const saler = await salerModel.findById(id);

    if (!saler) {
      return res.status(404).json({
        success: false,
        message: "Saler not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single saler fetched successfully",
      data: saler,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch saler",
      error: error.message,
    });
  }
};

const updateSaler = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSaler = await salerModel.findByIdAndUpdate(
      id,
      {
        salerGroup: req.body.supplierGroup,
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        category: req.body.category,
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSaler) {
      return res.status(404).json({
        success: false,
        message: "Saler not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saler updated successfully",
      data: updatedSaler,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update saler",
      error: error.message,
    });
  }
};

const deleteSaler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSaler = await salerModel.findByIdAndDelete(id);

    if (!deletedSaler) {
      return res.status(404).json({
        success: false,
        message: "Saler not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Saler deleted successfully",
      data: deletedSaler,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete saler",
      error: error.message,
    });
  }
};

module.exports = {
  createSaler,
  getSaler,
  getSingleSaler,
  updateSaler,
  deleteSaler,
};
