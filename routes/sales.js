const express = require("express");
const router = express.Router();
const { createSales } = require("../controllers/salesController");

router.post("/create", createSales);

module.exports = router;
