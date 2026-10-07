const pool = require("../../shared/database/DB");

const getRandomProductCards = async (limit, filter = "", filterParams = []) => {
  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM product_card ${filter}`,
    filterParams,
  );
  const total = Number(countRows[0].total);

  if (total === 0) {
    return [];
  }

  const offset = Math.floor(Math.random() * total);
  const [rows] = await pool.query(
    `SELECT * FROM product_card ${filter} ORDER BY p_id LIMIT ? OFFSET ?`,
    [...filterParams, limit, offset],
  );

  if (rows.length === limit || offset === 0) {
    return rows;
  }

  const [wrappedRows] = await pool.query(
    `SELECT * FROM product_card ${filter} ORDER BY p_id LIMIT ?`,
    [...filterParams, limit - rows.length],
  );

  return rows.concat(wrappedRows);
};

// Get random products for the Home page.
const getRandomProducts = async (limit) => {
  try {
    return await getRandomProductCards(limit);
  } catch (error) {
    console.error(`Error in Home.repo - getRandomProducts: ${error.message}`);
    throw error;
  }
};

// Get highly rated products for the Home page.
const getBestSellingProducts = async () => {
  try {
    return await getRandomProductCards(4, "WHERE rating > ?", [3]);
  } catch (error) {
    console.error(
      `Error in Home.repo - getBestSellingProducts: ${error.message}`,
    );
    throw error;
  }
};

// Get all categories for the Home page.
const getCategories = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT *
       FROM categories`,
    );

    return rows;
  } catch (error) {
    console.error(`Error in Home.repo - getCategories: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getRandomProducts,
  getBestSellingProducts,
  getCategories,
};