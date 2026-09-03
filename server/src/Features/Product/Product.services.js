const ProductRepository = require("./Product.repository");
// For Products page
const getAllProducts = async () => {
  try {
    const products = await ProductRepository.getAllProducts();
    return products;
  } catch (error) {
    throw new Error(`error at Product.services.getAllProducts ===> ${error}`);
  }
};
// For product-page
const getProductById = async (product_id) => {
  try {
    const products = await ProductRepository.getProductById(product_id);
    return products;
  } catch (error) {
    throw new Error(`error at Product.services.getAllProducts ===> ${error}`);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
