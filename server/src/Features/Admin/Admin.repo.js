const pool = require("../../shared/database/DB");
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
    const [msg, x] = await pool.query(`SELECT * FROM product_card`);
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.repo.getAllProduct ${error}`);
  }
};

const deleteProduct = async (product_id) => {
  try {
    const [msg, x] = await pool.query(
      `DELETE  from products WHERE products.id = ?;`,
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
module.exports = {
  createProduct,
  getAllProduct,
  deleteProduct,
  update_product,
  getAdminDashboard,
};
