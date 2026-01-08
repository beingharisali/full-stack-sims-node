const productModel = require("../models/Product");

const getProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch products. Error occured",
      data: message.error,
    });
  }
};

module.export = {
  getProduct,
};
