const db = require("../../shared/Database/db");
// Get all Produts
const getAllProducts = async (limit, offset) => {
  try {
    const [Products] = await db.query(
      `SELECT * FROM product_card LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    return Products;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
};

const getProductById = async (product_id) => {
  try {
    const [Product] = await db.query(
      `SELECT * FROM product_card where p_id = ?`,
      [product_id],
    );
    return Product;
  } catch (error) {
    throw new Error(`error at Product.repository.getAllProducts ===> ${error}`);
  }
};

const getProductsCount = async () => {
  try {
    const [result] = await db.query(
      `SELECT COUNT(*) AS total FROM product_card`,
    );
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
      `SELECT * FROM product_card WHERE product_card.name LIKE ? ORDER BY product_card.rating DESC, product_card.p_id ASC`,
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
const GetCatogeries = async () => {
  try {
    const [catogeries, x] = await db.query(
      `select product_card.category , count(product_card.cat_id) as product_number from product_card GROUP BY category`,
    );
    return catogeries;
  } catch (error) {
    console.error(
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
  GetCatogeries,
};
