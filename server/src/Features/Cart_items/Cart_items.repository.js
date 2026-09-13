const pool = require("../../shared/database/DB");

const createCartItem = async (user_id, product_id, quantity) => {
  try {
    const [result] = await pool.query(
      ` INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?) `,
      [user_id, product_id, quantity],
    );
    return result;
  } catch (error) {
    console.log(`error at Cart_items.repo createCartItem: ${error}`);
    throw error;
  }
};

const getCart = async (user_id) => {
  try {
    const [Cart_items, x] = await pool.query(
      ` SELECT * FROM user_cart_items WHERE user_cart_id = ?`,
      [user_id],
    );
    return Cart_items;
  } catch (error) {
    console.log(`error at Cart_items.repo getCart: ${error}`);
    throw error;
  }
};
// ! Error can be happend here so be careful 
const increaseQuantity = async (cart_id, user_id, quantity) => {
  try {
    const [Updated_value, x] = await pool.query(
      ` UPDATE cart_items SET quantity = quantity + ? WHERE id = ? AND user_id = ? `,
      [quantity, cart_id, user_id],
    );

    return Updated_value;
  } catch (error) {
    console.log(`error at Cart_items.repo increaseQuantity: ${error}`);
    throw error;
  }
};

const decreaseQuantity = async (cart_id, user_id, quantity) => {
  try {
    const [Updated_value, x] = await pool.query(
      ` UPDATE cart_items SET quantity = quantity - ? WHERE id = ? AND user_id = ? AND quantity - ? >= 1 `,
      [quantity, cart_id, user_id, quantity],
    );

    return Updated_value;
  } catch (error) {
    console.log(`error at Cart_items.repo decreaseQuantity: ${error}`);
    throw error;
  }
};

const deleteCartItem = async (cart_id, user_id) => {
  try {
    const [result] = await pool.query(
      ` DELETE FROM cart_items WHERE id = ? AND user_id = ? `,
      [cart_id, user_id],
    );

    return result;
  } catch (error) {
    console.log(`error at Cart_items.repo deleteCartItem: ${error}`);
    throw error;
  }
};

const clearCart = async (user_id) => {
  try {
    const [result] = await pool.query(
      ` DELETE FROM cart_items WHERE user_id = ? `,
      [user_id],
    );

    return result;
  } catch (error) {
    console.log(`error at Cart_items.repo clearCart: ${error}`);
    throw error;
  }
};

module.exports = {
  createCartItem,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
  clearCart,
};
