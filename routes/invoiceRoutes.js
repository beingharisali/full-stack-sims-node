const express = require("express");
const router = express.Router();
const salecontroller = require("../controller/invoicecontroller");

router.post("/", invoicecontroller.createinvoice);
router.get("/", invoicecontroller.getAllinvoice);
router.get("/:id", invoicecontroller.getsingleinvoice);
router.put("/:id", invoicecontroller.updateinvoice);
router.delete("/:id", invoicecontroller.deleteinvoice);

module.exports = router;
