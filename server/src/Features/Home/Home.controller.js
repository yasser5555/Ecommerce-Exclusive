const HomeService = require("./Home.services");

// Return random products to the client.
const getRandomProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await HomeService.getRandomProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error(
      `Error in Home.controller - getRandomProducts: ${error.message}`,
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// Return highly rated products to the client.
const getBestSellingProducts = async (req, res) => {
  try {
    const products = await HomeService.getBestSellingProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(
      `Error in Home.controller - getBestSellingProducts: ${error.message}`,
    );
    res.status(500).json({
      message: error.message,
    });
  }
};

// Return all categories to the client.
const getCategories = async (req, res) => {
  try {
    const categories = await HomeService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(`Error in Home.controller - getCategories: ${error.message}`);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRandomProducts,
  getBestSellingProducts,
  getCategories,
};
