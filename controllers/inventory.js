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

// SIMS-NODE-15
const updateInventory = async (req, res) => {
    try {
        const updatedInventory = await inventoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Inventory updated successfully",
            data: updatedInventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update inventory",
            error: error.message,
        });
    }
};

// SIMS-NODE-16
const deleteInventory = async (req, res) => {
    try {
        const deletedInventory = await inventoryModel.findByIdAndDelete(
            req.params.id
        );

        if (!deletedInventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Inventory deleted successfully",
            data: deletedInventory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete inventory",
            error: error.message,
        });
    }
};

module.exports = {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
};
