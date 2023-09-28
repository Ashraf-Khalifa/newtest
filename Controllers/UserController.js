const UserModel = require("../Models/UserModel");

class UserController {
  static async getUserById(req, res) {
    const userId = req.params.id;

    UserModel.getUserById(userId, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "An error occurred" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];
      return res
        .status(200)
        .json({ message: "User retrieved successfully", user });
    });
  }

  static async updateUserById(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    UserModel.updateUserById(userId, updatedData, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "An error occurred" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User updated successfully" });
    });
  }

  static async deleteUserById(req, res) {
    const userId = req.params.id;

    UserModel.deleteUserById(userId, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "An error occurred" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    });
  }


  static async countUsers(req, res) {
    UserModel.countUsers((err, count) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      }
  
      return res.status(200).json({
        data: count,
        success: true,
        errors: {},
      });
    });
  }
}

module.exports = UserController;
