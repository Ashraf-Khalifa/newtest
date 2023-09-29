const express = require("express");
const router = express.Router();
const BackgroundController = require("../Controllers/BackgroundController");


router.post("/add", BackgroundController.addBackground);
router.get("/list", BackgroundController.getBackgroundList);
router.get("/:id", BackgroundController.getBackgroundById);
router.put("/update/:id", BackgroundController.updateBackground);
router.delete("/delete/:id", BackgroundController.deleteBackground);

module.exports = router;
