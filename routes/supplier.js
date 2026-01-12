const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSupplier,
  getSingleSupplier,
} = require("../controllers/supplier");
router.post("/create", createSupplier);
router.get("/get", getSupplier);
router.get("/get/:id", getSingleSupplier);
module.exports = router;
