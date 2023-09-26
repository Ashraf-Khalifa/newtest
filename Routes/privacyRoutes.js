const express = require("express");
const router = express.Router();
const PrivacyController = require("../Controllers/PrivacyController");

// Route to add a new privacy policy
router.post("/add", PrivacyController.addPrivacyPolicy);

// Route to get all privacy policies
router.get("/show", PrivacyController.getAllPrivacyPolicies);

module.exports = router;
