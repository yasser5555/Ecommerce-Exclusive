const pool = require("../../shared/Database/DB");
 const createProduct = async (
  category_id,
  title,
  description,
  old_price,
  stock,
  product_image,
) => {
  try {
    const [msg, x] = await pool.query(
      `INSERT into products ( category_id, title, description, old_price,stock, product_image)
    VALUES (?, ?, ?, ?, ?, ?)`,
      [category_id, title, description, old_price, stock, product_image],
    );
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.repo.CreateProduct ${error}`);
  }
};
const getAllProduct = async () => {
  try {
    const [msg, x] = await pool.query(
      `SELECT * FROM product_card where is_active = 1 `,
    );
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.repo.getAllProduct ${error}`);
  }
};

const deleteProduct = async (product_id) => {
  try {
    const [msg, x] = await pool.query(
      `UPDATE products SET is_active = 0 WHERE id = ?;`,
      [product_id],
    );
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.repo.deleteProduct ${error}`);
  }
};
const update_product = async (column, New_value, product_id) => {
  try {
    const response = await pool.query("call update_product(? , ? ,? )", [
      column,
      New_value,
      product_id,
    ]);
    return response;
  } catch (error) {
    throw new Error(`error at Admin.repo.update_product ${error}`);
  }
};

const getAdminDashboard = async () => {
  try {
    const [data, x] = await pool.query(`call GetAdminDashboard()`);
    return data;
  } catch (error) {
    throw new Error(`error at Admin.repo.getAdminDashboard ${error}`);
  }
};

const getAdminProductPage = async () => {
  try {
    const [page, x] = await pool.query("call GetAdminProduct()");
    return page;
  } catch (error) {
    throw new Error(`error at Admin.rep.getAdminProductPage ${error}`);
  }
};

const Search_Product = async (Tite) => {
  try {
    const response = await pool.query(
      "SELECT * FROM products WHERE title LIKE ? AND is_active = 1 LIMIT 10;",
      [`%${Tite}%`],
    );
    return response[0];
  } catch (error) {
    throw new Error(`error at Admin.repo.update_product ${error}`);
  }
};
 const getLowStock = async () => {
  try {
    const [Products, X] = await pool.query(
      "SELECT *FROM products WHERE stock <= 5",
    );
    return Products;
  } catch (error) {
    throw new Error(`error at Admin.repo.getLowStock ${error}`);
  }
};

  const getOutOfStock = async () => {
  try {
    const [Products, X] = await pool.query(
      "SELECT *FROM products WHERE stock <= 0",
    );
    return Products;
  } catch (error) {
    throw new Error(`error at Admin.repo.getLowStock ${error}`);
  }
};
module.exports = {
  createProduct,
  getAllProduct,
  deleteProduct,
  update_product,
  getAdminDashboard,
  getAdminProductPage,
  Search_Product,
  getLowStock,
  getOutOfStock,
};
