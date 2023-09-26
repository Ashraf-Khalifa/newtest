const dbConnection = require("../config");

class ShopModel {
  static addShop(imagePath, title, price, content, callback) {
    const insertShopQuery = `
      INSERT INTO shop (image, title, price, content)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(
      insertShopQuery,
      [imagePath, title, price, content],
      callback
    );
  }

  static getShops(callback) {
    const selectShopQuery = `
      SELECT title, price, content, image
      FROM shop
    `;

    dbConnection.query(selectShopQuery, callback);
  }
}

module.exports = ShopModel;
