const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/product");

router.post("/product", createProduct);
router.get("/product", getProduct);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
