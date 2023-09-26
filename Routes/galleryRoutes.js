const express = require("express");
const router = express.Router();
const GalleryController = require("../Controllers/GalleryController"); // Updated controller for gallery
const multer = require("multer");

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });



// Routes for gallery-related actions
router.post("/upload", upload.single("image"), GalleryController.uploadImage); // Updated route for gallery
router.get("/images", GalleryController.getImagePaths); // Updated route for gallery

module.exports = router;
