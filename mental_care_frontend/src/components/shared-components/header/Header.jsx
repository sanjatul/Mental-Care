import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className={`${styles.skyBgColor} p-4`}>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <NavLink to="" style={{ textDecoration: "none" }}>
              <h2 className={`${styles.logo}`}>Mental Care</h2>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to="home"
                  className={styles.navLink}
                  activeStyle={{ color: "black", backgroundColor: "white" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard`}
                  className={styles.navLink}
                  activeStyle={{ color: "black", backgroundColor: "white" }}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="blogs"
                  className={styles.navLink}
                  activeStyle={{ color: "black", backgroundColor: "white" }}
                >
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  className={styles.navLink}
                  activeStyle={{ color: "black", backgroundColor: "white" }}
                >
                  About Us
                </NavLink>
              </li>
            </ul>
            <div className="text-end">
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <NavLink
                    to="login"
                    className={styles.navLink}
                    activeStyle={{ color: "black", backgroundColor: "white" }}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="signup"
                    className={styles.navLink}
                    activeStyle={{ color: "black", backgroundColor: "white" }}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
