const dbConnection = require("../config");

class AboutModel {
  static addAboutItem(title, description, callback) {
    const insertAboutItemQuery = `
      INSERT INTO about (title, description)
      VALUES (?, ?)
    `;

    dbConnection.query(insertAboutItemQuery, [title, description], callback);
  }

  static getAboutItemList(callback) {
    const selectAboutItemsQuery = `
      SELECT id, title, description
      FROM about
    `;

    dbConnection.query(selectAboutItemsQuery, callback);
  }

  static getAboutItemById(aboutItemId, callback) {
    const selectAboutItemByIdQuery = `
      SELECT id, title, description
      FROM about
      WHERE id = ?
    `;

    dbConnection.query(selectAboutItemByIdQuery, [aboutItemId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0]);
    });
  }

  static updateAboutItem(aboutItemId, title, description, callback) {
    const updateAboutItemQuery = `
      UPDATE about
      SET title = ?, description = ?
      WHERE id = ?
    `;

    dbConnection.query(updateAboutItemQuery, [title, description, aboutItemId], callback);
  }

  static deleteAboutItem(aboutItemId, callback) {
    const deleteAboutItemQuery = `
      DELETE FROM about
      WHERE id = ?
    `;

    dbConnection.query(deleteAboutItemQuery, [aboutItemId], callback);
  }
}

module.exports = AboutModel;
