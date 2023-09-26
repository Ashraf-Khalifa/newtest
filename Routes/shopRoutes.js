const express = require("express");
const router = express.Router();
const ShopController = require("../Controllers/ShopController"); // Import the ShopController

const multer = require("multer");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for shop-related actions
router.post("/item", upload.single("image"), ShopController.addShop); // Route to add a new shop
router.get("/show", ShopController.getShops); // Route to retrieve shop details

module.exports = router;
