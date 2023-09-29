const TermsModel = require("../Models/TermsModel");

class TermsController {
  static addTerm(req, res) {
    // Extract data from the request
    const { title, content } = req.body;

    // Validate data (you can add more validation as needed)
    if (!title || !content) {
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: "Title and content are required" },
      });
    }

    // Call the model function to add the term
    TermsModel.addTerm(title, content, (err, result) => {
      if (err) {
        console.error("Error adding term to the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding term to the database" },
        });
      }

      console.log("Term added successfully");
      const termData = {
        title,
        content,
        id: result.insertId, // The ID of the newly added term
      };
      return res.status(200).json({
        data: termData,
        success: true,
        errors: {},
      });
    });
  }

  static getTerms(req, res) {
    // Call the model function to retrieve terms
    TermsModel.getTerms((err, results) => {
      if (err) {
        console.error("Error retrieving terms", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving terms" },
        });
      }

      return res.status(200).json({
        data: results,
        success: true,
        errors: {},
      });
    });
  }

  static deleteTerm(req, res) {
    const termId = parseInt(req.params.termId, 10);

    // Call the model function to delete the term
    TermsModel.deleteTerm(termId, (err, result) => {
      if (err) {
        console.error("Error deleting term from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting term from the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No term found with the specified ID
        return res.status(404).json({ message: "Term not found" });
      }

      console.log("Term deleted successfully");
      res.status(200).json({ message: "Term deleted successfully" });
    });
  }

  static updateTerm(req, res) {
    const termId = parseInt(req.params.termId, 10);
    const { title, content } = req.body;

    // Validate data (you can add more validation as needed)
    if (!title || !content) {
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: "Title and content are required" },
      });
    }

    // Call the model function to update the term
    TermsModel.updateTerm(termId, title, content, (err, result) => {
      if (err) {
        console.error("Error updating term in the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating term in the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No term found with the specified ID
        return res.status(404).json({ message: "Term not found" });
      }

      console.log("Term updated successfully");
      const termData = {
        title,
        content,
      };
      return res.status(200).json({
        data: termData,
        success: true,
        errors: {},
      });
    });
  }
}

module.exports = TermsController;
