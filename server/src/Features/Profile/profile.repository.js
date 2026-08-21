const db = require("../../shared/Database/DB");
// Get user profile by id

const getProfileById = async (userId) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
  return rows[0];
};

// Update user profile
const updateProfile = async (userId, first_name, last_name,phone_number, email) => {
  const [result] = await db.execute(
    `UPDATE users SET first_name = ?,last_name = ?,phone_number = ?,email = ? WHERE id = ? `,
    [first_name, last_name, phone_number, email, userId],
  );
  return result;
};

const uploadAvatar = async (userId, avatar) => {
  const [result] = await db.execute(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [avatar, userId],
  );
  return result;
};

const updateAvatar = async (userId, avatar) => {
  const [result] = await db.execute(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [avatar, userId],
  );

  return result;
};

module.exports = {
  getProfileById,
  updateProfile,
  uploadAvatar,
  updateAvatar,
};
