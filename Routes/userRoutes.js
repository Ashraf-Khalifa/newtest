const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.get("/count", UserController.countUsers); // Make sure this line is included

// Routes for user-related actions
router.get("/list", UserController.getUserList); // Use a different controller method for listing users
router.post("/add", UserController.addUser); // Use a different controller method for adding a user
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);
module.exports = router;
