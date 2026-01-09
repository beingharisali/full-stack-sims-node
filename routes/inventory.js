const express = require("express");
const router = express.Router();

const {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
    getSingleInventory,
} = require("../controllers/inventory");

router.post("/inventory", createInventory);
router.get("/inventory", getInventory);

router.get("/inventory/:id", getSingleInventory);



router.put("/inventory/:id", updateInventory);

router.delete("/inventory/:id", deleteInventory);

module.exports = router;
