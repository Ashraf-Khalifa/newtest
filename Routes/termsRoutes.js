const express = require("express");
const router = express.Router();
const TermsController = require("../Controllers/TermsController");

// Route to add Terms and Conditions
router.post("/add", TermsController.addTerms);

// Route to retrieve all Terms and Conditions
router.get("/show", TermsController.getAllTerms);

module.exports = router;
