import React, { useEffect } from "react";
import { useProfile } from "../../features/Profile/Hooks/useProfile";
import { NavLink } from 'react-router-dom';
import { useAuth } from './../../features/auth/hooks/useAuth';

export default function Navbar() {
  const wishlistCount = 0;
  const cartCount = 0;
  const { profile, fetchProfile } = useProfile();
  const {logout} = useAuth();
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
        <a className="navbar-brand fw-bold fs-4" href="#">
          Exclusive
        </a>

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
              <NavLink className="nav-link active px-3" to="/products">
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3" href="#">
                About
              </a>
            </li>
          </ul>

          {/* Right Side */}
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3">
            {/* Search */}
            <form className="d-flex">
              <input
                className="form-control "
                type="search"
                placeholder="Search"
              />

              <button className="btn  btn-outline-danger ms-2" type="submit">
                Search
              </button>
            </form>

            {/* Icons */}
            <div className="d-flex align-items-lg-center align-items-baseline justify-content-lg-center gap-4">
              {/* Wishlist */}
              <a
                href="#"
                className="position-relative text-dark text-decoration-none "
              >
                <i className="bi bi-heart"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                  {wishlistCount > 10 ? "+10" : wishlistCount}
                </span>
              </a>

              {/* Cart */}
              <a
                href="#"
                className="position-relative text-dark text-decoration-none "
              >
                <i className="bi bi-cart3"></i>

                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                  {cartCount > 10 ? "+10" : cartCount}
                </span>
              </a>

              {/* Profile */}
              <div className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle text-decoration-none"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      profile?.avatar
                        ? `http://localhost:5000/${profile.avatar}`
                        : "https://i.imgur.com/HeIi0wU.png"
                    }
                    alt="User"
                    width="35"
                    height="35"
                    className="rounded-circle"
                  />
                </a>

                <ul className="dropdown-menu text-start dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Setting
                    </a>
                  </li>

                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Signout
                    </button>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="/profile">
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
