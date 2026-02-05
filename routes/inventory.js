const express = require("express");
const router = express.Router();

const {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getSingleInventory,
} = require("../controllers/inventory");

router.post("/create", createInventory);

router.get("/get", getInventory);

router.get("/get/:id", getSingleInventory);

router.put("/update/:id", updateInventory);

router.delete("/delete/:id", deleteInventory);

module.exports = router;
