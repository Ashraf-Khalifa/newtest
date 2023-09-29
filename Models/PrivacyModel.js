// PrivacyPolicyModel.js
const dbConnection = require("../config");

class PrivacyPolicyModel {
  static addPrivacyPolicy(title, content, callback) {
    const insertPrivacyPolicyQuery = `
      INSERT INTO privacy_policy (title, content)
      VALUES (?, ?)
    `;

    dbConnection.query(insertPrivacyPolicyQuery, [title, content], callback);
  }

  static getPrivacyPolicies(callback) {
    const selectPrivacyPoliciesQuery = `
      SELECT id, title, content
      FROM privacy_policy
    `;

    dbConnection.query(selectPrivacyPoliciesQuery, callback);
  }

  static deletePrivacyPolicy(policyId, callback) {
    const deletePrivacyPolicyQuery = `
      DELETE FROM privacy_policy
      WHERE id = ?
    `;

    dbConnection.query(deletePrivacyPolicyQuery, [policyId], callback);
  }

  static updatePrivacyPolicy(policyId, title, content, callback) {
    const updatePrivacyPolicyQuery = `
      UPDATE privacy_policy
      SET title = ?, content = ?
      WHERE id = ?
    `;

    dbConnection.query(
      updatePrivacyPolicyQuery,
      [title, content, policyId],
      callback
    );
  }
}

module.exports = PrivacyPolicyModel;
