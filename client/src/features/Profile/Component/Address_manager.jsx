import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProfileStore } from "../Store/profile.store";
import { useAddressmanager } from "../Hooks/useAddressManager";
import { FetchOnRender } from "../../../shared/Utils/useFetch";
function AddressManager() {
  const {
    userAddresses,
    isLoading,
    formData,
    isAdding,
    setIsAdding,
    resetForm,
    handleSubmit,
    handleChange,
    loadAddresses,
  } = useAddressmanager();

  FetchOnRender(() => loadAddresses());

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">My Addresses</h4>

          <p className="text-muted mb-0">
            Manage your saved delivery addresses
          </p>
        </div>

        {!isAdding && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setIsAdding(true)}
          >
            <i className="fas fa-plus me-2"></i>
            Add Address
          </button>
        )}
      </div>

      {isAdding && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Add New Address</h5>

              <button
                type="button"
                className="btn-close"
                onClick={resetForm}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Country */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Country</label>

                <input
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="Egypt"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* City */}
              <div className="mb-3">
                <label className="form-label fw-semibold">City</label>

                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Tanta"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Street */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Street</label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-road"></i>
                  </span>

                  <input
                    type="text"
                    name="street_number"
                    className="form-control"
                    placeholder="Cole Causeway"
                    value={formData.street_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Building Number
                  </label>

                  <input
                    type="text"
                    name="building_number"
                    className="form-control"
                    placeholder="91613"
                    value={formData.building_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Apartment Number
                  </label>

                  <input
                    type="text"
                    name="apartement_number"
                    className="form-control"
                    placeholder="149"
                    value={formData.apartement_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isLoading}
                >
                  <i className="fas fa-save me-2"></i>

                  {isLoading ? "Saving..." : "Save Address"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="row g-3">
          {!userAddresses || userAddresses.length === 0 ? (
            <div className="col-12">
              <div className="text-center border rounded-3 p-5 bg-light">
                <i className="fas fa-map-marker-alt fa-3x text-muted mb-3"></i>

                <h5 className="fw-bold">No Saved Addresses</h5>

                <p className="text-muted mb-3">
                  You haven't added any addresses yet.
                </p>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsAdding(true)}
                >
                  Add Your First Address
                </button>
              </div>
            </div>
          ) : (
            userAddresses.map((address, index) => (
              <div className="col-12" key={`${address.user_id}-${index}`}>
                <div className="card border shadow-sm">
                  <div className="card-body">
                    <div className="row align-items-center">
                      {/* Icon */}
                      <div className="col-auto">
                        <div
                          className="bg-danger text-white rounded-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "55px",
                            height: "55px",
                          }}
                        >
                          <i className="fas fa-map-marker-alt fa-lg"></i>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="col">
                        <h6 className="fw-bold mb-2">
                          {address.city}, {address.country}
                        </h6>

                        <p className="text-muted mb-1">
                          {address.street_number}
                        </p>

                        <p className="text-muted mb-0">
                          Building {address.building_number}
                          {" • "}
                          Apartment {address.apartement_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* =========================
          Loading
      ========================= */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="alert alert-light border mt-4 d-flex align-items-start">
        <i className="fas fa-lock text-success me-3 mt-1"></i>

        <div>
          <strong>Address Information</strong>

          <p className="text-muted mb-0 mt-1 small">
            Your saved addresses are securely stored and used only for delivery
            and booking purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressManager;
