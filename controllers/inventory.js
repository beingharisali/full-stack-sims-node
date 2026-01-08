const inventoryModel = require("../models/inventory");

const getInventory = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({});
        res.status(200).json({
            success: true,
            message: "Inventory fetched successfully",
            data: inventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch inventory",
            error: error.message,
        });
    }
};

module.exports = {
    getInventory,
};
