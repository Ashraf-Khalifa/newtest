const dbConnection = require("../config");

class IconModel {
  static addIcon(name, link, callback) {
    const insertIconQuery = `
      INSERT INTO icons (name, link)
      VALUES (?, ?)
    `;

    dbConnection.query(insertIconQuery, [name, link], callback);
  }

  static getIconList(callback) {
    const selectIconQuery = `
      SELECT id, name, link
      FROM icons
    `;

    dbConnection.query(selectIconQuery, callback);
  }

  static getIconById(iconId, callback) {
    const selectIconByIdQuery = `
      SELECT id, name, link
      FROM icons
      WHERE id = ?
    `;

    dbConnection.query(selectIconByIdQuery, [iconId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0]);
    });
  }

  static updateIcon(iconId, name, link, callback) {
    const updateIconQuery = `
      UPDATE icons
      SET name = ?, link = ?
      WHERE id = ?
    `;

    dbConnection.query(updateIconQuery, [name, link, iconId], callback);
  }

  static deleteIcon(iconId, callback) {
    const deleteIconQuery = `
      DELETE FROM icons
      WHERE id = ?
    `;

    dbConnection.query(deleteIconQuery, [iconId], callback);
  }
}

module.exports = IconModel;
