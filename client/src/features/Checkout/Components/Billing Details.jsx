import { MapPin, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FetchOnRender } from "../../../shared/Utils/useFetch";
import useBillingDetails from "../Hooks/useBillingDetails";

export default function BillingDetails() {
  const {
    profile,
    userAddresses,
    get_address,
    selectedAddress,
    openAddress,
    setOpenAddress,
    handleSelectAddress,
    selectAddress,
  } = useBillingDetails();
 

  FetchOnRender(() => get_address(), profile?.id);
  FetchOnRender(() => selectAddress(), userAddresses);

  return (
    <div className="col-lg-7">
      <div className="mb-4">
        <h2 className="fw-semibold mb-2">Billing Details</h2>
        <p className="text-muted small mb-0">
          Complete your information to place your order.
        </p>
      </div>

      <form>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label small fw-medium">
              First Name <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              value={profile?.first_name ?? ""}
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Last Name <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              value={profile?.last_name ?? ""}
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-12">
            <label className="form-label small fw-medium">
              Street Address <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Street name"
              value={selectedAddress?.street_number ?? ""}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Building Number <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Building number"
              value={selectedAddress?.building_number ?? ""}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Apartment Number <span className="text-muted">(optional)</span>
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Apartment number"
              value={selectedAddress?.apartement_number ?? ""}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Town / City <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              value={selectedAddress?.city ?? ""}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Country <span className="text-danger">*</span>
            </label>

            <input
              type="text"
              className="form-control"
              value={selectedAddress?.country ?? ""}
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Phone Number <span className="text-danger">*</span>
            </label>

            <input
              value={profile?.phone_number ?? ""}
              type="tel"
              className="form-control"
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-medium">
              Email Address <span className="text-danger">*</span>
            </label>

            <input
              value={profile?.email ?? ""}
              type="email"
              className="form-control"
              readOnly
            />
          </div>
        </div>
      </form>

      {/* Address Selection */}
      {userAddresses?.length > 0 && (
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <MapPin size={18} />

            <h6 className="mb-0 fw-semibold">Select Delivery Address</h6>
          </div>

          {userAddresses.length > 1 && (
            <p className="text-muted small">
              You have multiple saved addresses. Please select one.
            </p>
          )}

          <div className="accordion">
            {userAddresses.map((address, index) => {
              const isSelected = selectedAddress === address;
              const isOpen = openAddress === index;

              return (
                <div
                  className={`accordion-item mb-2 rounded border ${
                    isSelected ? "border-danger" : ""
                  }`}
                  key={index}
                >
                  <h2 className="accordion-header">
                    <button
                      type="button"
                      className={`accordion-button ${
                        !isOpen ? "collapsed" : ""
                      }`}
                      onClick={() => setOpenAddress(isOpen ? null : index)}
                    >
                      <div className="d-flex align-items-center w-100">
                        <div className="form-check mb-0 me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="selectedAddress"
                            checked={isSelected}
                            onChange={() => handleSelectAddress(address, index)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div>
                          <div className="fw-semibold">
                            {address?.street_number}, {address?.city}
                          </div>

                          <small className="text-muted">
                            {address?.country}
                          </small>
                        </div>

                        {isSelected && (
                          <span className="badge bg-danger ms-auto me-3">
                            Selected
                          </span>
                        )}
                      </div>
                    </button>
                  </h2>

                  <div
                    className={`accordion-collapse collapse ${
                      isOpen ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="small text-muted mb-1">Country</div>

                          <div className="fw-medium">
                            {address?.country ?? "-"}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="small text-muted mb-1">City</div>

                          <div className="fw-medium">
                            {address?.city ?? "-"}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="small text-muted mb-1">Street</div>

                          <div className="fw-medium">
                            {address?.street_number ?? "-"}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="small text-muted mb-1">
                            Building Number
                          </div>

                          <div className="fw-medium">
                            {address?.building_number ?? "-"}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="small text-muted mb-1">
                            Apartment Number
                          </div>

                          <div className="fw-medium">
                            {address?.apartement_number ?? "-"}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`btn mt-3 ${
                          isSelected ? "btn-danger" : "btn-outline-danger"
                        }`}
                        onClick={() => handleSelectAddress(address, index)}
                      >
                        {isSelected ? (
                          <>
                            <Check size={16} className="me-1" />
                            Selected Address
                          </>
                        ) : (
                          "Use This Address"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Address */}
      {userAddresses?.length === 0 && (
        <div className="alert alert-light border mb-4">
          <div className="d-flex align-items-center gap-2">
            <MapPin size={18} />

            <strong>No saved address found.</strong>
          </div>

          <p className="small text-muted mb-0 mt-2">
            Please enter your billing and delivery information below.
          </p>
        </div>
      )}

      {/* Selected Address */}
      {selectedAddress && (
        <div className="alert alert-light border border-danger mb-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Check size={18} className="text-danger" />

            <strong>Selected Address</strong>
          </div>

          <div className="row g-2">
            <div className="col-md-6">
              <span className="text-muted small">Country:</span>{" "}
              <span className="small fw-medium">{selectedAddress.country}</span>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">City:</span>{" "}
              <span className="small fw-medium">{selectedAddress.city}</span>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Street:</span>{" "}
              <span className="small fw-medium">
                {selectedAddress.street_number}
              </span>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Building:</span>{" "}
              <span className="small fw-medium">
                {selectedAddress.building_number}
              </span>
            </div>

            <div className="col-md-6">
              <span className="text-muted small">Apartment:</span>{" "}
              <span className="small fw-medium">
                {selectedAddress.apartement_number}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
