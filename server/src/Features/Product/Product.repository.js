const db = require("../../shared/Database/db");
// Get all Produts
const getAllProducts = async (limit, offset) => {
  try {
    const [Products] = await db.query(
      `select * from products LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    return Products;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
};

const getProductById = async (product_id) => {
  try {
    const [Product] = await db.query(`SELECT * FROM products where id = ?`, [
      product_id,
    ]);
    return Product;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
};

const getProductsCount = async () => {
  try {
    const [result] = await db.query(`SELECT COUNT(*) AS total FROM products`);

    return Number(result[0].total);
  } catch (error) {
    throw new Error(
      `error at Product.repository.getProductsCount ===> ${error.message}`,
    );
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  getProductsCount,
};
