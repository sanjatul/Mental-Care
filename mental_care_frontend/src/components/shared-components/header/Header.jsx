import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { authUserActions } from "../../../store/authUserSlice";

const Header = () => {
  const storeAuthUser = useSelector((store) => store.authUser); // Get authUser from Redux store
  const [authUser, setAuthUser] = useState({}); // Local state for authUser

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This useEffect will run once when the component mounts to set the local state from localStorage
  useEffect(() => {
    const user = window.localStorage.getItem("mc_authUser");
    if (user) setAuthUser(JSON.parse(user));
  }, []);

  // When the Redux store updates, this effect will run and update the local state
  useEffect(() => {
    setAuthUser(storeAuthUser); // Update local state when store changes
  }, [storeAuthUser]);

  const handleLogout = (userId) => {
    dispatch(authUserActions.removeauthUser(userId));
    window.localStorage.removeItem("mc_authUser");
    setAuthUser({});
    navigate("");
  };

  return (
    <>
      <header className={styles.headerFixed}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          <Link to="" className="text-decoration-none">
            <h1 className="navbar-brand ps-3 fs-2 fst-italic">Mental Care</h1>
          </Link>

          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/home" className="nav-link fs-5">
                    Find Psychologist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="blogs" className="nav-link fs-5">
                    Blogs
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink to="about" className="nav-link fs-5">
                    About Us
                  </NavLink>
                </li> */}
              </ul>

              <ul className="navbar-nav mb-2 mb-lg-0 pe-5">
                {!authUser?.email && (
                  <>
                    <li className="nav-item pe-2">
                      <NavLink to="login" className="nav-link fs-5">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle fs-5"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sign Up
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink to="signup-user" className="dropdown-item">
                            General User
                            <hr />
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="signup-psychologist"
                            className="dropdown-item"
                          >
                            Psychologist
                            <hr />
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}

                {authUser?.email && (
                  <>
                    <li className="nav-item pe-2">
                      <p className="nav-link fs-5">Hello, {authUser.email}</p>
                    </li>
                    <li className="nav-item pe-2">
                      <button
                        onClick={() => handleLogout(authUser.userId)}
                        className="nav-link fs-5"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
