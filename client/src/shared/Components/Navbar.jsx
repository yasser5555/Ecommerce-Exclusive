import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

import { useProfile } from "../../features/Profile/Hooks/useProfile";
import { useAuth } from "./../../features/auth/hooks/useAuth";
import useWishlist from "../../features/Wishlist/Hooks/useWishlist";
import useCartStore from "../../features/Cart/store/Cart.store";

export default function Navbar() {
  const { cart } = useCartStore();
  const { wishlist } = useWishlist();

  const { profile, fetchProfile } = useProfile();
  const { logout } = useAuth();

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

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-sticky top-0 z-3 border-bottom shadow-sm">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/home">
          Exclusive
        </NavLink>

        {/* Mobile Toggle */}
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

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation */}
          <ul className="navbar-nav me-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link px-3" to="/products">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link px-3" to={"/about"}>
                About
              </NavLink>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
            {/* Search */}
            <form className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
              />

              <button className="btn btn-outline-danger ms-2" type="submit">
                Search
              </button>
            </form>

            {/* Icons */}
            <div className="d-flex align-items-lg-center align-items-baseline justify-content-lg-center gap-4">
              {/* Wishlist */}
              <NavLink
                to="/wishlist"
                className="position-relative text-dark text-decoration-none"
                aria-label="Wishlist"
              >
                <Heart size={21} strokeWidth={1.8} />

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length > 10 ? "+10" : wishlist.length}
                </span>
              </NavLink>

              {/* Cart */}
              <NavLink
                to="/cart"
                className="position-relative text-dark text-decoration-none"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={21} strokeWidth={1.8} />

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart?.length > 10 ? "+10" : cart?.length}
                </span>
              </NavLink>

              {/* Profile */}
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
                      width="35"
                      height="35"
                      className="rounded-circle"
                    />
                  ) : (
                    <UserCircle size={35} strokeWidth={1.5} />
                  )}
                </button>

                <ul className="dropdown-menu text-start dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center gap-2"
                      href="#"
                    >
                      <Settings size={17} />
                      Setting
                    </a>
                  </li>

                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={logout}
                    >
                      <LogOut size={17} />
                      Signout
                    </button>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item d-flex align-items-center gap-2"
                      to="/profile"
                    >
                      <UserCircle size={17} />
                      Profile Page
                    </NavLink>
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
