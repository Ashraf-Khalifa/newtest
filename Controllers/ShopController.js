const ShopModel = require("../Models/ShopModel");
const fs = require("fs");

class ShopController {
  static addShop(req, res) {
    console.log("Received request to add a shop.");

    const { title, price, content } = req.body;
    const image = req.file;

    if (!image) {
      console.error("Image file is required");
      return res.status(400).json({
        data: null,
        success: false,
        errors: { message: "Image file is required" },
      });
    }

    const imagePath = `uploads/${image.originalname}`;

    fs.writeFile(imagePath, image.buffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding shop" },
        });
      }

      ShopModel.addShop(imagePath, title, price, content, (err, result) => {
        if (err) {
          console.error("MySQL Error:", err);
          return res.status(500).json({
            data: null,
            success: false,
            errors: { message: "Error adding shop to the database" },
          });
        }

        console.log("Shop added successfully");
        const shopData = {
          title,
          price,
          content,
          image_path: imagePath,
        };
        return res.status(200).json({
          data: shopData,
          success: true,
          errors: {},
        });
      });
    });
  }

  static getShops(req, res) {
    ShopModel.getShops((err, results) => {
      if (err) {
        console.error("MySQL Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving shops" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const shopDetailsArray = [];

      results.forEach((shop) => {
        const shopDetails = {
          title: shop.title,
          price: shop.price,
          content: shop.content,
          image_path: shop.image,
        };

        shopDetailsArray.push(shopDetails);
      });

      return res.status(200).json({
        data: shopDetailsArray,
        success: true,
        errors: {},
      });
    });
  }
}

module.exports = ShopController;
