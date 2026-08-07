const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const validation = require("./auth.validation");

router.post("/register", validation.registerValidation, controller.register);

router.post("/login", validation.loginValidation, controller.login);
router.post("/forgot-password", controller.forgotPassword);

router.post("/reset-password/:token", controller.resetPassword);
module.exports = router;
