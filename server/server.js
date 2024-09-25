const express = require("express");
const compression = require("compression");
const { json, urlencoded } = require("express");
const app = express();
const conection = require("./config/db");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// compress all responses
app.use(compression());

// get the user routes
const userRoutes = require("./routes/userLogin");
// get the vitrail routes
const vitrailRoutes = require("./routes/vitrail");
// get the about routes
const aboutRoutes = require("./routes/about");
// get the review routes
const reviewRoutes = require("./routes/review");
// get the category routes
const categoryRoutes = require("./routes/category");

// middleware
app.use(json({ limit: "10mb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL.split(",") ?? "http://localhost:3000",
    credentials: true,
  })
);
app.use(urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser());

// Connect to database
conection();

// Server static assets if in production

app.use(express.static(path.join(__dirname, "..", "client", "build")));

// // Route de test
// app.get("/", (req, res) => {
//   res.send("API Running smoothly!");
// });

// User Routes
app.use("/api", userRoutes);

// vitrail routes
app.use("/api", vitrailRoutes);

// about routes
app.use("/api", aboutRoutes);

// review routes
app.use("/api", reviewRoutes);

// category routes
app.use("/api", categoryRoutes);

// serve the react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Port
const PORT = process.env.PORT || 8000;

// Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
