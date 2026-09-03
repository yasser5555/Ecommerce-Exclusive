 
import { NavLink } from "react-router-dom";
 
function ProfileSidebar() {
  const navLinks = [
    {
      to: "/profile",
      label: "Profile Information",
      icon: "fas fa-user",
    },
    {
      to: "/profile/my_credits",
      label: "My Credit Cards",
      icon: "fas fa-credit-card",
    },
    {
      to: "/profile/addresses",
      label: "My Address",
      icon: "fas fa-map-marker-alt",
    },
    {
      to: "/profile/order_history",
      label: "Order history",
      icon: "fas fa-map-marker-alt",
    },
  ];

  return (
    <div className="d-flex flex-column gap-2">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            <i className="fas fa-cog me-2 text-primary"></i>
            Account Settings
          </h5>
          <div className="list-group list-group-flush">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/profile"}
                className={({ isActive }) =>
                  `list-group-item list-group-item rounded-3 mb-2 border-0 ${
                    isActive ? "active bg-danger" : " "
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="d-flex align-items-center">
                    <i
                      className={`${link.icon} me-3 ${
                        isActive ? "text-white" : "text-secondary"
                      }`}
                    />
                    <span className="fw-medium">
                      {link.label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}

          </div>
        </div>
      </div>

     </div>
  );
}

export default ProfileSidebar;
 
