// PrivacyPolicyController.js
const PrivacyPolicyModel = require("../Models/PrivacyModel");

class PrivacyPolicyController {
  static addPrivacyPolicy(req, res) {
    // Extract data from the request
    const { title, content } = req.body;

    // Call the model function to add a privacy policy
    PrivacyPolicyModel.addPrivacyPolicy(title, content, (err, result) => {
      if (err) {
        console.error("Error adding privacy policy:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding privacy policy to the database" },
        });
      }

      console.log("Privacy policy added successfully");
      const policyData = {
        title,
        content,
      };
      return res.status(200).json({
        data: policyData,
        success: true,
        errors: {},
      });
    });
  }

  static getPrivacyPolicies(req, res) {
    // Call the model function to retrieve privacy policies
    PrivacyPolicyModel.getPrivacyPolicies((err, results) => {
      if (err) {
        console.error("Error retrieving privacy policies:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving privacy policies" },
        });
      }

      // Process the results and return them
      const policyDetailsArray = results.map((policy) => ({
        id: policy.id,
        title: policy.title,
        content: policy.content,
      }));

      return res.status(200).json({
        data: policyDetailsArray,
        success: true,
        errors: {},
      });
    });
  }

  static deletePrivacyPolicy(req, res) {
    const policyId = parseInt(req.params.policyId, 10);

    // Call the model function to delete the privacy policy
    PrivacyPolicyModel.deletePrivacyPolicy(policyId, (err, result) => {
      if (err) {
        console.error("Error deleting privacy policy:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting privacy policy from the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No privacy policy found with the specified ID
        return res.status(404).json({ message: "Privacy policy not found" });
      }

      console.log("Privacy policy deleted successfully");
      res.status(200).json({ message: "Privacy policy deleted successfully" });
    });
  }

  static updatePrivacyPolicy(req, res) {
    const policyId = parseInt(req.params.policyId, 10);
    const { title, content } = req.body;

    // Call the model function to update the privacy policy
    PrivacyPolicyModel.updatePrivacyPolicy(
      policyId,
      title,
      content,
      (err, result) => {
        if (err) {
          console.error("Error updating privacy policy:", err);
          return res.status(500).json({
            data: null,
            success: false,
            errors: {
              message: "Error updating privacy policy in the database",
            },
          });
        }

        if (result.affectedRows === 0) {
          // No privacy policy found with the specified ID
          return res.status(404).json({ message: "Privacy policy not found" });
        }

        console.log("Privacy policy updated successfully");
        const policyData = {
          title,
          content,
        };
        return res.status(200).json({
          data: policyData,
          success: true,
          errors: {},
        });
      }
    );
  }
}

module.exports = PrivacyPolicyController;
