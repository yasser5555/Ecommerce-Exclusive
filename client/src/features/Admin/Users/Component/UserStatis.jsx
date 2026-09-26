import { ShieldCheck, UserCheck, UserX, UsersIcon } from "lucide-react";
import React from "react";

export default function UserStatis({ stats = {} }) {
  try {
    // This creates a safe stats object in case the store has not loaded yet.
    const safeStats = {
      totalUsers: Number(stats.totalUsers || 0),
      activeUsers: Number(stats.activeUsers || 0),
      blockedUsers: Number(stats.blockedUsers || 0),
      admins: Number(stats.admins || 0),
    };

    return (
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Total Users</small>
                  <h3 className="fw-bold mb-0">{safeStats.totalUsers}</h3>
                </div>
                <UsersIcon className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Active Users</small>
                  <h3 className="fw-bold text-success mb-0">{safeStats.activeUsers}</h3>
                </div>
                <UserCheck className="text-success" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Blocked Users</small>
                  <h3 className="fw-bold text-danger mb-0">{safeStats.blockedUsers}</h3>
                </div>
                <UserX className="text-danger" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <small className="text-muted">Admins</small>
                  <h3 className="fw-bold text-primary mb-0">{safeStats.admins}</h3>
                </div>
                <ShieldCheck className="text-primary" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // This catches any rendering problem and returns nothing instead of crashing the page.
    console.error(`error at UserStatis ${error}`);
    // This prevents the page from breaking when stats are malformed.
    return null;
  }
}
