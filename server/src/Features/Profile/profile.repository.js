const db = require("../../shared/Database/DB");
// Get user profile by id

const getProfileById = async (userId) => {
  const [rows] = await db.execute(
    `SELECT id, name, email, avatar, created_at FROM users WHERE id = ?`,
    [userId],
  );
  return rows[0];
};

// Update user profile
const updateProfile = async (userId, name, email) => {
  const [result] = await db.execute(
    `UPDATE users SET name = ?, email = ? WHERE id = ? `,
    [name, email, userId],
  );
  return result;
};

const uploadAvatar = async(userId,avatar) =>{
  const [result] = await db.execute(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [avatar, userId]
  );
  return result;
}

 const updateAvatar = async (userId, avatar) => {
  const [result] = await db.execute(
    "UPDATE users SET avatar = ? WHERE id = ?",
    [avatar, userId]
  );

  return result;
};


module.exports = {
  getProfileById,
  updateProfile,
  uploadAvatar,
  updateAvatar
 };
