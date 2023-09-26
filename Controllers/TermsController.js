const TermsModel = require("../Models/TermsModel");

class TermsController {
  static addTerms(req, res) {
    const { title, content } = req.body;

    TermsModel.addTerms(title, content, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding terms and conditions" }
        });
      }

      console.log("Terms and conditions added successfully");
      const eventData = {
        title,
        content,
      };
      return res.status(200).json({
        data: eventData,
        success: true,
        errors: {},
      });
    });
  }

  static getAllTerms(req, res) {
    TermsModel.getAllTerms((err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving terms and conditions" }
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {}
        });
      }

      const termsDetailsArray = results.map((terms) => ({
        title: terms.title,
        content: terms.content,
      }));

      return res.status(200).json({
        data: termsDetailsArray,
        success: true,
        errors: {}
      });
    });
  }
}

module.exports = TermsController;
