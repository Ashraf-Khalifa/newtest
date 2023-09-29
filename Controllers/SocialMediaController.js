const SocialMediaModel = require("../Models/SocialMediaModel");

class SocialMediaController {
  static addSocialMedia(req, res) {
    // Extract data from the request
    const { link } = req.body;

    // Call a method to add the social media item to the database
    SocialMediaModel.addSocialMedia(link, (err, result) => {
      if (err) {
        console.error("Error adding social media item to the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error adding social media item to the database" },
        });
      }

      console.log("Social media item added successfully");
      const socialMediaItem = {
        id: result.insertId,
        link,
      };
      return res.status(200).json({
        data: socialMediaItem,
        success: true,
        errors: {},
      });
    });
  }

  static getSocialMediaList(req, res) {
    // Call a method to retrieve the list of social media items from the database
    SocialMediaModel.getSocialMediaList((err, results) => {
      if (err) {
        console.error("Error retrieving social media items from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving social media items from the database" },
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          data: [],
          success: true,
          errors: {},
        });
      }

      const socialMediaItems = results.map((item) => ({
        id: item.id,
        link: item.link,
      }));

      return res.status(200).json({
        data: socialMediaItems,
        success: true,
        errors: {},
      });
    });
  }

  static getSocialMediaById(req, res) {
    const socialMediaId = parseInt(req.params.id, 10);

    // Call a method to retrieve a specific social media item by ID from the database
    SocialMediaModel.getSocialMediaById(socialMediaId, (err, result) => {
      if (err) {
        console.error("Error retrieving social media item from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error retrieving social media item from the database" },
        });
      }

      if (!result) {
        return res.status(404).json({
          data: null,
          success: true,
          errors: { message: "Social media item not found" },
        });
      }

      const socialMediaItem = {
        
        link: result.link,
      };

      return res.status(200).json({
        data: socialMediaItem,
        success: true,
        errors: {},
      });
    });
  }

  static updateSocialMedia(req, res) {
    const socialMediaId = parseInt(req.params.id, 10);
    const { link } = req.body;

    // Call a method to update a social media item by ID in the database
    SocialMediaModel.updateSocialMedia(socialMediaId, link, (err, result) => {
      if (err) {
        console.error("Error updating social media item in the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error updating social media item in the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Social media item not found' });
      }

      console.log("Social media item updated successfully");
      const socialMediaItem = {
        id: socialMediaId,
        link,
      };
      return res.status(200).json({
        data: socialMediaItem,
        success: true,
        errors: {},
      });
    });
  }

  static deleteSocialMedia(req, res) {
    const socialMediaId = parseInt(req.params.id, 10);

    // Call a method to delete a social media item by ID from the database
    SocialMediaModel.deleteSocialMedia(socialMediaId, (err, result) => {
      if (err) {
        console.error("Error deleting social media item from the database", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "Error deleting social media item from the database" },
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Social media item not found' });
      }

      console.log("Social media item deleted successfully");
      return res.status(200).json({ message: 'Social media item deleted successfully' });
    });
  }
}

module.exports = SocialMediaController;
