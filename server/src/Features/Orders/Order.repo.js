const pool = require("../../shared/database/DB");

const CreateOrders = async (
  user_id,
  address_id,
  status,
  products,
  card_id,
) => {
  try {
    const [result] = await pool.query(
      `CALL create_order(?, ?, ?, ?, ?)`,
      [
        user_id,
        address_id,
        status || "pending",
        JSON.stringify(products),
        card_id || null,
      ],
    );

    return result;

  } catch (error) {
    throw new Error(
      `Error at Orders.Repo.CreateOrders: ${error.message}`,
    );
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
 
 
module.exports = {
  CreateOrders,
   GetOrders,
  getTotalPayment,

};
