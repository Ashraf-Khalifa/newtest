const PrivacyModel = require("../Models/PrivacyModel");

class PrivacyController {
  static addPrivacyPolicy(req, res) {
    const { title, content } = req.body;

    PrivacyModel.addPrivacyPolicy(title, content, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res
          .status(500)
          .json({
            data: null,
            success: false,
            errors: { message: "Error adding privacy policy" },
          });
      }

      console.log("Privacy policy added successfully");
      return res
        .status(200)
        .json({
          data: { message: "Privacy policy added successfully" },
          success: true,
          errors: {},
        });
    });
  }

  static getAllPrivacyPolicies(req, res) {
    PrivacyModel.getAllPrivacyPolicies((err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res
          .status(500)
          .json({
            data: null,
            success: false,
            errors: { message: "Error retrieving privacy policies" },
          });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const privacyDetailsArray = results.map((privacy) => ({
        title: privacy.title,
        content: privacy.content,
      }));

      return res.status(200).json({
        data: privacyDetailsArray,
        success: true,
        errors: {},
      });
    });
  }
}

module.exports = PrivacyController;
