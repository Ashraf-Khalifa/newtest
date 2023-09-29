const express = require("express");
const router = express.Router();
const SocialMediaController = require("../Controllers/SocialMediaController");

// Routes for social media-related actions
router.post("/add", SocialMediaController.addSocialMedia); // Add a social media item
router.get("/list", SocialMediaController.getSocialMediaList); // Retrieve social media items
router.get("/:id", SocialMediaController.getSocialMediaById); // Retrieve a specific social media item by ID
router.put("/update/:id", SocialMediaController.updateSocialMedia); // Update a social media item by ID
router.delete("/delete/:id", SocialMediaController.deleteSocialMedia); // Delete a social media item by ID

module.exports = router;
