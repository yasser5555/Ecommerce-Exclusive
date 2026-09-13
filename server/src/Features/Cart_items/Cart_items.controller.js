const cartService = require("./Cart_items.services");

const createCartItem = async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const result = await cartService.createCartItem(
      user_id,
      product_id,
      quantity,
    );

    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: result,
    });
  } catch (error) {
    console.log(`error at Cart.controller createCartItem: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add product to cart",
    });
  }
};
 
const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await cartService.getCart(id);
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    console.log(`error at Cart.controller getCart: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch cart",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { cart_id, user_id, quantity, action } = req.body;
    const result = await cartService.updateCartItem(
      cart_id,
      user_id,
      quantity,
      action,
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message:
          action === "decrease"
            ? "Quantity cannot go below 1"
            : "Cart item was not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
    });
  } catch (error) {
    console.log(`error at Cart.controller updateCartItem: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update cart quantity",
    });
  }
};


const deleteCartItem = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;
    const result = await cartService.deleteCartItem(cart_id, user_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    console.log(`error at Cart.controller deleteCartItem: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete cart item",
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const result = await cartService.clearCart(user_id);
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: result,
    });
  } catch (error) {
    console.log(`error at Cart.controller clearCart: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to clear cart",
    });
  }
};

module.exports = {
  createCartItem,
  getCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
