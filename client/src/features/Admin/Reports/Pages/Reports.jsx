import React from "react";
import {
  Download,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Package,
} from "lucide-react";

export default function Reports() {
  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Reports</h3>

          <p className="text-muted mb-0">Analyze your store performance</p>
        </div>

        <button className="btn btn-dark d-flex align-items-center gap-2">
          <Download size={17} />
          Export Report
        </button>
      </div>

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <DollarSign size={22} className="text-success mb-3" />

              <small className="text-muted">Revenue</small>

              <h3 className="fw-bold">$24,580</h3>

              <span className="text-success small">+12.5%</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <ShoppingCart size={22} className="text-primary mb-3" />

              <small className="text-muted">Orders</small>

              <h3 className="fw-bold">1,248</h3>

              <span className="text-success small">+8.2%</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <Package size={22} className="text-warning mb-3" />

              <small className="text-muted">Products Sold</small>

              <h3 className="fw-bold">3,840</h3>

              <span className="text-success small">+15.8%</span>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <TrendingUp size={22} className="text-info mb-3" />

              <small className="text-muted">Growth</small>

              <h3 className="fw-bold">18.4%</h3>

              <span className="text-success small">This month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}

      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between mb-4">
            <div>
              <h5 className="fw-bold mb-1">Revenue Overview</h5>

              <small className="text-muted">Monthly revenue performance</small>
            </div>

            <select className="form-select w-auto">
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          {/* Bootstrap Bar Chart */}

          <div
            className="d-flex align-items-end gap-3"
            style={{ height: "280px" }}
          >
            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "35%" }}
              />

              <small className="text-muted">Jan</small>
            </div>

            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "50%" }}
              />

              <small className="text-muted">Feb</small>
            </div>

            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "45%" }}
              />

              <small className="text-muted">Mar</small>
            </div>

            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "65%" }}
              />

              <small className="text-muted">Apr</small>
            </div>

            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "75%" }}
              />

              <small className="text-muted">May</small>
            </div>

            <div className="flex-fill text-center">
              <div
                className="bg-primary rounded-top"
                style={{ height: "90%" }}
              />

              <small className="text-muted">Jun</small>
            </div>
          </div>
        </div>
      </div>

      {/* Reports */}

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold">Top Products</h5>

              <hr />

              <div className="d-flex justify-content-between py-3">
                <span>Wireless Headphones</span>
                <strong>420 sold</strong>
              </div>

              <div className="d-flex justify-content-between py-3">
                <span>Smart Watch</span>
                <strong>315 sold</strong>
              </div>

              <div className="d-flex justify-content-between py-3">
                <span>Running Shoes</span>
                <strong>280 sold</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold">Order Status</h5>

              <hr />

              <div className="d-flex justify-content-between py-3">
                <span>Delivered</span>
                <strong className="text-success">986</strong>
              </div>

              <div className="d-flex justify-content-between py-3">
                <span>Processing</span>
                <strong className="text-primary">180</strong>
              </div>

              <div className="d-flex justify-content-between py-3">
                <span>Cancelled</span>
                <strong className="text-danger">82</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
