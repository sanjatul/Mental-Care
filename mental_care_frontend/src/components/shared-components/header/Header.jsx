import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { authUserActions } from "../../../store/authUserSlice";
const Header = () => {
  const storeAuthUser = useSelector((store) => store.authUser);
  const [authUser, setAuthUser] = useState({});

  const disPatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthUser(storeAuthUser);
  }, [storeAuthUser]);
  const handleLogout = (userId) => {
    disPatch(authUserActions.removeauthUser(userId));
    navigate("/home");
  };
  return (
    <>
      <header className={styles.headerFixed}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
          <h1 className="navbar-brand ps-3 fs-2 fst-italic">Mental Care</h1>
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
                  <NavLink to="" className="nav-link fs-5">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="blogs" className="nav-link fs-5">
                    Blogs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="about" className="nav-link fs-5">
                    About Us
                  </NavLink>
                </li>
                {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fs-5"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li> */}
              </ul>

              <ul className="navbar-nav mb-2 mb-lg-0 pe-5">
                {authUser && Object.keys(authUser).length == 0 && (
                  <>
                    <li className="nav-item pe-2">
                      <NavLink to="login" className="nav-link fs-5">
                        Login
                      </NavLink>
                    </li>
                  </>
                )}

                {authUser && Object.keys(authUser).length == 0 && (
                  <>
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
                          <NavLink to="signup-psychologist" className="dropdown-item">
                            Psychologist
                            <hr />
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="nav-item pe-2">
                      <NavLink to="signup" className="nav-link fs-5">
                        Sign Up
                      </NavLink>
                    </li> */}
                  </>
                )}

                {authUser && Object.keys(authUser).length > 0 && (
                  <>
                    <li className="nav-item pe-2">
                      <p className="nav-link fs-5">Hello, {authUser.email}</p>
                    </li>
                  </>
                )}
                {authUser && Object.keys(authUser).length > 0 && (
                  <>
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
