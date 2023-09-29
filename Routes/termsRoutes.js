const express = require("express");
const router = express.Router();
const TermsController = require("../Controllers/TermsController");

// Routes for term-related actions
router.post("/add", TermsController.addTerm); // Add a term
router.get("/list", TermsController.getTerms); // Retrieve term list
router.delete("/delete/:termId", TermsController.deleteTerm); // Delete a term
router.put("/update/:termId", TermsController.updateTerm); // Update a term

module.exports = router;
