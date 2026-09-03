import { useEffect, useState } from "react";
import { useShowCard } from "../Hooks/useShowCard";
import { FetchOnRender } from "./../Utils/useFetchProfile";

function CreditCardManager() {
  const {
    userCards,
    profile,
    isLoading,
    formData,
    showForm,
    handleChange,
    toggleForm,
    fetchCards,
    addUser_card,
    deleteUser_card,
    cardToDelete,
    handleDeleteClick,
    closeDeleteModal,
    confirmDelete,
  } = useShowCard();

  FetchOnRender(() => fetchCards(), profile?.id);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Payment Methods</h4>

          <p className="text-muted mb-0">
            Manage your saved credit and debit cards
          </p>
        </div>

        <button type="button" className="btn btn-danger" onClick={toggleForm}>
          <i className={`fas ${showForm ? "fa-times" : "fa-plus"} me-2`}></i>

          {showForm ? "Cancel" : "Add Card"}
        </button>
      </div>

      {/* ======================================
          Add Card Form
      ======================================= */}

      {showForm && (
        <div className="card border shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-4">Add New Card</h5>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addUser_card();
              }}
            >
              <div className="row g-3">
                {/* Card Number */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Last 4 Digits
                  </label>

                  <input
                    type="text"
                    name="last4"
                    className="form-control"
                    placeholder="1234"
                    maxLength="4"
                    inputMode="numeric"
                    value={formData.last4}
                    onChange={handleChange}
                  />

                  <small className="text-muted">
                    Enter the last 4 digits of the card.
                  </small>
                </div>

                {/* Card Type */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Card Type</label>

                  <select
                    name="card_type"
                    className="form-select"
                    value={formData.card_type}
                    onChange={handleChange}
                  >
                    <option value="">Select card type</option>

                    <option value="Visa">Visa</option>

                    <option value="Mastercard">Mastercard</option>

                    <option value="American Express">American Express</option>
                  </select>
                </div>

                {/* Bank */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Bank Name</label>

                  <input
                    type="text"
                    name="bank_name"
                    className="form-control"
                    placeholder="Bank name"
                    value={formData.bank_name}
                    onChange={handleChange}
                  />
                </div>

                {/* Balance */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Current Balance
                  </label>

                  <input
                    type="number"
                    name="balance"
                    className="form-control"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={`${formData.balance}`}
                    onChange={handleChange}
                  />
                </div>

                {/* Expiry Day */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Expiry Day</label>

                  <input
                    type="number"
                    name="expiry_day"
                    className="form-control"
                    placeholder="30"
                    min="1"
                    max="30"
                    value={formData.expiry_day}
                    onChange={handleChange}
                  />
                </div>

                {/* Expiry Month */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Expiry Month</label>

                  <input
                    type="number"
                    name="expiry_month"
                    className="form-control"
                    placeholder="12"
                    min="1"
                    max="12"
                    value={formData.expiry_month}
                    onChange={handleChange}
                  />
                </div>

                {/* Expiry Year */}
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Expiry Year</label>

                  <input
                    type="number"
                    name="expiry_year"
                    className="form-control"
                    placeholder="2028"
                    min={new Date().getFullYear()}
                    value={formData.expiry_year}
                    onChange={handleChange}
                  />
                </div>

                {/* Default */}
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="isDefault"
                      id="isDefault"
                      className="form-check-input"
                      checked={formData.isDefault}
                      onChange={handleChange}
                    />

                    <label htmlFor="isDefault" className="form-check-label">
                      Make this my default payment method
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus me-2"></i>
                        Add Card
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================
          Saved Cards
      ======================================= */}

      <div className="row g-3">
        {userCards?.length > 0 ? (
          userCards.map((card) => (
            <div className="col-12" key={card.id}>
              <div className="card border shadow-sm">
                <div className="card-body">
                  <div className="row align-items-center">
                    {/* Card Icon */}
                    <div className="col-auto">
                      <div
                        className="bg-danger text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{
                          width: "55px",
                          height: "55px",
                        }}
                      >
                        <i className="fas fa-credit-card fa-lg"></i>
                      </div>
                    </div>

                    {/* Card Information */}
                    <div className="col">
                      <div className="d-flex align-items-baseline gap-2 mb-1">
                        <h6 className="fw-bold mb-0">
                          **** **** **** {card.last4}
                        </h6>

                        {card.isDefault && (
                          <span className="badge bg-success">Default</span>
                        )}
                      </div>

                      <p className="text-muted mb-1">
                        {card.card_type} • {card.bank_name}
                      </p>

                      <small className="text-muted">
                        Expires {card.expiry_day}/{card.expiry_month}/
                        {card.expiry_year}
                      </small>

                      <h6 className="my-2">Current Balance: {card.balance}$</h6>
                    </div>

                    {/* Delete */}
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteClick(card)}
                        disabled={isLoading}
                      >
                        <i className="fas fa-trash me-2"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5 border rounded">
              <i className="fas fa-credit-card fa-2x text-muted mb-3"></i>

              <h6 className="fw-bold">No payment methods</h6>

              <p className="text-muted mb-0">
                You haven't added any cards yet.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ======================================
          Security Notice
      ======================================= */}

      <div className="alert alert-light border mt-4 d-flex align-items-start">
        <i className="fas fa-shield-alt text-success me-3 mt-1"></i>

        <div>
          <strong>Secure Payment Information</strong>

          <p className="text-muted mb-0 mt-1 small">
            Your payment information is securely stored and protected. We never
            display your full card number.
          </p>
        </div>
      </div>

      {/* ======================================
          Delete Confirmation Overlay
      ======================================= */}

      {cardToDelete && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 1050,
            backdropFilter: "blur(3px)",
          }}
          onClick={closeDeleteModal}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4"
            style={{
              width: "90%",
              maxWidth: "420px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="text-center mb-3">
              <div
                className="bg-danger bg-opacity-10 text-danger rounded-circle d-flex align-items-center justify-content-center mx-auto"
                style={{
                  width: "65px",
                  height: "65px",
                }}
              >
                <i className="fas fa-trash-alt fa-lg"></i>
              </div>
            </div>

            {/* Title */}
            <h5 className="fw-bold text-center mb-2">Delete Card?</h5>

            {/* Message */}
            <p className="text-muted text-center mb-4">
              Are you sure to delete this card?
              <br />
              <strong>**** **** **** {cardToDelete.last4}</strong>
            </p>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-light border w-50"
                onClick={closeDeleteModal}
                disabled={isLoading}
              >
                No
              </button>

              <button
                type="button"
                className="btn btn-danger w-50"
                onClick={confirmDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-trash me-2"></i>
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreditCardManager;
