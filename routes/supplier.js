const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSupplier,
  getSingleSupplier,
  updateSupplier,
} = require("../controllers/supplier");

router.post("/create", createSupplier);
router.get("/get", getSupplier);
router.get("/get/:id", getSingleSupplier);
router.put("/update/:id", updateSupplier);

module.exports = router;
