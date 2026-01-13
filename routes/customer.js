const express = require("express");
const router = express.Router();
const { createCustomer } = require("../controllers/customer");

router.post("/create", createCustomer);
module.exports = router;
