const db = require("../../shared/Database/db");
// Get all Produts
const getAllProducts = async () => {
  try {
    const [Products] = await db.execute(`SELECT * FROM products`);
    return Products;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
};
const getProductById = async(product_id) =>{
  try {
    const [Product] = await db.execute(`SELECT * FROM products where id = ?`,[product_id]);
    return Product;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
}
module.exports = {
  getAllProducts,
  getProductById,
};
