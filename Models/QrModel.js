const dbConnection = require("../config");

class QRModel {
  static addQR(qrCodeData, callback) {
    const insertQRQuery = `
      INSERT INTO qr_code (title, description, qr_code_url, name, image, audio, video, logo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    dbConnection.query(
      insertQRQuery,
      [qrCodeData.title, qrCodeData.description, qrCodeData.qr_code_url, qrCodeData.name, qrCodeData.image_path, qrCodeData.audio_path, qrCodeData.video_path, qrCodeData.logo_path],
      callback
    );
  }

  static getQRs(callback) {
    const selectQRsQuery = `
      SELECT id, title, description, qr_code_url, name, image, audio, video, logo
      FROM qr_code
    `;

    dbConnection.query(selectQRsQuery, callback);
  }

  static getQRById(qrId, callback) {
    const selectQRByIdQuery = `
      SELECT id, title, description, qr_code_url, name, image, audio, video, logo
      FROM qr_code
      WHERE id = ?
    `;

    dbConnection.query(selectQRByIdQuery, [qrId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }

      if (rows.length === 0) {
        // No QR code found with the specified ID
        return callback(null, null);
      }

      const qrCodeData = rows[0];
      return callback(null, qrCodeData);
    });
  }

  static deleteQR(qrId, callback) {
    const deleteQRQuery = `
      DELETE FROM qr_code
      WHERE id = ?
    `;

    dbConnection.query(deleteQRQuery, [qrId], callback);
  }

  static updateQR(qrId, qrCodeData, callback) {
    const updateQRQuery = `
      UPDATE qr_code
      SET title = ?, description = ?, qr_code_url = ?, name = ?
      ${qrCodeData.image_path ? ', image = ?' : ''}
      ${qrCodeData.audio_path ? ', audio = ?' : ''}
      ${qrCodeData.video_path ? ', video = ?' : ''}
      ${qrCodeData.logo_path ? ', logo = ?' : ''}
      WHERE id = ?
    `;

    const queryParams = [
      qrCodeData.title, qrCodeData.description, qrCodeData.qr_code_url, qrCodeData.name,
      qrCodeData.image_path,
      qrCodeData.audio_path,
      qrCodeData.video_path,
      qrCodeData.logo_path,
      qrId,
    ].filter(param => param !== undefined);

    dbConnection.query(updateQRQuery, queryParams, callback);
  }
  

  
}

module.exports = QRModel;
