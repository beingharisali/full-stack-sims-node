const productModel = require("../models/Product");
const Product = require("../models/Product");
const createProduct = async (req, res, next) => {
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
    next(error);
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
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
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
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
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
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch product",
      error: error.message,
    });
  }
};

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
