const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier");

router.post("/create", createSupplier);
router.get("/get", getSupplier);
router.get("/get/:id", getSingleSupplier);
router.put("/update/:id", updateSupplier);
router.delete("/delete/:id", deleteSupplier);

module.exports = router;
