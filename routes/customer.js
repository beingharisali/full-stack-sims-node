const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer");

router.post("/create", createCustomer);
router.get("/get", getCustomer);
router.get("/get/:id", getSingleCustomer);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);
module.exports = router;
