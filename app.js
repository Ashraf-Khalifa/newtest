require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");


// Use the 'morgan' middleware for logging HTTP requests
app.use(morgan("dev"));
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"], // Include DELETE here
    allowedHeaders: ["Content-Type"], // Allow the Content-Type header
  })
);
app.options("*", cors()); // Enable CORS for all routes that support OPTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ... Your existing code ...

// Include and use your routes here
const authRoutes = require("./Routes/authRoutes");

const userRoutes = require("./Routes/userRoutes");
const galleryRoutes = require("./Routes/galleryRoutes"); // Updated route for gallery
const eventRoutes = require("./Routes/eventRoutes");
const shopRoutes = require("./Routes/shopRoutes");
const privacyRoutes = require("./Routes/privacyRoutes");
const termsRoutes = require("./Routes/termsRoutes");
const socialMediaRoutes = require("./Routes/SocialMediaRoutes");
const iconsRoutes = require("./Routes/IconsRoutes");
const backgroundRoutes = require("./Routes/BackgroundRoutes");
const aboutRoutes = require("./Routes/AboutRoutes");
const qrRoutes = require("./Routes/QrRoutes");
const adminRoutes = require("./Routes/superadmin");


app.use("/auth", authRoutes);

app.use("/user", userRoutes);
app.use("/gallery", galleryRoutes); // Updated route for gallery
app.use("/event", eventRoutes);
app.use("/shop", shopRoutes);
app.use("/privacy", privacyRoutes);
app.use("/terms", termsRoutes);
app.use("/social_media", socialMediaRoutes); 
app.use("/icons", iconsRoutes);
app.use("/background", backgroundRoutes);
app.use("/about", aboutRoutes);
app.use("/qr", qrRoutes);
app.use("/admin", adminRoutes);

// Serve static audio and video files
app.use("/audio", express.static(path.join(__dirname, "audio")));
app.use("/video", express.static(path.join(__dirname, "video")));
app.use("/logo", express.static(path.join(__dirname, "logo")));
app.use("/image", express.static(path.join(__dirname, "image")));
app.use("/uploads", express.static(path.join(__dirname, "")));




app.get("/", (req, res) => {
  res.send({ message: "Digital passport app", my_env_var: process.env.MY_VAR });
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
});




const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
