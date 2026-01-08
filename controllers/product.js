const productModel = require("../models/Product");
const createProduct = async (req, res) => {
  try {
    const setProduct = new productModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      supplier: req.body.supplier,
      stock: req.body.stock || 0,
    });
    await setProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: setProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create product",
      data: error.messsage,
    });
  }
};

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
      data: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
};
