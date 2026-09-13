const cartRepository = require("./Cart_items.repository");

// ==============================
// CREATE / ADD NEW CART ITEM
// ==============================
const createCartItem = async (user_id, product_id, quantity) => {
  try {
    // -ve Check and if -ve then replace with 0
    quantity = Math.max(0, Number(quantity));
    // at Decreasing 0 throw error preventing -ve valuess
    if (quantity === 0) {
      throw new Error("Cart quantity must be greater than 0");
    }

    const Cart_items = await cartRepository.createCartItem(
      user_id,
      product_id,
      quantity,
    );
    return Cart_items;
  } catch (error) {
    console.log(`error at Cart_items.service createCartItem: ${error}`);
    throw error;
  }
};

const getCart = async (user_id) => {
  try {
    const cart_items = await cartRepository.getCart(user_id);
    return cart_items;
  } catch (error) {
    console.log(`error at cart_items.service getCart: ${error}`);
    throw error;
  }
};

const updateCartItem = async (cart_id, user_id, quantity, action) => {
  try {
    quantity = Math.max(0, Number(quantity));
    if (quantity === 0) {
      throw new Error("Update quantity must be greater than 0");
    }
    if (action === "increase") {
      return await cartRepository.increaseQuantity(cart_id, user_id, quantity);
    }

    if (action === "decrease") {
      return await cartRepository.decreaseQuantity(cart_id, user_id, quantity);
    }

    throw new Error("Invalid cart update action. Use increase or decrease");
  } catch (error) {
    console.log(`error at Cart.service updateCartItem: ${error}`);
    throw error;
  }
};

const deleteCartItem = async (cart_id, user_id) => {
  try {
    const result = await cartRepository.deleteCartItem(cart_id, user_id);
    return result;
  } catch (error) {
    console.log(`error at Cart.service deleteCartItem: ${error}`);
    throw error;
  }
};

const clearCart = async (user_id) => {
  try {
    const result = await cartRepository.clearCart(user_id);
    return result;
  } catch (error) {
    console.log(`error at Cart.service clearCart: ${error}`);
    throw error;
  }
};

module.exports = {
  createCartItem,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
