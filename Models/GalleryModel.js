const dbConnection = require("../config");

class GalleryModel {
  static uploadImage(imagePath, callback) {
    const insertImagePathQuery = `
      INSERT INTO gallery (image_path)
      VALUES (?)
    `;

    dbConnection.query(insertImagePathQuery, [imagePath], callback);
  }

  static getImagePaths(callback) {
    const selectImagePathsQuery = `
      SELECT image_path
      FROM gallery
    `;

    dbConnection.query(selectImagePathsQuery, callback);
  }
}

module.exports = GalleryModel;
