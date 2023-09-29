const IconModel = require("../Models/IconsModel");

class IconController {
  static addIcon(req, res) {
    // Extract data from the request
    const { name, link } = req.body;

    // Call a method to add the icon to the database
    IconModel.addIcon(name, link, (err, result) => {
      if (err) {
        console.error("Error adding icon to the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding icon to the database" },
        });
      }

      console.log("Icon added successfully");
      const iconItem = {
        id: result.insertId,
        name,
        link,
      };
      return res.status(200).json({
        data: iconItem,
        success: true,
        errors: {},
      });
    });
  }

  static getIconList(req, res) {
    // Call a method to retrieve the list of icons from the database
    IconModel.getIconList((err, results) => {
      if (err) {
        console.error("Error retrieving icons from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving icons from the database" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const icons = results.map((item) => ({
        id: item.id,
        name: item.name,
        link: item.link,
      }));

      return res.status(200).json({
        data: icons,
        success: true,
        errors: {},
      });
    });
  }

  static getIconById(req, res) {
    const iconId = parseInt(req.params.id, 10);

    // Call a method to retrieve a specific icon by ID from the database
    IconModel.getIconById(iconId, (err, result) => {
      if (err) {
        console.error("Error retrieving icon from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving icon from the database" },
        });
      }

      if (!result) {
        return res.status(404).json({
          data: null,
          success: true,
          errors: { message: "Icon not found" },
        });
      }

      const iconItem = {
    
        link: result.link,
      };

      return res.status(200).json({
        data: iconItem,
        success: true,
        errors: {},
      });
    });
  }

  static updateIcon(req, res) {
    const iconId = parseInt(req.params.id, 10);
    const { name, link } = req.body;

    // Call a method to update an icon by ID in the database
    IconModel.updateIcon(iconId, name, link, (err, result) => {
      if (err) {
        console.error("Error updating icon in the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating icon in the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Icon not found" });
      }

      console.log("Icon updated successfully");
      const iconItem = {
        id: iconId,
        name,
        link,
      };
      return res.status(200).json({
        data: iconItem,
        success: true,
        errors: {},
      });
    });
  }

  static deleteIcon(req, res) {
    const iconId = parseInt(req.params.id, 10);

    // Call a method to delete an icon by ID from the database
    IconModel.deleteIcon(iconId, (err, result) => {
      if (err) {
        console.error("Error deleting icon from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting icon from the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Icon not found" });
      }

      console.log("Icon deleted successfully");
      return res.status(200).json({ message: "Icon deleted successfully" });
    });
  }
}

module.exports = IconController;
