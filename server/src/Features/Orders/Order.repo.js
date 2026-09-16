const pool = require("../../shared/database/DB");

const CreateOrders = async (user_id, address_id, total_price, status) => {
  try {
    const [msg, X] = await pool.query(
      `INSERT INTO orders
      (user_id, address_id, total_price, status)
      VALUES (?, ?, ?, ?)`,
      [user_id, address_id, total_price, status || "pending"],
    );

    return msg;
  } catch (error) {
    throw new Error(`Error at Orders.Repo.CreateOrders: ${error.message}`);
  }
};

const CreateOrderHistroy = async (order_id, product_id, quantity, price) => {
  try {
    const [msg, X] = await pool.query(
      `INSERT INTO order_items
      (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)`,
      [order_id, product_id, quantity, price],
    );

    return msg;
  } catch (error) {
    throw new Error(
      `Error at Orders.Repo.CreateOrderHistroy: ${error.message}`,
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
const getorderpage = async (order_id) => {
  try {
    const [order] = await pool.query();
  } catch (error) {
    throw new Error(`Error at Orders.Repo.getorderpage: ${error}`);
  }
};

const PayOrder = async (order_id, user_id, card_id) => {
  try {
    const [result] = await pool.query(`CALL PayOrder(?, ?, ?)`, [
      order_id,
      user_id,
      card_id,
    ]);

    return result;
  } catch (error) {
    throw new Error(`Error at Orders.Repo.PayOrder: ${error.message}`);
  }
};
module.exports = {
  CreateOrders,
  CreateOrderHistroy,
  GetOrders,
  getTotalPayment,
  PayOrder
};
