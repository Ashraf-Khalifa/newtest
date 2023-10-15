const express = require("express");
const router = express.Router();
const QRController = require("../Controllers/QrController");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises"); // To work with the file system
const QRModel = require('../Models/QrModel'); // Import your QRModel

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "audio") {
      cb(null, "audio/"); // Store audio files in the "audio" directory
    } else if (file.fieldname === "image") {
      cb(null, "image/"); // Store image files in the "image" directory
    } else if (file.fieldname === "video") {
      cb(null, "video/"); // Store video files in the "video" directory
    } else if (file.fieldname === "logo") {
      cb(null, "logo/"); // Store logo files in the "logo" directory
    } else {
      // Handle other types of files or fields as needed
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes for QR code-related actions
router.post("/add", upload.fields([{ name: "image" }, { name: "audio" }, { name: "video" }, { name: "logo" }]), QRController.addQR); // Add a QR code with image and audio
router.put("/update/:qrId", upload.fields([{ name: "image" }, { name: "audio" }, { name: "video" }, { name: "logo" }]), QRController.updateQR); // Update a QR code
router.get("/list", QRController.getQRs); // Retrieve QR code list
router.get("/:qrId", QRController.getQRById);
router.delete("/delete/:qrId", QRController.deleteQR); // Delete a QR code
router.delete("/deleteImage/:qrId", QRController.deleteImage);
router.delete("/deleteLogo/:qrId", QRController.deleteLogo);
router.delete("/deleteAudio/:qrId", QRController.deleteAudio);
router.delete("/deleteVideo/:qrId", QRController.deleteVideo);




module.exports = router;
