const express = require("express");
const router = express.Router();
const salecontroller = require("../controller/salecontroller");

router.post("/", salercontroller.createsaler);
router.get("/", salercontroller.getsaler);
router.get("/:id", salercontroller.getsinglesaler);
router.put("/:id", salercontroller.updatesaler);
router.delete("/:id", salercontroller.deletesaler);

module.exports = router;
