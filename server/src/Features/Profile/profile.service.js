const profileRepository = require("./profile.repository");

// Get current user profile
const getProfile = async (userId) => {
  const user = await profileRepository.getProfileById(userId);
  if (!user) throw new Error("User not found");

  return user;
};

// update profile 
const updateProfile = async (userId, data) => {
  await profileRepository.updateProfile(
    userId,
    data.first_name,
    data.last_name,
    data.phone_number,
    data.email,
  );
  return await profileRepository.getProfileById(userId);
};

const updateAvatar = async (userId, file) => {
  if (!file) throw new Error("Please select an image");
  const avatarPath = `server/src/uploads/avatars/${file.filename}`;
  await profileRepository.updateAvatar(userId, avatarPath);
  return await profileRepository.getProfileById(userId);
};
const uploadAvatar = async (userId, file) => {
  if (!file) throw new Error("Please select an image");
  const avatarPath = `${file}`;
  await profileRepository.uploadAvatar(userId, avatarPath);
  return await profileRepository.getProfileById(userId);
};

module.exports = {
  getProfile,
  updateProfile,
  uploadAvatar,
  updateAvatar,
};
