const express = require("express");
const router = express.Router();
const AboutController = require("../Controllers/AboutController");

router.post("/add", AboutController.addAboutItem);
router.get("/list", AboutController.getAboutItemList);
router.get("/:id", AboutController.getAboutItemById);
router.put("/update/:id", AboutController.updateAboutItem);
router.delete("/delete/:id", AboutController.deleteAboutItem);

module.exports = router;
