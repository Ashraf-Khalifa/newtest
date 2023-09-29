const express = require("express");
const router = express.Router();
const ShopController = require("../Controllers/ShopController");
const multer = require("multer");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for shop-related actions
router.post("/add", upload.single("image"), ShopController.addItem); // Add an item
router.get("/list", ShopController.getItems); // Retrieve item list
router.delete("/delete/:itemId", ShopController.deleteItem); // Delete an item
router.put("/update/:itemId", upload.single("image"), ShopController.updateItem); // Update an item

module.exports = router;
