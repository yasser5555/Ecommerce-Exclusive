 
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  UserCircle,
  ListOrdered,
} from "lucide-react";

import { useProfile } from "../../features/Profile/Hooks/useProfile";
import { useAuth } from "./../../features/auth/hooks/useAuth";
import useWishlist from "../../features/User/Wishlist/Hooks/useWishlist";
import useCartTable from "../../features/User/Cart/Hooks/useCartTable";
import { FetchOnRender } from "../Utils/useFetch";
import { useChangeTitle } from "../Utils/useChangeTitle";

export default function Navbar() {
  const location = useLocation();

  const { cart, GetCart } = useCartTable();
  const { wishlist } = useWishlist();
  const { profile, fetchProfile } = useProfile();
  const { logout, user } = useAuth();
  const isAdmin = String(user?.role || "").toLowerCase() === "admin";

  const navLinks = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Shop",
      path: "/products",
    },
    ...(isAdmin
      ? [
          {
            title: "Admin",
            path: "/admin",
          },
        ]
      : []),
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  const profileLinks = [
    
    {
      title: "Profile Page",
      path: "/profile",
      icon: UserCircle,
    },
    {
      title: "My Orders",
      path: "/myOrders",
      icon: ListOrdered,
    },
  ];

  const pageTitles = {
    "/home": "Home",
    "/products": "Shop",
    "/about": "About",
    "/contact": "Contact",
    "/wishlist": "Wishlist",
    "/cart": "Cart",
    "/settings": "Setting",
    "/profile": "Profile",
    "/myOrders": "My Orders",
  };

  const currentTitle = pageTitles[location.pathname] || "Exclusive";

  useChangeTitle({
    title: currentTitle,
  });

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    FetchProfile();
  }, [fetchProfile]);

  FetchOnRender(() => GetCart(profile?.userId), profile?.userId);

  return (
    <nav className="navbar priorty navbar-expand-lg bg-body-tertiary position-sticky top-0 z-3 border-bottom shadow-sm">
      <div className="container">
        <NavLink
          className="navbar-brand fw-bold fs-4 text-dark"
          to="/home"
        >
          Exclusive
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto align-items-lg-center">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link px-3 ${
                      isActive
                        ? "active text-danger fw-semibold"
                        : "text-dark"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
            <div className="d-flex align-items-lg-center align-items-baseline justify-content-lg-center gap-4">
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `position-relative text-decoration-none ${
                    isActive ? "text-danger" : "text-dark"
                  }`
                }
                aria-label="Wishlist"
              >
                <Heart size={21} strokeWidth={1.8} />

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length > 10 ? "+10" : wishlist.length}
                </span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `position-relative text-decoration-none ${
                    isActive ? "text-danger" : "text-dark"
                  }`
                }
                aria-label="Shopping cart"
              >
                <ShoppingCart size={21} strokeWidth={1.8} />

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.length > 10 ? "+10" : cart?.length}
                </span>
              </NavLink>

              <div className="dropdown">
                <button
                  className="btn p-0 border-0 bg-transparent dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {profile?.avatar ? (
                    <img
                      src={`http://localhost:5000/${profile.avatar}`}
                      alt="User"
                      width="38"
                      height="38"
                      className="rounded-circle border border-2 shadow-sm"
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  ) : (
                    <UserCircle
                      size={35}
                      strokeWidth={1.5}
                    />
                  )}
                </button>

                <ul className="dropdown-menu text-start dropdown-menu-start responsive-dropdown">
                  {profileLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <li key={link.path}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `dropdown-item d-flex align-items-center gap-2 ${
                              isActive
                                ? "active bg-danger text-white"
                                : ""
                            }`
                          }
                        >
                          <Icon size={17} />
                          {link.title}
                        </NavLink>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={logout}
                    >
                      <LogOut size={17} />
                      Signout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
 
