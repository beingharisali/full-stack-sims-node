const express = require("express");
const router = express.Router();
const { getDashboardStats, getUsersByRole } = require("../controllers/dashboard");

router.get("/", getDashboardStats);
router.get("/users", getUsersByRole);

module.exports = router;
