const express = require("express");
const cors = require("cors");
const authRoutes = require("./Features/Auth/auth.routes");
const profileRoutes = require("./Features/Profile/profile.routes.js");
const app = express();
const path = require("path");

// ! Middlewares

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/src/uploads")));
module.exports = app;
