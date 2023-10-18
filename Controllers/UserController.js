const UserModel = require("../Models/UserModel");

class UserController {
  static async getUserById(req, res) {
    const userId = req.params.id;

    UserModel.getUserById(userId, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else if (results.length === 0) {
        res.status(404).json({
          data: null,
          success: false,
          errors: { message: "User not found" },
        });
      } else {
        const user = results[0];
        res.status(200).json({
          data: user,
          success: true,
          errors: {},
        });
      }
    });
  }

  static async getUserList(req, res) {
    UserModel.getListOfUsers((err, results) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else {
        res.status(200).json({
          data: results,
          success: true,
          errors: {},
        });
      }
    });
  }

  static async addUser(req, res) {
    const newUser = req.body;

    UserModel.insertUserInfo(newUser, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else {
        res.status(201).json({
          data: { id: results.insertId, ...newUser },
          success: true,
          errors: {},
        });
      }
    });
  }

  static async updateUserById(req, res) {
    const userId = req.params.id;
    const updatedData = req.body;

    UserModel.updateUserById(userId, updatedData, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          data: null,
          success: false,
          errors: { message: "User not found" },
        });
      } else {
        res.status(200).json({
          data: null,
          success: true,
          errors: {},
        });
      }
    });
  }

  static async deleteUserById(req, res) {
    const userId = req.params.id;

    UserModel.deleteUserById(userId, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          data: null,
          success: false,
          errors: { message: "User not found" },
        });
      } else {
        res.status(200).json({
          data: null,
          success: true,
          errors: {},
        });
      }
    });
  }

  static async countUsers(req, res) {
    UserModel.countUsers((err, count) => {
      if (err) {
        console.error("Database Error:", err);
        res.status(500).json({
          data: null,
          success: false,
          errors: { message: "An error occurred" },
        });
      } else {
        res.status(200).json({
          data: count,
          success: true,
          errors: {},
        });
      }
    });
  }
}

module.exports = UserController;
