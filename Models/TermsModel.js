const dbConnection = require("../config");

class TermsModel {
  static addTerms(title, content, callback) {
    const insertTermsQuery = `
      INSERT INTO terms (title, content)
      VALUES (?, ?)
    `;

    dbConnection.query(insertTermsQuery, [title, content], callback);
  }

  static getAllTerms(callback) {
    const selectTermsQuery = `
      SELECT title, content
      FROM terms
    `;

    dbConnection.query(selectTermsQuery, callback);
  }
}

module.exports = TermsModel;
