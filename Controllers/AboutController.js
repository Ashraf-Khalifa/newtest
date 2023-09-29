const AboutModel = require("../Models/AboutModel");

class AboutController {
  static addAboutItem(req, res) {
    const { title, description } = req.body;

    AboutModel.addAboutItem(title, description, (err, result) => {
      if (err) {
        console.error("Error adding About item to the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding About item to the database" },
        });
      }

      console.log("About item added successfully");
      const aboutItem = {
        id: result.insertId,
        title,
        description,
      };
      return res.status(200).json({
        data: aboutItem,
        success: true,
        errors: {},
      });
    });
  }

  static getAboutItemList(req, res) {
    AboutModel.getAboutItemList((err, results) => {
      if (err) {
        console.error("Error retrieving About items from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving About items from the database" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const aboutItems = results.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
      }));

      return res.status(200).json({
        data: aboutItems,
        success: true,
        errors: {},
      });
    });
  }

  static getAboutItemById(req, res) {
    const aboutItemId = parseInt(req.params.id, 10);

    AboutModel.getAboutItemById(aboutItemId, (err, result) => {
      if (err) {
        console.error("Error retrieving About item from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving About item from the database" },
        });
      }

      if (!result) {
        return res.status(404).json({
          data: null,
          success: true,
          errors: { message: "About item not found" },
        });
      }

      const aboutItem = {
        title: result.title,
        description: result.description,
      };

      return res.status(200).json({
        data: aboutItem,
        success: true,
        errors: {},
      });
    });
  }

  static updateAboutItem(req, res) {
    const aboutItemId = parseInt(req.params.id, 10);
    const { title, description } = req.body;

    AboutModel.updateAboutItem(aboutItemId, title, description, (err, result) => {
      if (err) {
        console.error("Error updating About item in the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating About item in the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "About item not found" });
      }

      console.log("About item updated successfully");
      const aboutItem = {
        id: aboutItemId,
        title,
        description,
      };
      return res.status(200).json({
        data: aboutItem,
        success: true,
        errors: {},
      });
    });
  }

  static deleteAboutItem(req, res) {
    const aboutItemId = parseInt(req.params.id, 10);

    AboutModel.deleteAboutItem(aboutItemId, (err, result) => {
      if (err) {
        console.error("Error deleting About item from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting About item from the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "About item not found" });
      }

      console.log("About item deleted successfully");
      return res.status(200).json({ message: "About item deleted successfully" });
    });
  }
}

module.exports = AboutController;
