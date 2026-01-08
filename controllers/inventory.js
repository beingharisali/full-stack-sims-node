const inventoryModel = require("../models/inventory");

// SIMS-NODE-13
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

// SIMS-NODE-14
const createInventory = async (req, res) => {
    try {
        const setInventory = new inventoryModel({
            productName: req.body.productName,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            supplier: req.body.supplier,
            quantity: req.body.quantity || 0,
        });

        await setInventory.save();

        res.status(201).json({
            success: true,
            message: "Inventory created successfully",
            data: setInventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create inventory",
            error: error.message,
        });
    }
};

module.exports = {
    getInventory,
    createInventory,
};
