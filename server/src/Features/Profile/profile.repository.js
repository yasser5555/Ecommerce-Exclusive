const db = require("../../shared/Database/DB");
// Get user profile by id
const getProfileById = async (userId) => {
  try {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [
      userId,
    ]);

    return rows[0];
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.getProfileById ===> ${error}`;
    return Error;
  }
};

// Update user profile
const updateProfile = async (
  userId,
  first_name,
  last_name,
  phone_number,
  email,
) => {
  try {
    const [result] = await db.query(
      `UPDATE users 
       SET first_name = ?, last_name = ?, phone_number = ?, email = ? 
       WHERE id = ?`,
      [first_name, last_name, phone_number, email, userId],
    );

    return result;
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.updateProfile ===> ${error}`;
    return Error;
  }
};

// Upload avatar
const uploadAvatar = async (userId, avatar) => {
  try {
    const [result] = await db.query(
      `UPDATE users SET avatar = ? WHERE id = ?`,
      [avatar, userId],
    );

    return result;
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.uploadAvatar ===> ${error}`;
    return Error;
  }
};

// Update avatar
const updateAvatar = async (userId, avatar) => {
  try {
    const [result] = await db.query(
      `UPDATE users SET avatar = ? WHERE id = ?`,
      [avatar, userId],
    );

    return result;
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.updateAvatar ===> ${error}`;
    return Error;
  }
};

const GetProfileData = async (userId) => {
  try {
    const [rows, x] = await db.query(`CALL get_user_data(?)`, [userId]);
    return rows[0][0];
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.getProfileById ===> ${error}`;
    return Error;
  }
};

const GetUserCards = async (userId) => {
  try {
    const [rows, x] = await db.query(
      `SELECT * FROM user_card WHERE user_id = ?`,
      [userId],
    );
    return rows;
  } catch (error) {
    throw new Error(`error at Profile.repo.GetUserCards ===> ${error}`);
  }
};
const Add_userCard = async (
  user_id,
  card_type,
  bank_name,
  last4,
  balance,
  expiry_day,
  expiry_month,
  expiry_year,
) => {
  try {
    const [result] = await db.query(`CALL add_user_card(?,?,?,?,?,?,?,?)`, [
      user_id,
      card_type,
      bank_name,
      last4,
      expiry_day,
      expiry_month,
      expiry_year,
      balance,
    ]);

    return result;
  } catch (error) {
    const Error = {};
    Error.error = `error at Profile.repo.Add_userCard ===> ${error}`;
    return Error;
  }
};

const DeleteUserCard = async (userId) => {
  try {
    const [rows, x] = await db.query(
      `DELETE FROM credit_card WHERE user_id = ? ORDER BY id DESC LIMIT 1;`,
      [userId],
    );
    return rows;
  } catch (error) {
    throw new Error(`error at Profile.repo.DeleteUserCard ===> ${error}`);
  }
};


const GetUserAddresses = async (userId) => {
  try {
    const [rows, x] = await db.query(
      `select * from user_address where user_id = ? LIMIT 2`,
      [userId],
    );
    return rows;
  } catch (error) {
    throw new Error(`error at Profile.repo.GetUserAddresses ===> ${error}`);
  }
};



const addUserAddress = async (
  user_id,
  country,
  city,
  street_number,
  building_number,
  apartement_number,
) => {
  try {
    const [rows, x] = await db.query(`CALL add_user_address(?,?,?,?,?,?)`, [
      user_id,
      country,
      city,
      street_number,
      building_number,
      apartement_number,
    ]);
    return rows;
  } catch (error) {
    throw new Error(`error at Profile.repo.addUserAddress ${error}`);
  }
};

const deleteUserAddress = async (user_id) => {
  try {
    const [rows, x] = await db.query(
      `DELETE FROM addresses WHERE id = ? ORDER BY id DESC LIMIT 1`,
      [user_id],
    );
    return rows
  } catch (error) {
    throw new Error(`error at Profile.repo.deleteUserAddress ${error}`);
  }
};

const getUserOrders = async (user_id) => {
  try {
    const [rows, x] = await db.query(
      `SELECT * FROM user_orders WHERE id = ? ORDER BY total_price desc`,
      [user_id],
    );
    return rows;
  } catch (error) {
    throw new Error(`error at Profile.repo.deleteUserAddress ${error}`);
  }
};

module.exports = {
  getProfileById,
  updateProfile,
  uploadAvatar,
  updateAvatar,
  GetProfileData,
  GetUserCards,
  Add_userCard,
  DeleteUserCard,
  GetUserAddresses,
  addUserAddress,
  deleteUserAddress,
  getUserOrders,
};
