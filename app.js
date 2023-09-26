require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Use the 'morgan' middleware for logging HTTP requests
app.use(morgan("dev"));
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"], // Include DELETE here
}));
app.options('*', cors()); // Enable CORS for all routes that support OPTIONS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Include and use your routes here
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const galleryRoutes = require("./Routes/galleryRoutes"); // Updated route for gallery
const eventRoutes = require("./Routes/eventRoutes");
const shopRoutes = require("./Routes/shopRoutes");
const privacyRoutes = require("./Routes/privacyRoutes");
const termsRoutes = require("./Routes/termsRoutes");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/gallery", galleryRoutes); // Updated route for gallery
app.use("/event", eventRoutes);
app.use("/shop", shopRoutes);
app.use("/privacy", privacyRoutes);
app.use("/terms", termsRoutes);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
