import { Check, CreditCard, Lock, Truck, WalletCards } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import useOrderSummary from "./../Hooks/useOrderSummary";
import { FetchOnRender } from "./../../../shared/Utils/useFetch";
import useBillingDetails from "./../Hooks/useBillingDetails";
import useCartStore from "./../../Cart/store/Cart.store";
import { useProfileStore } from "./../../Profile/Store/profile.store";
import { useOrderStore } from "../../Order/Store/Orders.store";

export default function OrderSummary({ cartProducts = [] }) {
  const { clearUserCart } = useCartStore();
  const { profile } = useProfileStore();
  const { selectedAddress, get_address } = useBillingDetails();

  FetchOnRender(() => get_address());

  const {
    navigate,
    paymentMethod,
    setPayment,
    setselectedCard,
    selectedCard,
    setShipping,
    shippingMethod,
    userCards,
    Get_UserCards,
    CreateOrder,
    CreateOrderHistory,
  } = useOrderSummary();

  FetchOnRender(() => Get_UserCards());

  const subtotal = cartProducts?.reduce(
    (total, product) => total + Number(product.sub_total),
    0,
  );

  const handleValidate = () => {
    try {
      if (!shippingMethod) {
        toast.info("Please select a shipping method.");
        return;
      }

      if (!selectedAddress) {
        toast.info("Please select a delivery address.");
        return;
      }

      if (!paymentMethod) {
        toast.info("Please select a payment method.");
        return;
      }

      if (paymentMethod === "card" && !selectedCard) {
        toast.info("Please select a card first.");
        return;
      }

      return true;
    } catch (error) {
      toast.error(`there's an Error ${error.message}`);
    }
  };
  const handlePlaceOrder = async () => {
    const value = handleValidate();
    if (!value) {
      return;
    }
    try {
      const order = await CreateOrder({
        address_id: selectedAddress.address_id,
        status: "pending",
        products: cartProducts,
        card_id: paymentMethod === "card" ? selectedCard.card_id : null,
      });

      const orderID = order.result[0][0].order_id;
      const newBalcne = parseInt(order.result[0][0].new_balance);
      console.log(`new balcne is ${newBalcne}`); //

      setselectedCard({
        ...selectedCard,
        balance: newBalcne,
      });
      await clearUserCart(profile.id);
      toast.success("Order created successfully.");
      navigate(`/myorders/orderConfirmation/${orderID}`, {
        replace: true,
      });
    } catch (error) {
      console.error("Error at OrderSummary.handlePlaceOrder:", error);

      toast.error("Failed to process order.");
    }
  };
  return (
    <div className="col-lg-5">
      <div className="border rounded-3 p-4 sticky-lg-top" style={{ top: 20 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-semibold mb-0">Order Summary</h5>

          <span className="badge bg-light text-dark fw-normal">
            {cartProducts.length} Items
          </span>
        </div>

        <div className="mb-4">
          {cartProducts.map((product) => (
            <div
              key={product.product_id}
              className="d-flex align-items-center gap-3 mb-3"
            >
              <img
                src={product.image}
                alt={`Product ${product.product_id}`}
                width="65"
                height="65"
                className="rounded border object-fit-cover"
              />

              <div className="flex-grow-1">
                <h6 className="mb-1 small fw-semibold">{product.name}</h6>

                <span className="text-muted small">
                  quantity: {product.quantity}
                </span>
              </div>

              <span className="small fw-semibold">
                ${Number(product?.sub_total)}
              </span>
            </div>
          ))}
        </div>

        <hr />

        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <Truck size={17} />
            <h6 className="mb-0 fw-semibold">Shipping Method</h6>
          </div>

          <div
            className={`border rounded-3 p-3 mb-2 ${
              shippingMethod === "free" ? "border-danger bg-light" : ""
            }`}
            onClick={() => setShipping("free")}
            style={{ cursor: "pointer" }}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="shipping"
                checked={shippingMethod === "free"}
                onChange={() => setShipping("free")}
              />

              <label className="form-check-label w-100">
                <div className="d-flex justify-content-between">
                  <span className="fw-medium small">Free Shipping</span>

                  <span className="text-success small fw-semibold">Free</span>
                </div>

                <small className="text-muted">
                  Delivery in 3–5 business days
                </small>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Subtotal</span>

            <span className="small">${subtotal}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Shipping</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Total</span>

            <span className="fs-5 fw-bold text-danger">${subtotal}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <WalletCards size={17} />

            <h6 className="mb-0 fw-semibold">Payment Method</h6>
          </div>

          <div
            className={`border rounded-3 p-3 mb-2 ${
              paymentMethod === "card" ? "border-danger bg-light" : ""
            }`}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPayment("card")}
                id="cardPayment"
              />

              <label className="form-check-label w-100" htmlFor="cardPayment">
                <span className="small fw-medium">Credit / Debit Card</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-3">
                {userCards?.length > 0 ? (
                  userCards.map((card, index) => (
                    <div
                      key={`${card.last4}-${index}`}
                      className={`border rounded-3 p-3 mb-2 ${
                        selectedCard?.last4 === card.last4
                          ? "border-danger bg-white"
                          : ""
                      }`}
                      onClick={() => setselectedCard(card)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="savedCard"
                          checked={selectedCard?.last4 === card.last4}
                          onChange={() => setselectedCard(card)}
                        />

                        <label className="form-check-label w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <div className="fw-semibold small">
                                {card.card_type}
                              </div>

                              <div className="text-muted small">
                                {card.bank_name}
                              </div>

                              <div className="small mt-1">
                                current-balance: {card.balance}$
                              </div>
                            </div>

                            <CreditCard size={25} />
                          </div>
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted small border rounded-3 p-3">
                    No saved cards found.
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className={`border rounded-3 p-3 ${
              paymentMethod === "cash" ? "border-danger bg-light" : ""
            }`}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "cash"}
                onChange={() => setPayment("cash")}
                id="cashPayment"
              />

              <label
                className="form-check-label w-100 small fw-medium"
                htmlFor="cashPayment"
              >
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>

        {selectedCard && (
          <div className="alert alert-light border border-danger mb-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Check size={18} className="text-danger" />

              <strong>Selected Card</strong>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <span className="text-muted small">Card-type:</span>{" "}
                <span className="small fw-medium">
                  {selectedCard.card_type}
                </span>
              </div>

              <div className="col-md-6">
                <span className="text-muted small">Bank-name:</span>{" "}
                <span className="small fw-medium">
                  {selectedCard.bank_name}
                </span>
              </div>

              <div className="col-md-6">
                <span className="text-muted small">Balance Before:</span>{" "}
                <span className="small fw-medium">{selectedCard.balance}</span>
              </div>

              <div className="col-md-6">
                <span className="text-muted small">Balance After:</span>{" "}
                <span className="small fw-medium">
                  {selectedCard.balance - subtotal < 0
                    ? "Not Enough Money"
                    : `$${Number(selectedCard?.balance) - subtotal}`}
                </span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          type="button"
          className="btn btn-danger w-100 py-3 fw-semibold"
        >
          Place Order
        </button>

        <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
          <Lock size={14} />

          <span className="text-muted" style={{ fontSize: "11px" }}>
            Secure checkout · Your information is protected
          </span>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-2">
          <CreditCard size={15} className="text-muted" />

          <span className="text-muted" style={{ fontSize: "11px" }}>
            Safe and encrypted payment
          </span>
        </div>
      </div>
    </div>
  );
}
