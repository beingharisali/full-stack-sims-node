const customerModel = require("../models/customer");
const createCustomer = async (req, res) => {
  try {
    const createCustomer = new customerModel({
      name: req.body.name,
      city: req.body.city,
      contactNumber: req.body.contactNumber,
      status: req.body.status,
      category: req.body.category,
    });
    await createCustomer.save();

    res.status(201).json({
      success: true,
      message: "Customer has been created successfully",
      data: createCustomer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create customer",
      data: error.message,
    });
  }
};

module.exports = {
  createCustomer,
};
