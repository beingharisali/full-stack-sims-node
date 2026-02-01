const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getStockAnalytics,
} = require("../controllers/product");

router.post("/create", createProduct);
router.get("/get", getProduct);
router.get("/get/:id", getSingleProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/analytics/stock", getStockAnalytics);

module.exports = router;
