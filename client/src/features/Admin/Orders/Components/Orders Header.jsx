import { ShoppingCart } from "lucide-react";
  
export default function OrdersHeader({ orders }) {
  return (
    <>
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Orders</h3>

        <p className="text-muted mb-0">Manage and track customer orders</p>
      </div>

      {/* Stats */}

      <div className="row g-3 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <small className="text-muted">Total Orders</small>

                  <h3 className="fw-bold">
                    {Number(orders?.[0]?.[0].total_orders).toLocaleString()}
                  </h3>
                </div>

                <ShoppingCart className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Pending</small>

              <h3 className="fw-bold text-warning">
                {orders?.[1]?.[0]?.pending_orders}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Delivered</small>

              <h3 className="fw-bold text-success">
                {orders?.[2]?.[0]?.delivered_orders}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Revenue</small>

              <h3 className="fw-bold">
                $ {Number(orders?.[3]?.[0]?.total_revenue).toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
