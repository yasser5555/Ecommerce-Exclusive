const db = require("../../shared/Database/DB");

const findUserByEmail = async (email) => {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const createUser = async (user) => {
  const [result] = await db.execute(
    `INSERT INTO users (first_name , last_name , gender, phone_number , email , password) VALUES(?,?,?,?,?,?)`,
    [
      user.first_name,
      user.last_name,
      user.gender,
      user.phone_number,
      user.email,
      user.password,
    ],
  );
  return result.insertId;
};

const findUserById = async (id) => {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id = ? `, [id]);
  return rows[0];
  try {
  } catch (error) {
    console.log(`Cannot find user_id bec of ${error}`);
  }
};
const saveResetToken = async (userId, token, expiresAt) => {
  await db.execute(
    `
      INSERT INTO password_resets
      (user_id, token, expires_at)
      VALUES (?, ?, ?)
    `,
    [userId, token, expiresAt],
  );
};

const findResetToken = async (token) => {
  const [rows] = await db.execute(
    `
    SELECT *
    FROM password_resets
    WHERE token = ?
    `,
    [token],
  );

  return rows[0];
};

const updatePassword = async (userId, password) => {
  await db.execute(
    `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `,
    [password, userId],
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  saveResetToken,
  findResetToken,
  updatePassword,
};
