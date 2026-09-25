const pool = require("../../shared/database/DB");

const CreateOrders = async (user_id, address_id, status, products, card_id) => {
  try {
    const [result] = await pool.query(`CALL create_order(?, ?, ?, ?, ?)`, [
      user_id,
      address_id,
      status || "pending",
      JSON.stringify(products),
      card_id || null,
    ]);

    return result;
  } catch (error) {
    throw new Error(`Error at Orders.Repo.CreateOrders: ${error.message}`);
  }
};

const GetOrders = async (user_id) => {
  try {
    const [Data] = await pool.query(
      `SELECT *
       FROM user_order
       WHERE user_id = ?`,
      [user_id],
    );

    return Data;
  } catch (error) {
    throw new Error(`Error at Orders.Repo.GetOrders: ${error.message}`);
  }
};

const getTotalPayment = async (order_id, user_id) => {
  try {
    const [Data, X] = await pool.query(
      `
      SELECT
        SUM(
          order_items.quantity * order_items.price
        ) AS total_payment
      FROM orders
      INNER JOIN order_items
        ON orders.id = order_items.order_id
      WHERE orders.id = ?
        AND orders.user_id = ?
      `,
      [order_id, user_id],
    );
    return Data;
  } catch (error) {
    throw new Error(`Error at Orders.Repo.getTotalPayment: ${error.message}`);
  }
};
// Get order details by order_id
const getOrderDetails = async (order_id) => {
  try {
    // Query user_order view to find order by order_id
    const [user_order] = await pool.query(
      "select * from user_order where order_id = ?",
      [order_id],
    );
    // Return order details
    return user_order;
  } catch (error) {
    // Throw error if query fails
    throw new Error(`Error at Orders.Repo.getOrderDetails: ${error.message || error}`);
  }
}; 

// Search orders containing product by title or search within a specific order
const search_Order = async (title) => {
  try {
    // If order_id is provided, search within that specific order
  

    // Query user_order view to find orders matching product title
  
    // const [product] = await pool.query(
    //   "SELECT * FROM user_order WHERE products LIKE ?",
    //   [`%${title}%`],
    // );
  
    const [product] = await pool.query(
      "call SearchForOrder(?)",
      [`%${title}%`],
    );
    // Return matched orders
    return product;
  } catch (error) {
    // Throw error if query fails
    throw new Error(`Error at Orders.Repo.search_Order: ${error.message || error}`);
  }
};

module.exports = {
  CreateOrders,
  GetOrders,
  getTotalPayment,
  getOrderDetails,
  search_Order,
};
