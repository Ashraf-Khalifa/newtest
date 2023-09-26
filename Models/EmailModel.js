const dbConnection = require("../config");

class EmailModel {
  static updateEmailToken(email, token, callback) {
    const updateTokenQuery = `
      UPDATE users
      SET token = ?
      WHERE email = ?
    `;

    dbConnection.query(updateTokenQuery, [token, email], callback);
  }

  static getEmailByToken(token, callback) {
    const getEmailQuery = `
      SELECT email FROM users
      WHERE token = ?
    `;

    dbConnection.query(getEmailQuery, [token], callback);
  }

  
  static clearEmailToken(token, callback) {
    const clearTokenQuery = `
      UPDATE users
      SET token = null
      WHERE token = ?
    `;

    dbConnection.query(clearTokenQuery, [token], callback);
  }

  // Add more methods as needed for your email-related functionality
}

module.exports = EmailModel;
