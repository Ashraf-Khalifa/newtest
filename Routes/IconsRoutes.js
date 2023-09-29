const express = require("express");
const router = express.Router();
const IconController = require("../Controllers/IconsController");

// Routes for icon-related actions
router.post("/add", IconController.addIcon); // Add an icon
router.get("/list", IconController.getIconList); // Retrieve icons
router.get("/:id", IconController.getIconById); // Retrieve a specific icon by ID
router.put("/update/:id", IconController.updateIcon); // Update an icon by ID
router.delete("/delete/:id", IconController.deleteIcon); // Delete an icon by ID

module.exports = router;
