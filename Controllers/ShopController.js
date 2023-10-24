const ShopModel = require("../Models/ShopModel");
const fs = require("fs");

class ShopController {
  static addItem(req, res) {
    console.log("Received request to add an item.");

    // Extract data from the request
    const { title, price, content } = req.body;
    console.log("Received data:", title, price, content);

    const image = req.file; // Use req.file to get the uploaded image

    // Check if there is no image
    if (!image) {
      const errorMessage = "Image file is required";
      console.error(errorMessage);
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: errorMessage },
      });
    }

    const imagePath = `uploads/${image.originalname}`;

    // Write the image to the server's file system
    fs.writeFile(imagePath, image.buffer, (err) => {
      if (err) {
        const errorMessage = "Error saving image";
        console.error(errorMessage, err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: errorMessage },
        });
      }

      const priceWithJD = `${price} JD`;

      // Add the item to the database with the image path
      ShopModel.addItem(imagePath, title, priceWithJD, content, (err, result) => {
        if (err) {
          const errorMessage = "Error adding item to the database";
          console.error(errorMessage, err);
          return res.status(500).json({
            data: null,
            success: false,
            errors: { message: errorMessage },
          });
        }

        console.log("Item added successfully");
        const itemData = {
          title,
          price: priceWithJD,
          content,
          image_path: imagePath,
        };
        return res.status(200).json({
          data: itemData,
          success: true,
          errors: {},
        });
      });
    });
  }

  static getItems(req, res) {
    ShopModel.getItems((err, results) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({
                data: null,
                success: false,
                errors: { message: "Error retrieving items" },
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                data: [],
                success: true,
                errors: {},
            });
        }

        const itemDetailsArray = results.map((item) => {
            // Parse the JSON string to get the image path
            const imageFilename = item.image; 
            
            // Assuming the filename is stored in the database
            
            const imagePath = `/uploads/${imageFilename}`;

            const itemDetails = {
                id: item.id,
                title: item.title,
                price: item.price,
                content: item.content,
                image_path: imagePath,
            };

            return itemDetails;
        });

        return res.status(200).json({
            data: itemDetailsArray,
            success: true,
            errors: {},
        });
    });
}


  static deleteItem(req, res) {
    const itemId = parseInt(req.params.itemId, 10);

    // Delete the item from the database
    ShopModel.deleteItem(itemId, (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting item from the database" },
        });
      }

      if (result.affectedRows === 0) {
        // No item found with the specified ID
        return res.status(404).json({ message: "Item not found" });
      }

      // You can now also delete the associated image file using 'image_path'
      // Make sure to handle this operation securely

      console.log("Item deleted successfully");
      res.status(200).json({ message: "Item deleted successfully" });
    });
  }

  static updateItem(req, res) {
    const itemId = parseInt(req.params.itemId, 10);
    const { title, price, content } = req.body;
    const image = req.file;

    // Check if the image is missing
    if (!image) {
      console.error("Image file is required");
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: "Image file is required" },
      });
    }

    // Define the file path to save the uploaded image
    const imagePath = `uploads/${image.originalname}`;

    // Write the image to the server's file system
    fs.writeFile(imagePath, image.buffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating item" },
        });
      }

      // Update the item data in the database with the new image file path
      ShopModel.updateItem(itemId, imagePath, title, price, content, (err, result) => {
        if (err) {
          console.error("MySQL Error:", err);
          return res.status(500).json({
            data: null,
            success: false,
            errors: { message: "Error updating item in the database" },
          });
        }

        if (result.affectedRows === 0) {
          // No item found with the specified ID
          return res.status(404).json({ message: "Item not found" });
        }
        const priceWithJD = `${price} JD`;
        
        console.log("Item updated successfully");
        const itemData = {
          title,
          price: priceWithJD,
          content,
          image_path: imagePath,
        };
        return res.status(200).json({
          data: itemData,
          success: true,
          errors: {},
        });
      });
    });
  }
}

module.exports = ShopController;
