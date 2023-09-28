const dbConnection = require("../config");

class ShopModel {
  static addShop(imagePath, title, price, content, callback) {
    const insertShopQuery = `
      INSERT INTO shop (image, title, price, content)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(
      insertShopQuery,
      [JSON.stringify(imagePath), title, price, content],
      callback
    );
  }

  static getShops(callback) {
    const selectShopQuery = `
    SELECT id, title, price, content, image
      FROM shop
    `;

    dbConnection.query(selectShopQuery, callback);
  }

  // Add more methods for shop-related database operations if needed

  static deleteShop(shopId, callback) {
    const deleteShopQuery = `
      DELETE FROM shop
      WHERE id = ?
    `;

    dbConnection.query(deleteShopQuery, [shopId], callback);
  }

  static updateShop(shopId, imagePath, title, price, content, callback) {
    const updateShopQuery = `
      UPDATE shop
      SET image = ?, title = ?, price = ?, content = ?
      WHERE id = ?
    `;

    dbConnection.query(
      updateShopQuery,
      [imagePath, title, price, content, shopId],
      callback
    );
  }
}

module.exports = ShopModel;
