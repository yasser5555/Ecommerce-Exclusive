const HomeRepo = require("./Home.repo");

// Get random products after validating the requested limit.
const getRandomProducts = async (limit) => {
  try {
    const productLimit = Number(limit);
    if (!Number.isInteger(productLimit) || productLimit <= 0) {
      throw new Error("Product limit must be a positive integer");
    }
    return await HomeRepo.getRandomProducts(productLimit);
  } catch (error) {
    console.error(
      `Error in Home.service - getRandomProducts: ${error.message}`,
    );
    throw error;
  }
};

// Get highly rated products for the Home page.
const getBestSellingProducts = async () => {
  try {
    return await HomeRepo.getBestSellingProducts();
  } catch (error) {
    console.error(
      `Error in Home.service - getBestSellingProducts: ${error.message}`,
    );
    throw error;
  }
};

// Get categories for the Home page.
const getCategories = async () => {
  try {
    return await HomeRepo.getCategories();
  } catch (error) {
    console.error(`Error in Home.service - getCategories: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getRandomProducts,
  getBestSellingProducts,
  getCategories,
};