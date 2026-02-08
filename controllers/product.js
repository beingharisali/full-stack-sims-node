const productService = require("../services/productService");

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await productService.getAll();
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.updateById(id, req.body);
    res.status(200).json({
      success: true,
      message: "Product has been updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteById(id);
    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to delete product",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: "Unable to fetch product",
      error: error.message,
    });
  }
};

const Product = require("../models/Product");
const getStockAnalytics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalStockAgg = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: "$stock" } } },
    ]);
    const totalStock =
      totalStockAgg.length > 0 ? totalStockAgg[0].totalStock : 0;
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } })
      .select("name stock")
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalStock,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock analytics",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getStockAnalytics,
};
