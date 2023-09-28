const express = require("express");
const router = express.Router();
const ShopController = require("../Controllers/ShopController");
const multer = require("multer");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for shop-related actions
router.post("/add", upload.single("image"), ShopController.addShop); // Route to add a new shop
router.get("/list", ShopController.getShops); // Route to retrieve shop details
router.delete("/delete/:shopId", ShopController.deleteShop); // Route to delete a shop
router.put("/update/:shopId", upload.single("image"), ShopController.updateShop); // Route to update a shop

module.exports = router;
