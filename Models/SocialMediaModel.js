const dbConnection = require("../config");

class SocialMediaModel {
  static addSocialMedia(link, callback) {
    const insertSocialMediaQuery = `
      INSERT INTO social_media (link)
      VALUES (?)
    `;

    dbConnection.query(insertSocialMediaQuery, [link], callback);
  }

  static getSocialMediaList(callback) {
    const selectSocialMediaQuery = `
      SELECT id, link
      FROM social_media
    `;

    dbConnection.query(selectSocialMediaQuery, callback);
  }

  static getSocialMediaById(socialMediaId, callback) {
    const selectSocialMediaByIdQuery = `
      SELECT id, link
      FROM social_media
      WHERE id = ?
    `;

    dbConnection.query(selectSocialMediaByIdQuery, [socialMediaId], (err, results) => {
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0]);
    });
  }

  static updateSocialMedia(socialMediaId, link, callback) {
    const updateSocialMediaQuery = `
      UPDATE social_media
      SET link = ?
      WHERE id = ?
    `;

    dbConnection.query(updateSocialMediaQuery, [link, socialMediaId], callback);
  }

  static deleteSocialMedia(socialMediaId, callback) {
    const deleteSocialMediaQuery = `
      DELETE FROM social_media
      WHERE id = ?
    `;

    dbConnection.query(deleteSocialMediaQuery, [socialMediaId], callback);
  }
}

module.exports = SocialMediaModel;
