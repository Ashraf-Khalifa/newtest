const dbConnection = require("../config");

class TermsModel {
  static addTerm(title, content, callback) {
    const insertTermQuery = `
      INSERT INTO terms (title, content)
      VALUES (?, ?)
    `;

    dbConnection.query(insertTermQuery, [title, content], callback);
  }

  static getTerms(callback) {
    const selectTermsQuery = `
      SELECT id, title, content
      FROM terms
    `;

    dbConnection.query(selectTermsQuery, callback);
  }

  static deleteTerm(termId, callback) {
    const deleteTermQuery = `
      DELETE FROM terms
      WHERE id = ?
    `;

    dbConnection.query(deleteTermQuery, [termId], callback);
  }

  static updateTerm(termId, title, content, callback) {
    const updateTermQuery = `
      UPDATE terms
      SET title = ?, content = ?
      WHERE id = ?
    `;

    dbConnection.query(updateTermQuery, [title, content, termId], callback);
  }
}

module.exports = TermsModel;
