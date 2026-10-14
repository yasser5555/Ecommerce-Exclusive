import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FetchOnRender } from "./../../../../shared/Utils/useFetch";
import useCartTable from "../Hooks/useCartTable";
import { NavLink } from "react-router-dom";

export default function CartTable({ userId }) {
  const {
    cart,
    isLoading,
    GetCart,
    handleQuantity,
    handleDelete,
  } = useCartTable();
  // ! Get user Data
  FetchOnRender(() => GetCart(userId), userId);

  return (
    <div>
      {cart?.length > 0 && (
        <div className="d-none d-md-block border-bottom pb-3 mb-3">
          <div className="row fw-semibold">
            <div className="col-5">Product</div>
            <div className="col-2">Price</div>
            <div className="col-2">Quantity</div>
            <div className="col-2">Subtotal</div>
            <div className="col-1"></div>
          </div>
        </div>
      )}

      <AnimatePresence initial={false}>
        {cart?.length > 0 ? (
          cart.map((item) => (
            <motion.div
              className="border-bottom py-3 overflow-hidden"
              key={item.cart_id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                x: -24,
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="row align-items-center g-3">
                <div className="col-12 col-md-5">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                      }}
                    />

                    <span className="fw-semibold">{item.name}</span>
                  </div>
                </div>

                <div className="col-6 col-md-2">
                  <small className="d-md-none text-secondary d-block">
                    Price
                  </small>
                  ${Number(item.price).toFixed(2)}
                </div>

                <div className="col-6 col-md-1">
                  <small className="d-md-none text-secondary d-block mb-1">
                    Quantity
                  </small>

                  <div className="d-flex align-items-center border rounded-2 w-fit">
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={isLoading || Number(item.quantity) <= 1}
                      onClick={() => handleQuantity(item, "decrease", userId)}
                    >
                      <Minus size={15} />
                    </button>

                    <span className="px-2 fw-semibold">{item.quantity}</span>

                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={isLoading}
                      onClick={() => handleQuantity(item, "increase", userId)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="col-6 col-md-2 fw-semibold">
                  <small className="d-md-none text-secondary d-block">
                    Subtotal
                  </small>
                  ${Number(item.sub_total)}
                </div>

                <div className="col-6 col-md-1 text-end">
                  <button
                    type="button"
                    className="btn btn-sm text-danger"
                    disabled={isLoading}
                    onClick={() => handleDelete(item.cart_id, userId)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            key="empty-cart"
            className="text-center py-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h4 className="fw-bold">Your cart is empty</h4>
            <p className="text-secondary">Add some products to your cart.</p>
            <NavLink className="btn btn-danger" to="/products">
              to Shop
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
