const express = require("express");
const router = express.Router();
const Authcontroller = require("./auth.controller");
const validation = require("./auth.validation");
router.post("/register", validation.registerValidation, Authcontroller.register);
router.post("/login", validation.loginValidation, Authcontroller.login);
router.post("/forgot-password", Authcontroller.forgotPassword);
router.post("/reset-password/:token", Authcontroller.resetPassword);
module.exports = router;
