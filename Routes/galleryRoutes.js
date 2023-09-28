const express = require("express");
const router = express.Router();
const GalleryController = require("../Controllers/GalleryController");
const multer = require("multer");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes for gallery-related actions
router.post("/upload", upload.single("image"), GalleryController.uploadImage); // Upload an image
router.get("/images", GalleryController.getImagePaths); // Retrieve image paths
router.delete("/delete/:imageId", GalleryController.deleteImage); // Delete an image by ID

module.exports = router;
