const pool = require("../../shared/database/DB");

// Get random products for the Home page.
const getRandomProducts = async (limit) => {
  try {
    const [rows] = await pool.query(
      `SELECT *
       FROM product_card
       ORDER BY RAND()
       LIMIT ?`,
      [limit],
    );

    return rows;
  } catch (error) {
    console.error(`Error in Home.repo - getRandomProducts: ${error.message}`);
    throw error;
  }
};

// Get highly rated products for the Home page.
const getBestSellingProducts = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT *
       FROM product_card
       WHERE rating > 3 order by rand() limit 4`,
    );

    return rows;
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