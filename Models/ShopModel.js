const dbConnection = require("../config");

class ShopModel {
  static addItem(image, title, price, content, callback) {
    const insertItemQuery = `
      INSERT INTO shop (image, title, price, content)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(
      insertItemQuery,
      [JSON.stringify(image), title, price, content],
      callback
    );
  }

  static getItems(callback) {
    const selectItemsQuery = `
      SELECT id, title, price, content, image
      FROM shop
    `;

    dbConnection.query(selectItemsQuery, callback);
  }

  static deleteItem(itemId, callback) {
    const deleteItemQuery = `
      DELETE FROM shop
      WHERE id = ?
    `;

    dbConnection.query(deleteItemQuery, [itemId], callback);
  }

  static updateItem(itemId, image, title, price, content, callback) {
    const updateItemQuery = `
      UPDATE shop
      SET image = ?, title = ?, price = ?, content = ?
      WHERE id = ?
    `;

    dbConnection.query(
      updateItemQuery,
      [image, title, price, content, itemId],
      callback
    );
  }
}

module.exports = ShopModel;
