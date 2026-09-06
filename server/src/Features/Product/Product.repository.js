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

const findProductByTitle = async (title) => {
  try {
    const [rows, x] = await db.query(
      `SELECT * FROM products WHERE products.title LIKE ? ORDER BY Added_at DESC, id ASC`,
      [`${title}%`],
    );    
    return rows;
  } catch (error) {
    throw new Error(
      `error at Product.repository.findProductByTitle ===> ${error.message}`,
    );
  }
};

const findProductPosition = async (product_id) => {
  try {
    const [Position, x] = await db.query(`get_Product_Postion (?)`, [
      product_id,
    ]);
    return Position;
  } catch (error) {
    throw new Error(
      `error at Product.repository.findProductPosition ===> ${error.message}`,
    );
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductsCount,
  findProductByTitle,
  findProductPosition,
};
