const express = require("express");
const router = express.Router();
const { deductStockController } = require("../controllers/stock");

router.post("/deduct", deductStockController);

module.exports = router;
