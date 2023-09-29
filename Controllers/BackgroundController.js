const BackgroundModel = require("../Models/BackgroundModel");

class BackgroundController {
  static addBackground(req, res) {
    // Extract data from the request
    const { name, link } = req.body;

    // Call a method to add the background to the database
    BackgroundModel.addBackground(name, link, (err, result) => {
      if (err) {
        console.error("Error adding background to the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding background to the database" },
        });
      }

      console.log("Background added successfully");
      const backgroundItem = {
        id: result.insertId,
        name,
        link,
      };
      return res.status(200).json({
        data: backgroundItem,
        success: true,
        errors: {},
      });
    });
  }

  static getBackgroundList(req, res) {
    // Call a method to retrieve the list of backgrounds from the database
    BackgroundModel.getBackgroundList((err, results) => {
      if (err) {
        console.error("Error retrieving backgrounds from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving backgrounds from the database" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const backgrounds = results.map((item) => ({
        id: item.id,
        name: item.name,
        link: item.link,
      }));

      return res.status(200).json({
        data: backgrounds,
        success: true,
        errors: {},
      });
    });
  }

  static getBackgroundById(req, res) {
    const backgroundId = parseInt(req.params.id, 10);

    // Call a method to retrieve a specific background by ID from the database
    BackgroundModel.getBackgroundById(backgroundId, (err, result) => {
      if (err) {
        console.error("Error retrieving background from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving background from the database" },
        });
      }

      if (!result) {
        return res.status(404).json({
          data: null,
          success: true,
          errors: { message: "Background not found" },
        });
      }

      const backgroundItem = {
        link: result.link,
      };

      return res.status(200).json({
        data: backgroundItem,
        success: true,
        errors: {},
      });
    });
  }

  static updateBackground(req, res) {
    const backgroundId = parseInt(req.params.id, 10);
    const { name, link } = req.body;

    // Call a method to update a background by ID in the database
    BackgroundModel.updateBackground(backgroundId, name, link, (err, result) => {
      if (err) {
        console.error("Error updating background in the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating background in the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Background not found" });
      }

      console.log("Background updated successfully");
      const backgroundItem = {
        id: backgroundId,
        name,
        link,
      };
      return res.status(200).json({
        data: backgroundItem,
        success: true,
        errors: {},
      });
    });
  }

  static deleteBackground(req, res) {
    const backgroundId = parseInt(req.params.id, 10);

    // Call a method to delete a background by ID from the database
    BackgroundModel.deleteBackground(backgroundId, (err, result) => {
      if (err) {
        console.error("Error deleting background from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting background from the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Background not found" });
      }

      console.log("Background deleted successfully");
      return res.status(200).json({ message: "Background deleted successfully" });
    });
  }
}

module.exports = BackgroundController;
