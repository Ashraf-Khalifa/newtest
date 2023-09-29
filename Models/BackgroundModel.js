const dbConnection = require("../config");

class BackgroundModel {
  static addBackground(name, link, callback) {
    const insertBackgroundQuery = `
      INSERT INTO background (name, link)
      VALUES (?, ?)
    `;

    dbConnection.query(insertBackgroundQuery, [name, link], callback);
  }

  static getBackgroundList(callback) {
    const selectBackgroundQuery = `
      SELECT id, name, link
      FROM background
    `;

    dbConnection.query(selectBackgroundQuery, callback);
  }

  static getBackgroundById(backgroundId, callback) {
    const selectBackgroundByIdQuery = `
      SELECT id, name, link
      FROM background
      WHERE id = ?
    `;

    dbConnection.query(selectBackgroundByIdQuery, [backgroundId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0]);
    });
  }

  static updateBackground(backgroundId, name, link, callback) {
    const updateBackgroundQuery = `
      UPDATE background
      SET name = ?, link = ?
      WHERE id = ?
    `;

    dbConnection.query(updateBackgroundQuery, [name, link, backgroundId], callback);
  }

  static deleteBackground(backgroundId, callback) {
    const deleteBackgroundQuery = `
      DELETE FROM background
      WHERE id = ?
    `;

    dbConnection.query(deleteBackgroundQuery, [backgroundId], callback);
  }
}

module.exports = BackgroundModel;
