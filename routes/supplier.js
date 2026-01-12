const express = require("express");
const router = express.Router();
const { createSupplier, getSupplier } = require("../controllers/supplier");
router.post("/create", createSupplier);
router.get("/get", getSupplier);
module.exports = router;
