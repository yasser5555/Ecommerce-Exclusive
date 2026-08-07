const express = require("express");
const router = express.Router();

const profileController = require("./profile.controller");
const { protect } = require("../../shared/Middleware/auth.middleware");
const upload = require("../../shared/Middleware/upload.middleware");
// Current profiles
router.get("/", protect, profileController.getProfile);
// Update profiles
router.put("/", protect, profileController.updateProfile);
router.post("/uploadAvatar",protect,upload.single("avatar"),profileController.uploadAvatar,);
router.put("/updateAvatar",protect,upload.single("avatar"),profileController.updateAvatar,);
module.exports = router;
