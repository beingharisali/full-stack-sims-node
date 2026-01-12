const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controllers/product");

router.post("/create", createProduct);
router.get("/get", getProduct);
router.get("/get/:id", getSingleProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
