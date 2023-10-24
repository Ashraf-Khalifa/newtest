const GalleryModel = require("../Models/GalleryModel");
const fs = require("fs");

class GalleryController {
  static uploadImage(req, res) {
    console.log("req.file:", req.file); // Add this line for debugging

    const imageBuffer = req.file.buffer; // Get the image buffer from the request

    if (!imageBuffer || imageBuffer.length === 0) {
      console.error("No image file provided in req.file");
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: "No image file provided" },
      });
    }

    // Define a unique file name for the image (e.g., using a timestamp)
    const timestamp = Date.now();
    const imageFileName = `${timestamp}.png`;

    // Define the file path to save the uploaded image
   const imagePath = `${imageFileName}`;

    // Write the image buffer to the server's file system
    fs.writeFile(imagePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding image" },
        });
      }

      // Save the image path to the database
      GalleryModel.uploadImage(imagePath, (err, result) => {
        if (err) {
          console.error("MySQL Error:", err);
          return res.status(500).json({
            data: null,
            success: false,
            errors: { message: "Error adding image path" },
          });
        }

        console.log("Image path added to the database");
        return res.status(200).json({
          data: { message: "Image uploaded successfully" },
          success: true,
          errors: {},
        });
      });
    });
  }

  static getImagePaths(req, res) {
    // Retrieve image paths from the database
    GalleryModel.getImagePaths((err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error fetching image paths" },
        });
      }
  
      // Map the results to include id and image_path
      const imagePaths = results.map((result) => ({
        id: result.id,
        image_path: result.image_path,
      }));
  
      return res.status(200).json({
        data: imagePaths,
        success: true,
        errors: {},
      });
    });
  }
  

  static deleteImage(req, res) {
    const imageId = parseInt(req.params.imageId, 10);

    // Delete the image record from the database
    GalleryModel.deleteImage(imageId, (dbErr, result) => {
      if (dbErr) {
        console.error("MySQL Error:", dbErr);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting image from the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No image found with the specified ID
        return res.status(404).json({ message: 'Image not found' });
      }

      console.log(`Image with ID ${imageId} deleted successfully from the database`);
      res.status(200).json({ message: `Image with ID ${imageId} deleted successfully from the database` });
    });
  }
}

module.exports = GalleryController;
