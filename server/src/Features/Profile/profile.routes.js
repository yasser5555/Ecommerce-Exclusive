const express = require("express");
const router = express.Router();

const profileController = require("./profile.controller");
const { protect } = require("../../shared/Middleware/auth.middleware");
const upload = require("../../shared/Middleware/upload.middleware");
// Get /Profile
router.get("/", protect, profileController.getProfile);
// Get /ProfileData
router.get("/profileData", protect, profileController.GetProfileData);
// Get /ProfileData
router.get("/user_cards", protect, profileController.GetUserCards);
// post /add_user_card
router.post("/add_user_card", protect, profileController.AddUserCards);
// Delete /del_Card
router.delete("/del_card", protect, profileController.DeleteUserCard);
// Get /user_address
 router.get("/user_address", protect, profileController.GetUserAddresses);
// Post /Add_address
router.post("/add_address", protect, profileController.add_User_Address);
// Get /get_user_orders
router.get("/get_user_orders", protect, profileController.get_User_Orders);
// Put /Updateprofiles
router.put("/", protect, profileController.updateProfile);
// post /uploadAvatar
router.post("/uploadAvatar",protect,upload.single("avatar"),profileController.uploadAvatar,);
// put /updateAvatar
router.put("/updateAvatar",protect,upload.single("avatar"),profileController.updateAvatar,);
module.exports = router;
