const profileService = require("./profile.service");

// GET /api/profile
const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// PUT /api/profile

const updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.status(200).json({ message: "Profile updated successfully", user: profile,});
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const profile = await profileService.updateAvatar(req.user.id,req.file);
    res.status(200).json({  message: "Avatar updated successfully",  user: profile,});
  } catch (error) {
    next(error);
  }
};
const uploadAvatar = async (req, res, next) => {
  const avatar = `uploads/avatars/${req.file.filename}`;

  try {
    const profile = await profileService.uploadAvatar(req.user.id,avatar);
    res.status(200).json({  message: "Avatar updated successfully",  user: profile});
  } catch (error) {
   next(error)
  } 
};


module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  updateAvatar
 };
