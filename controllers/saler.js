const salerModel = require("../models/saler");
const createsaler = async (req, res) => {
  try {
    const createsaler = new supplierModel({
      salerGroup: req.body.supplierGroup,
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      category: req.body.category,
      status: req.body.status,
    });
    await createsaler.save();

    res.status(201).json({
      success: true,
      message: "Saler has been created successfully",
      data: createsaler,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create saler",
      data: error.message,
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

    if (salers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saler found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Saler fetched successfully",
      data: salers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch saler",
      data: error.message,
    });
  }
};

module.exports = {
  createsaler,
  getsaler,
};
