const dbConnection = require("../config");

class PrivacyModel {
  static addPrivacyPolicy(title, content, callback) {
    const insertPrivacyQuery = `
      INSERT INTO privacy_policy (title, content)
      VALUES (?, ?)
    `;

    dbConnection.query(
      insertPrivacyQuery,
      [title, content],
      (err, result) => {
        callback(err, result);
      }
    );
  }

  static getAllPrivacyPolicies(callback) {
    const selectPrivacyQuery = `
      SELECT title, content
      FROM privacy_policy
    `;

    dbConnection.query(selectPrivacyQuery, (err, results) => {
      callback(err, results);
    });
  }
}

module.exports = PrivacyModel;
