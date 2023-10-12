const QRModel = require("../Models/QrModel");

class QRController {
  static addQR(req, res) {
    console.log("Received request to add a QR code.");

    // Extract data from the request
    const { title, description, qr_code_url, name } = req.body;
    console.log("Received data:", title, description, qr_code_url, name);

 

// Access the uploaded files using the correct field names
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
  qrCodeData.image_path = `/image/${image.originalname}`;
}
if (audio) {
  qrCodeData.audio_path = `/audio/${audio.originalname}`;
}
if (video) {
  qrCodeData.video_path = `/video/${video.originalname}`;
}
if (logo) {
  qrCodeData.logo_path = `/logo/${logo.originalname}`;
}




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

  // ... Rest of the QRController methods



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
  
      // Include the HTML content for displaying QR code data
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>QR Code Data</title>
        </head>
        <body>
          <h1>QR Code Data</h1>
          <ul>
            ${qrCodeDetailsArray.map(qr => `
              <li>
                <h2>${qr.title}</h2>
                <p>${qr.description}</p>
                <img src="${qr.image}" alt="QR Code Image">
                <audio controls>
                  <source src="${qr.audio}" type="audio/mpeg">
                  Your browser does not support the audio element.
                </audio>
                <video controls width="640" height="360">
                  <source src="${qr.video}" type="video/mp4">
                  Your browser does not support the video element.
                </video>
                <img src="${qr.logo}" alt="Logo Image">
              </li>
            `).join('')}
          </ul>
        </body>
        </html>
      `;
  
      res.status(200).send(htmlContent);
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

        const title = result.title;
        const description = result.description;
        const name = result.name;
        const imageSrc = result.image;
        const audioSrc = result.audio;
        const logoSrc = result.logo;
        const videoSrc = result.video;

        // Construct the HTML template for video playback
        const htmlContent =`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                /* Center content vertically and horizontally */
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                }
                .content {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="content">
                ${title ? `<h1>${title}</h1>` : ''} <br>
                ${description ? `<p>${description}</p>` : ''}
                ${name ? `<p>Name: ${name}</p>` : ''}<br>
                ${imageSrc ? `<img src="${imageSrc}" alt="Image">` : ''}<br>
                ${audioSrc ? `<audio controls>
                    <source src="${audioSrc}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>` : ''}<br>
                ${logoSrc ? `<img src="${logoSrc}" alt="Logo Image">` : ''}<br>
                ${videoSrc ? `
                <video controls width="640" height="360">
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video element.
                </video>` : ''}<br>
            </div>
        </body>
        </html>
        `;

        // Send the HTML content as the response
        res.status(200).send(htmlContent);
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
