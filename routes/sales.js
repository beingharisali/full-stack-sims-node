const express = require("express");
const router = express.Router();
const {
  getSales,
  createSale,
  updateSale,
  deleteSale,
} = require("../controllers/sales");

router.get("/get", getSales);
router.post("/create", createSale);
router.put("/update/:id", updateSale);
router.delete("/delete/:id", deleteSale);

module.exports = router;
