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
  
      const jsonResponse = {
        data: qrCodeDetailsArray,
        success: true,
        errors: {},
      };
  
      // Send both HTML content and JSON data
      res.status(200).json(jsonResponse);
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<body>
    <style>
    .container-fluid{
      background-color: #BCA464;
    }
        /* Custom Styles */
        .custom-background {
            background-color: #BCA464;
        }

        .custom-footer-background {
            background-color: #BCA464;
            position: fixed;
            bottom: 0;
            min-width: 100%;
            border-radius: 30px 30px 0px 0px;
        }

        .custom-footer-text {
            color: #fff;
        }

        .custom-text {
            padding: 40px;
            margin-bottom: 200px;
            border-radius: 30px 30px 0px 0px;
            background-color: #fff;
        }

        .larg {
          padding-top:15px;
            font-size: 30px;
            

        }

        .custom-description {
            font-size: 40px;
            direction: rtl; 
            text-align: justify; /* Justify the text */            
        }
        .custom-title{
          font-size: 60px;
          font-weight: bold;
        }
    </style>

    <div class="container-fluid">
        <div class="row custom-background">
            <div class="col-12 text-center">
                ${logoSrc ? `<img class="mt-4 mb-4" src="${logoSrc}" alt="Logo Image" style="max-height: 200px;">` : ''}
            </div>
        </div>
        <div class="row custom-text">
            <div class="col-12 text-center">
                ${title ? `<h1 class="px-4 custom-title">${title}</h1>` : ''}<br>
                ${description ? `<p class="px-4 custom-description">${description}</p>` : ''}<br>
                ${audioSrc ? `
                <audio controls style="width: 100%;">
                    <source src="${audioSrc}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>` : ''}<br>
                ${imageSrc ? `<img src="${imageSrc}" alt="Image">` : ''}<br>
                ${videoSrc ? `
                <video controls style="width: 100%; height: auto;">
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video element.
                </video>` : ''}<br>
            </div>
        </div>
        <div class="row custom-footer-background py-5">
            <div class="col-12 text-center custom-footer-text">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="larg">
                        <p >The Royal Tank Museum @2023</p>
                    </div>
                    <div class="d-flex justify-content-center">
                        <a href="https://www.facebook.com/TankMuseumjo" style="color: #ffffff; font-size: 50px;" class="mr-3 pl-2">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="https://twitter.com/TankMuseumJo" style="color: #ffffff; font-size: 50px;" class="mr-3 pl-2">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/tankmuseumjo" style="color: #ffffff; font-size: 50px;" class="mr-3 pl-2">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://rtm.jo" style="color: #ffffff; font-size: 50px;" class="mr-3 pl-2">
                            <i class="fas fa-globe"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
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
  
  static deleteImage(req, res) {
    const qrId = parseInt(req.params.qrId, 10);
  
    QRModel.deleteImage(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting image from the QR code" },
        });
      }
  
      console.log("Image deleted successfully");
      res.status(200).json({ message: 'Image deleted successfully' });
    });
  }
  
  
  static deleteLogo(req, res) {
    const qrId = parseInt(req.params.qrId, 10);
  
    QRModel.deleteLogo(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting logo from the QR code" },
        });
      }
  
      console.log("Logo deleted successfully");
      res.status(200).json({ message: 'Logo deleted successfully' });
    });
  }
  
  static deleteAudio(req, res) {
    const qrId = parseInt(req.params.qrId, 10);
  
    QRModel.deleteAudio(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting audio from the QR code" },
        });
      }
  
      console.log("Audio deleted successfully");
      res.status(200).json({ message: 'Audio deleted successfully' });
    });
  }
  
  static deleteVideo(req, res) {
    const qrId = parseInt(req.params.qrId, 10);
  
    QRModel.deleteVideo(qrId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting video from the QR code" },
        });
      }
  
      console.log("Video deleted successfully");
      res.status(200).json({ message: 'Video deleted successfully' });
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
