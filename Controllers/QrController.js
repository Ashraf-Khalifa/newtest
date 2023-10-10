const QRModel = require("../Models/QrModel");

class QRController {
  static addQR(req, res) {
    console.log("Received request to add a QR code.");

    // Extract data from the request
    const { title, description, qr_code_url, name } = req.body;
    console.log("Received data:", title, description, qr_code_url, name);

    // Access the uploaded files using the correct field names
    const image = req.files["image"][0]; // Use [0] to access the first file if multiple files are uploaded
    const audio = req.files["audio"][0];
    const video = req.files["video"][0];
    const logo = req.files["logo"][0];

    // Check if any required fields or files are missing
    if (!title || !description || !qr_code_url || !name || !image || !audio || !video || !logo) {
      const errorMessage = "All fields, an image file, an audio file, and a video file are required";
      console.error(errorMessage);
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: errorMessage },
      });
    }

    const qrCodeData = {
      title,
      description,
      qr_code_url,
      name,
      image_path: `image/${image.originalname}`, // Set the image path
      audio_path: `audio/${audio.originalname}`, // Set the audio path
      video_path: `video/${video.originalname}`, // Set the video path
      logo_path: `logo/${logo.originalname}`, // Set the logo path
    };

    // Insert QR code data into the database
    QRModel.addQR(qrCodeData, (err, result) => {
      if (err) {
        const errorMessage = "Error adding QR code to the database";
        console.error(errorMessage, err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: errorMessage },
        });
      }

      console.log("QR code added successfully");
      return res.status(200).json({
        data: qrCodeData,
        success: true,
        errors: {},
      });
    });
  }


  static getQRs(req, res) {
    QRModel.getQRs((err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving QR codes" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const qrCodeDetailsArray = [];

      results.forEach((qr) => {
        const qrCodeDetails = {
          id: qr.id,
          title: qr.title,
          description: qr.description,
          qr_code_url: qr.qr_code_url,
          name: qr.name,
          image: qr.image,
          audio: qr.audio,
          video: qr.video,
          logo: qr.logo
        };

        qrCodeDetailsArray.push(qrCodeDetails);
      });

      return res.status(200).json({
        data: qrCodeDetailsArray,
        success: true,
        errors: {},
      });
    });
  }

  static getQRById(req, res) {
    const qrId = parseInt(req.params.qrId, 10);

    // Retrieve the QR code by ID from the database
    QRModel.getQRById(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving QR code by ID" },
        });
      }

      if (!result) {
        // No QR code found with the specified ID
        return res.status(404).json({ message: 'QR code not found' });
      }

      console.log("QR code retrieved successfully by ID");
      return res.status(200).json({
        data: result,
        success: true,
        errors: {},
      });
    });
  }

  static deleteQR(req, res) {
    const qrId = parseInt(req.params.qrId, 10);

    // Delete the QR code from the database
    QRModel.deleteQR(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting QR code from the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No QR code found with the specified ID
        return res.status(404).json({ message: 'QR code not found' });
      }

      console.log("QR code deleted successfully");
      res.status(200).json({ message: 'QR code deleted successfully' });
    });
  }
  static updateQR(req, res) {
    const qrId = parseInt(req.params.qrId, 10);

    // Extract data from the request
    const { title, description, qr_code_url, name } = req.body;
    console.log("Received data:", title, description, qr_code_url, name);

    // Access the uploaded files using the correct field names (optional)
    const image = req.files["image"] ? req.files["image"][0] : null;
    const audio = req.files["audio"] ? req.files["audio"][0] : null;
    const video = req.files["video"] ? req.files["video"][0] : null;
    const logo = req.files["logo"] ? req.files["logo"][0] : null;

    const qrCodeData = {
      title,
      description,
      qr_code_url,
      name,
    };

    // If files are provided, update the paths
    if (image) {
      qrCodeData.image_path = `image/${image.originalname}`;
    }
    if (audio) {
      qrCodeData.audio_path = `audio/${audio.originalname}`;
    }
    if (video) {
      qrCodeData.video_path = `video/${video.originalname}`;
    }
    if (logo) {
      qrCodeData.logo_path = `logo/${logo.originalname}`;
    }

    // Update QR code data in the database
    QRModel.updateQR(qrId, qrCodeData, (err, result) => {
      if (err) {
        const errorMessage = "Error updating QR code in the database";
        console.error(errorMessage, err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: errorMessage },
        });
      }

      console.log("QR code updated successfully");
      return res.status(200).json({
        data: qrCodeData,
        success: true,
        errors: {},
      });
    });
  }

 
}

module.exports = QRController;
