const express = require("express");
const router = express.Router();

const {
  createSaler,
  getSaler,
  getSingleSaler,
  updateSaler,
  deleteSaler,
} = require("../controllers/saler");

router.post("/", createSaler);
router.get("/", getSaler);
router.get("/:id", getSingleSaler);
router.put("/:id", updateSaler);
router.delete("/:id", deleteSaler);

module.exports = router;
