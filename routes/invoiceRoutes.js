const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
  getTotalSales,
} = require("../controllers/invoice");

router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getSingleInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.get("/total/sales", getTotalSales);

module.exports = router;
