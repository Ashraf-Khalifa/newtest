const dbConnection = require("../config");

class ShopModel {
  static addItem(imagePath, title, price, content, callback) {
    const insertItemQuery = `
      INSERT INTO shop_items (image_path, title, price, content)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(
      insertItemQuery,
      [JSON.stringify(imagePath), title, price, content],
      callback
    );
  }

  static getItems(callback) {
    const selectItemsQuery = `
      SELECT id, title, price, content, image_path
      FROM shop_items
    `;

    dbConnection.query(selectItemsQuery, callback);
  }

  static deleteItem(itemId, callback) {
    const deleteItemQuery = `
      DELETE FROM shop_items
      WHERE id = ?
    `;

    dbConnection.query(deleteItemQuery, [itemId], callback);
  }

  static updateItem(itemId, imagePath, title, price, content, callback) {
    const updateItemQuery = `
      UPDATE shop_items
      SET image_path = ?, title = ?, price = ?, content = ?
      WHERE id = ?
    `;

    dbConnection.query(
      updateItemQuery,
      [imagePath, title, price, content, itemId],
      callback
    );
  }
}

module.exports = ShopModel;
