
const db = require("../../shared/Database/DB");
const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in findUserByEmail ===> ${error}`;
    return Error;
  }
};

const createUser = async (user) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO users 
      (first_name, last_name, gender, phone_number, email, password) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.first_name,
        user.last_name,
        user.gender,
        user.phone_number,
        user.email,
        user.password,
      ]
    );

    return result.insertId;
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in createUser ===> ${error}`;
    return Error;
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return rows[0];
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in findUserById ===> ${error}`;
    return Error;
  }
};

const saveResetToken = async (userId, token, expiresAt) => {
  try {
    await db.execute(
      `
      INSERT INTO password_resets
      (user_id, token, expires_at)
      VALUES (?, ?, ?)
      `,
      [userId, token, expiresAt]
    );
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in saveResetToken ===> ${error}`;
    return Error;
  }
};

const findResetToken = async (token) => {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM password_resets WHERE token = ?`,
      [token]
    );
    return rows[0];
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in findResetToken ===> ${error}`;
    return Error;
  }
};

const updatePassword = async (userId, password) => {
  try {
    await db.execute(
      `UPDATE users SET password = ? WHERE id = ?`,
      [password, userId]
    );
  } catch (error) {
    const Error = {};
    Error.error = `Error at Auth_Repo in updatePassword ===> ${error}`;
    return Error;
  }
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  saveResetToken,
  findResetToken,
  updatePassword,
};

